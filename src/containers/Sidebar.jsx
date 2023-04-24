import React, { useEffect, useState, useContext } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Menus from "./SidebarData";

// React icons
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


const Sidebar = () => {
  const navigate = useNavigate();
  const { role, setRole } = useContext(AuthContext)


  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
      open: {
        x: 0,
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        x: -250,
        width: 0,
        transition: {
          damping: 40,
          delay: 0.15,
        },
      },
    }
    : {
      open: {
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        width: "4rem",
        transition: {
          damping: 40,
        },
      },
    };




  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "Bold" : "normal",
      // borderBottom: isActive ? "2px solid gree" : "",
      color: isActive ? "#999" : ""
    }
  }


  // logout
  const logout = () => {
    localStorage.clear()
    setRole("")
    navigate("/")

  }


  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${open ? "block" : "hidden"
          } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}

        className=" bg-[#333] text-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3 ">
          <span className="text-3xl font-bold whitespace-pre mx-16">Tendor</span>
        </div>

        <div className="flex flex-col h-full">
         {role && <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[50%] h-[70%]">
            {Menus.map((menu, i) => {
              return (
                <li key={i}>
                  <NavLink to={menu.link} className="flex gap-x-5 my-3 ml-2" style={navLinkStyles}>
                    <div>{React.createElement(menu?.icon, { size: "28" })}</div>
                    <h1 className="font-semibold text-xl"> {menu.name} </h1>
                  </NavLink>
                </li>
              )
            })}
          </ul>}

          <div className="ml-4">
            {!role &&
              <NavLink className="flex gap-x-5 my-3" style={navLinkStyles}>
                <div><AiOutlineUser className="text-3xl" /></div>
                <button> <Link to="/" className='font-semibold text-xl'>Login</Link> </button>
              </NavLink>
            }
            {role &&
              <NavLink className="flex gap-x-5 my-3">
                <div><AiOutlineLogout className="text-3xl" /></div>
                <button onClick={logout}> <Link to="/" className='font-semibold text-xl'>Logout</Link> </button>
              </NavLink>
            }
          </div>
        </div>

        {/* arrow */}
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                x: 0,
                y: 0,
                rotate: 0,
              }
              : {
                x: -0,
                y: -0,
                rotate: 180,
              }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden -right-1 top-6 cursor-pointer"
        >
          <BsFillArrowRightCircleFill size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;