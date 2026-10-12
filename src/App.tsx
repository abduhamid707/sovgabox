import {Routes,Route} from "react-router-dom";
import {Header,Footer,BottomNav} from "./components/Storefront";
import HomePage from "./pages/HomePage";
import BoxesPage from "./pages/BoxesPage";
import BoxDetail from "./pages/BoxDetail";
import CatalogPage from "./pages/CatalogPage";
import Builder from "./pages/Builder";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
export default function App(){return <><div className="demo-bar">🎁 Sovg‘aBox — demo sayt · Mahsulotlar va narxlar namunaviy, haqiqiy buyurtma qabul qilinmaydi</div><Header/><Routes><Route path="/" element={<HomePage/>}/><Route path="/boxes" element={<BoxesPage/>}/><Route path="/boxes/:id" element={<BoxDetail/>}/><Route path="/catalog" element={<CatalogPage/>}/><Route path="/builder" element={<Builder/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/success/:id" element={<Success/>}/><Route path="/favorites" element={<Favorites/>}/><Route path="/orders" element={<Orders/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/><BottomNav/></>}
