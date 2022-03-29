var ye=Object.defineProperty,we=Object.defineProperties;var Se=Object.getOwnPropertyDescriptors;var J=Object.getOwnPropertySymbols;var Ce=Object.prototype.hasOwnProperty,Ne=Object.prototype.propertyIsEnumerable;var H=(e,a,t)=>a in e?ye(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,f=(e,a)=>{for(var t in a||(a={}))Ce.call(a,t)&&H(e,t,a[t]);if(J)for(var t of J(a))Ne.call(a,t)&&H(e,t,a[t]);return e},v=(e,a)=>we(e,Se(a));import{S as m,r as p,u as y,j as n,a as c,h as g,b as N,c as G,d as te,q as Ee,M as ae,e as Q,f as ke,g as be,p as De,s as xe,i as Oe,k as Pe,C as Le,F as ne,N as oe,R as Fe,l as B,m as Te,n as Me,o as Re,t as Ae,v as Ie,w as $e,B as Ve,P as Be}from"./vendor.37807e55.js";const _e=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};_e();const i={uiOpenModal:"[ui] Open modal",uiCloseModal:"[ui] Close modal",eventsGet:"[event] getEvents",eventStartAddNew:"[event] Start Add new",eventSetActive:"[event] Set Active",eventAddNew:"[event] Add new",eventClearActiveEvent:"[event] Clear active event",eventUpdated:"[event] Event updated",eventDeleted:"[event] Event deleted",cleanData:"[event] Clean data",authChecking:"[auth] Cheking login state",authCheckingFinish:"[auth] Finish checking login state",authStartLogin:"[auth] Start login",authLogin:"[auth] login",authStartRegister:"[auth] Start register",authStartTokenRenew:"[auth] Star token renew",authLogOut:"[auth] Star logOut"},se="https://back-calend.herokuapp.com/api",re=async(e,a,t="GET")=>{const r=`${se}/${e}`;if(t==="GET")try{return await(await fetch(r)).json()}catch(s){return{ok:!1,msg:`El error es: ${s}`}}else try{return await(await fetch(r,{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}})).json()}catch(s){return{ok:!1,msg:`El error es: ${s}`}}},F=async(e,a={},t="GET")=>{const r=`${se}/${e}`,s=localStorage.getItem("token")||"";if(t==="GET")try{return await(await fetch(r,{method:"GET",headers:{"x-token":`${s}`}})).json()}catch(o){return{ok:!1,msg:`El error es: ${o}`}}if(t==="POST"||t==="PUT")try{return await(await fetch(r,{method:t,body:JSON.stringify(a),headers:{"x-token":`${s}`,"Content-Type":"application/json"}})).json()}catch(o){return{ok:!1,msg:`El error es: ${o}`}}if(t==="DELETE")try{return await(await fetch(r,{method:t,headers:{"x-token":`${s}`,"Content-Type":"application/json"}})).json()}catch(o){return{ok:!1,msg:`El error es: ${o}`}}},Ye=({lEmail:e,lPassword:a})=>async t=>{const r=await re("auth/login",{email:e,password:a},"POST");if(!r.ok)return m.fire({title:r.msg,icon:"warning"});localStorage.setItem("token",r.token),localStorage.setItem("token-init-date",JSON.stringify(new Date().getTime())),t(j({uid:r._id,name:r.name})),m.fire({title:`\xA1Bienvenido/a ${r.name}`,icon:"success"})},qe=({name:e,rEmail:a,rPassword:t,rConfirmPassword:r})=>async s=>{const o=await re("auth/new",{name:e==null?void 0:e.trim().toLowerCase(),email:a==null?void 0:a.trim().toLowerCase(),password:t==null?void 0:t.trim().toLowerCase(),confirmPassword:r==null?void 0:r.trim().toLowerCase()},"POST");if(!o.ok)return m.fire({title:o.errors,icon:"warning"});localStorage.setItem("token",o.token),localStorage.setItem("token-init-date",JSON.stringify(new Date().getTime())),s(j({uid:o._id,name:o.name})),m.fire({title:` ${o.name} has sido registrado correctamente`,icon:"success"})},Ge=(e="/")=>async a=>{const t=await F("auth/renew");if(t.ok)localStorage.setItem("token",t.token),localStorage.setItem("token-init-date",JSON.stringify(new Date().getTime())),a(j({uid:t._id,name:t.name}));else{if(localStorage.removeItem("token"),localStorage.removeItem("token-init-date"),e==="/"||e==="/login")return a(Y());if(e==="/calendar")return m.fire("Error",t.msg,"error"),a(Y())}},je=()=>e=>{localStorage.clear(),e(Ue()),e(Y())},j=e=>({type:i.authLogin,payload:e}),Ue=()=>({type:i.authLogOut}),Y=()=>({type:i.authCheckingFinish}),P=()=>({borderColor:"red",borderWidth:1,borderStyle:"solid",borderRadius:5}),W=({lEmail:e,lPassword:a})=>{const t={lEmail:null,lPassword:null};return e||(t.lEmail="El correo es obligatorio"),(!(e==null?void 0:e.includes("@"))||!(e==null?void 0:e.includes(".")))&&(t.lEmail="Ingrese Email valido"),a||(t.lPassword="Coloque su contrase\xF1a"),t.lEmail||t.lPassword?t:null},X=({name:e,rEmail:a,rPassword:t,rConfirmPassword:r})=>{const s={name:null,rEmail:null,rPassword:null,rConfirmPassword:null};return(!e||e.length<3)&&(s.name="Nombre es requerido y debe tener al menos 3 caracteres"),(!a||!a.includes("@")||!a.includes("."))&&(s.rEmail="Email es requerido y debe tener un formato valido"),(!t||t.length<6)&&(s.rPassword="Contrase\xF1a es requerida y debe tener al menos 6 caracteres"),r||(s.rConfirmPassword="Confirmar contrase\xF1a es requerida"),t!==r&&(s.rConfirmPassword="Las contrase\xF1as no coinciden"),s.name||s.rEmail||s.rPassword||s.rConfirmPassword?s:null},q=e=>{const[a,t]=p.exports.useState(e);return[a,({target:{name:o,value:d}})=>{t(v(f({},a),{[o]:d}))},()=>{t(e)},t]},K=()=>{const e=y(),[a,t,,]=q({lEmail:"",lPassword:""}),{lEmail:r,lPassword:s}=a,[o,d]=p.exports.useState(W(a)),[E,w]=p.exports.useState(!1);p.exports.useEffect(()=>{d(E?W(a):null)},[E,a]);const S=O=>{if(O.preventDefault(),o)return m.fire({title:"Complete los campos correctamente",icon:"error"});e(Ye(a))},[k,u,,]=q({name:"",rEmail:"",rPassword:"",rConfirmPassword:""}),{name:T,rEmail:x,rPassword:b,rConfirmPassword:L}=k,[l,D]=p.exports.useState(X(k)),[C,M]=p.exports.useState(!1);p.exports.useEffect(()=>{D(C?X(k):null)},[k,C]);const $=O=>{if(O.preventDefault(),l)return m.fire({title:"Complete los campos correctamente",icon:"error"});e(qe(k))};return n("div",{className:"container login-container",children:c("div",{className:"row",children:[c("div",{className:"col-md-6 login-form-1",children:[n("h3",{children:"Ingreso"}),c("form",{onSubmit:S,onBlur:()=>{w(!1)},onFocus:()=>{w(!0)},children:[c("div",{className:"form-group",children:[n("input",{type:"text",className:"form-control",placeholder:"Correo",name:"lEmail",value:r,onChange:t,style:(o==null?void 0:o.lEmail)&&P(),autoComplete:"off"}),(o==null?void 0:o.lEmail)&&n("span",{className:"text-danger",children:o==null?void 0:o.lEmail})]}),n("div",{className:"form-group",children:n("input",{type:"password",className:"form-control",placeholder:"Contrase\xF1a",name:"lPassword",value:s,onChange:t,style:(o==null?void 0:o.lPassword)&&P(),autoComplete:"off"})}),(o==null?void 0:o.lPassword)&&n("span",{className:"text-danger",children:o==null?void 0:o.lPassword}),n("div",{className:"form-group",children:n("input",{type:"submit",className:"btnSubmit",value:"Login"})})]})]}),c("div",{className:"col-md-6 login-form-2",children:[n("h3",{children:"Registro"}),c("form",{onSubmit:$,onBlur:()=>{M(!1)},onFocus:()=>{M(!0)},children:[c("div",{className:"form-group",children:[n("input",{type:"text",name:"name",value:T,className:"form-control",placeholder:"Nombre",onChange:u,style:(l==null?void 0:l.name)&&P(),autoComplete:"off"}),(l==null?void 0:l.name)&&n("p",{className:"text-danger ",children:l.name})]}),c("div",{className:"form-group",children:[n("input",{type:"email",name:"rEmail",value:x,className:"form-control",placeholder:"Correo",onChange:u,style:(l==null?void 0:l.rEmail)&&P(),autoComplete:"off"}),(l==null?void 0:l.rEmail)&&n("p",{className:"text-danger",children:l.rEmail})]}),c("div",{className:"form-group",children:[n("input",{type:"password",name:"rPassword",value:b,className:"form-control",placeholder:"Contrase\xF1a",onChange:u,style:(l==null?void 0:l.rPassword)&&P(),autoComplete:"off"}),(l==null?void 0:l.rPassword)&&n("p",{className:"text-danger",children:l.rPassword})]}),c("div",{className:"form-group",children:[n("input",{name:"rConfirmPassword",value:L,onChange:u,type:"password",className:"form-control",placeholder:"Repita la contrase\xF1a",style:(l==null?void 0:l.rConfirmPassword)&&P(),autoComplete:"off"}),(l==null?void 0:l.rConfirmPassword)&&n("p",{className:"text-danger",children:l.rConfirmPassword})]}),n("div",{className:"form-group",children:n("input",{type:"submit",className:"btnSubmit",value:"Crear cuenta"})})]})]})]})})};const ze=e=>async a=>{const t=await F("events/createEvent",e,"POST");return t.ok?(m.fire("Evento creado",t.event.title,"success"),a(Qe(v(f({},t.event),{start:g(t.event.start).toDate(),end:g(t.event.end).toDate()})))):m.fire("Error al crear el evento",t.event.title,"success")},le=()=>async e=>{const a=await F("events/getEvents");if(a.ok)return e(Xe(a.events));console.log(a.msg)},Je=(e,a)=>async t=>{const r=await F(`events/updateEvent/${a}`,e,"PUT");if(r.ok)return m.fire("Evento actualizado","","success"),t(We(v(f({},r.event),{start:g(r.event.start).toDate(),end:g(r.event.end).toDate()})));m.fire("Error al actualizar el evento",r.msg,"error")},He=e=>async a=>{if((await m.fire({title:"\xBFQuiere eliminar el evento?",showDenyButton:!0,confirmButtonText:"Si",denyButtonText:"No",customClass:{actions:"my-actions",cancelButton:"order-1 right-gap",confirmButton:"order-2",denyButton:"order-3"}})).isConfirmed){const r=await F(`events/deleteEvent/${e}`,{},"DELETE");r.ok?(m.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:o=>{o.addEventListener("mouseenter",m.stopTimer),o.addEventListener("mouseleave",m.resumeTimer)}}).fire({icon:"success",title:"Evento eliminado"}),a(Ke(r.event))):(m.fire(r.msg,"","error"),a(I(null)))}},I=e=>({type:i.eventSetActive,payload:e}),Qe=e=>({type:i.eventAddNew,payload:e}),We=e=>({type:i.eventUpdated,payload:e}),Xe=e=>({type:i.eventsGet,payload:e}),Ke=e=>({type:i.eventDeleted,payload:e}),Ze=()=>({type:i.cleanData}),et=()=>{const{name:e}=N(r=>r.auth),a=y();return c("div",{className:"navbar navbar-dark bg-dark ",children:[n("span",{className:"navbar-brand ms-3",children:e}),c("button",{className:"btn btn-outline-danger me-3",onClick:()=>{a(Ze()),a(je())},children:[n("i",{className:"fa-solid fa-right-from-bracket"}),n("span",{children:" Salir"})]})]})},ce=()=>({type:i.uiOpenModal,payload:{modalOpen:!0}}),R=()=>({type:i.uiCloseModal,payload:{modalOpen:!1}}),tt=({event:e})=>{const{title:a,user:t,_id:r}=e,{activeEvent:s}=N(S=>S.calendar),o=G(),d=y();return c("div",{onClick:()=>{o(`?q=${r}`),d(I(e)),d(ce())},className:(()=>{if(s){const{id:S}=s;if(S===r)return"selectedEvent"}})(),children:[n("span",{children:a}),n("br",{}),c("strong",{children:[" - ",t==null?void 0:t.name]})]})};const A=g().minutes(0).seconds(0),_=A.clone().add(1,"hours"),at={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}},ie=()=>{const e=te(),{q:a}=Ee.parse(e.search);return a};ae.setAppElement("#root");const nt=()=>{const e=y(),a=G(),t=ie(),{modalOpen:r}=N(h=>h.ui),{activeEvent:s}=N(h=>h.calendar),[o,d]=p.exports.useState(A.toDate()),[E,w]=p.exports.useState(_.toDate()),[S,k]=p.exports.useState(!1),[u,T]=p.exports.useState(!1),x={title:"",notes:"",start:o,end:E},[b,L,,l]=q(x),{title:D,notes:C,start:M,end:$}=b;p.exports.useEffect(()=>{if(s!==null){const{start:h,end:V}=s;d(h),w(V),l(s)}else d(A.toDate()),w(_.toDate()),l(x)},[s]);const O=()=>{l(x),e(R()),a("/calendar")},de=()=>k(!S),ue=()=>T(!u),me=h=>{d(h.toDate()),l(v(f({},b),{start:h.toDate()}))},pe=h=>{w(h.toDate()),l(v(f({},b),{end:h.toDate()}))},he=h=>{h.preventDefault();const V=g(M),ge=g($);let U=C.trim().length<1,z=C.trim().length<1;V.isSameOrAfter(ge)&&m.fire({icon:"error",title:"Error",text:"La fecha de inicio no puede ser mayor o igual a la de finalizaci\xF3n"}),!U&&!z&&s&&(e(Je(b,t)),e(R())),!U&&!z&&!s&&(e(ze(b)),e(R())),d(A.toDate()),w(_.toDate()),O()},fe=g(o).subtract(1,"day"),ve=h=>h.isAfter(fe);return n("div",{children:c(ae,{isOpen:r,onRequestClose:O,style:at,closeTimeoutMS:500,className:"modal",overlayClassName:"modal-fondo",contentLabel:"Example Modal",children:[n("h1",{children:" Nuevo evento "}),n("hr",{}),c("form",{className:"container",onSubmit:he,children:[c("div",{className:"form-group mb-3",children:[c("label",{className:"date-open",onClick:de,children:["INICIO:",n("span",{children:g(o).format("DD/MM/YYYY/ LT")}),n("i",{className:"fa-solid fa-bars"})]}),n("div",{className:S?"datePickerOn":"datePickerOff",children:n(Q,{inputProps:{style:{width:250,background:"black",color:"white",cursor:"pointer"}},value:o,onChange:me,dateFormat:"DD-MM-YYYY",timeFormat:"hh:mm A",closeOnSelect:!0,closeOnClickOutside:!0,className:"picker"})})]}),c("div",{className:"form-group mb-3",children:[c("label",{className:"date-open",onClick:ue,children:["FIN:",n("span",{children:g(E).format("DD/MM/YYYY/ LT")}),n("i",{className:"fa-solid fa-bars"})]}),n("div",{className:u?"datePickerOn":"datePickerOff",children:n(Q,{inputProps:{style:{width:250,background:"black",color:"white",display:""}},value:E,onChange:pe,dateFormat:"DD-MM-YYYY",timeFormat:"hh:mm A",closeOnSelect:!0,closeOnClickOutside:!0,isValidDate:ve,className:"picker"})})]}),n("hr",{}),c("div",{className:"form-group mb-3",children:[n("label",{children:"Titulo y notas"}),n("input",{value:D||"",type:"text",className:`form-control ${(D==null?void 0:D.trim().length)<1&&"is-invalid"}`,placeholder:"T\xEDtulo del evento",name:"title",autoComplete:"off",onChange:L}),n("small",{id:"emailHelp",className:"form-text text-muted",children:"Una descripci\xF3n corta"})]}),c("div",{className:"form-group",children:[n("textarea",{className:`form-control ${(C==null?void 0:C.trim().length)<1&&"is-invalid"}`,placeholder:"Notas",rows:5,name:"notes",value:C,onChange:L}),n("small",{id:"emailHelp",className:"form-text text-muted",children:"Informaci\xF3n adicional"})]}),c("button",{type:"submit",className:"btn btn-outline-primary btn-block",children:[n("i",{className:"far fa-save"}),n("span",{children:" Guardar"})]})]})]})})},ot={allDay:"Todo el d\xEDa",previous:"<",next:">",today:"Hoy",month:"Mes",week:"Semana",day:"D\xEDa",agenda:"Agenda",date:"Fecha",time:"Hora",event:"Evento",noEventsInRange:"No hay eventos en este rango",showMore:e=>`+ Ver m\xE1s (${e})`},st=()=>{const e=y();return n("button",{className:"btn btn-primary fab",onClick:t=>{e(I(null)),e(ce())},style:{zIndex:"1000"},children:n("i",{className:"fas fa-plus"})})},rt=()=>{const e=y(),a=ie(),t=G();return n("button",{className:"fab-danger",onClick:()=>{e(He(a)),e(R()),t("/calendar")},children:n("i",{className:"fa-solid fa-trash-can"})})},lt={es:Pe},ct=ke({format:be,parse:De,startOfWeek:xe,getDay:Oe,locales:lt}),it=()=>{const{events:e}=N(u=>u.calendar),{activeEvent:a}=N(u=>u.calendar),{uid:t}=N(u=>u.auth),r=y(),s=()=>{switch(localStorage.getItem("lastView")){case"month":return"month";case"week":return"week";case"day":return"day";case"agenda":return"agenda";default:return"month"}},[o,d]=p.exports.useState(s());return c("div",{className:"calendar-screen",children:[n(et,{}),n(Le,{localizer:ct,startAccessor:"start",endAccessor:"end",events:e,style:{height:500},messages:ot,culture:"es",eventPropGetter:(u,T,x,b)=>({style:{backgroundColor:`${u.user._id===t?"#367CF7":"grey"}`,borderRadius:"0px",opacity:.8,display:"block",color:"white"}}),components:{event:tt},onSelectEvent:u=>{},onSelectSlot:()=>{r(I(null))},selectable:!0,onView:u=>{localStorage.setItem("lastView",u),d(u)},view:o}),n(st,{}),n(nt,{}),a&&n(rt,{})]})},dt=({children:e,logged:a})=>{const t=y();return p.exports.useEffect(()=>{t(le())},[t]),n(ne,{children:a?e:n(oe,{to:"/login"})})},Z=({children:e,logged:a})=>{const t=y();return p.exports.useEffect(()=>{t(le())},[t]),n(ne,{children:a?n(oe,{to:"/calendar"}):e})},ut=()=>{const e=N(s=>s.auth.uid),a=N(s=>s.auth.checking),t=y(),{pathname:r}=te();return p.exports.useEffect(()=>{t(Ge(r))},[t]),a?n("div",{children:"Loading..."}):c(Fe,{children:[n(B,{path:"/",element:n(Z,{logged:e,children:n(K,{})})}),n(B,{path:"/login",element:n(Z,{logged:e,children:n(K,{})})}),n(B,{path:"/calendar",element:n(dt,{logged:e,children:n(it,{})})})]})};function mt(){return n("div",{className:"App",children:n(ut,{})})}const pt={uid:!1,name:!1,checking:!0},ht=(e=pt,a)=>{switch(a.type){case i.authLogin:return v(f(f({},e),a.payload),{checking:!1});case i.authCheckingFinish:return v(f({},e),{checking:!1});case i.authLogOut:return{checking:!1};default:return e}},ee={events:[],activeEvent:null},ft=(e=ee,a)=>{switch(a.type){case i.eventSetActive:return v(f({},e),{activeEvent:a.payload});case i.eventAddNew:return v(f({},e),{events:[...e.events,a.payload]});case i.eventUpdated:return v(f({},e),{events:e.events.map(t=>t._id===a.payload._id?a.payload:t)});case i.eventsGet:return v(f({},e),{events:a.payload.map(t=>v(f({},t),{start:g(t.start).toDate(),end:g(t.end).toDate()}))});case i.eventDeleted:return{activeEvent:null,events:e.events.filter(t=>t._id!==a.payload._id&&t)};case i.cleanData:return ee;default:return e}},vt={modalOpen:!1},gt=(e=vt,a)=>{switch(a.type){case i.uiOpenModal:return{modalOpen:!0};case i.uiCloseModal:return{modalOpen:!1};default:return e}},yt=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Ae,wt=Te({ui:gt,calendar:ft,auth:ht}),St=Me(wt,yt(Re(Ie)));$e.render(n(Ve,{children:n(Be,{store:St,children:n(mt,{})})}),document.getElementById("root"));
