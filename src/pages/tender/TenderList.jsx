import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FcViewDetails } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import api from '../../utils/ApiServices';
import Select from 'react-select';
import Modal from 'react-modal';

// import format from 'date-fns/format'

const TenderList = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({ id: null, status: 'ongoing' });
  const [showPopup, setShowPopup] = useState(false);
  const [remark, setRemark] = useState("")
  const [refresh, setRefresh] = useState(false)

  console.log(selectedRow, 16)

  const options = [
    { value: 'ongoing', label: 'Ongoing' },
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
  };

  // const updateRowStatus = async (id, status, remark) => {
  //   try {
  //     const response = await axios.put(`http://localhost:3000/tenders/update-row?id=${id}&status=${status}&remark=${remark}`);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // const updateRowStatus = async (id, status, remark) => {

  //   console.log({ "id": id, "status": status, "remark": remark }, 56)

  //   // ?id=${id}&status=${status}&remark=${remark}
  //   try {
  //     await api.put(`http://localhost:3000/tenders/updateRemark/${id}?status=${status}&remark=${remark}`, {
  //       headers: {
  //         "content-Type": "application/json"
  //       },
  //       withCredentials: true
  //     }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
          setRefresh(true)
        }
      }).catch(err => {
        console.log(err);
      })
  }

  const columns = [
    {
      name: 'Status',
      selector: 'status',
      cell: row => (
        <div style={{ position: 'relative' }}>
          <Select
            options={options}
            value={options.find(option => option.value === row.status)}
            onChange={option => handleStatusChange(row, option.value)}
            styles={{
              menuPortal: base => ({
                ...base,
                zIndex: 9999,
                position: 'fixed',
                width: '50%',
                // top: '10%',
                left: '46%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
              }),
            }}
            menuPortalTarget={document.body}
          />
        </div>
      ),
    },

    {
      name: 'Contact Name',
      selector: row => row.contactName,
      sortable: true,
      wrap: true,
      minWidth: "140px"
    },
    {
      name: 'Contact Number',
      selector: row => row.contactNumber,
      wrap: true,
      minWidth: "140px"
    },

    {
      name: 'Tender No',
      selector: row => row.tenderNo,
      // width: "80px",                  
      wrap: true,
      minWidth: "250px"
    },
    {
      name: 'Tender Name',
      selector: row => row.tenderName,
      // width: "80px",                  
      wrap: true,
      minWidth: "250px"
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

  return (
    <div>
      {showPopup && (
        <Modal
          isOpen={showPopup}
          onRequestClose={() => setShowPopup(false)}
          appElement={document.getElementById('root')}
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

      <div style={{ position: 'relative', zIndex: 1 }}>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
        />
      </div>
    </div>
  )
}

export default TenderList