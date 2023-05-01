import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import api from '../../utils/ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTender = () => {

    const [data, setData] = useState({
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
    })

    const [inputs, setInputs] = useState([{ text: "", file: null }]);

    console.log(inputs, 26)

    const handleInputChange = (index, event) => {
        const values = [...inputs];
        if (event.target.type === "text") {
            values[index].text = event.target.value;
        } else if (event.target.type === "file") {
            values[index].file = event.target.files[0];
        }
        setInputs(values);
    };

    const handleAddMoreClick = () => {
        const values = [...inputs];
        values.push({ text: "", file: null });
        setInputs(values);
    };


    const handleSubmit = async (vals) => {
        // e.preventDefault();
        await api.post("tenders", vals, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        })
            .then(res => {
                console.log(res.data);
                toast(res.data.message)

            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <Formik
                initialValues={data}

                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    // alert(JSON.stringify(values, null, 2));
                    // const values = new values()
                    let vals = new FormData()
                    vals.append("tenders", JSON.stringify(values))
                    // vals.append("docs", JSON.stringify(inputs))

                    inputs.forEach((input) => {
                        vals.append('docs', input.file, input.file.name);
                        vals.append('docsText', input.text);
                    });

                    // console.log(inputs.file, 74)
                    // console.log(inputs.text, 76)

                    // const data = inputs.map(input => (

                    //     console.log(input.text),
                    //     console.log(input.file)
                    //     // text: input.text,
                    //     // file: input.file // Assuming filedata is a property on the file object
                    // ));

                    inputs.map((input) => {
                        console.log(input.text, input.file, 87)
                    })

                    // console.log(data, 83)

                    handleSubmit(vals, 55)

                }}
            >

                {({ values, setFieldValue }) => (
                    <Form className="w-full max-w-6xl border-2 border-slate-300 p-8 rounded-md">
                        <ToastContainer />
                        <h1 className="font-semibold text-2xl border-b-2 border-b-orange-400 rounded-sm w-fit mb-5 tracking-widest">Create New Tender</h1>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-x-16'>
                            {/* left */}
                            <div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="state">
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="departmentName">
                                            department Name                                        </label>
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="tenderNo">
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="tenderName">
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="emd">
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="startDate">
                                            start Date
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="endDate">
                                            end Date
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="prebidMeetingDate">
                                            prebidMeeting Date
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="prebidMeetingVenue">
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="contactName">
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
                                        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="contactNumber">
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

                        {inputs.map((input, index) => (
                            <div key={index}>
                                <label>
                                    Text:
                                    <input
                                        type="text"
                                        value={input.text}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </label>
                                <label>
                                    File:
                                    <input
                                        type="file"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </label>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddMoreClick}>
                            Add More
                        </button>

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