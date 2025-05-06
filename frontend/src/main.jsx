import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './module/Home/Homepage.jsx'
import Signup from './module/auth/Signup/index.jsx'
import Login from './module/auth/Login/index.jsx'
import AuthProvider from './context/auth/AuthProvider.jsx'
import Toaster from './module/common/Toaster/index.jsx'
import ToastProvider from './context/toast/ToastProvider.jsx'
import BlockAuthRoute from './routes/BlockAuthRoute.jsx'
import Dashboard from './module/admin/Dashboard/index.jsx'
import Users from './module/admin/Users/index.jsx'
import Products from './module/admin/Products/index.jsx'
import Brands from './module/admin/Brands/index.jsx'
import UploadProvider from './context/uploadfile/UploadProvider.jsx'
import Cart from './module/user/Cart/index.jsx'
import CartProvider from './context/cart/CartProvider.jsx'
import AdminPrivateRoute from './routes/AdminPrivateRoute.jsx'
import Contact from './module/contact/Contact.jsx'
import About from './module/about_temp/Abbout.jsx'

const router= createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element:  <Home/> 
      },{
        path: "/about",
        element:  <About/>
      },{
        path: "/contact",
        element:  <Contact/>
      },
      {
        path: "/signup",
        element: <BlockAuthRoute> <Signup/> </BlockAuthRoute>
      },
      {
        path: "/login",
        element: <BlockAuthRoute> <Login/> </BlockAuthRoute>
      },
      {
        path: "admin",
        element: <AdminPrivateRoute> <Dashboard/> </AdminPrivateRoute>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard/>
          },
          {
            path: "users",
            element: <Users/>
          },
          {
            path: "products",
            element: <Products/>
          },
          {
            path: 'brands',
            element: <Brands/>
          }
          
        ],
      },
      {
        path: "user",
        children: [
          {
            path: "cart",
            element: <Cart/>
          }
        ]
      }
      
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
    <AuthProvider>
      <UploadProvider>
        <CartProvider>
          <Toaster/>
          <RouterProvider router={router} />
        </CartProvider>
      </UploadProvider>
    </AuthProvider>
    </ToastProvider>
  </StrictMode>,
)
