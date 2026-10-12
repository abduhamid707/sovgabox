import {Link} from "react-router-dom";
import {ArrowRight,ArrowLeft,Minus,Plus,Trash2,ShoppingBag,Gift,PackageCheck} from "lucide-react";
import {money} from "../data/catalog";
import {useStore,price,info} from "../store/useStore";
import {Empty} from "../components/Storefront";
import "./cart.css";

export default function Cart(){
 const items=useStore(s=>s.cart);
 const adjust=useStore(s=>s.adjust);
 const clear=useStore(s=>s.clearCart);
 const total=items.reduce((sum,item)=>sum+price(item)*item.qty,0);
 return <main className="wrap page narrow cart-page">
  <div className="page-intro">
   <span className="eyebrow">SENING TANLOVING ♡</span>
   <h1>Savatcha</h1>
   <p>Tanlaganlaring shu yerda. Hammasi ko‘nglingdagidekmi?</p>
  </div>
  {items.length>0?<div className="cart-content">
   <section className="cart-items-section" aria-label="Savatchadagi mahsulotlar">
    <div className="cart-list-heading"><span>{items.reduce((n,x)=>n+x.qty,0)} ta mahsulot</span><button className="clear-btn" type="button" onClick={clear}><Trash2 size={15}/> Tozalash</button></div>
    {items.map(item=>{
     const product=info(item);
     if(!product)return null;
     const label="title" in product?product.title:product.name;
     const href=item.kind==="box"?"/boxes/"+item.id:"/products/"+item.id;
     return <article className="cart-item" key={item.kind+item.id}>
      <Link className="cart-photo-link" to={href} aria-label={label+" haqida batafsil"}>
       <img src={product.image} alt={label} loading="lazy"/>
      </Link>
      <div className="cart-info">
       <span className="cart-type">{item.kind==="box"?"Tayyor box":"Mahsulot"}</span>
       <Link className="cart-product-name" to={href}>{label}</Link>
       <span className="cart-unit-price">{money(price(item))} / dona</span>
       <strong>{money(price(item)*item.qty)}</strong>
      </div>
      <div className="cart-controls">
       <div className="qty" aria-label={label+" miqdori"}>
        <button type="button" onClick={()=>adjust(item.kind,item.id,-1)} aria-label={label+" kamaytirish"}><Minus size={15}/></button>
        <span>{item.qty}</span>
        <button type="button" onClick={()=>adjust(item.kind,item.id,1)} aria-label={label+" ko‘paytirish"}><Plus size={15}/></button>
       </div>
       <button type="button" className="cart-remove" onClick={()=>adjust(item.kind,item.id,-item.qty)} aria-label={label+"ni o‘chirish"}><Trash2 size={15}/></button>
      </div>
     </article>;
    })}
    <Link className="cart-continue" to="/catalog"><ArrowLeft size={16}/> Yana mahsulot tanlash</Link>
   </section>
   <aside className="summary-card cart-summary">
    <h2>Buyurtma xulosasi</h2>
    <div className="summary-line"><span>Mahsulotlar</span><b>{money(total)}</b></div>
    <div className="summary-line"><span>Qadoqlash</span><em>Keyin kelishiladi</em></div>
    <div className="summary-line"><span>Yetkazib berish</span><em>Keyin kelishiladi</em></div>
    <div className="summary-total"><span>Mahsulotlar jami</span><strong>{money(total)}</strong></div>
    <Link className="btn primary wide" to="/checkout">Davom etish <ArrowRight size={18}/></Link>
    <div className="cart-packaging-note"><PackageCheck size={18}/><span>Qadoqlash va yetkazish tafsilotlari operator bilan alohida kelishiladi.</span></div>
    <p className="demo-disclaimer"><Gift size={13}/> Bu demo savatcha. Hozir haqiqiy buyurtma yuborilmaydi.</p>
   </aside>
  </div>:<Empty title="Savatchangiz bo‘sh" text="O‘zingiz yoqtirgan sovg‘alarni tanlab ko‘ring!"/>}
 </main>;
}
