const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const otpModel = require("../models/otp.model");
const { sendEmailForVerification, sendEmailForForgetPassword} = require("../services/email.service")

const userRegisterController = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                success: false, // consistency ke liye success boolean add kiya
                message: "All Fields are required"
            });
        }

        // Email ko lowercase karke check kar rahe hain
        const existedUser = await userModel.findOne({ 
            $or: [{ email: email.toLowerCase() }, { mobile }] 
        });
        
        if (existedUser) {
            return res.status(409).json({
                success: false,
                message: "user Already Registered! Login Please"
            });
        }

        // 1. Create New User
        const newUser = await userModel.create({
            name,
            email: email.toLowerCase(),
            mobile,
            password
        });

        // 2. Generate OTP Settings
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 1000-9999
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await otpModel.findOneAndUpdate(
            { email: email.toLowerCase() },
            { otp, expiresAt, verified: false },
            { upsert: true, returnDocument: 'after' }
        );

        // 🔥 FIXED: Email service ko try-catch mein dala taaki server freeze na ho
        try {
            await sendEmailForVerification(email.toLowerCase(), otp);
        } catch (emailError) {
            console.log("Email Sending Failed but continuing registration:", emailError);
            // Hame crash nahi karna hai, bas console me log karke aage badhna hai
        }

        // 3. JWT and Cookies Configuration
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        
        // 🔥 FIXED: Production aur Localhost dono ke liye cookie settings adjust ki
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Production par true, local par false
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-domain access ke liye production par "none" zaroori hai
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "user Registered Successfully",
            user: userResponse
        });

    } catch (error) {
        console.log("Global Registration Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const verifyOTPController = async (req,res) =>{
    try {
        const {otp} = req.body;
        if(!otp){
             return res.status(400).json({ message: "OTP is required" });
        }

        const otpEntry = await otpModel.findOne({otp})
        if (!otpEntry) return res.status(404).json({ message: "OTP not found" });
    
        if (otpEntry.expiresAt < new Date())
        return res.status(400).json({ message: "OTP expired" });

        await userModel.findOneAndUpdate(
            {email: otpEntry.email},
            {isVerified: true},
            {new: true}
        )
         

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}

const userLoginController = async (req,res) =>{
    try {
        const { email, password } = req.body;
        if (!email  || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            });
        }
        const user = await userModel.findOne({email}).select("+password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        
        
        const token = jwt.sign({ id: user._id },process.env.JWT_SECRET_KEY,{ expiresIn: "7d" })
        res.cookie("token",token,{
            httpOnly: true,
            secure: true
        })

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: userResponse
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const forgetPasswordController = async (req, res) => {

    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not registered! Register First" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Save token and expiry in user model
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Reset link
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        const message = `<h1>Password Reset</h1>
                         <p>Click the link below to reset your password. This link will expire in 15 minutes.</p>
                         <a href="${resetUrl}">Reset Password</a>`;

        await sendEmailForForgetPassword(user.email, "Password Reset Request", message);

        return res.status(200).json({
            success: true,
            message: "Reset link sent to your email."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const currentUserController = async (req,res) =>{
    try {
        
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({
            success: true,
            message: "current user Fetched",
            user: user
        })


    } catch (error) {
        console.log(error);
        return res.status(500).josn({
            success: false,
            message: "Internal Server Error"
        })
    }
}



module.exports = { userRegisterController,userLoginController,verifyOTPController,currentUserController,forgetPasswordController , resetPasswordController}