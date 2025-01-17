import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from './layout/Layout'

import Auth from './Auth'
import CreateTender from './pages/tender/CreateTender'
import TenderList from './pages/tender/TenderList'
import ViewTender from './pages/tender/ViewTender'

import { AuthContext } from './context/AuthContext';
import { useContext, useState, useEffect } from 'react'
import EditTender from './pages/tender/EditTender';
import axios from 'axios';
import AddUser from './pages/user/AddUser';
import UserList from './pages/user/UserList';

function App() {

  const { role } = useContext(AuthContext)

  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  const [expDate, setExpDate] = useState(localStorage.getItem('expDate'));
  // console.log(expDate, 21)
  // console.log(localStorage.getItem('expDate'))
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      // console.log(now, 28)

      if (now > expDate - 5 * 60 * 1000) {
        console.log("refresh token sent 5 min before token expiry")
        axios.post('http://localhost:3000/auth/refreshToken', { refreshToken }, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        })
          .then((res) => {

            setExpDate(res.data.expDate);
            try {
              localStorage.setItem('expDate', res.data.expDate);
            } catch (err) {
              console.log("localStorage error:", err);
            }
          })
          .catch((err) => {
            console.log("refresh token error:", err);
          });
      }

    }, 300000); // refresh the token every 5 minutes (300000 milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Layout>
        {(!role) &&
          <Routes>
            {/* <Route path="/" element={<Auth />} /> */}
            <Route path="*" element={<Auth />} />
          </Routes>
        }

        {(role == "admin") &&
          <Routes>
            <Route path="/" element={<Navigate to="/tenderlist" />} />
            <Route path="/createtender" element={<CreateTender />} />
            <Route path="/tenderlist" element={<TenderList />} />
            <Route path="/viewtender/:id" element={<ViewTender />} />
            <Route path="/edittender/:id" element={<EditTender />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/allusers" element={<UserList />} />
          </Routes>
        }
        {(role == "user") &&
          <Routes>
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/" element={<Navigate to="/tenderlist" />} />
            <Route path="/createtender" element={<CreateTender />} />
            <Route path="/tenderlist" element={<TenderList />} />
            <Route path="/viewtender/:id" element={<ViewTender />} />
            <Route path="/edittender/:id" element={<EditTender />} />
          </Routes>
        }
      </Layout>
    </>
  )
}

export default App
