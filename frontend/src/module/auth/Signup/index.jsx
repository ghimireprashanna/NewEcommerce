import React, { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import {object, string, ref} from 'yup';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'



const apiUrl = import.meta.env.VITE_API_URL;

const Signup = (setShowModal = undefined) => {
  
    let userSchema = object({
      name: string().required(),
      email: string().required().email(),
      password: string().required().min(6),
      confirmPassword: string()
      .oneOf([ref('password'), null], 'password must match')
      .required('Confirm password is required')
    });

    const formik = useFormik({
      validationSchema: userSchema,
      initialValues: {
        name :'',
        email :'',
        password :'',
        confirmPassword :''
      },
      onSubmit: (data) => {
        console.log(data);
        signupApiCall(data);
      }
    })
    const { errors,getFieldProps } = formik

    useEffect(() => {
      console.log(errors);
    },[errors])

    const signupApiCall = (data) => {
      console.log(apiUrl);
      axios.post(`${apiUrl}/api/users/signup`,data).then(res=>{
          console.log(res.data);
          if(setShowModal) {
            setShowModal(false);
          }
          
      }).catch(err => {
        console.log(err);
      });
    }

    const navigate = useNavigate();
    const goToPath = (path) => {
      navigate(path);
    }

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <svg width="50"
              height="56" fill="#000000" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M16.417 9.579A7.917 7.917 0 1 1 8.5 1.662a7.917 7.917 0 0 1 7.917 7.917zm-2.553-1.176a.282.282 0 0 0 .06-.442l-1.63-1.813a2.05 2.05 0 0 0-1.524-.68h-.68a1.728 1.728 0 0 1-3.177 0h-.68a2.05 2.05 0 0 0-1.523.679L3.075 7.96a.282.282 0 0 0 .061.442l1.117.704a.396.396 0 0 0 .508-.086l.56-.702v5.289a.347.347 0 0 0 .345.345h5.672a.347.347 0 0 0 .346-.345V8.324l.555.697a.396.396 0 0 0 .508.086l1.117-.704z"></path>
                </g>
            </svg>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{' '}
            <a
            onClick={() => goToPath('/login')}
              
              title="" 
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Login
            </a>
          </p>
          <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {' '}
                  Full Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    {...getFieldProps('name')}
                  ></input>
                </div>
                {
                  errors.name && 
                  <label className='text-sm text-red-700'>
                    { errors.name }
                  </label>
                }
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    {...getFieldProps('email')}
                  ></input>
                </div>
                {
                  errors.email && 
                  <label className='text-sm text-red-700'>
                    {errors.email}
                  </label>
                }
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    {...getFieldProps('password')}
                  ></input>
                </div>
                {
                  errors.password && 
                  <label className='text-sm text-red-700'>
                    { errors.password}
                  </label>
                }
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Confirm Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="confirmPassword"
                    {...getFieldProps('confirmPassword')}
                  ></input>
                </div>
                {
                  errors.confirmPassword && 
                  <label className='text-sm text-red-700'>
                    {errors.confirmPassword}
                  </label>
                }
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Signup