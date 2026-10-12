import {create} from "zustand";
import {persist} from "zustand/middleware";
import {P,B} from "../data/catalog";
export type CartItem={kind:"box"|"product",id:string,qty:number};
export type Order={id:string,name:string,phone:string,address:string,note:string,items:CartItem[],total:number,createdAt:string};
type State={cart:CartItem[],builder:Record<string,number>,favorites:string[],message:string,orders:Order[],add:(kind:"box"|"product",id:string)=>void,adjust:(kind:"box"|"product",id:string,delta:number)=>void,build:(id:string,delta:number)=>void,clearBuilder:()=>void,transferBuilderToCart:()=>void,toggle:(id:string)=>void,setMessage:(s:string)=>void,place:(o:Order)=>void,clearCart:()=>void};
export const useStore=create<State>()(persist((set)=>({cart:[],builder:{},favorites:[],message:"",orders:[],add:(kind,id)=>set(s=>{const existing=s.cart.find(x=>x.kind===kind&&x.id===id);return{cart:existing?s.cart.map(x=>x===existing?{...x,qty:x.qty+1}:x):[...s.cart,{kind,id,qty:1}]}}),adjust:(kind,id,delta)=>set(s=>({cart:s.cart.map(x=>x.kind===kind&&x.id===id?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0)})),build:(id,delta)=>set(s=>{const qty=Math.max(0,(s.builder[id]||0)+delta);const builder={...s.builder};if(!qty)delete builder[id];else builder[id]=qty;return{builder}}),clearBuilder:()=>set({builder:{}}),transferBuilderToCart:()=>set(s=>{
  const cart=s.cart.map(item=>({...item}));
  Object.entries(s.builder).forEach(([id,qty])=>{
    if(qty<=0||!P.some(product=>product.id===id))return;
    const existing=cart.find(item=>item.kind==="product"&&item.id===id);
    if(existing)existing.qty+=qty;else cart.push({kind:"product",id,qty});
  });
  return {cart,builder:{}};
}),toggle:id=>set(s=>({favorites:s.favorites.includes(id)?s.favorites.filter(x=>x!==id):[...s.favorites,id]})),setMessage:message=>set({message}),place:o=>set(s=>({orders:[o,...s.orders],cart:[],builder:{},message:""})),clearCart:()=>set({cart:[]})}),{name:"sovgabox-demo-v1"}));
export const price=(x:CartItem)=>x.kind==="box"?B.find(z=>z.id===x.id)?.price||0:P.find(z=>z.id===x.id)?.price||0;
export const info=(x:CartItem)=>x.kind==="box"?B.find(z=>z.id===x.id):P.find(z=>z.id===x.id);
