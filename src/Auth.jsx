import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from './context/AuthContext';


const Auth = () => {
  const navigate = useNavigate()

  const { setRole } = useContext(AuthContext)

  const [data, setData] = useState({
    email: '',
    password: '',
  })



  const [error, setError] = useState({})

  const handleData = (e) => {
    const newData = { ...data }
    newData[e.target.id] = e.target.value;
    setData(newData)
  }

  const validateFrom = () => {
    let err = {};
    if (data.email === '') {
      err.email = 'Email Required'
    } else {
      let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(data.email)) {
        err.email = 'Email Not Valid'
      }
    }

    if (data.password === '') {
      err.password = 'Password Required'

    }
    // else{
    //   let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    //   if(!passRegex.test(data.password)){
    //     err.password = 'Password must be greater than 8 or a Character and Number'
    //   }
    // }

    setError({ ...err })
    return Object.keys(err).length > 0 ? false : true
  }

  const handleValidate = () => {
    let isValid = validateFrom()
    isValid && handleSubmit();
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(data);
    axios.post("http://localhost:3000/auth/login", data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,    // IMPORTANT!!!
    })
      .then(res => {

        console.log(res.data);
        // if (res.data.success) {


        localStorage.setItem("role", res.data.user.role)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        setRole(localStorage.getItem("role"))
        navigate("/tenderlist")
        // }

      }).catch(err => {
        console.log(err);
      })
  }



  return (

    <div className='flex justify-center mt-28'>
      <div className='bg-slate-50 p-6 rounded-lg shodow-md shadow-slate-300 md:w-[400px] w-[100%] border-2 border-slate-200'>
        <h2 className='uppercase font-bold text-2xl flex items-center justify-center mb-6 text-slate-700'>Login</h2>
        <form>
          <div className='flex flex-col gap-y-5'>
            <div className=''>
              <label htmlFor="email" className='text-lg'>Email</label>
              <input value={data.email} onChange={handleData} id="email" name='email' type="email" placeholder='Enter Your Email' className='w-full rounded-md py-2 px-3 bg-transparent shadow-sm  border-2 border-blue-500 focus:border-2 focus:border-yellow-700 outline-none' />
              <p className='text-red-600 text-sm'>{error.email}</p>
            </div>

            <div className=''>
              <label htmlFor="password" className='text-lg'>Password</label>
              <input value={data.password} onChange={handleData} id="password" name="password" type="password" placeholder='Enter Your Password' className='w-full rounded-md py-2 px-3 bg-transparent shadow-sm  border-2 border-blue-500 focus:border-2 focus:border-yellow-700 outline-none' />
              <p className='text-red-600 text-sm'>{error.password}</p>
            </div>

            <button type='button' onClick={() => handleValidate()} className='w-full px-6 py-2 mt-5 m-auto flex items-center justify-center rounded-md bg-blue-500 text-white font-bold text-xl hover:duration-500 hover:scale-95'>Login</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Auth