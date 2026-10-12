import {defineConfig,devices} from "@playwright/test";
export default defineConfig({
 testDir:"./tests",
 timeout:45000,
 expect:{timeout:15000},
 retries:process.env.CI?1:0,
 reporter:process.env.CI?[["list"],["html",{open:"never",outputFolder:"playwright-report"}]]:"list",
 use:{baseURL:"http://127.0.0.1:4173",trace:"retain-on-failure",screenshot:"only-on-failure"},
 projects:[
  {name:"mobile-320",use:{...devices["iPhone SE"],browserName:"chromium",viewport:{width:320,height:690},isMobile:true,hasTouch:true}},
  {name:"mobile-390",use:{...devices["iPhone 13"],browserName:"chromium",viewport:{width:390,height:844},isMobile:true,hasTouch:true}},
  {name:"desktop",use:{browserName:"chromium",viewport:{width:1440,height:900}}},
 ],
 webServer:{command:"npm run dev -- --host 127.0.0.1 --port 4173",url:"http://127.0.0.1:4173",timeout:60000,reuseExistingServer:!process.env.CI}
});