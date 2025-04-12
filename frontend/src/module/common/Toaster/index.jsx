import React, { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../../../context/toast/ToastContext';

const Toaster = () => {

    const { type, title, message, show } = useContext(ToastContext)

    const [color, setColor] = useState('blue')

    useEffect(() =>{
        if(type) {
            if(type === 'success') {
                setColor('green')
            } else if(type === 'error') {
                setColor('red')
            }
            else if(type ==='info') {
                setColor('blue')
            }
        }
    }, [type])

    const alertClasses = `bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded fixed bottom-5 right-0 z-20`;

    

  return (
    show&&
    <div className={alertClasses} role='alert'>
        <strong className='font-bold mr-1'>{title}</strong>
        <span className='block sm:inline'>{message}</span>
        <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
            <svg className="fill-current h-6 w-6 text-blue-500" role='button' xmlns='http:/www.w3.org/2000/svg' viewBox='0 0 20 20'><title>close</title></svg>
        </span>
    </div>
  )
}

export default Toaster