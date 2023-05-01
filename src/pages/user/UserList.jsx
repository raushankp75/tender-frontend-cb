import React, { useState , useEffect} from 'react'
import api from '../../utils/ApiServices';
import DataTable from 'react-data-table-component';
import format from 'date-fns/format';

const UserList = () => {

    const [data, setData] = useState([]);

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

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            width: "180px",                  
            wrap: true,
            minWidth: "180px",
            sortable: true,
          },
          {
            name: 'User Email',
            selector: row => row.email,
            width: "220px",
            wrap: true,
            minWidth: "220px",
            sortable: true,
      
          },
          {
            name: 'Created At',
            selector: row => format(new Date(row.createdAt), "yyyy-MM-dd'T'HH:mm") ,
            width: "200px",
            wrap: true,
            minWidth: "200px"
          },
          {
            name: 'TenderCount',
            // selector: row => row.createdBy,
            width: "180px",
            wrap: true,
            minWidth: "180px"
          },
          {
            name: 'Actions',
            // selector: row => row.createdBy,
            width: "180px",
            wrap: true,
            minWidth: "180px"
          }
    ]


      useEffect(() => {
        api.get("users", {
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
        //   conditionalRowStyles={conditionalRowStyles}
          highlightOnHover
          pagination
        />
    </div>
  )
}

export default UserList