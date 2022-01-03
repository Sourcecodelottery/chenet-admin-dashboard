(this["webpackJsonpadmin-template"]=this["webpackJsonpadmin-template"]||[]).push([[56],{542:function(e,t,n){"use strict";var i=n(516),a=n(557),r=n(137),o=n(535),c=n(9),s=n(1),l=Object(c.a)(i.a)((function(e){var t=e.theme;return"\n        border-radius: 0;\n        margin: ".concat(t.spacing(3)," 0;\n")}));t.a=function(){return Object(s.jsx)(l,{children:Object(s.jsx)(a.a,{maxWidth:"lg",children:Object(s.jsxs)(i.a,{py:3,display:{xs:"block",md:"flex"},alignItems:"center",textAlign:{xs:"center",md:"left"},justifyContent:"space-between",children:[Object(s.jsx)(i.a,{children:Object(s.jsx)(r.a,{variant:"subtitle1",children:"\xa9 2021 - Tokyo Free White React Admin Dashboard"})}),Object(s.jsxs)(r.a,{sx:{pt:{xs:2,md:0}},variant:"subtitle1",children:["Crafted by ",Object(s.jsx)(o.a,{href:"https://bloomui.com",target:"_blank",rel:"noopener noreferrer",children:"BloomUI.com"})]})]})})})}},570:function(e,t,n){"use strict";var i;n.d(t,"a",(function(){return i})),function(e){e.ValidationErrors="ValidationErrors",e.ValidationError="ValidationError",e.ICategorySimple="ICategorySimple",e.IPriceSimple="IPriceSimple",e.IPriceDoc="IPriceDoc",e.IAccountSimple="IAccountSimple",e.IGroupDoc="IGroupDoc",e.IGroupSimple="IGroupSimple",e.INotificationDoc="INotificationDoc",e.INotificationSimple="INotificationSimple",e.INewsSimple="INewsSimple"}(i||(i={}))},614:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return l})),n.d(t,"a",(function(){return u}));var i=n(22),a=n.n(i),r=n(23),o=function(e){var t=e.content,n=e.targetingOptions;return{query:'mutation {\n    createNews(input:{content:{ title:"'.concat(t.title,'", description: "').concat(t.description,'"}, targetingOptions:{min_age: ').concat(n.min_age,",max_age: ").concat(n.max_age,", sex: [").concat(n.sex,'], location: "').concat(n.location,'",  isForAll: ').concat(n.isForAll,"}}) {\n      __typename\n      ... on INewsSimple{\n      _id content {title description } targetingOptions{min_age max_age sex location  isForAll } sender createdAt updatedAt   \n       }\n      ... on ValidationError {\n        error_path errors {\n          error_code error_message\n        }\n      }\n    }\n  }")}},c=function(e){var t=e._id;return{query:'mutation {\n    removeNewsByID(_id: "'.concat(t,'") {\n      __typename\n      ... on INewsSimple{\n      _id content {title description } targetingOptions{ min_age max_age sex location isForAll } sender createdAt updatedAt   \n       }\n      ... on ValidationError {\n        error_path errors {\n          error_code error_message\n        }\n      }\n    }\n  }')}},s=function(e){var t=e.content,n=e.targetingOptions,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e,t){return null};a.a.post(r.a.baseURL,o({content:t,targetingOptions:n})).then((function(e){console.log(e.data.data.createNews),i(null,e.data.data.createNews)})).catch((function(e){return console.log("Error",e)}))},l=function(e){var t=e._id,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e,t){return null};a.a.post(r.a.baseURL,c({_id:t})).then((function(e){n(null,e.data.data.removeNewsByID)})).catch((function(e){return console.log("Error",e)}))},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e,t,n){return null};a.a.post(r.a.baseURL,{query:"{\n    fetchNewsesDoc{\n             _id content {title description } targetingOptions{min_age max_age sex location  isForAll } sender{first_name last_name _id phone_number email role is_active}  createdAt updatedAt   \n    }\n  }"}).then((function(t){console.log(t.data.data),e(null,t.data.data.fetchNewsesDoc,t)})).catch((function(e){return console.log("Error",e)}))}},749:function(e,t,n){"use strict";n.r(t),n.d(t,"CreateNews",(function(){return D}));var i=n(6),a=n(17),r=n(568),o=n(549),c=n(137),s=n(524),l=n(591),u=n(554),d=n(517),j=n(537),b=n(557),p=n(577),g=n(0),O=n(566),m=n(614),h=n(106),x=n(195),f=n(542),v=n(21),_=n(570),S=n(26),y=n(516),w=n(514),I=n(528),A=n(565),N=n(527),E=n(507),q=n(800),T=n(163),k=n(20),C=n(1);function D(e){var t=Object(v.h)(),n=Object(g.useState)(!1),h=Object(a.a)(n,2),T=(h[0],h[1],Object(g.useState)(!1)),D=Object(a.a)(T,2),F=D[0],W=D[1],V=Object(g.useState)(null),P=Object(a.a)(V,2),R=P[0],L=P[1],M=Object(g.useState)([]),U=Object(a.a)(M,2),G=U[0],B=U[1],J=Object(g.useState)(null),z=Object(a.a)(J,2),H=z[0],K=z[1],Q=Object(g.useState)(null),X=Object(a.a)(Q,2),Y=X[0],Z=X[1],$=Object(g.useState)([]),ee=Object(a.a)($,2),te=ee[0],ne=ee[1],ie=Object(g.useState)(null),ae=Object(a.a)(ie,2),re=ae[0],oe=ae[1],ce=Object(g.useState)(!1),se=Object(a.a)(ce,2),le=se[0],ue=se[1],de=Object(g.useState)(null),je=Object(a.a)(de,2),be=je[0],pe=(je[1],Object(g.useState)(null)),ge=Object(a.a)(pe,2),Oe=ge[0],me=(ge[1],Object(g.useState)(null)),he=Object(a.a)(me,2),xe=he[0],fe=(he[1],Object(g.useState)(null)),ve=Object(a.a)(fe,2),_e=ve[0],Se=(ve[1],Object(g.useState)(null)),ye=Object(a.a)(Se,2),we=(ye[0],ye[1],Object(g.useState)(null)),Ie=Object(a.a)(we,2),Ae=Ie[0],Ne=(Ie[1],function(e){W(!0),e.targetingOptions.sex=e.targetingOptions.sex.map((function(e){return"".concat(e)})),Object(m.b)(e,(function(e,n){switch(n.__typename){case _.a.ValidationError:case _.a.ValidationErrors:W(!1);break;case _.a.INewsSimple:W(!1),t(k.a.ADMIN.NEWS.ROUTE,{replace:!0})}}))}),Ee=Object(O.a)(),qe=Ee.register,Te=Ee.handleSubmit,ke=Ee.formState.errors,Ce={PaperProps:{style:{maxHeight:224,width:250}}};function De(e,t,n){return{fontWeight:-1===t.indexOf(e)?n.typography.fontWeightRegular:n.typography.fontWeightMedium}}var Fe=Object(S.a)(),We=function(e){var t=e.target.value;ne("string"===typeof t?t.split(","):t)};return console.log("jnkjbakjbkjbkjb"),Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(x.a,{children:Object(C.jsx)("title",{children:"Ethio Lottery"})}),Object(C.jsx)(b.a,{maxWidth:"lg",children:Object(C.jsx)(p.a,{sx:{mx:"auto"},container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:Object(C.jsx)(p.a,{item:!0,xs:12,children:Object(C.jsx)("form",{onSubmit:Te(Ne),children:Object(C.jsx)(r.a,{sx:{minWidth:275,marginTop:5,marginRight:5,padding:4},children:Object(C.jsxs)(o.a,{children:[Object(C.jsx)(c.a,{variant:"h3",component:"div",children:"Create News"}),Object(C.jsxs)(y.a,{children:[Object(C.jsx)(s.a,Object(i.a)(Object(i.a)({sx:{width:"60%",mt:4},error:!!(void 0!==ke.content&&ke.content.title||be)},qe("content.title",{required:!0})),{},{type:"text",label:"title",variant:"outlined",value:null!==R&&void 0!==R?R:"",onChange:function(e){L(e.target.value)},helperText:void 0!==ke.content&&ke.content.title?Object(C.jsx)("span",{children:"This field is required"}):be||null})),Object(C.jsx)(s.a,Object(i.a)(Object(i.a)({sx:{width:"60%",mt:4},error:!!(void 0!==ke.content&&ke.content.description||Oe)},qe("content.description",{required:!0})),{},{label:"description",onChange:function(e){B(G)},helperText:void 0!==ke.content&&ke.content.description?Object(C.jsx)("span",{children:"This field is required"}):Oe||null,variant:"outlined",type:"text",multiline:!0,rows:4})),Object(C.jsx)(y.a,{sx:{marginTop:5,color:"primary",fontWeight:"bold"},children:"Targeted User Options"}),Object(C.jsx)(s.a,Object(i.a)(Object(i.a)({value:null!==H&&void 0!==H?H:"",sx:{width:"60%",mt:4},error:!!(xe||void 0!==ke.targetingOptions&&ke.targetingOptions.min_age)},qe("targetingOptions.min_age",{required:!0})),{},{label:"minimum minAge",type:"number",variant:"outlined",onChange:function(e){K(e.target.value)},helperText:void 0!==ke.targetingOptions&&ke.targetingOptions.min_age?Object(C.jsx)("span",{children:"This field is required"}):xe||null})),Object(C.jsx)(s.a,Object(i.a)(Object(i.a)({value:null!==Y&&void 0!==Y?Y:"",sx:{width:"60%",mt:4},error:!!(_e||void 0!==ke.targetingOptions&&ke.targetingOptions.max_age)},qe("targetingOptions.max_age",{required:!0})),{},{label:"max minAge",type:"number",variant:"outlined",onChange:function(e){Z(e.target.value)},helperText:void 0!==ke.targetingOptions&&ke.targetingOptions.max_age?Object(C.jsx)("span",{children:"This field is required"}):xe||null})),Object(C.jsx)(s.a,Object(i.a)(Object(i.a)({value:null!==re&&void 0!==re?re:"",sx:{width:"60%",mt:4},error:!!(Ae||void 0!==ke.targetingOptions&&ke.targetingOptions.location)},qe("targetingOptions.location",{required:!0})),{},{label:"location",type:"text",variant:"outlined",onChange:function(e){oe(e.target.value)},helperText:void 0!==ke.targetingOptions&&ke.targetingOptions.max_age?Object(C.jsx)("span",{children:"This field is required"}):xe||null})),Object(C.jsxs)(N.a,{sx:{width:"60%",mt:4},children:[Object(C.jsx)(I.a,{id:"gender-selector",children:"Gender"}),Object(C.jsx)(E.a,Object(i.a)(Object(i.a)({error:!!(_e||void 0!==ke.targetingOptions&&ke.targetingOptions.sex)},qe("targetingOptions.sex",{required:!0})),{},{labelId:"gender-selector",id:"demo-multiple-chip",multiple:!0,value:te,onChange:We,input:Object(C.jsx)(w.a,{id:"select-multiple-chip",label:"gender"}),renderValue:function(e){return Object(C.jsx)(y.a,{sx:{display:"flex",flexWrap:"wrap",gap:.5},children:e.map((function(e){return Object(C.jsx)(q.a,{label:e},e)}))})},MenuProps:Ce,children:["MALE","FEMALE"].map((function(e){return Object(C.jsx)(A.a,{value:e,style:De(e,te,Fe),children:e},e)}))}))]}),Object(C.jsx)(y.a,{sx:{display:"block"},children:Object(C.jsx)(l.a,{control:Object(C.jsx)(u.a,Object(i.a)(Object(i.a)({},qe("targetingOptions.isForAll",{required:!1})),{},{checked:le,onChange:function(e){ue(e.target.checked)},sx:{"& .MuiSvgIcon-root":{fontSize:28}}})),label:"For All"})}),Object(C.jsx)(y.a,{sx:{display:"block"},children:Object(C.jsx)(d.a,{sx:{mt:4,px:5},variant:"contained",color:"primary",type:"submit",children:F?Object(C.jsx)(j.a,{style:{color:"white"}}):"create"})})]})]})})})})})}),Object(C.jsx)(f.a,{})]})}t.default=Object(h.b)((function(e){return{newses:Object(T.c)(e)}}),(function(e){return{SetNewses:function(t){return e(T.a.SetNewses(t))}}}))(D)}}]);
//# sourceMappingURL=56.70bd9565.chunk.js.map