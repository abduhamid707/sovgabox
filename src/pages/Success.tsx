import {useState} from "react";
import type * as React from "react";
import {Link,NavLink,useNavigate,useParams} from "react-router-dom";
import {ArrowRight,Check,Copy} from "lucide-react";
import {P,B,money,pic} from "../data/catalog";
import {useStore,price,info} from "../store/useStore";
import {Button,Header,BottomNav,Footer,Banner,BoxCard,ProductCard,Title,Empty} from "../components/Storefront";
export default function Success(){const {id}=useParams();return <main className="wrap page narrow"><div className="success-card"><span className="success-icon"><Check size={45}/></span><span className="eyebrow">DEMO BUYURTMA</span><h1>Sovg‘angiz tayyorlanishga bir qadam yaqin ♡</h1><p>Demo buyurtma brauzeringizda saqlandi. Operatorga hech qanday ma’lumot yuborilmadi va haqiqiy buyurtma yaratilgani yo‘q.</p><div className="order-number"><span>Demo buyurtma raqami</span><b>{id}</b><button onClick={()=>navigator.clipboard?.writeText(id||"")} aria-label="Nusxalash"><Copy size={17}/></button></div><div className="success-actions"><Link to="/orders" className="btn outline">Buyurtmalarim</Link><Link to="/" className="btn primary">Bosh sahifa <ArrowRight size={17}/></Link></div></div></main>}
