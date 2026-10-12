import {motion,AnimatePresence} from "motion/react";
import {Gift,Heart,Sparkles,PackageOpen,Package} from "lucide-react";
import type {CSSProperties,RefObject} from "react";
import type {Product} from "../data/catalog";

type Entry={product:Product,qty:number};
type Props={
  selected:Entry[];
  count:number;
  message:string;
  isOpen:boolean;
  onToggle:()=>void;
  stageRef:RefObject<HTMLDivElement|null>;
};
const positions=[
  [7,26,-12],[29,7,8],[55,20,-9],[76,8,12],
  [16,55,11],[44,46,-5],[70,54,14],
  [1,5,7],[84,44,-15],[34,71,-8],[60,76,10]
];
export default function VirtualGiftBox({selected,count,message,isOpen,onToggle,stageRef}:Props){
  const images=selected.flatMap(({product,qty})=>
    Array.from({length:Math.min(qty,11)},(_,i)=>({key:product.id+"-"+i,product}))
  ).slice(0,11);
  const rest=Math.max(0,count-images.length);
  return <div ref={stageRef} className="gift-stage gift-stage-premium" aria-label={"Virtual sovg‘a boxi. "+count+" ta mahsulot tanlangan."}>
    <div className="studio-orb studio-orb-one"/>
    <div className="studio-orb studio-orb-two"/>
    <span className="studio-kicker"><Sparkles size={15}/> SOVG‘A SENING DIDINGDA</span>
    <span className="studio-handwriting">A little box,<br/>a lot of love ♡</span>
    <motion.span className="studio-star star-one" animate={{rotate:[0,25,0],scale:[1,1.18,1]}} transition={{duration:4,repeat:Infinity}}><Sparkles size={22}/></motion.span>
    <span className="studio-star star-two">✦</span>
    {message.trim()&&<motion.div className="live-note" initial={{opacity:0,y:12,rotate:0}} animate={{opacity:1,y:0,rotate:6}} aria-label="Tabrik kartasi"><Heart size={15}/><span>{message.length>82?message.slice(0,82)+"…":message}</span><small>with love ♡</small></motion.div>}
    <div className={"gift-art "+(isOpen?"is-open":"is-closed")}>
      <div className="gift-ribbon gift-ribbon-left"/>
      <div className="gift-ribbon gift-ribbon-right"/>
      <div className="gift-interior">
        <div className="gift-paper"/>
        <AnimatePresence>
          {isOpen&&images.map(({key,product},i)=>{
            const [left,top,rotate]=positions[i];
            return <motion.img
              key={key}
              className="gift-thumbnail"
              src={product.image}
              alt={product.name}
              title={product.name}
              style={{left:left+"%",top:top+"%"} as CSSProperties}
              initial={{opacity:0,y:-88,scale:.25,rotate:-25}}
              animate={{opacity:1,y:0,scale:1,rotate}}
              exit={{opacity:0,y:-40,scale:.15}}
              transition={{type:"spring",stiffness:220,damping:18}}
            />;
          })}
        </AnimatePresence>
        {isOpen&&rest>0&&<motion.span key={rest} initial={{scale:.3}} animate={{scale:1}} className="gift-overflow">+{rest}</motion.span>}
        {isOpen&&count===0&&<div className="gift-empty"><Sparkles size={28}/><span>Bu yerda sening<br/>sovg‘ang paydo bo‘ladi</span></div>}
      </div>
      <motion.div className="gift-lid" style={{transformOrigin:"50% 100%"}} animate={{rotateX:isOpen?-66:0,y:isOpen?-75:0}} transition={{type:"spring",stiffness:120,damping:18}}>
        <span className="lid-vertical"/><span className="lid-horizontal"/>
        <span className="lid-emblem"><Gift size={19}/></span>
      </motion.div>
      <div className="gift-face">
        <span className="face-ribbon"/>
        <span className="face-logo">Sovg‘aBox</span>
        <span className="face-subtitle">a gift from the heart ♡</span>
      </div>
    </div>
    <div className="studio-bottom">
      <span><Heart size={14}/> Mehr bilan yaratilmoqda</span>
      <button type="button" onClick={onToggle} aria-pressed={isOpen} aria-label={isOpen?"Virtual qutini yopish":"Virtual qutini ochish"}>
        {isOpen?<Package size={16}/>:<PackageOpen size={16}/>} {isOpen?"Qutini yopish":"Qutini ochish"}
      </button>
    </div>
    <span className="studio-notice">Virtual ko‘rinish · Haqiqiy qadoq keyin kelishiladi</span>
  </div>
}
