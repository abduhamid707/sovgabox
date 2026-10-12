import {useState} from "react";
import type * as React from "react";
import {Link,NavLink,useNavigate,useParams} from "react-router-dom";
import {Search} from "lucide-react";
import {P,B,money,pic} from "../data/catalog";
import {useStore,price,info} from "../store/useStore";
import {Button,Header,BottomNav,Footer,Banner,BoxCard,ProductCard,Title,Empty} from "../components/Storefront";
export default function BoxesPage(){const initial=new URLSearchParams(window.location.search).get("category")||"Barchasi";const [category,setCategory]=useState(initial),[search,setSearch]=useState("");const cats=["Barchasi","Tech","Self-care","Birthday","Mini","Gentleman"];const filtered=B.filter(b=>(category==="Barchasi"||b.category===category)&&[b.title,b.description,...b.items].join(" ").toLowerCase().includes(search.toLowerCase()));return <main className="wrap page"><div className="page-intro"><span className="eyebrow">HAR BIR BOX — ALOHIDA HIKOYA ♡</span><h1>Tayyor boxlar</h1><p>Mehr bilan tanlangan, kutilmagan quvonchlarga to‘la to‘plamlar.</p></div><div className="filter-row">{cats.map(c=><button key={c} className={"chip "+(category===c?"selected":"")} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="catalog-search"><Search size={19}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Box, mavzu yoki holat bo‘yicha qidiring..."/></div>{filtered.length?<div className="box-grid">{filtered.map(b=><BoxCard key={b.id} box={b}/>)}</div>:<Empty title="Box topilmadi" text="Boshqa so‘z yoki kategoriya bilan qidiring."/>}</main>}
