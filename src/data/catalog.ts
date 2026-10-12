export type Product={id:string,name:string,price:number,category:string,image:string,description:string};
export type Box={id:string,title:string,price:number,category:string,image:string,description:string,items:string[],tag?:string};
export const pic=(id:string,w=800)=>"https://images.unsplash.com/"+id+"?auto=format&fit=crop&w="+w+"&q=85";
export const P:Product[]=[
{id:"headphones",name:"Simsiz quloqchin",price:70000,category:"Tech",image:pic("photo-1505740420928-5e560c06d30e"),description:"Har kuningizga musiqa qo‘shadigan qulay quloqchin."},
{id:"wallet",name:"Elegant hamyon",price:60000,category:"Aksessuar",image:pic("photo-1627123424574-724758594e93"),description:"Sodda, nafis, kundalik foydalanishga mos."},
{id:"chocolate",name:"Shokolad to‘plami",price:30000,category:"Shirinlik",image:pic("photo-1549007994-cb92caebd54b"),description:"Shirin lahzalar uchun kichkina e’tibor."},
{id:"card",name:"Tabrik kartasi",price:10000,category:"Aksessuar",image:pic("photo-1513201099705-a9746e1e201f"),description:"Samimiy so‘zlaringiz uchun chiroyli kartochka."},
{id:"candle",name:"Aromali sham",price:50000,category:"Self-care",image:pic("photo-1603006905003-be475563bc59"),description:"Uyga iliqlik va sokinlik olib kiradi."},
{id:"teddy",name:"Yumshoq ayiqcha",price:80000,category:"Sovg‘alar",image:pic("photo-1559454403-b8fb88521f11"),description:"Quchoqlagisi keladigan shirin sovg‘a."},
{id:"mug",name:"Keramik krujka",price:45000,category:"Uy va dekor",image:pic("photo-1514228742587-6b1558fcca3d"),description:"Har bir iliq choyni esda qolarli qiladi."},
{id:"flowers",name:"Gul kompozitsiyasi",price:120000,category:"Uy va dekor",image:pic("photo-1523438885200-e635ba2c371e"),description:"Nafis, quvonch ulashadigan kichik gul."},
{id:"watch",name:"Qo‘l soati",price:120000,category:"Aksessuar",image:pic("photo-1523275335684-37898b6baf30"),description:"Zamonaviy aksessuar."},
{id:"perfume",name:"Atir",price:95000,category:"Self-care",image:pic("photo-1541643600914-78b084683601"),description:"Yoqimli hid va chiroyli taassurot."},
{id:"plant",name:"Mini o‘simlik",price:55000,category:"Uy va dekor",image:pic("photo-1416879595882-3373a0480b5b"),description:"Yashillik va quvonch."},
{id:"notebook",name:"Chiroyli daftar",price:35000,category:"Aksessuar",image:pic("photo-1531346878377-a5be20888e57"),description:"Yangi g‘oyalar va orzular uchun."}
];
export const B:Box[]=[
{id:"selfcare",title:"Self-care Box",price:299000,category:"Self-care",image:pic("photo-1608571423902-eed4a5ad8108"),description:"O‘zingga g‘amxo‘rlik — eng chiroyli sovg‘a.",items:["Aromali sham","Atir","Tabrik kartasi"],tag:"Bestseller"},
{id:"gentleman",title:"Gentleman Box",price:349000,category:"Gentleman",image:pic("photo-1523275335684-37898b6baf30"),description:"Zamonaviy erkaklar uchun maxsus tanlov.",items:["Qo‘l soati","Elegant hamyon","Atir"],tag:"Yangi"},
{id:"birthday",title:"Birthday Box",price:279000,category:"Birthday",image:pic("photo-1513201099705-a9746e1e201f"),description:"Tug‘ilgan kunni unutilmas qiling.",items:["Yumshoq ayiqcha","Shokolad","Tabrik kartasi"],tag:"Mashhur"},
{id:"mini",title:"Mini Box",price:189000,category:"Mini",image:pic("photo-1549465220-1a8b9238cd48"),description:"Kichik sovg‘alar — katta hislar.",items:["Krujka","Shokolad","Tabrik kartasi"],tag:"Sovg‘a g‘oyasi"},
{id:"tech",title:"Tech Box",price:259000,category:"Tech",image:pic("photo-1505740420928-5e560c06d30e"),description:"Texnologiyani yaxshi ko‘radiganlar uchun.",items:["Simsiz quloqchin","Aksessuar","Tabrik kartasi"]},
{id:"cozy",title:"Cozy Moments Box",price:229000,category:"Self-care",image:pic("photo-1493857671505-72967e2e2760"),description:"Har bir lahzani iliqlikka aylantiring.",items:["Aromali sham","Krujka","Shokolad"]}
];

export const money=(n:number)=>n.toLocaleString("uz-UZ")+" so‘m";
