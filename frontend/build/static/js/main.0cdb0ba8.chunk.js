(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{104:function(e,t,a){},143:function(e,t,a){},161:function(e,t,a){},163:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(22),o=a.n(l),s=a(11),c=a(12),i=a(14),u=a(13),m=a(15),d=a(167),h=a(170),p=a(168),g=a(169),b=(a(81),a(173)),f=a(174),E=(a(83),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"Home"},r.a.createElement("div",{className:"lander"},r.a.createElement("h1",null,"Read the globe"),r.a.createElement("p",null,"A simple app to read news around the world")))}}]),t}(n.Component)),w=a(33),v=a(23),_=a.n(v),O=a(164),j=a(165),S=a(171),k=a(166),y=(a(104),function(e){function t(e){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:this.props.className},r.a.createElement("form",{onSubmit:this.props.handleSubmit},"Signup"==this.props.className&&r.a.createElement(O.a,{controlId:"user_name",bsSize:"large"},r.a.createElement(j.a,null,"User Name"),r.a.createElement(S.a,{autoFocus:!0,type:"user_name",value:this.props.user_name,onChange:this.props.handleChange})),r.a.createElement(O.a,{controlId:"email",bsSize:"large"},r.a.createElement(j.a,null,"Email"),r.a.createElement(S.a,{autoFocus:!0,type:"email",value:this.props.email,onChange:this.props.handleChange})),r.a.createElement(O.a,{controlId:"password",bsSize:"large"},r.a.createElement(j.a,null,"Password"),r.a.createElement(S.a,{type:"password",value:this.props.password,onChange:this.props.handleChange})),r.a.createElement(k.a,{bsSize:"large",disabled:!this.props.validateForm,type:"submit"},this.props.className),"Signup"!=this.props.className?r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h4",null,"Don't have an account? "),r.a.createElement("form",{onSubmit:this.handleRegister},r.a.createElement(k.a,{bsSize:"large",type:"submit",href:"/signup"},"Signup"))):r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h4",null,"Already have an account? "),r.a.createElement("form",{onSubmit:this.handleRegister},r.a.createElement(k.a,{bsSize:"large",type:"submit",href:"/login"},"Login")))))}}]),t}(r.a.Component)),C=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.setState(Object(w.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),_.a.defaults.headers.post["Access-Control-Allow-Origin"]="*",_.a.post("http://localhost:5000/login",{email:a.state.email,password:a.state.password}).then(function(e){e.data.hasOwnProperty("token")?(window.localStorage.setItem("token",e.data.token),a.props.history.push("/globe")):"password incorrect"==e.data?alert("username password do not match"):alert("Username does not exist")}).catch(function(e){console.log(e)})},a.state={email:"",password:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"validateForm",value:function(){return this.state.email.length>0&&this.state.password.length>0}},{key:"render",value:function(){return r.a.createElement(y,{className:"Login",handleChange:this.handleChange,handleSubmit:this.handleSubmit,validateForm:this.validateForm,user_name:this.state.user_name,email:this.state.email,password:this.state.password})}}]),t}(n.Component),x=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.setState(Object(w.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),_.a.defaults.headers.post["Access-Control-Allow-Origin"]="*",_.a.post("http://localhost:5000/signup",{user_name:a.state.user_name,email:a.state.email,password:a.state.password}).then(function(e){e.data.hasOwnProperty("token")?(window.localStorage.setItem("token",e.data.token),a.props.history.push("/globe")):alert("Signup not successful")}).catch(function(e){console.log(e)})},a.state={user_name:"",email:"",password:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"validateForm",value:function(){return this.state.email.length>0&&this.state.password.length>0}},{key:"render",value:function(){return r.a.createElement(y,{className:"Signup",handleChange:this.handleChange,handleSubmit:this.handleSubmit,validateForm:this.validateForm,user_name:this.state.user_name,email:this.state.email,password:this.state.password})}}]),t}(n.Component),N=a(29),F=a.n(N),I=a(43),W=(a(142),a(143),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={percentage:0},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null," Reading Progress Bar "),this.nextStep,r.a.createElement(z,{percentage:this.props.total_read_count/this.props.total_available_count*100}))}}]),t}(r.a.Component)),z=function(e){return r.a.createElement("div",{className:"progress-bar"},r.a.createElement(A,{percentage:e.percentage}))},A=function(e){return r.a.createElement("div",{className:"filler",style:{width:"".concat(e.percentage,"%")}})},B=W,L=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onMarkerClick=function(e,t){return function(){window.WE.marker([e.latitude,e.longitude],"https://worldisbeautiful.net/tpl/img/icon-marker-focus.png").addTo(t).bindPopup("<a href={url}>{title}</a><br/><br/>".replace("{title}",e.title).replace("{url}",e.url)+e.abstract,{maxWidth:300,closeButton:!0});a.setState({read_articles:e.id}),a.state.total_articles_read.has(e.id)||a.setState(function(t){var a=t.total_articles_read;return{total_articles_read:new Set(a.add(e.id))}}),fetch("http://localhost:5000/read_articles",{headers:{"x-access-token":window.localStorage.getItem("token")},credentials:"include",method:"POST",body:a.state.read_articles})}},a.state={read_articles:[],total_articles_read:new Set,total_available_count:0},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=new window.WE.map("earth_div",{zoom:3,scrollWheelZoom:!0});window.WE.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png").addTo(t);var a=function(){var t=Object(I.a)(F.a.mark(function t(){var a,n,r,l,o;return F.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:5000/read_event.json",{headers:{"x-access-token":window.localStorage.getItem("token")},method:"GET",credentials:"include"});case 2:return a=t.sent,t.next=5,a.json();case 5:for(l in n=t.sent)r=n[l],e.state.total_articles_read.has(r)||(o=new Set(e.state.total_articles_read.add(r)),e.setState({total_articles_read:o}));case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}();(function(){var n=Object(I.a)(F.a.mark(function n(){var r,l,o,s;return F.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a();case 2:return n.next=4,fetch("http://localhost:5000/geo.json",{method:"GET",credentials:"include"});case 4:return r=n.sent,n.next=7,r.json();case 7:for(s in l=n.sent)o=l[s],e.setState({total_available_count:e.state.total_available_count+1}),void 0,(e.state.total_articles_read.has(o.id)?window.WE.marker([o.latitude,o.longitude],"https://worldisbeautiful.net/tpl/img/icon-marker-focus.png").addTo(t):window.WE.marker([o.latitude,o.longitude]).addTo(t)).bindPopup("<a href={url}>{title}</a><br/><br/>".replace("{title}",o.title).replace("{url}",o.url)+o.abstract,{maxWidth:300,closeButton:!0}).on("click",e.onMarkerClick(o,t));case 9:case"end":return n.stop()}},n,this)}));return function(){return n.apply(this,arguments)}})()()}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"earth_div"}),r.a.createElement(B,{total_read_count:this.state.total_articles_read.size,total_available_count:this.state.total_available_count}))}}]),t}(n.Component),P=function(){return r.a.createElement(b.a,null,r.a.createElement(f.a,{path:"/",exact:!0,component:E}),r.a.createElement(f.a,{path:"/login",exact:!0,component:C}),r.a.createElement(f.a,{path:"/signup",exact:!0,component:x}),r.a.createElement(f.a,{path:"/globe",exact:!0,component:L}))},T=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleLogOut=function(){window.localStorage.removeItem("token")},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return window.localStorage.getItem("token")?r.a.createElement("div",{className:"App container"},r.a.createElement(h.a,{fluid:!0,collapseOnSelect:!0},r.a.createElement(h.a.Header,null,r.a.createElement(h.a.Brand,null,r.a.createElement(d.a,{to:"/"},"Home"))),r.a.createElement(h.a.Collapse,null,r.a.createElement(p.a,{pullRight:!0},r.a.createElement(g.a,{href:"/globe"},"Globe"),r.a.createElement(g.a,{href:"/",onClick:this.handleLogOut},"Logout")))),r.a.createElement(P,null)):r.a.createElement("div",{className:"App container"},r.a.createElement(h.a,{fluid:!0,collapseOnSelect:!0},r.a.createElement(h.a.Header,null,r.a.createElement(h.a.Brand,null,r.a.createElement(d.a,{to:"/"},"Home"))),r.a.createElement(h.a.Collapse,null,r.a.createElement(p.a,{pullRight:!0},r.a.createElement(g.a,{href:"/signup"},"Signup"),r.a.createElement(g.a,{href:"/login"},"Login")))),r.a.createElement(P,null))}}]),t}(n.Component);a(161),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var R=a(172);o.a.render(r.a.createElement(R.a,null,r.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},75:function(e,t,a){e.exports=a(163)},81:function(e,t,a){},83:function(e,t,a){}},[[75,2,1]]]);
//# sourceMappingURL=main.0cdb0ba8.chunk.js.map