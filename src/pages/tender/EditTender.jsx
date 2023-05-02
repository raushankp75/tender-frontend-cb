import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../../utils/ApiServices';
import { parseISO, format } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTender = () => {

  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(null);


  // const [doc1, setDoc1] = useState("")
  // const [doc2, setDoc2] = useState("")
  // const [doc3, setDoc3] = useState("")


  useEffect(() => {
    api.get(`tenders/${id}`, {
      headers: {
        "content-Type": "application/json"
      },
      withCredentials: true,
    })
      .then((res) => {
        // console.log(res.data.tender, 29)
        // console.log(...res.data.tender)


        const formattedData = {
          ...res.data.tender,
          startDate: format(new Date(res.data.tender.startDate), 'yyyy-MM-dd'),
          endDate: format(new Date(res.data.tender.endDate), 'yyyy-MM-dd'),
          prebidMeetingDate: format(new Date(res.data.tender.prebidMeetingDate), 'yyyy-MM-dd'),
        };

        // console.log(formattedData, 38)
        setInitialValues(formattedData);
        // setInitialValues(formattedData);
      })
      .catch((err) => {
        console.log(err)
        console.log("error, 18")
      })

  }, [])

  const handleSubmit = async (vals) => {
    // e.preventDefault();
    await api.put("tenders/" + id, vals, {
      headers: {
        'content-Type': 'multipart/form-data'
      },
      withCredentials: true,
    })
      .then(res => {
        console.log(res, 61)
        // if (res.data.success) {
        toast(res.data.message)
        // }

      }).catch(err => {
        console.log(err);
      })
  }


  if (!initialValues) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Formik
        // enableReinitialize // missing piece!!
        initialValues={initialValues}

        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));

          let vals = new FormData()
          vals.append("tenders", JSON.stringify(values))
          // vals.append("doc1", doc1)
          // vals.append("doc2", doc2)
          // vals.append("doc3", doc3)


          handleSubmit(vals)


        }}
      >

        {({ values, setFieldValue, handleChange }) => (

          <Form className="w-full max-w-6xl border-2 border-slate-300 p-8 rounded-md">
            <ToastContainer />
            <div>
              <h1 className="font-semibold text-2xl border-b-2 border-b-orange-400 rounded-sm w-fit mb-5 tracking-widest">Update Tender</h1>

              <div className='grid md:grid-cols-2 grid-cols-1 gap-x-16'>
                {/* left */}
                <div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="state">
                        state
                      </label>
                      <Field
                        name="state"
                        id="state"
                        type="text"
                        onChange={handleChange}
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />

                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="email">
                        department Name                                        </label>
                      <Field
                        name="departmentName"
                        id="departmentName"
                        type="text"
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />

                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                        tender No
                      </label>
                      <Field
                        name="tenderNo"
                        id="tenderNo"
                        type="text"
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                        tender Name
                      </label>
                      <Field
                        name="tenderName"
                        id="tenderName"
                        type="text"
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                        emd
                      </label>
                      <Field
                        name="emd"
                        id="emd"
                        type="text"
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  </div>

                </div>

                {/* right */}
                <div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="dob">
                        start Date
                      </label>
                      <Field
                        name="startDate"
                        id="startDate"
                        type="date"
                        placeholder=""
                        // value={format(new Date(initialValues.startDate), 'yyyy-MM-dd')}
                        // defaultValue={}
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="dob">
                        end Date
                      </label>
                      <Field
                        name="endDate"
                        id="endDate"
                        type="date"
                        // value={format(new Date(initialValues.endDate), 'yyyy-MM-dd')}
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="dob">
                        prebidMeeting Date
                      </label>
                      <Field
                        name="prebidMeetingDate"
                        id="prebidMeetingDate"
                        // initialvalue={format(new Date(initialValues.prebidMeetingDate), 'yyyy-MM-dd')}
                        // defaultValue={format(new Date(initialValues.prebidMeetingDate), 'yyyy-MM-dd')}
                        // value={new Date(initialValues.prebidMeetingDate).toISOString().substr(0, 10)}
                        // value={format(new Date(initialValues.prebidMeetingDate), 'yyyy-MM-dd')}

                        onChange={(event) => {
                          console.log(event.target.value);
                          setFieldValue('prebidMeetingDate', format(new Date(event.target.value), 'yyyy-MM-dd'));
                        }}
                        type="date"
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                        prebidMeeting Venue
                      </label>
                      <Field
                        name="prebidMeetingVenue"
                        id="prebidMeetingVenue"
                        type="text"
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                        contact Name
                      </label>
                      <Field
                        name="contactName"
                        id="contactName"
                        type="text"
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                        contact Number
                      </label>
                      <Field
                        name="contactNumber"
                        id="contactNumber"
                        type="text"
                        placeholder=""
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className='flex md:flex-row flex-col md:justify-between md:gap-y-0 gap-y-5 mb-12'>
                <input
                  id="doc1url1"
                  name="doc1url1"
                  placeholder=""
                  type="file"
                  onChange={(event) => {
                    setDoc1(event.target.files[0])
                  }}
                />
                <input
                  id="doc1url2"
                  name="doc1url2"
                  placeholder=""
                  type="file"
                  onChange={(event) => {
                    setDoc2(event.target.files[0])
                  }}
                />
                <input
                  id="doc1url3"
                  name="doc1url3"
                  placeholder=""
                  type="file"
                  onChange={(event) => {
                    setDoc3(event.target.files[0])
                  }}
                />
              </div> */}


              <div className='flex justify-center'>
                <button type="submit" className='px-16 py-2 bg-blue-500 text-white font-semibold rounded-md'>Submit</button>
              </div>
            </div>



          </Form>


        )}

      </Formik>

    </div>
  )
}

export default EditTender