import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import ContactUs from "./ContactUs";
import Home from "./Home";
import NonVeg from "./NonVeg";
import PurchaseHistory from "./PurchaseHistory";
import Veg from "./Veg";
import './App.css' 
import { useSelector } from "react-redux";
import Snacks from "./Snacks";
import { FaCarrot, FaCartArrowDown, FaCartPlus, FaHome } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { MdContactMail } from "react-icons/md";
import { TiArrowMaximiseOutline } from "react-icons/ti";
import GoogleLoginComponent from "./GoogleLohinComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLoginComponent from "./FacebookLoginComponent";
import ReactFacebookLogin from "react-facebook-login";
import GitHubLoginComponent from "./GithubLoginComponent";


function App()
{
  const cart=useSelector((state) => state.cart);
 const totalItems=cart.reduce((sum,item) => sum+item.quantity,0);

 
  return(
    <>
    {/* <ReactFacebookLogin appId="811556444338098" /> */}
  <GoogleOAuthProvider clientId="145843774954-iu4e0q7p9vto3v7ehnt7p6pm7gq6abus.apps.googleusercontent.com" >
  <GoogleLoginComponent />
  </GoogleOAuthProvider>
  <GitHubLoginComponent />
    <FacebookLoginComponent />
 
   <BrowserRouter>
   <nav>
   <Link to="/home"> <FaHome /> Home </Link>
   <Link to="/veg"> <FaCarrot />Veg Items </Link>
   <Link to="/nonVeg"> <GiChickenOven /> Non-Veg Items</Link>
   <Link to="/snacks"> <TiArrowMaximiseOutline />Snacks</Link>
   <Link to="/cart"> <FaCartPlus />Cart Items{totalItems}</Link>
   <Link to="/purchaseHistory"> <BiSolidPurchaseTag /> Purchase History </Link>
   <Link to="/aboutUs"> <FcAbout /> AboutUs </Link>
   <Link to="/contactUs">  <MdContactMail />ContactUs </Link>
   </nav>
    
   
    <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/veg" element={<Veg/>}/>
          <Route path="/nonVeg" element={<NonVeg/>}/>
          <Route path="/snacks" element={<Snacks/>}/>
           <Route path="/cart" element={<Cart/>}/>
           <Route path="/purchaseHistory" element={<PurchaseHistory/>}/>
            <Route path="/aboutUs" element={<AboutUs/>}/>
            <Route path="/contactUs" element={<ContactUs/>}/>
      </Routes>
      
   
   </BrowserRouter>
  
    </>
  )
}
export default App;