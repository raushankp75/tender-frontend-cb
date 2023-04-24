import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

const CreateTender = () => {

    const [doc1, setDoc1] = useState("")
    const [doc2, setDoc2] = useState("")
    const [doc3, setDoc3] = useState("")

    const handleSubmit = (e) => {
        // e.preventDefault();
        axios.post("http://localhost:9000/",)
            .then(res => {
                console.log(res.data);

            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <Formik
                initialValues={{
                    state: '',
                    departmentName: '',
                    tenderNo: '',
                    tenderName: '',
                    emd: '',
                    startDate: '',
                    endDate: '',
                    prebidMeetingDate: '',
                    prebidMeetingVenue: '',
                    contactName: '',
                    contactNumber: '',
                }}

                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    // alert(JSON.stringify(values, null, 2));
                    // const values = new values()
                    let vals = new FormData()
                    vals.append("tender", JSON.stringify(values))
                    vals.append("doc1", doc1)
                    vals.append("doc2", doc2)
                    vals.append("doc3", doc3)
                    handleSubmit(vals).then((data) => {
                        console.log(data, 88)
                        // setToastMessage(data.message)
                        // setShowToast(true)  // for showing toast
                    })
                    console.log(values)
                }}
            >

                {({ values, setFieldValue }) => (
                    <Form className="w-full max-w-6xl border-2 border-slate-300 p-8 rounded-md">
                        <h1 className="font-semibold text-2xl border-b-2 border-b-orange-400 rounded-sm w-fit mb-5 tracking-widest">Create New Tender</h1>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-x-16'>
                            {/* left */}
                            <div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                            state
                                        </label>
                                        <Field
                                            name="state"
                                            id="state"
                                            type="text"
                                            placeholder=""
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        />
                                        {/* <p className="text-gray-600 text-sm italic">For validation message</p> */}
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="email">
                                            departmentName                                        </label>
                                        <Field
                                            name="departmentName"
                                            id="departmentName"
                                            type="text"
                                            placeholder=""
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        />
                                        {/* <p className="text-red-500 italic">For validation message</p> */}
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                                            tenderName
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
                                            tenderNo
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
                                            startDate
                                        </label>
                                        <Field
                                            name="startDate"
                                            id="startDate"
                                            type="date"
                                            placeholder=""
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="dob">
                                            endDate
                                        </label>
                                        <Field
                                            name="endDate"
                                            id="endDate"
                                            type="date"
                                            placeholder=""
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="dob">
                                            prebidMeetingDate
                                        </label>
                                        <Field
                                            name="prebidMeetingDate"
                                            id="prebidMeetingDate"
                                            type="date"
                                            placeholder=""
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="mobile">
                                            prebidMeetingVenue
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
                                            contactName
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
                                            contactNumber
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

                        <div className='flex md:flex-row flex-col md:justify-between md:gap-y-0 gap-y-5 mb-12'>
                                <input
                                    id="doc1url1"
                                    name="doc1url1"
                                    placeholder=""
                                    type="file"
                                    onChange={(event) => {
                                        setDoc1(event.target.files[0])
                                    }}
                                    required

                                // className="hidden"
                                />
                                <input
                                    id="doc1url2"
                                    name="doc1url2"
                                    placeholder=""
                                    type="file"
                                    onChange={(event) => {
                                        setDoc2(event.target.files[0])
                                    }}
                                    required

                                // className="hidden"
                                />
                                <input
                                    id="doc1url3"
                                    name="doc1url3"
                                    placeholder=""
                                    type="file"
                                    onChange={(event) => {
                                        setDoc3(event.target.files[0])
                                    }}
                                    required

                                // className="hidden"
                                />
                            </div>


                        <div className='flex justify-center'>
                            <button type="submit" className='px-16 py-2 bg-blue-500 text-white font-semibold rounded-md'>Submit</button>
                        </div>
                    </Form>
                )}

            </Formik>

        </div>
    )
}

export default CreateTender