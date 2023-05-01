import React from 'react'
import { useState } from 'react'
import api from '../../utils/ApiServices'
import { toast , ToastContainer} from 'react-toastify'

const AddUser = () => {

    const [data, setData] = useState({
        "name": "",
        "email": "",
        "password": ""
    })

    console.log(data, 12)

    const handleData = (e) => {
        const newData = { ...data }
        newData[e.target.id] = e.target.value;
        setData(newData)
        // console.log(newData);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
         const response =  await api.post('users', data, {withCredentials: true})

         console.log(response, 27)
         if(response.data.success){
            toast("User Created")
         }
        } catch (error) {
            console.log(error)
        }

        console.log(data, e)
    }

   


    return (
        <div className=' justify-center flex items-center w-full h-full'>
            <ToastContainer/>
            <form className='w-96' onSubmit={handleSubmit}>

                <h1 className='text-center text-blue-400 underline text-2xl pb-4'>ADD USER</h1>
                <div>
                    <input value={data.name} onChange={handleData} type="text" name='' id='name' placeholder='Enter User Name ' className='h-12 w-full rounded-md px-3 bg-transparent shadow-sm border-b-2 border-b-blue-500 rounded-bl-md rounded-br-md focus:border-b-2 focus:border-b-yellow-700 outline-none' />
                    {/* <p className='text-red-600 text-sm'>{error.name}</p> */}

                    <input value={data.email} onChange={handleData} type="email" name='' id='email' placeholder='Enter User Email' className='h-12 w-full rounded-md  px-3 bg-transparent shadow-sm mt-4 border-b-2 border-b-blue-500 rounded-bl-md rounded-br-md focus:border-b-2 focus:border-b-yellow-700 outline-none' />
                    {/* <p className='text-red-600 text-sm'>{error.email}</p> */}

                    <input value={data.password} onChange={handleData} type="password" name='' id='password' placeholder='Enter User Password' className='h-12 w-full rounded-md px-3 bg-transparent shadow-sm mt-4 border-b-2 border-b-blue-500 rounded-bl-md rounded-br-md focus:border-b-2 focus:border-b-yellow-700 outline-none' />
                    {/* <p className='text-red-600 text-sm'>{error.password}</p> */}

                    {/* <input value={data.cpassword} onChange={handleData} type="password" name='' id='cpassword' placeholder='Enter Confirm Password' className='h-12 w-full rounded-md px-3 bg-transparent shadow-sm mt-4 border-b-2 border-b-blue-500 rounded-bl-md rounded-br-md focus:border-b-2 focus:border-b-yellow-700 outline-none' /> */}

            

                    <button type='submit' className='w-full px-6 py-2 mt-10 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Create</button>

                </div>


            </form>
        </div>
    )
}

export default AddUser