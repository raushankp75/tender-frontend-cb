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
    updateRowStatus(id, status, remark);
    setShowPopup(false);
  };

  const updateRowStatus = (id, status, remark) => {

    console.log(id, status, remark, 466)
    api.put(`/api/update-row?id=${id}&status=${status}&remark=${remark}`)
      .then(response => {
        // handle the success response
        console.log(response.data);
      })
      .catch(error => {
        // handle the error response
        console.error(error);
      });
  }


  const columns = [
    {
      name: 'Status',
      selector: 'status',
      cell: row => (
        <Select
          options={options}
          defaultValue={options[0]}
          value={options.find(option => option.value === row.status)}
          onChange={option => handleStatusChange(row, option.value)}
        />
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

  }, [])


  return (
    <div>
      {showPopup && (
        <Modal isOpen={showPopup} onRequestClose={() => setShowPopup(false)}>
          <form onSubmit={handleRemarkSubmit}>
            <label>
              Remark:
              <input type="text" value={remark} onChange={e => setRemark(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
      />
    </div>
  )
}

export default TenderList