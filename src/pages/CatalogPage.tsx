import {useState} from "react";
import type * as React from "react";
import {Link,NavLink,useNavigate,useParams} from "react-router-dom";
import {Search} from "lucide-react";
import {P,B,money,pic} from "../data/catalog";
import {useStore,price,info} from "../store/useStore";
import {Button,Header,BottomNav,Footer,Banner,BoxCard,ProductCard,Title,Empty} from "../components/Storefront";
export default function CatalogPage(){const [cat,setCat]=useState("Barchasi"),[query,setQuery]=useState("");const categories=["Barchasi",...new Set(P.map(p=>p.category))];const list=P.filter(p=>(cat==="Barchasi"||cat===p.category)&&p.name.toLowerCase().includes(query.toLowerCase()));return <main className="wrap page"><div className="page-intro"><span className="eyebrow">SOVG‘ANGGA MOS NARSALAR</span><h1>Mahsulotlar</h1><p>Mehr bilan tanlash uchun kichik va chiroyli narsalar.</p></div><div className="catalog-search"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Mahsulot qidirish..."/></div><div className="filter-row">{categories.map(c=><button key={c} className={"chip "+(cat===c?"selected":"")} onClick={()=>setCat(c)}>{c}</button>)}</div><div className="product-grid">{list.map(p=><ProductCard key={p.id} product={p}/>)}</div>{!list.length&&<Empty title="Mahsulot topilmadi" text="Filtrlarni o‘zgartirib ko‘ring."/>}</main>}
