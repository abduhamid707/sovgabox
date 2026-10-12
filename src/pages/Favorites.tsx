import {useState} from "react";
import type * as React from "react";
import {Link,NavLink,useNavigate,useParams} from "react-router-dom";
import {P,B,money,pic} from "../data/catalog";
import {useStore,price,info} from "../store/useStore";
import {Button,Header,BottomNav,Footer,Banner,BoxCard,ProductCard,Title,Empty} from "../components/Storefront";
export default function Favorites(){const fav=useStore(s=>s.favorites);const bs=B.filter(b=>fav.includes("b:"+b.id));const ps=P.filter(p=>fav.includes("p:"+p.id));return <main className="wrap page"><div className="page-intro"><span className="eyebrow">YURAKDAN TANLANGAN ♡</span><h1>Sevimlilar</h1><p>O‘zingizga yoqqan sovg‘alarni shu yerdan topasiz.</p></div>{!bs.length&&!ps.length?<Empty title="Sevimlilar hozircha bo‘sh" text="Yurakchani bosib, eng yoqqan sovg‘alarni saqlang."/>:<>{bs.length>0&&<><Title title="Sevimli boxlar"/><div className="box-grid">{bs.map(b=><BoxCard key={b.id} box={b}/>)}</div></>}{ps.length>0&&<section className="section"><Title title="Sevimli mahsulotlar"/><div className="product-grid">{ps.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>}</>}</main>}
