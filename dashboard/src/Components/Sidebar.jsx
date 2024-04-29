import React, { useContext, useState } from 'react'
import { Context } from '../main';
import {TiHome} from "react-icons/ti"
import {RiLogoutBoxFill} from "react-icons/ri"
import {AiFillMessage} from "react-icons/ai"
import {GiHamburgerMenu} from "react-icons/gi"
import { FaPersonCirclePlus } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Sidebar = () => {
    const [show , setShow ] = useState(false);

    const {isAuthenticated,setIsAuthenticated} = useContext(Context);

    const navigateTo = useNavigate();

    const gotoHome = () =>{
        navigateTo("/");
        setShow(!show);
    }
    const gotoAddnewAdmin = () =>{
        navigateTo("/admin/addnew");
        setShow(!show);
    }
    const gotoAttorney = () =>{
        navigateTo("/attorney");
        setShow(!show);
    }
    const gotoAddNewAttorney = () =>{
        navigateTo("/attorney/addnew");
        setShow(!show);
    }
    const gotoMessages = () =>{
        navigateTo("/message");
        setShow(!show);
    }

    const handleLogout = async() =>{
      await axios.get("http://localhost:5757/api/v1/user/admin/logout",{
        withCredentials:true,
      })
      .then((res) =>{
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) =>{
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className='sidebar'>
      <nav style={!isAuthenticated ? {display:"none"}:{display:"flex"}} className={show ? "show sidebar":"sidebar"}>
        <div className="links">
            <TiHome onClick={gotoHome}/>
            <FaPersonCirclePlus  onClick={gotoAttorney}/>
            <MdAddModerator onClick={gotoAddnewAdmin}/>
            <IoPersonAddSharp onClick={gotoAddNewAttorney}/>
            <AiFillMessage onClick={gotoMessages}/>
            <RiLogoutBoxFill onClick={handleLogout}/>
        </div>
      </nav>
      
    </div>
  )
}

export default Sidebar
