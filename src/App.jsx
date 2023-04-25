import './App.css'
import { Route, Routes } from "react-router-dom";
import Layout from './layout/Layout'

import Auth from './Auth'
import CreateTender from './pages/tender/CreateTender'
import TenderList from './pages/tender/TenderList'
import ViewTender from './pages/tender/ViewTender'

import { AuthContext } from './context/AuthContext';
import { useContext } from 'react'
import EditTender from './pages/tender/EditTender';

function App() {

  const { role } = useContext(AuthContext)

  return (
    <>
      <Layout>
        {(!role) &&
          <Routes>
            <Route path="/" element={<Auth />} />
          </Routes>
        }

        {(role == "admin") &&
          <Routes>
            <Route path="/createtender" element={<CreateTender />} />
            <Route path="/tenderlist" element={<TenderList />} />
            <Route path="/viewtender/:id" element={<ViewTender />} />
            <Route path="/edittender/:id" element={<EditTender />} />
          </Routes>
        }
        {(role == "user") &&
          <Routes>
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
