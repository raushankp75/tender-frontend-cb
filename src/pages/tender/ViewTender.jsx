import React, { useEffect, useState, useContext } from 'react'
import AuthProvider, { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'

const ViewTender = () => {
  const { role } = useContext(AuthContext)

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/",)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("error, 18")
      })

  }, [])

  return (
    <div>
      <form className="w-full max-w-6xl border-2 border-slate-300 p-8 rounded-md">
        <div className='flex justify-between'>
          <h1 className="font-semibold text-2xl border-b-2 border-b-orange-400 rounded-sm w-fit mb-5 tracking-widest">Tender Detail</h1>
          <div><button className='px-16 py-2 bg-blue-500 text-white font-semibold rounded-md'>Edit</button></div>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-x-16'>
          {/* left */}
          <div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                  state
                </label>
                <p>Bihar</p>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="email">
                  departmentName
                </label>
                <p>ABC dept</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                  tenderName
                </label>
                <p>Name</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                  tenderNo
                </label>
                855429965
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                  emd
                </label>
                <p>kghkjxhdf</p>
              </div>
            </div>

          </div>

          {/* right */}
          <div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="dob">
                  startDate
                </label>
                <p>15 july 2023</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="dob">
                  endDate
                </label>
                <p>18 july 2023</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="dob">
                  prebidMeetingDate
                </label>
                <p>5 feb 2023</p>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                  prebidMeetingVenue
                </label>
                <p>cccc bbb dddd</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                  contactName
                </label>
                <p>Ramesh</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                  contactNumber
                </label>
                <p>8549568452</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex md:flex-row flex-col md:justify-between md:gap-y-0 gap-y-5 my-6'>
          <button className=''><Link target='_blank' to="LinkHere" > Doc1 URL </Link></button>
          <button className=''><Link target='_blank' to="LinkHere" > Doc2 URL </Link></button>
          <button className=''><Link target='_blank' to="LinkHere" > Doc3 URL </Link></button>
        </div>



      </form>
    </div>
  )
}

export default ViewTender