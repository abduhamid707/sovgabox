import {useState} from "react";
import type * as React from "react";
import {Link,NavLink,useNavigate,useParams} from "react-router-dom";
import {ArrowLeft,ShoppingBag,Check,PackageCheck} from "lucide-react";
import {P,B,money,pic} from "../data/catalog";
import {useStore,price,info} from "../store/useStore";
import {Button,Header,BottomNav,Footer,Banner,BoxCard,ProductCard,Title,Empty} from "../components/Storefront";
export default function BoxDetail(){const {id}=useParams();const box=B.find(b=>b.id===id);const add=useStore(s=>s.add);const navigate=useNavigate();if(!box)return <NotFound/>;return <main className="wrap page"><Link to="/boxes" className="back"><ArrowLeft size={16}/> Tayyor boxlar</Link><div className="detail-grid"><div className="detail-photo"><img src={box.image} alt={box.title}/></div><div className="detail-copy"><span className="eyebrow">SOVG‘ABOX KOLLEKSIYASI</span><h1>{box.title}</h1><p>{box.description}</p><h2 className="detail-price">{money(box.price)}</h2><div className="detail-list"><b>Box tarkibida</b>{box.items.map(item=><span key={item}><Check size={16}/> {item}</span>)}</div><div className="notice"><PackageCheck size={21}/> Qadoqlash turi va yetkazib berish tafsilotlari buyurtmadan keyin telefon orqali kelishiladi.</div><Button className="primary wide" onClick={()=>{add("box",box.id);navigate("/cart")}}>Savatga qo‘shish <ShoppingBag size={18}/></Button><p className="demo-disclaimer">* Demo mahsulot va narx. Haqiqiy buyurtma qabul qilinmaydi.</p></div></div></main>}
