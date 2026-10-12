import {useState} from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import {ArrowLeft,ArrowRight,Check,Gift,Heart,Minus,Plus,ShoppingBag,Maximize2,X,PackageCheck,Info} from "lucide-react";
import {P,money} from "../data/catalog";
import {useStore} from "../store/useStore";
import {ProductCard} from "../components/Storefront";
import NotFound from "./NotFound";
import "./product-detail.css";

export default function ProductDetail(){
 const {id}=useParams();
 const product=P.find(item=>item.id===id);
 const [qty,setQty]=useState(1);
 const [zoom,setZoom]=useState(false);
 const [notice,setNotice]=useState("");
 const add=useStore(s=>s.add);
 const build=useStore(s=>s.build);
 const favorites=useStore(s=>s.favorites);
 const toggle=useStore(s=>s.toggle);
 const navigate=useNavigate();
 if(!product)return <NotFound/>;
 const isFavorite=favorites.includes("p:"+product.id);
 const suggestions=P.filter(item=>item.id!==product.id&&(item.category===product.category)).concat(P.filter(item=>item.id!==product.id&&item.category!==product.category)).slice(0,4);
 const addCart=()=>{for(let i=0;i<qty;i++)add("product",product.id);navigate("/cart")};
 const addBuilder=()=>{build(product.id,qty);setNotice(qty+" ta "+product.name+" virtual sovg‘aga qo‘shildi")};
 return <main className="wrap page product-detail-page">
  <div className="product-breadcrumb"><Link to="/catalog"><ArrowLeft size={16}/> Mahsulotlar</Link><span>/</span><span>{product.name}</span></div>
  <div className="product-detail-grid">
   <section className="product-gallery" aria-label={product.name+" rasmi"}>
    <div className="product-gallery-main">
     <img src={product.image} alt={product.name}/>
     <span className="product-detail-mock">Demo mahsulot</span>
     <button type="button" className="product-zoom-button" onClick={()=>setZoom(true)} aria-label="Rasmni kattalashtirish"><Maximize2 size={19}/> Kattalashtirish</button>
    </div>
    <div className="product-gallery-footer"><span><Gift size={17}/> Sovg‘aga mos tanlov</span><span>Rasmlar namunaviy</span></div>
   </section>
   <section className="product-detail-information">
    <div className="product-detail-category">{product.category.toUpperCase()}</div>
    <h1>{product.name}</h1>
    <p className="product-detail-subtitle">{product.description}</p>
    <div className="product-detail-price-label">Mahsulot narxi <span>· demo</span></div>
    <strong className="product-detail-price">{money(product.price)}</strong>
    <div className="product-detail-notice"><Info size={17}/> Bu mahsulot, rasm va narx namunaviy. Haqiqiy tovar kelgach texnik ma’lumotlar, mavjudlik va qo‘shimcha suratlar kiritiladi.</div>
    <div className="product-detail-quantity">
     <span>Miqdori</span>
     <div className="qty">
      <button type="button" onClick={()=>setQty(q=>Math.max(1,q-1))} aria-label="Miqdorni kamaytirish"><Minus size={15}/></button>
      <span>{qty}</span>
      <button type="button" onClick={()=>setQty(q=>Math.min(99,q+1))} aria-label="Miqdorni ko‘paytirish"><Plus size={15}/></button>
     </div>
     <span className="product-qty-total">{money(qty*product.price)}</span>
    </div>
    <div className="product-detail-actions">
     <button type="button" className="btn primary" onClick={addCart}><ShoppingBag size={17}/> Savatga qo‘shish</button>
     <button type="button" className="btn outline" onClick={addBuilder}><Gift size={17}/> Sovg‘aga qo‘shish</button>
     <button type="button" className={"product-favorite "+(isFavorite?"liked":"")} onClick={()=>toggle("p:"+product.id)} aria-label={isFavorite?"Sevimlilardan olish":"Sevimlilarga qo‘shish"}><Heart size={19} fill={isFavorite?"currentColor":"none"}/></button>
    </div>
    {notice&&<div className="product-added-notice" role="status"><Check size={18}/><span>{notice}</span><Link to="/builder">Sovg‘ani ko‘rish <ArrowRight size={16}/></Link></div>}
    <div className="product-detail-facts">
     <h2>Mahsulot haqida</h2>
     <p>{product.description}</p>
     <div><PackageCheck size={19}/><span>Haqiqiy qadoqlash turi va narxi keyinchalik operator bilan kelishiladi.</span></div>
     <div><Gift size={19}/><span>Gift Builder’ga qo‘shsangiz, virtual qutida paydo bo‘ladi. Quti sig‘imi cheklanmaydi.</span></div>
    </div>
   </section>
  </div>
  <section className="section product-related"><div className="section-title"><h2>Yana yoqishi mumkin ♡</h2><Link to="/catalog">Barchasi <ArrowRight size={17}/></Link></div><div className="product-grid">{suggestions.map(item=><ProductCard key={item.id} product={item}/>)}</div></section>
  {zoom&&<div className="product-image-modal" role="dialog" aria-modal="true" aria-label={product.name+" katta rasmi"} onMouseDown={e=>{if(e.target===e.currentTarget)setZoom(false)}}>
   <button type="button" className="product-modal-close" onClick={()=>setZoom(false)} aria-label="Yopish"><X size={23}/></button>
   <img src={product.image} alt={product.name}/>
  </div>}
 </main>;
}
