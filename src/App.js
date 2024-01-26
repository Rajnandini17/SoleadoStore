import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom";
import Register from './pages/Register';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Dashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import PrivateRoute from './components/Layout/Routes/Private';
import AdminRoute from './components/Layout/Routes/AdminRoute';
import ForgotPassword from './pages/ForgotPassword';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';



function App() {
  return (
    <>
    <ToastContainer/>
    <div>
    <Router>
    <Header />
    <Layout />
    <Routes>
      <Route exact path = '/' element={<HomePage />}/>
      <Route exact path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard />} />
        <Route path='user/orders' element={<Orders/>} />
        <Route path='user/profile' element={<Profile/>} />
      </Route>
      <Route exact path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/create-category' element={<CreateCategory />} />
        <Route path='admin/create-product' element={<CreateProduct />} />
        <Route path='admin/users' element={<Users />} />  
      </Route>
      <Route exact path = '/about' element={<About />}/>
      <Route exact path = '/contact' element={<Contact />}/>
      <Route exact path = '/policy' element={<Policy />}/>
      <Route exact path = '*' element={<PageNotFound/>}/>
      <Route exact path = '/register' element={<Register/>}/>
      <Route exact path = '/forgot-password' element={<ForgotPassword/>}/>
      <Route exact path = '/login' element={<Login/>}/>
      </Routes>
    <Footer />
    </Router>
    
  </div>
  </>
    
  );
}

export default App;
