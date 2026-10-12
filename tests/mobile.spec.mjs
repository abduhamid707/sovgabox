import {test,expect} from "@playwright/test";
const pages=[
 {path:"/",title:/His-tuyg‘ular/},
 {path:"/boxes",title:/Tayyor boxlar/},
 {path:"/catalog",title:/Mahsulotlar/},
 {path:"/builder",title:/O‘zing yaratgan/},
 {path:"/cart",title:/Savatcha/},
 {path:"/checkout",title:/Savatchangiz bo‘sh/}
];
async function checkViewport(page,path){
 const metrics=await page.evaluate(()=>({
  viewport:document.documentElement.clientWidth,
  document:document.documentElement.scrollWidth,
  body:document.body.scrollWidth
 }));
 expect(metrics.document, "horizontal overflow on "+path+": "+JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.viewport+2);
 expect(metrics.body,"body horizontal overflow on "+path).toBeLessThanOrEqual(metrics.viewport+2);
}
test.beforeEach(async ({page})=>{
 await page.addInitScript(()=>localStorage.clear());
});
test("all core routes render and fit screen",async ({page},testInfo)=>{
 for(const item of pages){
  await page.goto(item.path);
  await expect(page.getByRole("heading",{name:item.title}).first()).toBeVisible();
  await expect(page.locator("header")).toBeVisible();
  await checkViewport(page,item.path);
  if(item.path==="/boxes"&&testInfo.project.name==="mobile-390"){
   await page.screenshot({path:testInfo.outputPath("boxes-mobile.jpg"),type:"jpeg",quality:72,fullPage:false});
  }
 }
 if(testInfo.project.name==="mobile-390"){
  await page.goto("/");
  await page.screenshot({path:testInfo.outputPath("home-mobile.jpg"),type:"jpeg",quality:72,fullPage:false});
  await page.goto("/builder");
  await expect(page.locator(".gift-stage-premium")).toBeVisible();
  await page.screenshot({path:testInfo.outputPath("gift-studio-mobile.jpg"),type:"jpeg",quality:72,fullPage:false});
 }
});
test("gift builder to cart to demo order works without duplicate transfer",async ({page},testInfo)=>{
 const runtimeErrors=[];
 page.on("pageerror",err=>runtimeErrors.push(err.message));
 await page.goto("/builder");
 await expect(page.locator(".gift-stage-premium")).toBeVisible();
 await page.getByRole("button",{name:"Qutiga qo‘shish",exact:true}).first().click();
 await expect(page.locator(".count-pill")).toHaveText("1 ta");
 await page.getByRole("button",{name:"Yana qo‘shish",exact:true}).first().click();
 await expect(page.locator(".count-pill")).toHaveText("2 ta");
 await page.getByRole("button",{name:"Tabrik yozish"}).click();
 await page.locator("#gift-note").fill("Har kuning quvonchga to‘lsin!");
 await expect(page.locator(".live-note")).toContainText("Har kuning quvonchga to‘lsin!");
 await page.getByRole("button",{name:"Virtual qutini yopish"}).click();
 await expect(page.getByRole("button",{name:"Virtual qutini ochish"})).toBeVisible();
 await page.getByRole("button",{name:"Virtual qutini ochish"}).click();
 if((await page.viewportSize()).width<650){
  await expect(page.locator(".builder-mobile-dock")).toBeVisible();
  await page.locator(".builder-mobile-dock button").click();
 }else{
  await page.locator(".builder-buy-button").click();
 }
 await expect(page).toHaveURL(/\/cart$/);
 await expect(page.locator(".cart-item")).toHaveCount(1);
 await expect(page.locator(".cart-item .qty span")).toHaveText("2");
 await page.getByRole("link",{name:/O‘zing yig‘/}).first().click();
 await expect(page.locator(".count-pill")).toHaveText("0 ta");
 await page.getByRole("link",{name:"Savatcha"}).first().click();
 await expect(page.locator(".cart-item")).toHaveCount(1);
 await page.getByRole("link",{name:/Davom etish/}).click();
 await expect(page).toHaveURL(/\/checkout$/);
 await expect(page.getByRole("heading",{name:/Buyurtmani yakunlaymiz/})).toBeVisible();
 await checkViewport(page,"/checkout with cart");
 if(testInfo.project.name==="mobile-390"){
  await page.screenshot({path:testInfo.outputPath("checkout-mobile.jpg"),type:"jpeg",quality:72,fullPage:false});
 }
 await page.getByPlaceholder("Ismingizni kiriting").fill("Demo User");
 await page.getByPlaceholder("+998 90 123 45 67").fill("+998901234567");
 await page.getByPlaceholder("Shahar, tuman, ko‘cha, uy...").fill("Demo ko‘cha, 1-uy");
 await page.locator(".agree input").check();
 await page.getByRole("button",{name:/Demo buyurtmani saqlash/}).click();
 await expect(page).toHaveURL(/\/success\/SB-/);
 await expect(page.getByText("Demo buyurtma raqami")).toBeVisible();
 await page.getByRole("link",{name:/Buyurtmalarim/}).click();
 await expect(page.locator(".order-card")).toHaveCount(1);
 expect(runtimeErrors).toEqual([]);
 await checkViewport(page,"/orders");
});
test("ready boxes and filters work",async ({page})=>{
 await page.goto("/boxes");
 await expect(page.locator(".box-card")).toHaveCount(6);
 await page.getByRole("button",{name:"Tech",exact:true}).click();
 await expect(page.locator(".box-card")).toHaveCount(1);
 await page.getByRole("link",{name:/Ko‘rish/}).first().click();
 await expect(page).toHaveURL(/\/boxes\/tech$/);
 await page.getByRole("button",{name:/Savatga qo‘shish/}).click();
 await expect(page).toHaveURL(/\/cart$/);
 await expect(page.locator(".cart-item")).toHaveCount(1);
});
