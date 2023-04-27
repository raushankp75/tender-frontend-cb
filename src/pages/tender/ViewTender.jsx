import React, { useEffect, useState, useContext } from 'react'
import AuthProvider, { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'

const ViewTender = () => {

  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/tenders/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        setData([res.data]);
      })
      .catch((err) => {
        console.log("error, 18")
      })

  }, [])

  const baseDocUrl = "http://localhost:3000"


  return (
    <div>
      {data.map((tender) => (
        <div key={tender.id} className="w-full max-w-6xl border-2 border-slate-300 p-8 rounded-md">
          <div className='flex justify-between'>
            <h1 className="font-semibold text-2xl border-b-2 border-b-orange-400 rounded-sm w-fit mb-5 tracking-widest">Tender Detail</h1>
            <div>
              <button className='px-16 py-2 bg-blue-500 text-white font-semibold rounded-md'>
                <Link to={`/edittender/${tender.id}`}>Edit</Link>
                {/* <Link to="/edittender">Edit</Link> */}
              </button>
            </div>
          </div>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-x-16'>
            {/* left */}
            <div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="employeeId">
                    state
                  </label>
                  <p>{tender?.state}</p>

                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="email">
                    department Name
                  </label>
                  <p>{tender?.departmentName}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="mobile">
                    tender No
                  </label>
                  <p>{tender?.tenderNo}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="mobile">
                    tender Name
                  </label>
                  <p>{tender?.tenderName}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="mobile">
                    emd
                  </label>
                  <p>{tender?.emd}</p>
                </div>
              </div>

            </div>

            {/* right */}
            <div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="dob">
                    startDate
                  </label>
                  <p>{tender?.startDate}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="dob">
                    endDate
                  </label>
                  <p>{tender?.endDate}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="dob">
                    prebidMeetingDate
                  </label>
                  <p>{tender?.prebidMeetingDate}</p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="mobile">
                    prebidMeetingVenue
                  </label>
                  <p>{tender?.prebidMeetingVenue}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="mobile">
                    contactName
                  </label>
                  <p>{tender?.contactName}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="mobile">
                    contactNumber
                  </label>
                  <p>{tender?.contactNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex md:flex-row flex-col md:justify-between md:gap-y-0 gap-y-5 my-6'>
            {tender?.doc1url && <div className='flex flex-col gap-4 font-bold'>
              <h1 className='text-center'>DOC 1</h1>
              <Link target='_blank' to={baseDocUrl + tender?.doc1url} >
                <img width="200px" src={baseDocUrl + tender?.doc1url} alt="" srcset="" />
              </Link>
            </div>}
            {tender?.doc2url && <div className='flex flex-col gap-4 font-bold'>
              <h1 className='text-center'>DOC 2</h1>
              <Link target='_blank' to={baseDocUrl + tender?.doc2url} >
                <img width="200px" src={baseDocUrl + tender?.doc2url} alt="" srcset="" />
              </Link>
            </div>}
            {tender?.doc3url && <div className='flex flex-col gap-4 font-bold'>
              <h1 className='text-center'>DOC 3</h1>
              <Link target='_blank' to={baseDocUrl + tender?.doc3url} >
                <img width="200px" src={baseDocUrl + tender?.doc3url} alt="" srcset="" />
              </Link>
            </div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ViewTender