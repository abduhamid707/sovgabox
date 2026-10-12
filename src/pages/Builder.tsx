import {useEffect,useMemo,useRef,useState} from "react";
import type {MouseEvent} from "react";
import {Link,useNavigate} from "react-router-dom";
import {AnimatePresence,motion} from "motion/react";
import {ArrowRight,Check,Gift,Heart,Minus,Plus,Search,ShoppingBag,Sparkles,Trash2,MessageSquare,X,PenLine,PackageCheck} from "lucide-react";
import {P,money} from "../data/catalog";
import type {Product} from "../data/catalog";
import {useStore} from "../store/useStore";
import {Title} from "../components/Storefront";
import VirtualGiftBox from "../components/VirtualGiftBox";
import "./builder.css";

type Flying={id:number,image:string,fromX:number,fromY:number,toX:number,toY:number};
const categories=["Barchasi",...new Set(P.map(p=>p.category))];

export default function Builder(){
  const builder=useStore(s=>s.builder);
  const build=useStore(s=>s.build);
  const clearBuilder=useStore(s=>s.clearBuilder);
  const transferBuilderToCart=useStore(s=>s.transferBuilderToCart);
  const message=useStore(s=>s.message);
  const setMessage=useStore(s=>s.setMessage);
  const navigate=useNavigate();
  const [category,setCategory]=useState("Barchasi");
  const [query,setQuery]=useState("");
  const [isOpen,setIsOpen]=useState(true);
  const [showMessage,setShowMessage]=useState(Boolean(message));
  const [showItems,setShowItems]=useState(false);
  const [footerVisible,setFooterVisible]=useState(false);
  const [flying,setFlying]=useState<Flying[]>([]);
  const [flash,setFlash]=useState("");
  const flightIndex=useRef(0);
  const stageRef=useRef<HTMLDivElement>(null);
  const dockRef=useRef<HTMLDivElement>(null);
  const editorRef=useRef<HTMLTextAreaElement>(null);

  const selected=useMemo(()=>P.filter(product=>(builder[product.id]||0)>0).map(product=>({product,qty:builder[product.id]})),[builder]);
  const count=selected.reduce((sum,entry)=>sum+entry.qty,0);
  const total=selected.reduce((sum,entry)=>sum+entry.qty*entry.product.price,0);
  const available=P.filter(product=>(category==="Barchasi"||product.category===category)&&
    (product.name+" "+product.description).toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(()=>{
    if(!flash)return;
    const timer=window.setTimeout(()=>setFlash(""),2100);
    return ()=>window.clearTimeout(timer);
  },[flash]);

  useEffect(()=>{
    const footer=document.querySelector("footer.footer");
    if(!footer)return;
    const observer=new IntersectionObserver(([entry])=>setFooterVisible(entry.isIntersecting),{threshold:0});
    observer.observe(footer);
    return ()=>observer.disconnect();
  },[]);

  const flyToBox=(product:Product,event:MouseEvent<HTMLButtonElement>)=>{
    const source=event.currentTarget.closest(".builder-catalog-card")?.querySelector("img")||event.currentTarget;
    const from=source.getBoundingClientRect();
    const stage=stageRef.current?.getBoundingClientRect();
    const visible=stage&&stage.bottom>80&&stage.top<window.innerHeight-55;
    const fallback=window.innerWidth<650?{left:10,width:window.innerWidth-20,top:window.innerHeight-135,height:65}:null;
    const target=visible?stage:(dockRef.current?.getBoundingClientRect()||fallback);
    if(!target||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const id=++flightIndex.current;
    setFlying(current=>[...current,{id,image:product.image,
      fromX:from.left+from.width/2-34,fromY:from.top+from.height/2-34,
      toX:target.left+target.width/2-34,toY:target.top+(visible?target.height*.64:target.height/2)-34
    }]);
  };

  const handleAdd=(product:Product,event:MouseEvent<HTMLButtonElement>)=>{
    flyToBox(product,event);
    build(product.id,1);
    setIsOpen(true);
    setFlash(product.name+" qutiga qo‘shildi");
  };
  const finish=()=>{
    if(!count)return;
    transferBuilderToCart();
    navigate("/cart");
  };
  const openEditor=()=>{
    setShowMessage(true);
    window.requestAnimationFrame(()=>editorRef.current?.focus());
  };

  return <main className={"wrap builder-page builder-v2 "+(count?"has-selection":"")}>
    <section className="builder-heading builder-v2-heading">
      <div className="builder-step-indicator"><span>01</span> TANLA <i/> <span>02</span> TABRIK <i/> <span>03</span> BUYURTMA</div>
      <span className="eyebrow"><Sparkles size={15}/> MAXSUS SOVG‘A UCHUN MAXSUS JOY</span>
      <h1>Sovg‘angni <em>o‘zing yig‘ ♡</em></h1>
      <p>Mahsulotlarni tanla — ular virtual sovg‘aga qo‘shiladi. Qadoqni keyin kelishamiz.</p>
    </section>
    <section className="builder-layout builder-v2-layout" aria-label="Sovg‘a konstruktori">
      <div className="builder-preview builder-v2-preview">
        <VirtualGiftBox selected={selected} count={count} message={message} isOpen={isOpen} onToggle={()=>setIsOpen(v=>!v)} stageRef={stageRef}/>
        <div className="preview-tip"><Sparkles size={16}/><span>Mahsulotni pastdan qo‘sh — qutingda paydo bo‘ladi!</span></div>
      </div>
      <div className="builder-selected builder-v2-summary">
        <div className="summary-eyebrow"><Gift size={15}/> SENING BOXING</div>
        <div className="selected-top"><h2>Tanlaganlaring</h2><span className="count-pill">{count} ta</span>{count>0&&<button type="button" className="selection-toggle" aria-expanded={showItems} onClick={()=>setShowItems(open=>!open)}>{showItems?"Yopish":"Ko‘rish"} <ArrowRight size={13}/></button>}</div>
        <p className="builder-summary-sub">Har bir tanlov — alohida e’tibor.</p>
        <AnimatePresence mode="popLayout">
          {selected.length>0?<motion.div key="items" className={"selected-items v2-selected-items "+(!showItems?"builder-collapsed":"") } initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            {selected.map(({product,qty})=>
              <motion.div layout key={product.id} className="selected-item v2-selected-item" initial={{opacity:0,x:14}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
                <img src={product.image} alt={product.name}/>
                <div className="chosen-label"><b>{product.name}</b><small>{money(product.price)}</small></div>
                <div className="qty" aria-label={product.name+" miqdori"}>
                  <button type="button" aria-label={product.name+" kamaytirish"} onClick={()=>build(product.id,-1)}><Minus size={14}/></button>
                  <span aria-live="polite">{qty}</span>
                  <button type="button" aria-label={product.name+" ko‘paytirish"} onClick={()=>build(product.id,1)}><Plus size={14}/></button>
                </div>
                <button className="remove-selected" type="button" aria-label={product.name+"ni olib tashlash"} onClick={()=>build(product.id,-qty)}><X size={14}/></button>
              </motion.div>
            )}
          </motion.div>:<motion.div key="empty" className="selected-empty" initial={{opacity:0}} animate={{opacity:1}}>
            <div className="selected-empty-icon"><Gift size={30}/></div>
            <b>Hali hech narsa tanlanmadi</b>
            <span>Pastdagi mahsulotlarga qarang. Sizga yoqqanini qo‘shing ♡</span>
          </motion.div>}
        </AnimatePresence>
        {count>0&&<button className="clear-builder" type="button" onClick={()=>{clearBuilder();setFlying([]);setFlash("Quti tozalandi")}}><Trash2 size={15}/> Mahsulotlarni tozalash</button>}
        <div className="gift-message-box">
          <div className="gift-message-heading">
            <div className="gift-message-icon"><MessageSquare size={18}/></div>
            <div><b>Tabrik maktubi</b><span>Sovg‘angga iliq so‘zlar qo‘sh</span></div>
            {message.trim()&&<Check size={17} className="message-check"/>}
          </div>
          {showMessage?<><label htmlFor="gift-note" className="sr-only">Tabrik matni</label>
            <textarea id="gift-note" ref={editorRef} maxLength={500} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Sen har doim men uchun qadrlisan... ♡" rows={3} className="gift-message-input"/>
            <div className="gift-message-foot"><span>{message.length}/500 belgi</span><button type="button" onClick={()=>setShowMessage(false)}>Yopish <ChevronRightIcon/></button></div>
          </>:<button type="button" className="gift-add-message" onClick={openEditor}><PenLine size={15}/> {message?"Tabrik matnini tahrirlash":"Tabrik yozish"} <ArrowRight size={14}/></button>}
          {message.trim()&&<div className="message-note-preview"><Heart size={13}/><p>{message}</p></div>}
        </div>
        <div className="builder-total v2-total">
          <div><small>Mahsulotlar jami</small><strong>{money(total)}</strong></div>
          <motion.span key={total} initial={{scale:.7,opacity:.4}} animate={{scale:1,opacity:1}} className="total-heart"><Heart size={19}/></motion.span>
        </div>
        <button type="button" className="btn primary wide builder-buy-button" disabled={!count} onClick={finish}>Savatga o‘tkazish <ShoppingBag size={18}/><ArrowRight size={16}/></button>
        <p className="packaging-hint"><PackageCheck size={16}/> Qadoqlash turi va yetkazish narxi operator bilan keyin kelishiladi. Hozircha demo rejim.</p>
      </div>
    </section>
    <section className="section builder-shop" id="builder-products">
      <div className="builder-shop-top"><Title eyebrow="KICHIK NARSALAR — KATTA HISLAR" title="Boxingga nima qo‘shamiz?"/><span className="shop-count">{available.length} ta mahsulot</span></div>
      <div className="builder-shop-toolbar">
        <div className="catalog-search"><Search size={19}/><input aria-label="Mahsulot qidirish" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Quloqchin, shokolad, krujka..."/></div>
        <div className="filter-row">{categories.map(cat=><button type="button" key={cat} className={"chip "+(cat===category?"selected":"")} onClick={()=>setCategory(cat)} aria-pressed={cat===category}>{cat}</button>)}</div>
      </div>
      {available.length?<div className="product-grid builder-products">
        {available.map(product=><article className="product-card builder-catalog-card" key={product.id}>
          <div className="product-media"><Link to={"/products/"+product.id} aria-label={product.name+" haqida batafsil"}><img src={product.image} alt={product.name} loading="lazy"/></Link>{builder[product.id]>0&&<span className="builder-inbox-label"><Check size={13}/> {builder[product.id]} ta tanlangan</span>}</div>
          <div className="product-body">
            <p className="mini-category">{product.category}</p>
            <h3><Link to={"/products/"+product.id}>{product.name}</Link></h3>
            <strong>{money(product.price)}</strong>
            <Link to={"/products/"+product.id} className="builder-card-detail">Batafsil ko‘rish <ArrowRight size={13}/></Link>
            <button type="button" className={"btn wide "+(builder[product.id]?"builder-again":"soft")} onClick={event=>handleAdd(product,event)}>
              <Plus size={16}/> {builder[product.id]?"Yana qo‘shish":"Qutiga qo‘shish"}
            </button>
          </div>
        </article>)}
      </div>:<div className="empty-builder-results"><Search size={30}/><h3>Mahsulot topilmadi</h3><p>Boshqa so‘z yoki kategoriyani sinab ko‘ring.</p><button className="btn outline" onClick={()=>{setQuery("");setCategory("Barchasi")}}>Filtrlarni tozalash</button></div>}
    </section>
    <AnimatePresence>{flying.map(item=><motion.img
      key={item.id}
      className="gift-flying"
      src={item.image}
      alt=""
      aria-hidden="true"
      initial={{x:item.fromX,y:item.fromY,scale:1,opacity:1,rotate:0}}
      animate={{x:item.toX,y:item.toY,scale:.38,opacity:0,rotate:23}}
      transition={{duration:.75,ease:[.22,.7,.24,1]}}
      onAnimationComplete={()=>setFlying(current=>current.filter(x=>x.id!==item.id))}
    />)}</AnimatePresence>
    <AnimatePresence>{flash&&<motion.div className="builder-toast" role="status" initial={{y:24,opacity:0}} animate={{y:0,opacity:1}} exit={{y:16,opacity:0}}><Check size={16}/>{flash}</motion.div>}</AnimatePresence>
    {count>0&&!footerVisible&&<div className="builder-mobile-dock" ref={dockRef}>
      <div><span>{count} ta sovg‘a</span><strong>{money(total)}</strong></div>
      <button type="button" onClick={finish}>Savatga <ArrowRight size={16}/></button>
    </div>}
  </main>;
}
function ChevronRightIcon(){return <ArrowRight size={15}/>}
