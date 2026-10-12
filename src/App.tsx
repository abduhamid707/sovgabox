import {lazy,Suspense,useLayoutEffect} from "react";
import type {ReactNode} from "react";
import {Route,Routes,useLocation} from "react-router-dom";
import {Header,Footer,BottomNav} from "./components/Storefront";
import HomePage from "./pages/HomePage";

const BoxesPage=lazy(()=>import("./pages/BoxesPage"));
const BoxDetail=lazy(()=>import("./pages/BoxDetail"));
const CatalogPage=lazy(()=>import("./pages/CatalogPage"));
const Builder=lazy(()=>import("./pages/Builder"));
const Cart=lazy(()=>import("./pages/Cart"));
const Checkout=lazy(()=>import("./pages/Checkout"));
const Success=lazy(()=>import("./pages/Success"));
const Favorites=lazy(()=>import("./pages/Favorites"));
const Orders=lazy(()=>import("./pages/Orders"));
const NotFound=lazy(()=>import("./pages/NotFound"));

function ScrollAfterRouteMount({children}:{children:ReactNode}){
  const {pathname}=useLocation();
  // The effect runs after the lazy page commits, not while Suspense shows its fallback.
  useLayoutEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"});},[pathname]);
  return <>{children}</>;
}
function LoadingPage(){
  return <div className="wrap route-loading" role="status" aria-live="polite">
    <div className="route-loading-icon">🎁</div>
    <p>Chiroyli sovg‘alar tayyorlanmoqda...</p>
  </div>;
}
export default function App(){
  return <>
    <div className="demo-bar"><span className="demo-bar-full">🎁 Sovg‘aBox — demo sayt · Mahsulotlar va narxlar namunaviy, haqiqiy buyurtma qabul qilinmaydi</span><span className="demo-bar-small">🎁 Demo rejim · Haqiqiy buyurtma qabul qilinmaydi</span></div>
    <Header/>
    <Suspense fallback={<LoadingPage/>}>
      <ScrollAfterRouteMount><Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/boxes" element={<BoxesPage/>}/>
        <Route path="/boxes/:id" element={<BoxDetail/>}/>
        <Route path="/catalog" element={<CatalogPage/>}/>
        <Route path="/builder" element={<Builder/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/success/:id" element={<Success/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes></ScrollAfterRouteMount>
    </Suspense>
    <Footer/>
    <BottomNav/>
  </>;
}
