import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import {GlobalStyle} from './pages/GlobalStyle';
import Register from './pages/Register';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Dashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Products from './pages/admin/Products';
import PrivateRoute from './components/Layout/Routes/Private';
import AdminRoute from './components/Layout/Routes/AdminRoute';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/user/Profile';
import UpdateProduct from './pages/admin/UpdateProduct';
import SearchLanding from './pages/SearchLanding';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryList from './pages/CategoryList';
import CartPage from './pages/CartPage';
import Items from './pages/Items';



function App() {

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <>
     <ThemeProvider theme={theme}>
    <ToastContainer/>
    <div>
    <Router>
    <GlobalStyle />
    <Header />
    
    <Routes>
      <Route exact path = '/' element={<HomePage />}/>
      <Route exact path = '/items' element={<Items />} />
      <Route exact path='/product/:slug' element={<ProductDetails/>} />
      <Route exact path='/categories' element={<Categories />} />
      <Route exact path='/cart' element={<CartPage/>} />
      <Route exact path='/category/:slug' element={<CategoryList/>} /> 
      <Route exact path='/search' element={<SearchLanding/>}/>
      <Route exact path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard />} />
        <Route path='user/profile' element={<Profile/>} />
      </Route>
      <Route exact path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/create-category' element={<CreateCategory />} />
        <Route path='admin/create-product' element={<CreateProduct />} />
        <Route path='admin/product/:slug' element={<UpdateProduct/>} />
        <Route path='admin/Products' element={<Products />} />  
      </Route>
      <Route exact path = '/about' element={<About />}/>
      <Route exact path = '/contact' element={<Contact />}/>
      <Route exact path = '*' element={<PageNotFound/>}/>
      <Route exact path = '/register' element={<Register/>}/>
      <Route exact path = '/forgot-password' element={<ForgotPassword/>}/>
      <Route exact path = '/login' element={<Login/>}/>
      </Routes>
    <Footer />
    </Router>
    
  </div>
  </ThemeProvider>
  </>
    
  );
}

export default App;
