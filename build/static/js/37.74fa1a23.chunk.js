(this["webpackJsonpadmin-template"]=this["webpackJsonpadmin-template"]||[]).push([[37],{541:function(e,t,n){"use strict";var a=n(557),c=n(9),r=n(516),i=n(1),s=Object(c.a)(r.a)((function(e){var t=e.theme;return"\n        padding: ".concat(t.spacing(4,0),";\n")}));t.a=function(e){var t=e.children;return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)(s,{children:Object(i.jsx)(a.a,{maxWidth:"lg",children:t})})})}},542:function(e,t,n){"use strict";var a=n(516),c=n(557),r=n(137),i=n(535),s=n(9),o=n(1),d=Object(s.a)(a.a)((function(e){var t=e.theme;return"\n        border-radius: 0;\n        margin: ".concat(t.spacing(3)," 0;\n")}));t.a=function(){return Object(o.jsx)(d,{children:Object(o.jsx)(c.a,{maxWidth:"lg",children:Object(o.jsxs)(a.a,{py:3,display:{xs:"block",md:"flex"},alignItems:"center",textAlign:{xs:"center",md:"left"},justifyContent:"space-between",children:[Object(o.jsx)(a.a,{children:Object(o.jsx)(r.a,{variant:"subtitle1",children:"\xa9 2021 - Tokyo Free White React Admin Dashboard"})}),Object(o.jsxs)(r.a,{sx:{pt:{xs:2,md:0}},variant:"subtitle1",children:["Crafted by ",Object(o.jsx)(i.a,{href:"https://bloomui.com",target:"_blank",rel:"noopener noreferrer",children:"BloomUI.com"})]})]})})})}},543:function(e,t,n){"use strict";var a=n(24);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(25)),r=n(1),i=(0,c.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"AddTwoTone");t.default=i},544:function(e,t,n){"use strict";var a=n(6),c=n(196),r=n(543),i=n.n(r),s=n(577),o=n(137),d=n(517),j=n(1),l=["heading","subHeading","docs","noButton"];t.a=function(e){var t=e.heading,n=void 0===t?"":t,r=e.subHeading,u=void 0===r?"":r,b=e.docs,h=void 0===b?"":b,O=e.noButton,x=void 0!==O&&O,m=Object(c.a)(e,l);return Object(j.jsxs)(s.a,Object(a.a)(Object(a.a)({container:!0,justifyContent:"space-between",alignItems:"center"},m),{},{children:[Object(j.jsxs)(s.a,{item:!0,children:[Object(j.jsx)(o.a,{variant:"h3",component:"h3",gutterBottom:!0,children:n}),Object(j.jsx)(o.a,{variant:"subtitle2",children:u})]}),!x&&Object(j.jsx)(s.a,{item:!0,children:Object(j.jsx)(d.a,{href:h,target:"_blank",rel:"noopener noreferrer",sx:{mt:{xs:2,md:0}},variant:"contained",startIcon:Object(j.jsx)(i.a,{fontSize:"small"}),children:n})})]}))}},549:function(e,t,n){"use strict";var a=n(2),c=n(3),r=n(0),i=(n(7),n(10)),s=n(193),o=n(9),d=n(12),j=n(105),l=n(136);function u(e){return Object(j.a)("MuiCardContent",e)}Object(l.a)("MuiCardContent",["root"]);var b=n(1),h=["className","component"],O=Object(o.a)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{padding:16,"&:last-child":{paddingBottom:24}}})),x=r.forwardRef((function(e,t){var n=Object(d.a)({props:e,name:"MuiCardContent"}),r=n.className,o=n.component,j=void 0===o?"div":o,l=Object(c.a)(n,h),x=Object(a.a)({},n,{component:j}),m=function(e){var t=e.classes;return Object(s.a)({root:["root"]},u,t)}(x);return Object(b.jsx)(O,Object(a.a)({as:j,className:Object(i.a)(m.root,r),ownerState:x,ref:t},l))}));t.a=x},564:function(e,t,n){"use strict";var a=n(24);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(25)),r=n(1),i=(0,c.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.default=i},690:function(e,t,n){"use strict";var a=n(24);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(25)),r=n(1),i=(0,c.default)((0,r.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");t.default=i},760:function(e,t,n){"use strict";n.r(t);var a=n(17),c=n(195),r=n(0),i=n(544),s=n(541),o=n(557),d=n(577),j=n(568),l=n(803),u=n(499),b=n(549),h=n(517),O=n(515),x=n(519),m=n(511),v=n(536),f=n(501),p=n(531),g=n(523),C=n(690),k=n.n(C),y=n(564),M=n.n(y),w=n(137),_=n(79),A=n(542),B=n(1),S=["username@gmail.com","user02@gmail.com"];function z(e){var t=e.onClose,n=e.selectedValue,a=e.open,c=function(e){t(e)};return Object(B.jsxs)(g.a,{onClose:function(){t(n)},open:a,children:[Object(B.jsx)(p.a,{children:"Set backup account"}),Object(B.jsxs)(x.a,{sx:{pt:0},children:[S.map((function(e){return Object(B.jsxs)(m.a,{button:!0,onClick:function(){return c(e)},children:[Object(B.jsx)(v.a,{children:Object(B.jsx)(O.a,{sx:{bgcolor:_.a[100],color:_.a[600]},children:Object(B.jsx)(k.a,{})})}),Object(B.jsx)(f.a,{primary:e})]},e)})),Object(B.jsxs)(m.a,{autoFocus:!0,button:!0,onClick:function(){return c("addAccount")},children:[Object(B.jsx)(v.a,{children:Object(B.jsx)(O.a,{children:Object(B.jsx)(M.a,{})})}),Object(B.jsx)(f.a,{primary:"Add account"})]})]})]})}t.default=function(){var e=Object(r.useState)(!1),t=Object(a.a)(e,2),n=t[0],O=t[1],x=Object(r.useState)(S[1]),m=Object(a.a)(x,2),v=m[0],f=m[1];return Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(c.a,{children:Object(B.jsx)("title",{children:"Modals - Components"})}),Object(B.jsx)(s.a,{children:Object(B.jsx)(i.a,{heading:"Modals",subHeading:"Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.",docs:"https://material-ui.com/components/dialogs/"})}),Object(B.jsx)(o.a,{maxWidth:"lg",children:Object(B.jsx)(d.a,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:Object(B.jsx)(d.a,{item:!0,xs:12,children:Object(B.jsxs)(j.a,{children:[Object(B.jsx)(l.a,{title:"Basic Dialog"}),Object(B.jsx)(u.a,{}),Object(B.jsxs)(b.a,{children:[Object(B.jsxs)(w.a,{variant:"subtitle1",component:"div",children:["Selected: ",v]}),Object(B.jsx)("br",{}),Object(B.jsx)(h.a,{variant:"outlined",onClick:function(){O(!0)},children:"Open simple dialog"}),Object(B.jsx)(z,{selectedValue:v,open:n,onClose:function(e){O(!1),f(e)}})]})]})})})}),Object(B.jsx)(A.a,{})]})}}}]);
//# sourceMappingURL=37.74fa1a23.chunk.js.map