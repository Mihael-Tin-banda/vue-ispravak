(function(){"use strict";var e={2052:function(e,t,o){var r=o(5130),s=o(6768);function n(e,t,o,r,n,a){const l=(0,s.g2)("router-view");return(0,s.uX)(),(0,s.Wv)(l)}var a=o(782),l={name:"App",setup(){const e=(0,a.Pj)(),t=(0,s.EW)((()=>e.state.coins)),o=(0,s.EW)((()=>e.state.user)),r=t=>{e.commit("updateCoins",t)};return{coins:t,user:o,updateUserCoins:r}}},i=o(1241);const c=(0,i.A)(l,[["render",n]]);var d=c,u=o(1387),p=o(4232);const m=e=>((0,s.Qi)("data-v-70df79e5"),e=e(),(0,s.jt)(),e),v=m((()=>(0,s.Lk)("div",null,null,-1))),b={class:"flex md:flex-row flex-col justify-between items-center relative mb-4 mt-2"},f={class:"flex flex-col md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2"},h=m((()=>(0,s.Lk)("label",{for:"ballCost",class:"border-color border-2 p-2 border-dashed"},"Ulog po loptici:",-1))),g={id:"coinDisplay",class:"border-color border-2 p-2 border-dashed"},k=m((()=>(0,s.Lk)("div",{id:"gameContent",class:"flex justify-center items-center"},null,-1)));function y(e,t,o,n,a,l){const i=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)(s.FK,null,[v,(0,s.Lk)("div",b,[(0,s.bF)(i,{to:"/",class:"border-color border-2 p-2 border-dashed ml-2 hover:bg-red-500"},{default:(0,s.k6)((()=>[(0,s.eW)("Go back")])),_:1}),(0,s.Lk)("div",f,[h,(0,s.bo)((0,s.Lk)("input",{type:"number","onUpdate:modelValue":t[0]||(t[0]=e=>n.ballCost=e),id:"ballCost",value:"1",step:"0.1",min:"0.1",class:"focus:outline-0 md:border-t-2 md:border-b-2 md:border-l-0 md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center"},null,512),[[r.Jo,n.ballCost,void 0,{number:!0}]]),(0,s.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>n.onLaunchClick&&n.onLaunchClick(...e)),onMousedown:t[2]||(t[2]=(...e)=>n.onLaunchMouseDown&&n.onLaunchMouseDown(...e)),onMouseup:t[3]||(t[3]=(...e)=>n.onLaunchMouseUp&&n.onLaunchMouseUp(...e)),onMouseleave:t[4]||(t[4]=(...e)=>n.onLaunchMouseUp&&n.onLaunchMouseUp(...e)),id:"launchBall",class:"border-color border-2 p-2 border-dashed hover:bg-red-500"},"Launch Balls",32)]),(0,s.Lk)("p",g,"Coins: "+(0,p.v_)(n.coins)+" KK",1)]),k],64)}o(4114);var x=o(144),w=o(4501),L=o.n(w),C={name:"PachinkoPage",setup(){const e=(0,a.Pj)(),t=(0,x.KR)(e.state.coins),o=()=>{t.value=parseFloat(parseFloat(t.value).toFixed(2)),e.commit("updateCoins",t.value)},r=(0,x.KR)(1),n=(0,x.KR)(null);let l,i,c,d;const u=[],p=[],m=[],v=()=>{const e=document.getElementById("gameContent");l=L().Engine.create({gravity:{x:0,y:1}}),i=L().Render.create({element:e,engine:l,options:{width:800,height:600,wireframes:!1,background:"#18181d"}}),c=L().Runner.create(),L().Runner.run(c,l);const s={isStatic:!0,restitution:.8,render:{fillStyle:"#fff"}},a=L().Bodies.rectangle(i.canvas.width/2,0,i.canvas.width,5,s),d=L().Bodies.rectangle(i.canvas.width/2,i.canvas.height,i.canvas.width,5,s),v=L().Bodies.rectangle(0,i.canvas.height/2,5,i.canvas.height,s),b=L().Bodies.rectangle(i.canvas.width,i.canvas.height/2,5,i.canvas.height,s);L().World.add(l.world,[a,d,v,b]);const f=[{x:i.canvas.width/2-25,y:95},{x:i.canvas.width/2,y:85},{x:i.canvas.width/2+25,y:95}];n.value=L().Bodies.fromVertices(i.canvas.width/2,50,f,{isStatic:!0,render:{fillStyle:"transparent"}}),L().World.add(l.world,n.value);const h=10,g=42,k=11,y=23,x=n.value.position.y+n.value.bounds.max.y+.2*g;for(let t=0;t<k;t++){const e=(i.canvas.width-y*g)/2+t%2*g/2;for(let o=0;o<y;o++){const r=e+o*g,s=x+t*g,n=L().Bodies.circle(r,s,h,{isStatic:!0,restitution:.4,render:{fillStyle:"transparent",strokeStyle:"#f7fff7",lineWidth:4}});m.push(n),L().World.add(l.world,n)}}const w=m.pop();L().World.remove(l.world,w),L().Events.on(l,"afterUpdate",(()=>{for(let e of m)L().Body.applyForce(e,{x:0,y:0},{x:.05,y:0})}));const C=9,A=i.canvas.width/C,B=20,F=4,_=i.canvas.height-B/2;for(let t=0;t<C;t++){let e;e=t===Math.floor(C/2)?.4:t===Math.floor(C/2)-1||t===Math.floor(C/2)+1?.8:t===Math.floor(C/2)-2||t===Math.floor(C/2)+2?1.4:t===Math.floor(C/2)-3||t===Math.floor(C/2)+3?2.2:15;const o=L().Bodies.rectangle(t*A+A/2,_,A-F,B,{isStatic:!0,label:"section"+(t+1)+" - multiplier: "+e,coins:e,render:{fillStyle:"transparent"}});if(p.push(o),t>0){const e=L().Bodies.rectangle(t*A-F/2,_,F,1.3*B,{isStatic:!0,restitution:1,label:"border",render:{fillStyle:"#f55"}});p.push(e)}if(t<C-1){const e=L().Bodies.rectangle((t+1)*A-F/2,_,F,1.3*B,{isStatic:!0,restitution:1,label:"border",render:{fillStyle:"#f55"}});p.push(e)}}L().World.add(l.world,p),L().Events.on(l,"collisionStart",(e=>{const s=e.pairs;for(const n of s){if(n.bodyA===v&&u.includes(n.bodyB)||n.bodyB===v&&u.includes(n.bodyA)){const e=u.includes(n.bodyB)?n.bodyB:n.bodyA;L().Body.setVelocity(e,{x:2,y:e.velocity.y})}else if(n.bodyA===b&&u.includes(n.bodyB)||n.bodyB===b&&u.includes(n.bodyA)){const e=u.includes(n.bodyB)?n.bodyB:n.bodyA;L().Body.setVelocity(e,{x:-2,y:e.velocity.y})}for(let e=0;e<u.length;e++){const s=u[e];if(n.bodyA===s&&p.includes(n.bodyB)||n.bodyB===s&&p.includes(n.bodyA)){const a=p.includes(n.bodyB)?n.bodyB:n.bodyA;L().World.remove(l.world,s),u.splice(e,1),void 0!==a.coins&&(t.value+=a.coins*r.value,o())}}}})),L().Render.run(i),L().Events.on(i,"afterRender",(function(){i.context.font="1rem Cutive Mono",i.context.fillStyle="white",i.context.textAlign="center",i.context.textBaseline="middle",p.forEach((e=>{void 0!==e.coins&&i.context.fillText(`${e.coins}`,e.position.x,e.position.y)}))})),o()},b=()=>{const e=1;for(let s=0;s<e;s++)if(t.value>r.value){t.value-=r.value,o();const e=100,s=n.value.position.x-e/1.2+Math.random()*e,a=L().Bodies.circle(s,n.value.position.y,10,{restitution:.6,friction:0,render:{fillStyle:"#f55"}});L().World.add(l.world,a),u.push(a),L().Body.applyForce(a,a.position,{x:0,y:-.005})}},f=()=>{const e=r.value;e<0||b(e)},h=()=>{const e=r.value;e<0||(d=setInterval(b,300))},g=()=>{const e=r.value;e<0||clearInterval(d)};return(0,s.sV)((()=>{v()})),{ballCost:r,coins:t,onLaunchClick:f,onLaunchMouseDown:h,onLaunchMouseUp:g}},mounted(){document.body.classList.add("pachinko-page")},beforeUnmount(){document.body.classList.remove("pachinko-page")}};const A=(0,i.A)(C,[["render",y],["__scopeId","data-v-70df79e5"]]);var B=A;const F={class:"flex md:flex-row flex-col justify-between items-center relative mt-2"},_={class:"flex flex-col md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2"},S={id:"multiply",class:"border-color border-2 p-2 border-dashed"},K={id:"coinDisplay",class:"border-color border-2 p-2 border-dashed"},R={class:"flex justify-center items-center mt-12"},M={id:"minefield",class:"flex flex-wrap",style:{width:"26rem"}},j=["onClick"],E={class:"flex justify-center items-center mt-12"},I={key:0,id:"timer",class:"border-color border-2 p-2 border-dashed"};function T(e,t,o,n,a,l){const i=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",null,[(0,s.Lk)("div",F,[(0,s.bF)(i,{to:"/",class:"border-color border-2 p-2 border-dashed ml-2 hover:bg-red-500"},{default:(0,s.k6)((()=>[(0,s.eW)("Go back")])),_:1}),(0,s.Lk)("div",_,[(0,s.Lk)("p",S,"Multiply: "+(0,p.v_)(n.multiply.toFixed(1)),1),(0,s.bo)((0,s.Lk)("input",{type:"number",id:"betInput",min:"0.1",step:"0.1","onUpdate:modelValue":t[0]||(t[0]=e=>n.betValue=e),class:"focus:outline-0 md:border-t-2 md:border-b-2 md:border-l-0 md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center"},null,512),[[r.Jo,n.betValue]]),n.gameActive?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("button",{key:0,id:"placeBetButton",class:"border-color border-2 p-2 border-dashed hover:bg-red-500",onClick:t[1]||(t[1]=(...e)=>n.placeBet&&n.placeBet(...e))},"Place Bet")),n.gameActive?((0,s.uX)(),(0,s.CE)("button",{key:1,id:"withdrawButton",class:"border-color border-2 p-2 border-dashed hover:bg-red-500",onClick:t[2]||(t[2]=(...e)=>n.withdraw&&n.withdraw(...e))},"Withdraw")):(0,s.Q3)("",!0)]),(0,s.Lk)("p",K,"Coins: "+(0,p.v_)(n.coins)+" KK",1)]),(0,s.Lk)("div",R,[(0,s.Lk)("div",M,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(n.mines,((e,t)=>((0,s.uX)(),(0,s.CE)("div",{key:t,class:(0,p.C4)(["h-16 w-16 border-2 border-dashed border-color hover:bg-red-800 m-0.5",{"bg-gray-500":n.selectedSquares[t]}]),onClick:e=>n.clickSquare(t)},null,10,j)))),128))])]),(0,s.Lk)("div",E,[n.gameActive?((0,s.uX)(),(0,s.CE)("p",I,"Time remaining: "+(0,p.v_)(n.timeRemaining)+"s",1)):(0,s.Q3)("",!0)])])}var P=o(6400),U=o(114),W=o(7617);const N={apiKey:"AIzaSyCa_Fi6DH0r0Eg-dytRD2Q-Psv705K-Vgk",authDomain:"steps-da687.firebaseapp.com",projectId:"steps-da687",storageBucket:"steps-da687.appspot.com",messagingSenderId:"815638417742",appId:"1:815638417742:web:bf805c578594e473968e1f",measurementId:"G-3ZBJG2GSW8"},D=(0,P.Wp)(N),O=(0,U.xI)(D),X=(0,W.aU)(D);new U.HF;var V={name:"MinesPage",setup(){const e=(0,a.Pj)(),t=(0,x.KR)(e.state.coins),o=(0,x.KR)(1),r=(0,x.KR)(!1),n=(0,x.KR)(0),l=(0,x.KR)(1),i=(0,x.KR)(.2),c=(0,x.KR)(30),d=(0,x.KR)(Array(36).fill(!1)),u=(0,x.KR)(Array(36).fill(!1));let p=null;const m=async o=>{t.value=parseFloat(o).toFixed(2),e.commit("updateCoins",parseFloat(t.value));const r=O.currentUser;if(r){const e=(0,W.H9)(X,"users",r.uid);await(0,W.BN)(e,{coins:parseFloat(o)},{merge:!0})}};function v(){c.value=30,p=setInterval((()=>{c.value--,c.value<=0&&(clearInterval(p),alert("Time's up!"),r.value=!1)}),1e3)}function b(){clearInterval(p),c.value=30}function f(){o.value>t.value?alert("You don't have enough coins to place this bet."):(n.value=o.value,m(t.value-o.value),r.value=!0)}async function h(){const e=n.value*l.value,o=parseFloat(t.value)+e;await m(o.toFixed(2)),r.value=!1,n.value=0,g()}function g(){u.value=Array(36).fill(!1),d.value=Array(36).fill(!1),l.value=1,i.value=.2,r.value=!1,n.value=0,y()}function k(e){r.value&&!u.value[e]&&(u.value[e]=!0,d.value[e]?(alert("Game Over"),g()):(l.value+=i.value,i.value+=.2))}function y(){l.value=1,i.value=.1;for(let e=0;e<10;e++){let e;do{e=Math.floor(36*Math.random())}while(d.value[e]);d.value[e]=!0}}return(0,s.wB)(r,(e=>{e?v():b()})),(0,s.sV)(y),{betValue:o,gameActive:r,coins:t,multiply:l,timeRemaining:c,mines:d,placeBet:f,withdraw:h,clickSquare:k,selectedSquares:u}}};const G=(0,i.A)(V,[["render",T],["__scopeId","data-v-6f55c3ef"]]);var H=G,q=o.p+"img/pachinko.9cdbd8f8.svg",Q=o.p+"img/bomb.8cdc2475.svg",$=o.p+"img/clover-solid.afdeb77d.svg";const J=e=>((0,s.Qi)("data-v-6071b8ad"),e=e(),(0,s.jt)(),e),Y={class:"w-full h-screen flex flex-col justify-between overflow-auto cutive-mono-regular"},z=J((()=>(0,s.Lk)("h1",{class:"text-5xl relative text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2"},' "STEPS" ',-1))),Z={class:"flex justify-between items-center relative"},ee={id:"coinDisplay",class:"border-color border-2 p-2 border-dashed ml-2"},te={class:"flex"},oe={class:"grid grid-cols-1 sm:grid-cols-2 gap-4 p-3"},re=J((()=>(0,s.Lk)("span",{class:"absolute inset-0 border-2 border-dashed border-color"},null,-1))),se=J((()=>(0,s.Lk)("div",{class:"relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"},[(0,s.Lk)("div",{class:"p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"},[(0,s.Lk)("img",{src:q,class:"filter-white svg-size"}),(0,s.Lk)("h2",{class:"mt-4 text-xl sm:text-2xl"},"Pachinko")]),(0,s.Lk)("div",{class:"absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"},[(0,s.Lk)("h3",{class:"mt-4 text-xl sm:text-2xl"},"Pachinko"),(0,s.Lk)("p",{class:"mt-4 text-sm sm:text-base"},"Suck the balls into the hole and win the game."),(0,s.Lk)("p",{class:"mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500"},"Press")])],-1))),ne=J((()=>(0,s.Lk)("span",{class:"absolute inset-0 border-2 border-dashed border-color"},null,-1))),ae=J((()=>(0,s.Lk)("div",{class:"relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"},[(0,s.Lk)("div",{class:"p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"},[(0,s.Lk)("img",{src:Q,class:"filter-white"}),(0,s.Lk)("h2",{class:"mt-4 text-xl sm:text-2xl"},"Mines")]),(0,s.Lk)("div",{class:"absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"},[(0,s.Lk)("h3",{class:"mt-4 text-xl sm:text-2xl"},"Mines"),(0,s.Lk)("p",{class:"mt-4 text-sm sm:text-base"},"Mines are everywhere. You have to find them and avoid them."),(0,s.Lk)("p",{class:"mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500"},"Press")])],-1))),le=J((()=>(0,s.Lk)("span",{class:"absolute inset-0 border-2 border-dashed border-color"},null,-1))),ie=J((()=>(0,s.Lk)("div",{class:"relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"},[(0,s.Lk)("div",{class:"p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"},[(0,s.Lk)("img",{src:$,class:"filter-white svg-size"}),(0,s.Lk)("h2",{class:"mt-4 text-xl sm:text-2xl"},"Lucky Numbers")]),(0,s.Lk)("div",{class:"absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"},[(0,s.Lk)("h3",{class:"mt-4 text-xl sm:text-2xl"},"Lucky Numbers"),(0,s.Lk)("p",{class:"mt-4 text-sm sm:text-base"},"Lucky Numbers are a game of luck"),(0,s.Lk)("p",{class:"mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500"},"Press")])],-1)));function ce(e,t,o,r,n,a){const l=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",Y,[z,(0,s.Lk)("div",Z,[(0,s.Lk)("p",ee,"Coins: "+(0,p.v_)(r.coins)+" KK",1),(0,s.Lk)("div",te,[(0,s.Lk)("button",{id:"Authenticate",class:"border-color border-2 p-2 border-dashed hover:bg-red-500 mr-2",onClick:t[0]||(t[0]=(...e)=>a.authenticate&&a.authenticate(...e))}," Authenticate "),(0,s.Lk)("button",{id:"Get_KK",class:"border-color border-2 p-2 border-dashed hover:bg-red-500 mr-2",onClick:t[1]||(t[1]=(...e)=>a.handleRequest&&a.handleRequest(...e))}," Get KorakKoins ")])]),(0,s.Lk)("div",oe,[(0,s.bF)(l,{to:"/pachinko",class:"group relative block h-64 sm:h-80"},{default:(0,s.k6)((()=>[re,se])),_:1}),(0,s.bF)(l,{to:"/mines",class:"group relative block h-64 sm:h-80"},{default:(0,s.k6)((()=>[ne,ae])),_:1}),(0,s.bF)(l,{to:"/lucky",class:"group relative block h-64 sm:h-80"},{default:(0,s.k6)((()=>[le,ie])),_:1})])])}o(4979);var de=o(4373);async function ue(e){const t=Date.now(),o=(new Date).setHours(0,0,0,0);try{const r=await de.A.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",{aggregateBy:[{dataTypeName:"com.google.step_count.delta",dataSourceId:"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"}],bucketByTime:{durationMillis:864e5},startTimeMillis:o,endTimeMillis:t},{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(401===r.status)return console.error("Access token is invalid or expired"),null;const s=r.data.bucket.reduce(((e,t)=>{const o=t.dataset[0]?.point[0]?.value[0]?.intVal||0;return e+o}),0);return s}catch(r){return console.error("Failed to fetch the step count data",r),null}}var pe={name:"HomePage",setup(){const e=(0,a.Pj)(),t=(0,s.EW)((()=>e.state.coins));return{coins:t}},methods:{base64UrlDecode(e){const t=e.replace(/-/g,"+").replace(/_/g,"/"),o=atob(t),r=decodeURIComponent(o.split("").map((e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2))).join(""));return JSON.parse(r)},async authenticate(){try{const e=new U.HF;e.addScope("https://www.googleapis.com/auth/fitness.activity.read");const t=await(0,U.df)(O,e),o=t.user;console.log("User authenticated:",o);const r=(0,W.H9)(X,"users",o.uid);await(0,W.BN)(r,{email:o.email},{merge:!0});const s=await o.getIdTokenResult();if(s&&s.token){sessionStorage.setItem("access_token",s.token),sessionStorage.setItem("refresh_token",o.stsTokenManager.refreshToken),console.log("Access token set in session storage:",s.token);const e=s.token.split(".")[1],t=this.base64UrlDecode(e);console.log("Decoded token:",t),t.scope&&t.scope.includes("https://www.googleapis.com/auth/fitness.activity.read")?console.log("Token includes required scope"):console.error("Required scope is missing in the token")}else console.error("Failed to get access token from tokenResult:",s)}catch(e){console.error("Error during authentication",e)}},async getTokenFromFirebaseAuth(){try{const e=O.currentUser;if(e){const t=await e.getIdTokenResult(!0);if(t&&t.token)return console.log("Access token from Firebase Auth:",t.token),t.token}}catch(e){console.error("Error retrieving token from Firebase Auth",e)}return null},async refreshAccessToken(){try{const e=sessionStorage.getItem("refresh_token"),t=await fetch("https://securetoken.googleapis.com/v1/token?key=AIzaSyA-YuDAXpZgtKgjHyfQXir-J1siWselhDU",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({grant_type:"refresh_token",refresh_token:e})}),o=await t.json();if(o.access_token)return console.log("Refreshed access token:",o.access_token),o.access_token;console.error("Failed to refresh access token:",o)}catch(e){return console.error("Failed to refresh access token:",e),null}},async handleRequest(){const e=O.currentUser;if(e){console.log("User is authenticated:",e);try{let t=sessionStorage.getItem("access_token");if(!t){if(console.warn("Access token is missing from session storage, retrieving from Firebase Auth"),t=await this.getTokenFromFirebaseAuth(),!t)return void console.error("Failed to retrieve access token");sessionStorage.setItem("access_token",t),console.log("Access token set in session storage:",t)}const o=await ue(t);if(!o)return void console.error("Failed to fetch the step count data");console.log("Current step count:",o);const r=Math.round(o/100*10)/10;console.log("Coins earned:",r);const s=(0,W.H9)(X,"users",e.uid),n=await(0,W.x7)(s);if(n.exists()){let e=n.data().coins||0;e+=r,console.log("Updating coins:",e),await(0,W.BN)(s,{coins:e},{merge:!0}),this.$store.commit("updateCoins",e)}else console.log("Setting initial coins:",r),await(0,W.BN)(s,{coins:r},{merge:!0}),this.$store.commit("updateCoins",r)}catch(t){if(t.response&&401===t.response.status){console.warn("Access token expired, refreshing...");const e=await this.refreshAccessToken();e?(sessionStorage.setItem("access_token",e),this.handleRequest()):console.error("Failed to refresh access token")}else console.error("Failed to fetch the step count data",t)}}else console.log("You need to authenticate first")}},mounted(){O.onAuthStateChanged((async e=>{if(e){const o=(0,W.H9)(X,"users",e.uid);if(navigator.onLine)try{const e=await(0,W.x7)(o);if(e.exists()){const t=e.data();this.$store.commit("updateCoins",t.coins||0)}}catch(t){console.error("Failed to fetch user data from Firestore",t)}else console.error("Client is offline")}}))}};const me=(0,i.A)(pe,[["render",ce],["__scopeId","data-v-6071b8ad"]]);var ve=me;const be={class:"bg-color"},fe={class:"flex md:flex-row flex-col justify-between items-center relative mt-2"},he={class:"flex flex-col md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2"},ge={class:"border-color border-2 p-2 border-dashed"},ke={key:0,class:"flex flex-col justify-center items-center my-8"},ye={class:"text-center text-color font-black"},xe={class:"text-center text-color font-black"},we={class:"text-center text-color font-black"},Le={key:1,class:"timer"},Ce={class:"flex justify-center items-center mt-10"},Ae={id:"grid",class:"flex flex-wrap",style:{width:"26rem"}},Be=["onClick"];function Fe(e,t,o,n,a,l){const i=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",be,[(0,s.Lk)("div",fe,[(0,s.bF)(i,{to:"/",class:"border-color border-2 p-2 border-dashed ml-2 hover:bg-red-500"},{default:(0,s.k6)((()=>[(0,s.eW)("Go back")])),_:1}),(0,s.Lk)("div",he,[(0,s.bo)((0,s.Lk)("input",{type:"number","onUpdate:modelValue":t[0]||(t[0]=e=>n.betAmount=e),min:"0.1",step:"0.1",class:"focus:outline-0 md:border-t-2 md:border-b-2 md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center"},null,512),[[r.Jo,n.betAmount]]),(0,s.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>n.placeBet&&n.placeBet(...e)),class:"border-color border-2 p-2 border-dashed hover:bg-red-500"},"Place Bet")]),(0,s.Lk)("p",ge,"Coins: "+(0,p.v_)(n.coinDisplay)+" KK",1)]),n.betPlaced?((0,s.uX)(),(0,s.CE)("div",ke,[(0,s.Lk)("p",ye,(0,p.v_)(n.randomNumbersText),1),(0,s.Lk)("p",xe,(0,p.v_)(n.correctGuessesText),1),(0,s.Lk)("p",we,(0,p.v_)(n.resultText),1)])):(0,s.Q3)("",!0),e.waitingForRestart?((0,s.uX)(),(0,s.CE)("div",Le," Game restarts in: "+(0,p.v_)(e.timer)+" seconds ",1)):(0,s.Q3)("",!0),(0,s.Lk)("div",Ce,[(0,s.Lk)("div",Ae,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(n.numbers,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e,class:(0,p.C4)(["number h-16 w-16 border-2 border-dashed border-color hover:bg-red-800 m-0.5 flex justify-center items-center font-bold",{"bg-red-500":n.selectedNumbers.includes(e)}]),onClick:t=>n.selectNumber(e)},(0,p.v_)(e),11,Be)))),128))])])])}var _e={name:"LuckyNumbers",setup(){const e=(0,a.Pj)(),t=(0,x.KR)(1),o=(0,x.KR)([]),r=(0,x.KR)(Array.from({length:36},((e,t)=>t+1))),n=(0,x.KR)([]),l=(0,x.KR)(0),i=(0,x.KR)(0),c=(0,x.KR)(!1),d=(0,x.KR)(0),u=(0,x.KR)(!1),p=(0,s.EW)((()=>{const t=parseFloat(e.state.coins);return isNaN(t)?"0.00":t.toFixed(2)}));function m(e){d.value=e,u.value=!0;const t=setInterval((()=>{d.value--,d.value<=0&&(clearInterval(t),o.value=[],i.value=0,c.value=!1,u.value=!1)}),1e3)}const v=t=>new Promise((o=>{e.commit("updateCoins",t),o(t)}));function b(e){const t=o.value.indexOf(e);t>-1?o.value.splice(t,1):o.value.length<5&&o.value.push(e)}async function f(){if(u.value)return;if(o.value.length<5)return void alert("Please select all 5 numbers before placing a bet.");const r=parseFloat(t.value);if(r<0)return;if(r>e.state.coins)return void alert("You don't have enough coins to place this bet.");const s=await v(e.state.coins-r),n=h(r);await v(s+n),i.value=n,c.value=!0,m(5)}function h(e){let t=[];for(let o=0;o<5;o++){let e;do{e=Math.floor(36*Math.random())+1}while(t.includes(e));t.push(e)}n.value=t;let r=o.value.filter((e=>t.includes(e))).length;l.value=r;let s=[0,1.1,2.4,5,10,50][r];return e*s}return{betAmount:t,selectedNumbers:o,numbers:r,coinDisplay:p,selectNumber:b,placeBet:f,betPlaced:c,randomNumbersText:(0,s.EW)((()=>`Random numbers: ${n.value.join(", ")}`)),correctGuessesText:(0,s.EW)((()=>`You got ${l.value} correct guesses`)),resultText:(0,s.EW)((()=>`You won: ${i.value.toFixed(2)} KK`))}}};const Se=(0,i.A)(_e,[["render",Fe],["__scopeId","data-v-1b89229f"]]);var Ke=Se;const Re=[{path:"/",name:"home",component:ve},{path:"/pachinko",name:"pachinko",component:B},{path:"/mines",name:"mines",component:H},{path:"/lucky",name:"lucky",component:Ke}],Me=(0,u.aE)({history:(0,u.LA)(""),routes:Re});var je=Me,Ee=(0,a.y$)({state:{coins:10},mutations:{updateCoins(e,t){e.coins=parseFloat(t).toFixed(2)}},actions:{async fetchCoins({commit:e}){const t=O.currentUser;if(t){const o=(0,W.H9)(X,"users",t.uid),r=await(0,W.x7)(o);r.exists()&&e("updateCoins",r.data().coins||0)}}},getters:{getCoins(e){return e.coins}}});(0,r.Ef)(d).use(je).use(Ee).mount("#app")}},t={};function o(r){var s=t[r];if(void 0!==s)return s.exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,o),n.exports}o.m=e,function(){var e=[];o.O=function(t,r,s,n){if(!r){var a=1/0;for(d=0;d<e.length;d++){r=e[d][0],s=e[d][1],n=e[d][2];for(var l=!0,i=0;i<r.length;i++)(!1&n||a>=n)&&Object.keys(o.O).every((function(e){return o.O[e](r[i])}))?r.splice(i--,1):(l=!1,n<a&&(a=n));if(l){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[r,s,n]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p=""}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var s,n,a=r[0],l=r[1],i=r[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(s in l)o.o(l,s)&&(o.m[s]=l[s]);if(i)var d=i(o)}for(t&&t(r);c<a.length;c++)n=a[c],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(d)},r=self["webpackChunkvue_ispravak"]=self["webpackChunkvue_ispravak"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=o.O(void 0,[504],(function(){return o(2052)}));r=o.O(r)})();
//# sourceMappingURL=app.1dee3d29.js.map