import React, { useEffect, useState, useContext } from 'react'
import AuthProvider, { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import api from '../../utils/ApiServices';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewTender = () => {

  const { id } = useParams();

  const [data, setData] = useState([]);
  const [docs, setDocs] = useState([])

  useEffect(() => {
    api.get(`tenders/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        setData([res.data.tender]);
        setDocs(res.data.docs)
      })
      .catch((err) => {
        console.log("error, 18")
      })

  }, [])

  const baseDocUrl = "http://localhost:3000"

  // Determine the file type based on the file extension
  const fileType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
      return 'pdf';
    } else {
      return 'image';
    }
  };


  const renderImage = (url) => (
    <div className='flex flex-col gap-4 font-bold'>
      {/* <h1 className='text-center'>Img{imgNo}</h1> */}
      <Link target='_blank' to={baseDocUrl + url}>
        <img width="200px" src={baseDocUrl + url} alt="" srcset="" />
      </Link>
    </div>
  );


  const renderPdf = (url, docNo) => (
    <div className='w-36'>
      {/* <h1 className='text-center'>PDF</h1> */}
      <Link target='_blank' to={baseDocUrl + url} >
        <h1 className='text-blue-800  font-bold '>PDF{docNo}</h1>
      </Link>
      {/* <Document file={baseDocUrl + url}>
        <Page pageNumber={1} style={{ width: 200, height: 200 }} />
      </Document> */}
    </div>
  );

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
          {/* Need to map docs nowgoing to get url from other api*/}

          {/* <div className='flex md:flex-row flex-col md:justify-between md:gap-y-0 gap-y-5 my-6'> */}
          {/* <div className='grid grid-cols-3 place-item-center'>

            {tender?.doc1url && fileType(tender.doc1url) === 'pdf' ? (
              renderPdf(tender.doc1url, 1)
            ) : (
              renderImage(tender.doc1url, 1)
            )}
            {tender?.doc2url && fileType(tender.doc2url) === 'pdf' ? (
              renderPdf(tender.doc2url, 2)
            ) : (
              renderImage(tender.doc2url, 2)
            )}
            {tender?.doc3url && fileType(tender.doc3url) === 'pdf' ? (
              renderPdf(tender.doc3url, 3)
            ) : (
              renderImage(tender.doc3url, 3)
            )}
          </div> */}
        </div>
      ))}

      <div className="grid grid-cols-3 my-4">
        {docs?.map((doc) => {
          return (
            <div className="flex flex-col gap-2">
              <h3 ><span className='font-bold'>Doc Name: </span>{doc?.name}</h3>
              {fileType(doc.path) === 'pdf' ? (
                renderPdf(doc.path)
              ) : (
                renderImage(doc.path)
              )}
              {/* <img src={baseDocUrl + doc.path} alt="" srcset="" /> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ViewTender