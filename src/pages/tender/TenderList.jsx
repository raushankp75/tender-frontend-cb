import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FcViewDetails } from 'react-icons/fc';
import { Link } from 'react-router-dom';

// import format from 'date-fns/format'

const TenderList = () => {
  const [data, setData] = useState([]);

  const columns = [
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
    axios.get("http://localhost:3000/tenders", {
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
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
      />
    </div>
  )
}

export default TenderList