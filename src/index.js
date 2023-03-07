import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import Store from "./store"
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
import toast, { ToastBar, Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      <Toaster
        position="top-center"
        reverseOrder={false} 
        toastOptions={{ 
          duration: 1500,  
        }}
      />  
    </Provider>
  </React.StrictMode>
); 