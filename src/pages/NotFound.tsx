import {useState} from "react";
import type * as React from "react";
import {Link,NavLink,useNavigate,useParams} from "react-router-dom";
import {P,B,money,pic} from "../data/catalog";
import {useStore,price,info} from "../store/useStore";
import {Button,Header,BottomNav,Footer,Banner,BoxCard,ProductCard,Title,Empty} from "../components/Storefront";
export default function NotFound(){return <main className="wrap page"><Empty title="Sahifa topilmadi" text="Boshqa sovg‘a g‘oyasini qidirib ko‘ring."/></main>}
