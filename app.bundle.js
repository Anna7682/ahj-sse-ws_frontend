!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);new class{constructor(e){this.url=e,this.container=document.querySelector("body"),this.usersOnline=[],this.currentUser=null,this.ws=new WebSocket(this.url),this.ws.onopen=()=>{console.log("connected")},this.ws.onmessage=e=>{const t=JSON.parse(e.data);"error"===t.type?alert("Такой никнейм занят, необходимо выбрать другой"):"users"===t.type?(this.usersOnline=t.data,this.deleteForm(),this.showChat()):"addMes"===t.type&&this.showNewMess(t.data.data)},this.ws.onclose=e=>{console.log("connection closed",e.code)},this.ws.onerror=()=>{console.log("error")},window.addEventListener("beforeunload",()=>{this.ws.send(JSON.stringify({type:"deleteUser",user:this.currentUser}))})}createForm(){const e=document.createElement("form");e.classList.add("widget"),e.innerHTML=' <h2>Выберите псевдоним</h2>\n        <input class="input widget-input" type="text" name="nick" required>\n        <button type="submit" class="btn">Продолжить</button>',this.container.insertAdjacentElement("afterbegin",e),e.addEventListener("submit",t=>{t.preventDefault();const n=e.nick.value,s={type:"addUser",user:n};this.currentUser=n,this.ws.send(JSON.stringify(s))})}deleteForm(){this.container.removeChild(this.container.firstChild)}showChat(){if(!document.querySelector(".container")){const e=document.createElement("div");e.classList.add("container"),e.innerHTML='<section class="chat-users"></section>\n            <section class="chat">\n             <div class="chat-content"></div>\n                       <form class="chat-form">\n                    <input class="input chat-form-input" type="text" aria-label="Ваше сообщение" name="message" placeholder="Напишите сообщение" required>\n                </form>\n            </section>',this.container.appendChild(e);const t=e.querySelector(".chat-form");t.addEventListener("submit",e=>{e.preventDefault();const n=t.message.value,s=`${(new Date).toLocaleDateString()} ${(new Date).toLocaleTimeString().slice(0,-3)}`;this.ws.send(JSON.stringify({type:"addMes",data:{name:this.currentUser,message:n,time:s}})),t.message.value=""})}this.showUsers()}showUsers(){const e=document.querySelector(".chat-users");e.innerHTML="",this.usersOnline.forEach(t=>{const n=document.createElement("div");n.classList.add("user"),n.innerHTML="";const s=document.createElement("div");s.classList.add("user-name"),s.textContent=t.name,t.name===this.currentUser&&(s.textContent="You"),n.appendChild(s),e.appendChild(n)})}createMessage(e){const t=document.createElement("div");t.classList.add("chat-message"),t.innerHTML=` <div class="mes-top"><span class="chat-message-name"></span>\n            <span class="chat-message-time">${e.time}</span></div>\n            <div class="chat-mes-content">${e.message}</div>`;const n=t.querySelector(".chat-message-name");return e.name===this.currentUser?(n.textContent="You",t.classList.add("you-mes")):(t.classList.remove("you-mes"),n.textContent=e.name),t}showNewMess(e){const t=this.createMessage(e);this.container.querySelector(".chat-content").appendChild(t)}}("https://ahj-ws-backend-6pyi.onrender.com/").createForm()}]);