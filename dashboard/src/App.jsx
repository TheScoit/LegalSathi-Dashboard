import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import  Dashboard  from '../src/Components/Dashboard';
import  AddnewAttorney  from '../src/Components/AddnewAttorney';
import  AddnewAdmin from '../src/Components/AddnewAdmin';
import  Attorneys from '../src/Components/Attorneys';
import  Login  from '../src/Components/Login';
import  Message  from '../src/Components/Message';
import  Sidebar  from '../src/Components/Sidebar';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { Context} from './main'
import axios from 'axios'


function App() {

  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context);

  useEffect(() =>{
  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5757/api/v1/user/admin/me', {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
  setIsAuthenticated(false);
  setUser({});
    }
  };
  fetchUser();
}, [isAuthenticated]);

  return (

    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/admin/addnew' element={<AddnewAdmin/>}/>
          <Route path='/attorney/addnew' element={<AddnewAttorney/>}/>
          <Route path='/attorney' element={<Attorneys/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/message' element={<Message/>}/>     
        </Routes>
      <ToastContainer position='top-right' theme='dark' transition={Bounce} />
      </Router>
    </>
  )
}

export default App
