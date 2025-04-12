import React, { useState } from 'react'
import { ToastContext } from './ToastContext';

const ToastProvider = ( { children }) => {
  
    const [toastData, setToastData] = useState({ show:false, title: '', message: '',type: ''})

    const showToast = (newToastData) => {
        setToastData({...toastData, ...newToastData});
        setTimeout(() => {
            clearToast()
        }, 3000);
    };

    const clearToast = () => {
        setToastData({
            ...toastData,
            show:false, 
            title: '', 
            message: '',
            type: ''
        });
    };

    const {show, title, message, type} = toastData;
    const toastContextValue = {
        show, 
        title, 
        message,
        type,
        showToast
    }
        


    return (
            <ToastContext.Provider value = { toastContextValue }>
            {children}
            </ToastContext.Provider>
  )
}

export default ToastProvider