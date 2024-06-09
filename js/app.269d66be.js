(function(){"use strict";var e={2067:function(e,t,o){var r=o(5130),a=o(6768);function s(e,t,o,r,s,n){const i=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.Wv)(i)}var n=o(782),i={name:"App",setup(){const e=(0,n.Pj)(),t=(0,a.EW)((()=>e.state.coins)),o=(0,a.EW)((()=>e.state.user)),r=t=>{e.commit("updateCoins",t)};return{coins:t,user:o,updateUserCoins:r}}},l=o(1241);const c=(0,l.A)(i,[["render",s]]);var d=c,u=o(1387),p=o(4232);const h=e=>((0,a.Qi)("data-v-5d535758"),e=e(),(0,a.jt)(),e),v={class:"flex md:flex-row flex-col justify-between items-center relative mb-4 mt-2"},m={class:"flex flex-col md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2"},b=h((()=>(0,a.Lk)("label",{for:"ballCost",class:"border-color border-2 p-2 border-dashed"},"Ulog po loptici:",-1))),f={id:"coinDisplay",class:"border-color border-2 p-2 border-dashed"},g=h((()=>(0,a.Lk)("div",{id:"gameContent",class:"flex justify-center items-center"},null,-1)));function y(e,t,o,s,n,i){const l=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.Lk)("div",v,[(0,a.bF)(l,{to:"/",class:"border-color border-2 p-2 border-dashed ml-2 hover:bg-red-500"},{default:(0,a.k6)((()=>[(0,a.eW)("Go back")])),_:1}),(0,a.Lk)("div",m,[b,(0,a.bo)((0,a.Lk)("input",{type:"number","onUpdate:modelValue":t[0]||(t[0]=e=>s.ballCost=e),id:"ballCost",value:"1",step:"0.1",min:"0.1",class:"focus:outline-0 md:border-t-2 md:border-b-2 md:border-l-0 md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center"},null,512),[[r.Jo,s.ballCost,void 0,{number:!0}]]),(0,a.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>s.onLaunchClick&&s.onLaunchClick(...e)),onMousedown:t[2]||(t[2]=(...e)=>s.onLaunchMouseDown&&s.onLaunchMouseDown(...e)),onMouseup:t[3]||(t[3]=(...e)=>s.onLaunchMouseUp&&s.onLaunchMouseUp(...e)),onMouseleave:t[4]||(t[4]=(...e)=>s.onLaunchMouseUp&&s.onLaunchMouseUp(...e)),id:"launchBall",class:"border-color border-2 p-2 border-dashed hover:bg-red-500"},"Launch Balls",32)]),(0,a.Lk)("p",f,"Coins: "+(0,p.v_)(s.coins),1)]),g],64)}o(4114);var k=o(144),x=o(4501),w=o.n(x),L={name:"PachinkoPage",setup(){const e=(0,n.Pj)(),t=(0,k.KR)(e.state.coins),o=()=>{t.value=parseFloat(parseFloat(t.value).toFixed(2)),e.commit("updateCoins",t.value)},r=(0,k.KR)(1),s=(0,k.KR)(null);let i,l,c,d;const u=[],p=[],h=[],v=()=>{const e=document.getElementById("gameContent");i=w().Engine.create({gravity:{x:0,y:1}}),l=w().Render.create({element:e,engine:i,options:{width:800,height:600,wireframes:!1,background:"#18181d"}}),c=w().Runner.create(),w().Runner.run(c,i);const a={isStatic:!0,restitution:.8,render:{fillStyle:"#fff"}},n=w().Bodies.rectangle(l.canvas.width/2,0,l.canvas.width,5,a),d=w().Bodies.rectangle(l.canvas.width/2,l.canvas.height,l.canvas.width,5,a),v=w().Bodies.rectangle(0,l.canvas.height/2,5,l.canvas.height,a),m=w().Bodies.rectangle(l.canvas.width,l.canvas.height/2,5,l.canvas.height,a);w().World.add(i.world,[n,d,v,m]);const b=[{x:l.canvas.width/2-25,y:95},{x:l.canvas.width/2,y:85},{x:l.canvas.width/2+25,y:95}];s.value=w().Bodies.fromVertices(l.canvas.width/2,50,b,{isStatic:!0,render:{fillStyle:"transparent"}}),w().World.add(i.world,s.value);const f=10,g=42,y=11,k=23,x=s.value.position.y+s.value.bounds.max.y+.2*g;for(let t=0;t<y;t++){const e=(l.canvas.width-k*g)/2+t%2*g/2;for(let o=0;o<k;o++){const r=e+o*g,a=x+t*g,s=w().Bodies.circle(r,a,f,{isStatic:!0,restitution:.4,render:{fillStyle:"transparent",strokeStyle:"#f7fff7",lineWidth:4}});h.push(s),w().World.add(i.world,s)}}const L=h.pop();w().World.remove(i.world,L),w().Events.on(i,"afterUpdate",(()=>{for(let e of h)w().Body.applyForce(e,{x:0,y:0},{x:.05,y:0})}));const B=9,C=l.canvas.width/B,M=20,S=4,A=l.canvas.height-M/2;for(let t=0;t<B;t++){let e;e=t===Math.floor(B/2)?.4:t===Math.floor(B/2)-1||t===Math.floor(B/2)+1?.8:t===Math.floor(B/2)-2||t===Math.floor(B/2)+2?1.4:t===Math.floor(B/2)-3||t===Math.floor(B/2)+3?2.2:15;const o=w().Bodies.rectangle(t*C+C/2,A,C-S,M,{isStatic:!0,label:"section"+(t+1)+" - multiplier: "+e,coins:e,render:{fillStyle:"transparent"}});if(p.push(o),t>0){const e=w().Bodies.rectangle(t*C-S/2,A,S,1.3*M,{isStatic:!0,restitution:1,label:"border",render:{fillStyle:"#f55"}});p.push(e)}if(t<B-1){const e=w().Bodies.rectangle((t+1)*C-S/2,A,S,1.3*M,{isStatic:!0,restitution:1,label:"border",render:{fillStyle:"#f55"}});p.push(e)}}w().World.add(i.world,p),w().Events.on(i,"collisionStart",(e=>{const a=e.pairs;for(const s of a){if(s.bodyA===v&&u.includes(s.bodyB)||s.bodyB===v&&u.includes(s.bodyA)){const e=u.includes(s.bodyB)?s.bodyB:s.bodyA;w().Body.setVelocity(e,{x:2,y:e.velocity.y})}else if(s.bodyA===m&&u.includes(s.bodyB)||s.bodyB===m&&u.includes(s.bodyA)){const e=u.includes(s.bodyB)?s.bodyB:s.bodyA;w().Body.setVelocity(e,{x:-2,y:e.velocity.y})}for(let e=0;e<u.length;e++){const a=u[e];if(s.bodyA===a&&p.includes(s.bodyB)||s.bodyB===a&&p.includes(s.bodyA)){const n=p.includes(s.bodyB)?s.bodyB:s.bodyA;w().World.remove(i.world,a),u.splice(e,1),void 0!==n.coins&&(t.value+=n.coins*r.value,o())}}}})),w().Render.run(l),w().Render.run(l),w().Events.on(l,"afterRender",(function(){l.context.font="1rem Cutive Mono",l.context.fillStyle="white",l.context.textAlign="center",l.context.textBaseline="middle",p.forEach((e=>{void 0!==e.coins&&l.context.fillText(`${e.coins}`,e.position.x,e.position.y)}))})),o()},m=()=>{const e=1;for(let a=0;a<e;a++)if(t.value>r.value){t.value-=r.value,o();const e=100,a=s.value.position.x-e/1.2+Math.random()*e,n=w().Bodies.circle(a,s.value.position.y,10,{restitution:.6,friction:0,render:{fillStyle:"#f55"}});w().World.add(i.world,n),u.push(n),w().Body.applyForce(n,n.position,{x:0,y:-.005})}},b=()=>{const e=r.value;e<0||m(e)},f=()=>{const e=r.value;e<0||(d=setInterval(m,10))},g=()=>{const e=r.value;e<0||clearInterval(d)};return(0,a.sV)((()=>{v()})),{ballCost:r,coins:t,onLaunchClick:b,onLaunchMouseDown:f,onLaunchMouseUp:g}},mounted(){document.body.classList.add("pachinko-page")},beforeUnmount(){document.body.classList.remove("pachinko-page")}};const B=(0,l.A)(L,[["render",y],["__scopeId","data-v-5d535758"]]);var C=B;const M={class:"flex md:flex-row flex-col justify-between items-center relative mt-2"},S={class:"flex flex-col md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2"},A={id:"multiply",class:"border-color border-2 p-2 border-dashed"},_={id:"coinDisplay",class:"border-color border-2 p-2 border-dashed"},E={class:"flex justify-center items-center mt-12"},j={id:"minefield",class:"flex flex-wrap",style:{width:"26rem"}},F=["onClick"],R={class:"flex justify-center items-center mt-12"},I={key:0,id:"timer",class:"border-color border-2 p-2 border-dashed"};function K(e,t,o,s,n,i){const l=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)("div",null,[(0,a.Lk)("div",M,[(0,a.bF)(l,{to:"/",class:"border-color border-2 p-2 border-dashed ml-2 hover:bg-red-500"},{default:(0,a.k6)((()=>[(0,a.eW)("Go back")])),_:1}),(0,a.Lk)("div",S,[(0,a.Lk)("p",A,"Multiply: "+(0,p.v_)(s.multiply.toFixed(1)),1),(0,a.bo)((0,a.Lk)("input",{type:"number",id:"betInput",min:"0.1",step:"0.1","onUpdate:modelValue":t[0]||(t[0]=e=>s.betValue=e),class:"focus:outline-0 md:border-t-2 md:border-b-2 md:border-l-0 md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center"},null,512),[[r.Jo,s.betValue]]),s.gameActive?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.CE)("button",{key:0,id:"placeBetButton",class:"border-color border-2 p-2 border-dashed hover:bg-red-500",onClick:t[1]||(t[1]=(...e)=>s.placeBet&&s.placeBet(...e))},"Place Bet")),s.gameActive?((0,a.uX)(),(0,a.CE)("button",{key:1,id:"withdrawButton",class:"border-color border-2 p-2 border-dashed hover:bg-red-500",onClick:t[2]||(t[2]=(...e)=>s.withdraw&&s.withdraw(...e))},"Withdraw")):(0,a.Q3)("",!0)]),(0,a.Lk)("p",_,(0,p.v_)(s.coins),1)]),(0,a.Lk)("div",E,[(0,a.Lk)("div",j,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(s.mines,((e,t)=>((0,a.uX)(),(0,a.CE)("div",{key:t,class:"h-16 w-16 border-2 border-dashed border-color hover:bg-red-800 m-0.5",onClick:e=>s.clickSquare(t)},null,8,F)))),128))])]),(0,a.Lk)("div",R,[s.gameActive?((0,a.uX)(),(0,a.CE)("p",I,"Time remaining: "+(0,p.v_)(s.timeRemaining)+"s",1)):(0,a.Q3)("",!0)])])}var P=o(6400),W=o(7617),U=o(114);const O={apiKey:"AIzaSyA-YuDAXpZgtKgjHyfQXir-J1siWselhDU",authDomain:"steps-da687.firebaseapp.com",projectId:"steps-da687",storageBucket:"steps-da687.appspot.com",messagingSenderId:"815638417742",appId:"1:815638417742:web:bf805c578594e473968e1f",measurementId:"G-3ZBJG2GSW8"},T=(0,P.Wp)(O),D=(0,W.aU)(T),X=(0,U.xI)(T),V=new U.HF;var N={name:"MinesPage",setup(){const e=(0,n.Pj)(),t=(0,k.KR)(e.state.coins),o=(0,k.KR)(1),r=(0,k.KR)(!1),s=(0,k.KR)(0),i=(0,k.KR)(1),l=(0,k.KR)(.2),c=(0,k.KR)(30),d=(0,k.KR)(Array(36).fill(!1)),u=async o=>{t.value=parseFloat(o).toFixed(2),e.commit("updateCoins",t.value);const r=X.currentUser;if(r){const e=(0,W.H9)(D,"users",r.uid);await(0,W.BN)(e,{coins:parseFloat(o)},{merge:!0})}};function p(){c.value=30;const e=setInterval((()=>{c.value--,c.value<=0&&(alert("Time's up!"),r.value=!1,clearInterval(e))}),1e3)}function h(){c.value=30}function v(){o.value>t.value?alert("You don't have enough coins to place this bet."):(s.value=o.value,u(t.value-o.value),r.value=!0)}function m(){1===i.value?u(t.value):u(t.value+s.value*i.value),r.value=!1,s.value=0}function b(e){r.value&&(d.value[e]?(alert("Game Over"),r.value=!1):(i.value+=l.value,l.value+=.2))}function f(){i.value=1,l.value=.1;for(let e=0;e<10;e++){let e;do{e=Math.floor(36*Math.random())}while(d.value[e]);d.value[e]=!0}}return(0,a.wB)(r,(e=>{e?p():h()})),(0,a.sV)(f),{betValue:o,gameActive:r,coins:t,multiply:i,timeRemaining:c,mines:d,placeBet:v,withdraw:m,clickSquare:b}}};const G=(0,l.A)(N,[["render",K],["__scopeId","data-v-dbd8ffac"]]);var H=G,Q=o.p+"img/pachinko.9cdbd8f8.svg",$=o.p+"img/bomb.8cdc2475.svg",q=o.p+"img/clover-solid.afdeb77d.svg";const J=e=>((0,a.Qi)("data-v-666ed636"),e=e(),(0,a.jt)(),e),Y={class:"w-full h-screen flex flex-col justify-between overflow-auto cutive-mono-regular"},z=J((()=>(0,a.Lk)("h1",{class:"text-5xl relative text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2"},' "STEPS" ',-1))),Z={class:"flex justify-between items-center relative"},ee={id:"coinDisplay",class:"border-color border-2 p-2 border-dashed ml-2"},te={class:"flex"},oe={class:"grid grid-cols-1 sm:grid-cols-2 gap-4 p-3"},re=J((()=>(0,a.Lk)("span",{class:"absolute inset-0 border-2 border-dashed border-color"},null,-1))),ae=J((()=>(0,a.Lk)("div",{class:"relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"},[(0,a.Lk)("div",{class:"p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"},[(0,a.Lk)("img",{src:Q,class:"filter-white svg-size"}),(0,a.Lk)("h2",{class:"mt-4 text-xl sm:text-2xl"},"Pachinko")]),(0,a.Lk)("div",{class:"absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"},[(0,a.Lk)("h3",{class:"mt-4 text-xl sm:text-2xl"},"Pachinko"),(0,a.Lk)("p",{class:"mt-4 text-sm sm:text-base"},"Suck the balls into the hole and win the game."),(0,a.Lk)("p",{class:"mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500"},"Press")])],-1))),se=J((()=>(0,a.Lk)("span",{class:"absolute inset-0 border-2 border-dashed border-color"},null,-1))),ne=J((()=>(0,a.Lk)("div",{class:"relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"},[(0,a.Lk)("div",{class:"p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"},[(0,a.Lk)("img",{src:$,class:"filter-white"}),(0,a.Lk)("h2",{class:"mt-4 text-xl sm:text-2xl"},"Mines")]),(0,a.Lk)("div",{class:"absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"},[(0,a.Lk)("h3",{class:"mt-4 text-xl sm:text-2xl"},"Mines"),(0,a.Lk)("p",{class:"mt-4 text-sm sm:text-base"},"Mines are everywhere. You have to find them and avoid them."),(0,a.Lk)("p",{class:"mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500"},"Press")])],-1))),ie=J((()=>(0,a.Lk)("span",{class:"absolute inset-0 border-2 border-dashed border-color"},null,-1))),le=J((()=>(0,a.Lk)("div",{class:"relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"},[(0,a.Lk)("div",{class:"p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"},[(0,a.Lk)("img",{src:q,class:"filter-white svg-size"}),(0,a.Lk)("h2",{class:"mt-4 text-xl sm:text-2xl"},"Lucky Numbers")]),(0,a.Lk)("div",{class:"absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"},[(0,a.Lk)("h3",{class:"mt-4 text-xl sm:text-2xl"},"Lucky Numbers"),(0,a.Lk)("p",{class:"mt-4 text-sm sm:text-base"},"Lucky Numbers are a game of luck"),(0,a.Lk)("p",{class:"mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500"},"Press")])],-1)));function ce(e,t,o,r,s,n){const i=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)("div",Y,[z,(0,a.Lk)("div",Z,[(0,a.Lk)("p",ee,"Coins: "+(0,p.v_)(r.coins),1),(0,a.Lk)("div",te,[(0,a.Lk)("button",{id:"Authenticate",class:"border-color border-2 p-2 border-dashed hover:bg-red-500 mr-2",onClick:t[0]||(t[0]=(...e)=>n.authenticate&&n.authenticate(...e))}," Authenticate "),(0,a.Lk)("button",{id:"Get_KK",class:"border-color border-2 p-2 border-dashed hover:bg-red-500 mr-2",onClick:t[1]||(t[1]=(...e)=>n.handleRequest&&n.handleRequest(...e))}," Get KorakKoins ")])]),(0,a.Lk)("div",oe,[(0,a.bF)(i,{to:"/pachinko",class:"group relative block h-64 sm:h-80"},{default:(0,a.k6)((()=>[re,ae])),_:1}),(0,a.bF)(i,{to:"/mines",class:"group relative block h-64 sm:h-80"},{default:(0,a.k6)((()=>[se,ne])),_:1}),(0,a.bF)(i,{to:"/lucky-numbers",class:"group relative block h-64 sm:h-80"},{default:(0,a.k6)((()=>[ie,le])),_:1})])])}async function de(){const e=sessionStorage.getItem("access_token");if(!e)throw new Error("No access token found");const t=new Date,o=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=o.getTime(),a=t.getTime(),s=await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({aggregateBy:[{dataTypeName:"com.google.step_count.delta",dataSourceId:"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"}],bucketByTime:{durationMillis:a-r},startTimeMillis:r,endTimeMillis:a})}),n=await s.json();let i=0;if(n.bucket&&n.bucket.length>0){const e=n.bucket[0].dataset[0];e.point&&e.point.length>0&&(i=e.point[0].value[0].intVal)}return i}var ue={name:"HomePage",setup(){const e=(0,n.Pj)(),t=(0,a.EW)((()=>e.state.coins));return{coins:t}},methods:{async authenticate(){try{const e=await(0,U.df)(X,V),t=e.user;console.log("User authenticated:",t);const o=(0,W.H9)(D,"users",t.uid);await(0,W.BN)(o,{email:t.email},{merge:!0})}catch(e){console.error("Error during authentication",e)}},async handleRequest(){const e=X.currentUser;if(e)try{const t=await de();console.log("Current step count:",t);const o=Math.round(t/100*10)/10,r=(0,W.H9)(D,"users",e.uid),a=await(0,W.x7)(r);if(a.exists()){let e=a.data().coins||0;e+=o,await(0,W.BN)(r,{coins:e},{merge:!0}),this.$store.commit("updateCoins",e)}else await(0,W.BN)(r,{coins:o},{merge:!0}),this.$store.commit("updateCoins",o)}catch(t){console.error("Failed to fetch the step count data",t)}else console.log("You need to authenticate first")}},mounted(){X.onAuthStateChanged((async e=>{if(e){const t=(0,W.H9)(D,"users",e.uid),o=await(0,W.x7)(t);if(o.exists()){const e=o.data();this.$store.commit("updateCoins",e.coins||0)}}}))}};const pe=(0,l.A)(ue,[["render",ce],["__scopeId","data-v-666ed636"]]);var he=pe;const ve=e=>((0,a.Qi)("data-v-3ac07eaa"),e=e(),(0,a.jt)(),e),me={class:"login"},be=ve((()=>(0,a.Lk)("h1",null,"Login",-1)));function fe(e,t,o,r,s,n){return(0,a.uX)(),(0,a.CE)("div",me,[be,(0,a.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>n.authenticate&&n.authenticate(...e))},"Sign in with Google")])}var ge={name:"LoginPage",methods:{async authenticate(){try{await(0,U.df)(X,V),this.$router.push("/")}catch(e){console.error("Error during authentication",e)}}}};const ye=(0,l.A)(ge,[["render",fe],["__scopeId","data-v-3ac07eaa"]]);var ke=ye;const xe=[{path:"/",name:"home",component:he},{path:"/pachinko",name:"pachinko",component:C},{path:"/mines",name:"mines",component:H},{path:"/login",name:"login",component:ke}],we=(0,u.aE)({history:(0,u.LA)(""),routes:xe});var Le=we,Be=(0,n.y$)({state:{coins:0},mutations:{updateCoins(e,t){e.coins=parseFloat(t).toFixed(2)}},actions:{async fetchCoins({commit:e}){const t=X.currentUser;if(t){const o=(0,W.H9)(D,"users",t.uid),r=await(0,W.x7)(o);r.exists()&&e("updateCoins",r.data().coins||0)}}},getters:{getCoins(e){return e.coins}}});(0,r.Ef)(d).use(Le).use(Be).mount("#app")}},t={};function o(r){var a=t[r];if(void 0!==a)return a.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,o),s.exports}o.m=e,function(){var e=[];o.O=function(t,r,a,s){if(!r){var n=1/0;for(d=0;d<e.length;d++){r=e[d][0],a=e[d][1],s=e[d][2];for(var i=!0,l=0;l<r.length;l++)(!1&s||n>=s)&&Object.keys(o.O).every((function(e){return o.O[e](r[l])}))?r.splice(l--,1):(i=!1,s<n&&(n=s));if(i){e.splice(d--,1);var c=a();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[r,a,s]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.p=""}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var a,s,n=r[0],i=r[1],l=r[2],c=0;if(n.some((function(t){return 0!==e[t]}))){for(a in i)o.o(i,a)&&(o.m[a]=i[a]);if(l)var d=l(o)}for(t&&t(r);c<n.length;c++)s=n[c],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(d)},r=self["webpackChunkvue_ispravak"]=self["webpackChunkvue_ispravak"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=o.O(void 0,[504],(function(){return o(2067)}));r=o.O(r)})();
//# sourceMappingURL=app.269d66be.js.map