// import { MdOutlineDashboard } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";

const SidebarData = [
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
    "name": "View Tender",
    "link": "/viewtender",
    "icon": HiOutlineViewGridAdd
  },

  // {
  //   "name": "Login",
  //   "link": "/",
  //   "icon": MdOutlineDashboard
  // },
];

export default SidebarData