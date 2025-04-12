import { useContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from './module/common/Navbar'
import Footer from './module/common/Footer'
import { Outlet } from 'react-router-dom'
import { AuthContext } from './context/auth/AuthContext'
import {jwtDecode} from 'jwt-decode'
import { ToastContext } from './context/toast/ToastContext'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;


function App() {
  const { logout, login } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)

  useEffect(() => {
    reauthenticate()
  }, [])

  const reauthenticate = () => {
    let token = localStorage.getItem('token');
    if (token) {
      let decode = jwtDecode(token);
      console.log(decode);
      if(decode ?.exp > Math.floor(Date.now() / 1000)){
      getUserApi(token, decode)
      }else{
        logout();
        showToast({show: true, title: 'Logout', message: 'Token Expired', type: 'error'})

      }
    }
    
  }


  const getUserApi = (token, decode) => {
    axios.get(`${apiUrl}/api/users/${decode._id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }).then(res => {
      console.log(res.data);
      showToast({show:true, title: 'welcome Back', message: 'Login Success', type: 'success'});
      login({token, user:res.data})
    }).catch(err => {
      showToast({show: true, title: 'Error', message:err.response?.data.error || 'Server Error', type: 'error'});
      console.log(err);

    })
  }


  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
