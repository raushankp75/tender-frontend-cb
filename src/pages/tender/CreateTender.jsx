import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

const CreateTender = () => {
    const [doc1, setDoc1] = useState("")
    const [doc2, setDoc2] = useState("")
    const [doc3, setDoc3] = useState("")
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
                    name: '',
                    mobileNo: '',
                }}

                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    // alert(JSON.stringify(values, null, 26));
                    // const values = new values()
                    let vals = new FormData()
                    vals.append("tender", JSON.stringify(values))
                    vals.append("doc1", doc1)
                    vals.append("doc2", doc2)
                    vals.append("doc3", doc3)


                    addVendors(vals).then((data) => {
                        console.log(data, 36)
                    })


                }}>


                {({ values, setFieldValue }) => (
                    <Form className='w-full max-w-6xl border-2 border-slate-300 p-8 rounded-md mt-12'>
                        <h1 className='font-semibold text-2xl border-b-2 border-b-orange-400 rounded-sm w-fit mb-5 tracking-widest'>Create New Tender</h1>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-x-16'>
                            {/* left */}
                            <div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                            State
                                        </label>
                                        <Field
                                            id="state"
                                            name="state"
                                            type="text"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                            Department Name
                                        </label>
                                        <Field
                                            id="departmentName"
                                            name="departmentName"
                                            type="text"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                            Tender No
                                        </label>
                                        <Field
                                            id="tenderNo"
                                            name="tenderNo"
                                            type="text"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                            Tender Name
                                        </label>
                                        <Field
                                            id="tenderName"
                                            name="tenderName"
                                            type="text"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                            EMD
                                        </label>
                                        <Field
                                            id="emd"
                                            name="emd"
                                            type="text"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>


                            </div>


                            {/* right */}
                            <div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                        Start Date
                                        </label>
                                        <Field
                                            id="startDate"
                                            name="startDate"
                                            type="date"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                        End Date
                                        </label>
                                        <Field
                                            id="endDate"
                                            name="endDate"
                                            type="date"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                        PrebidMeeting Date
                                        </label>
                                        <Field
                                            id="prebidMeetingDate"
                                            name="prebidMeetingDate"
                                            type="date"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                        PrebidMeeting Venue
                                        </label>
                                        <Field
                                            id="prebidMeetingVenue"
                                            name="prebidMeetingVenue"
                                            type="text"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                        Name
                                        </label>
                                        <Field
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="employeeId">
                                        Mobile no
                                        </label>
                                        <Field
                                            id="mobileNo"
                                            name="mobileNo"
                                            type="text"
                                            className="appearance-none block w-full text-gray-700 border-2 border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* files upload */}
                        <div className='flex gap-x-32'>
                            <input
                                id="doc1"
                                name="doc1"
                                type="file"
                                onChange={(event) => { setDoc1(event.target.files[0]) }}
                            />
                            <input
                                id="2"
                                name="2"
                                type="file"
                                onChange={(event) => { setDoc1(event.target.files[0]) }}
                            />
                            <input
                                id="3"
                                name="3"
                                type="file"
                                onChange={(event) => { setDoc1(event.target.files[0]) }}
                            />
                        </div>
                    </Form>
                )}
            </Formik >
        </div >
    )
}

export default CreateTender