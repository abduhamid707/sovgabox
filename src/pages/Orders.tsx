import {useState} from "react";
import type * as React from "react";
import {Link,NavLink,useNavigate,useParams} from "react-router-dom";
import {P,B,money,pic} from "../data/catalog";
import {useStore,price,info} from "../store/useStore";
import {Button,Header,BottomNav,Footer,Banner,BoxCard,ProductCard,Title,Empty} from "../components/Storefront";
export default function Orders(){const orders=useStore(s=>s.orders);return <main className="wrap page narrow"><div className="page-intro"><span className="eyebrow">SOVG‘ABOX DEMO</span><h1>Buyurtmalarim</h1><p>Bu yerdagi buyurtmalar faqat shu brauzerda saqlanadi.</p></div>{orders.length?orders.map(o=><article className="order-card" key={o.id}><div><b>{o.id}</b><span>{new Date(o.createdAt).toLocaleString("uz-UZ")}</span></div><div><span>{o.items.reduce((n,x)=>n+x.qty,0)} ta mahsulot · Demo saqlangan</span><strong>{money(o.total)}</strong></div></article>):<Empty title="Hozircha buyurtmalar yo‘q" text="Birinchi sovg‘angizni yig‘ing!"/>}</main>}
