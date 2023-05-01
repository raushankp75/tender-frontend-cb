// import { MdOutlineDashboard } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { FiUserPlus, FiUsers } from "react-icons/fi";

import { HiOutlineViewGridAdd } from "react-icons/hi";

const role = localStorage.getItem("role")

let SidebarData = []

console.log(role);

if(role=="admin"){
 SidebarData = [
  {
    "name": "Tender List",
    "link": "/tenderlist",
    "icon": FaList
  },
  {
    "name": "Create Tender",
    "link": "/createtender",
    "icon": IoIosCreate
  },
  {
    "name": "Add User",
    "link": "/adduser",
    "icon": FiUserPlus
  },
  {
    "name": "All User",
    "link": "/allusers",
    "icon": FiUsers
  }
];
}


if(role=="user"){
  SidebarData = [
   
   {
     "name": "Tender List",
     "link": "/tenderlist",
     "icon": FaList
   },
   {
     "name": "Create Tender",
     "link": "/createtender",
     "icon": IoIosCreate
   }
 ];
 }

export default SidebarData