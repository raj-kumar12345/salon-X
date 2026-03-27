import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import { store } from './store/store.jsx'
import AppRouter from './router/AppRouter.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
