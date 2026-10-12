import {useState} from "react";
import type {FormEvent} from "react";
import {Link,useNavigate} from "react-router-dom";
import {ArrowLeft,ArrowRight,Check,Gift,MapPin,Phone,ShieldCheck,Truck,UserRound,MessageSquare,Sparkles,PackageCheck} from "lucide-react";
import {money} from "../data/catalog";
import {useStore,price,info} from "../store/useStore";
import {Empty} from "../components/Storefront";
import "./checkout.css";

export default function Checkout(){
 const items=useStore(s=>s.cart);
 const place=useStore(s=>s.place);
 const initialNote=useStore(s=>s.message);
 const navigate=useNavigate();
 const [name,setName]=useState("");
 const [phone,setPhone]=useState("");
 const [address,setAddress]=useState("");
 const [comment,setComment]=useState(initialNote);
 const [ok,setOk]=useState(false);
 const total=items.reduce((sum,item)=>sum+price(item)*item.qty,0);
 if(!items.length)return <main className="wrap page"><Empty title="Savatchangiz bo‘sh" text="Buyurtma uchun oldin sovg‘a tanlang."/></main>;
 const submit=(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  if(!ok||!items.length)return;
  const id="SB-"+Date.now().toString(36).toUpperCase();
  place({
   id,
   name:name.trim(),
   phone:phone.trim(),
   address:address.trim(),
   note:comment,
   items:items.map(item=>({...item})),
   total,
   createdAt:new Date().toISOString()
  });
  navigate("/success/"+id);
 };
 return <main className="wrap page narrow checkout-page checkout-v2">
  <Link to="/cart" className="back"><ArrowLeft size={16}/> Savatchaga qaytish</Link>
  <div className="checkout-steps" aria-label="Buyurtma bosqichlari">
   <span className="step-complete"><span className="checkout-step-number"><Check size={14}/></span> Savatcha</span>
   <span className="step-rule"/>
   <span className="step-current"><span className="checkout-step-number">2</span> Ma’lumotlar</span>
   <span className="step-rule"/>
   <span><span className="checkout-step-number">3</span> Tayyor</span>
  </div>
  <div className="page-intro checkout-intro">
   <span className="eyebrow"><Sparkles size={14}/> HAR BIR SOVG‘A — ALHIDA HIKOYA</span>
   <h1>Buyurtmani <em>yakunlaymiz ♡</em></h1>
   <p>Sovg‘angizni kimga va qayerga yetkazish kerakligini yozing. Qadoqlash va yetkazish tafsilotlarini keyinchalik operator bilan kelishamiz.</p>
  </div>
  <div className="checkout-layout">
   <form onSubmit={submit} className="checkout-form checkout-v2-form">
    <div className="checkout-panel-title"><span className="checkout-panel-icon"><UserRound size={22}/></span><div><h2>Buyurtmachi ma’lumotlari</h2><p>Bir nechta ma’lumot — sovg‘angizga yana bir qadam.</p></div></div>
    <div className="checkout-fields">
     <label>Ismingiz
      <div className="checkout-input-field"><UserRound size={18}/><input required minLength={2} maxLength={80} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Ismingizni kiriting"/></div>
     </label>
     <label>Telefon raqam
      <div className="checkout-input-field"><Phone size={18}/><input required type="tel" pattern="[+0-9 ()-]{9,22}" autoComplete="tel" inputMode="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+998 90 123 45 67"/></div>
     </label>
     <label>Yetkazish manzili
      <div className="checkout-input-field multiline"><MapPin size={18}/><textarea required maxLength={300} rows={3} autoComplete="street-address" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Shahar, tuman, ko‘cha, uy..."/></div>
     </label>
     <label>Tabrik yoki izoh <small>(ixtiyoriy)</small>
      <div className="checkout-input-field multiline"><MessageSquare size={18}/><textarea maxLength={500} rows={3} value={comment} onChange={e=>setComment(e.target.value)} placeholder="Sovg‘angiz uchun tabrik matni..."/></div>
     </label>
    </div>
    <div className="checkout-options">
     <div className="checkout-option"><div className="checkout-option-icon"><Gift size={20}/></div><div><strong>Qadoqlashni birga tanlaymiz</strong><p>Quti, paket yoki mavjud boshqa variantlar telefon orqali kelishiladi. Hozir narxi hisoblanmagan.</p></div></div>
     <div className="checkout-option"><div className="checkout-option-icon"><Truck size={20}/></div><div><strong>Yetkazib berish — Yandex Go orqali</strong><p>Keyinchalik operator buyurtmangiz uchun yetkazish imkoniyati va narxini tasdiqlaydi. Demo buyurtma haqiqiy xizmatni ishga tushirmaydi.</p></div></div>
    </div>
    <label className="agree checkout-v2-agree"><input type="checkbox" checked={ok} onChange={e=>setOk(e.target.checked)}/><span>Bu demo buyurtma ekanini va haqiqiy xarid amalga oshmasligini tushundim.</span></label>
    <button type="submit" className="btn primary wide checkout-v2-submit" disabled={!ok}>Demo buyurtmani saqlash <ArrowRight size={18}/></button>
    <p className="demo-disclaimer checkout-privacy"><ShieldCheck size={15}/> Ushbu testda haqiqiy shaxsiy ma’lumotlaringizni kiritmang. Ma’lumotlar brauzeringizda saqlanadi.</p>
   </form>
   <aside className="summary-card checkout-summary">
    <div className="checkout-summary-header"><div><span className="eyebrow"><PackageCheck size={14}/> SENING SOVG‘ANG</span><h2>Buyurtma tarkibi</h2></div><span>{items.reduce((n,item)=>n+item.qty,0)} ta</span></div>
    <div className="checkout-summary-items">{items.map(item=>{
      const detail=info(item);
      return <div className="checkout-summary-item" key={item.kind+item.id}>
       {detail?<img src={detail.image} alt={"title" in detail?detail.title:detail.name}/>:<span className="checkout-summary-fallback"><Gift size={19}/></span>}
       <div><strong>{detail?("title" in detail?detail.title:detail.name):item.id}</strong><span>{item.kind==="box"?"Tayyor box":"Mahsulot"} · {item.qty} dona</span></div>
       <b>{money(price(item)*item.qty)}</b>
      </div>;
    })}</div>
    <div className="checkout-summary-pricing">
     <div><span>Mahsulotlar jami</span><strong>{money(total)}</strong></div>
     <div><span>Qadoqlash</span><em>Keyin kelishiladi</em></div>
     <div><span>Yetkazish</span><em>Keyin kelishiladi</em></div>
    </div>
    <div className="checkout-summary-total"><span>Mahsulotlar jami</span><strong>{money(total)}</strong></div>
    <div className="checkout-summary-footer"><ShieldCheck size={18}/><span>To‘lov olinmaydi. Bu faqat demo buyurtmani saqlash.</span></div>
   </aside>
  </div>
 </main>;
}
