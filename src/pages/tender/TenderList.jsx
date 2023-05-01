import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FcViewDetails } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import api from '../../utils/ApiServices';
import Select from 'react-select';
import Modal from 'react-modal';
import { AiFillFilter, AiOutlineCloudDownload } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { CSVLink } from 'react-csv';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// import format from 'date-fns/format'



const TenderList = () => {

  const role = localStorage.getItem('role')
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({ id: null, status: 'ongoing' });
  const [showPopup, setShowPopup] = useState(false);
  const [remark, setRemark] = useState("")
  const [refresh, setRefresh] = useState(false)

  const [statusFilter, setStatusFilter] = useState(null);

  const filteredData = data.filter(row => {
    if (statusFilter === null) {
      return true;
    }
    return row.status === statusFilter;
  });

  const handleFilterClick = status => {
    setStatusFilter(status);
  };

  const options = [
    { value: 'ongoing', label: 'Ongoing', style: "" },
    { value: 'closed', label: 'Closed' },
    { value: 'not-interested', label: 'Not Interested' },
    { value: 'draft', label: 'Draft' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'not-selected', label: 'Not Selected' },
  ];

  const handleStatusChange = (row, status) => {
    if (status === 'closed' || status === 'not-interested' || status === 'not-selected') {
      setSelectedRow({ id: row.id, status });
      setShowPopup(true);
    } else {
      updateRowStatus(row.id, status, null);
    }
  };

  const handleRemarkSubmit = (e) => {
    e.preventDefault();
    const { id, status } = selectedRow;
    console.log(id, status, "handleRemarkSubmit")
    updateRowStatus(id, status, remark);
    setShowPopup(false);
    setRefresh(!refresh)
    // toast("Remark Submitted!")
  };

  const updateRowStatus = async (id, status, remark) => {
    // e.preventDefault();
    await api.put(`tenders/updateRemark/${id}`, { status, remark }, {
      headers: {
        // 'content-Type': '/form-data'
        "content-Type": "application/json"
      },
      withCredentials: true,
    })
      .then(res => {
        console.log(res, 52);
        if (res.status == 200) {
          console.log("Okay")
          setRefresh(!refresh)
          toast("Status Changed!")
        }
      }).catch(err => {
        console.log(err);
      })
  }

  const csvColumns = [
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
    },

    {
      name: 'Tender No',
      selector: row => row.tenderNo,
      // width: "80px",                  
      wrap: true,
      minWidth: "150px",
      sortable: true,
    },

    {
      name: 'Tender Name',
      selector: row => row.tenderName,

      wrap: true,
      minWidth: "150px",
      sortable: true,

    },
    {
      name: 'Remark',
      selector: row => row.remark,
      wrap: true,
      minWidth: "150px"
    },
    {
      name: 'Created By',
      selector: row => row.createdBy,

      wrap: true,
      minWidth: "150px"
    },

    {
      name: "",
      button: true,
      wrap: true,
      minWidth: "200px"
    },
  ];

  const columns = [
    {
      name: 'Status',
      selector: 'status',
      cell: row => (
        <div style={{}}>
          <Select
            isDisabled={role === "user"}
            options={options}
            value={options.find(option => option.value === row.status)}
            onChange={option => handleStatusChange(row, option.value)}
            // styles={{
            //   menuPortal: base => ({
            //     ...base,
            //     zIndex: 9999,
            //     position: 'fixed',
            //     width: '50%',
            //     // top: '10%',
            //     left: '46%',
            //     transform: 'translate(-50%, -50%)',
            //     backgroundColor: 'white',
            //     borderRadius: '5px',
            //     boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            //   }),
            // }}
            menuPortalTarget={document.body}
          />
        </div>

      ),
      sortable: true,
      minWidth: "150px"
    },

    // {
    //   name: 'Contact Name',
    //   selector: row => row.contactName,
    //   sortable: true,
    //   wrap: true,
    //   minWidth: "140px"
    // },
    // {
    //   name: 'Contact Number',
    //   selector: row => row.contactNumber,
    //   wrap: true,
    //   minWidth: "140px"
    // },

    {
      name: 'Tender No',
      selector: row => row.tenderNo,
      // width: "80px",                  
      wrap: true,
      minWidth: "150px",
      sortable: true,
    },
    {
      name: 'Tender Name',
      selector: row => row.tenderName,
      // width: "80px",
      wrap: true,
      minWidth: "150px",
      sortable: true,

    },
    {
      name: 'Remark',
      selector: row => row.remark,
      // width: "80px",
      wrap: true,
      minWidth: "150px"
    },
    {
      name: 'Created By',
      selector: row => row.createdBy,
      width: "120px",
      // wrap: true,
      minWidth: "150px"
    },

    {
      name: "",
      button: true,
      cell: (row) => (
        <button
          className="text-green-700 px-1 py-1 outline outline-[1px] flex items-center gap-1"
        >
          <FcViewDetails />
          <Link to={`/viewtender/${row.id}`}>Details</Link>
        </button>
      ),
      wrap: true,
      minWidth: "200px",
      width: "120px",
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.status === 'closed',
      style: {
        textDecoration: 'line-through',
      },
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px',
        fontSize: '16px',
        color: "#000000",
        fontWeight: 500,
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',

      },
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        backgroundColor: "#F9F5F5",
        color: "#6A6867",
      }
    },

    headCells: {
      style: {
        fontSize: '16px'
      },
    },
  };

  useEffect(() => {
    api.get("tenders", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("error, 18")
      })

  }, [refresh])

  Modal.setAppElement('#root');

  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      <ToastContainer />
      {showPopup && (
        <Modal isOpen={showPopup} onRequestClose={() => setShowPopup(false)} appElement={document.getElementById('root')}
          style={{
            overlay: { zIndex: 9999 },

            content: {
              zIndex: 10000,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              width: "400px",
              height: "400px"

            },
          }}
        >
          <form className='w-full h-full' onSubmit={handleRemarkSubmit}>
            <div className='mb-4 text-lg font-semibold text-center'>Add Remark</div>
            <label className='block mb-2'>
              Remark:
              <textarea className='w-full px-2 py-1 border rounded' type="text" value={remark} onChange={e => setRemark(e.target.value)} />
            </label>
            <div className='flex justify-end'>
              <button className='mr-2 px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600' type="button" onClick={() => setShowPopup(false)}>Cancel</button>
              <button className='px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600' type="submit">Submit</button>
            </div>
          </form>
        </Modal>
      )}
      <div className='flex gap-4 items-center mb-3'>
        <button
          className='border px-4 py-2 bg-blue-400 font-bold text-white'
          onClick={() => handleFilterClick(null)}
        >
          ALL
        </button>
        <button
          className='border px-4 py-2'
          onClick={handleToggleOptions}
        >
          <AiFillFilter size={30} color='blue' />
        </button>
        <AnimatePresence>
          {showOptions && (
            <motion.div
              className='flex flex-wrap gap-4'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  className='border px-4 py-2'
                  onClick={() => {
                    handleFilterClick(option.value);
                    handleToggleOptions();
                  }}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <CSVLink className='font-bold flex ml-auto gap-2 w-48 mr-4 border px-4 py-[2px] relative bottom-2 border-black' data={data} filename={"table_data.csv"}>
        <AiOutlineCloudDownload size={24} width={24} /> Download CSV
      </CSVLink>

      <div className='pb-48' style={{ position: 'relative', zIndex: 1, overflowY: 'auto' }}>
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
          highlightOnHover
          pagination
        />
      </div>
    </div>
  )
}

export default TenderList