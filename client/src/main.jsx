import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes/Router.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { injectStoreInAxios } from './api/axiosInstance.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Router />
    </Provider>
)

injectStoreInAxios(store);