(this["webpackJsonpadmin-template"]=this["webpackJsonpadmin-template"]||[]).push([[38],{541:function(e,t,a){"use strict";var n=a(557),c=a(9),r=a(516),i=a(1),s=Object(c.a)(r.a)((function(e){var t=e.theme;return"\n        padding: ".concat(t.spacing(4,0),";\n")}));t.a=function(e){var t=e.children;return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)(s,{children:Object(i.jsx)(n.a,{maxWidth:"lg",children:t})})})}},542:function(e,t,a){"use strict";var n=a(516),c=a(557),r=a(137),i=a(535),s=a(9),o=a(1),j=Object(s.a)(n.a)((function(e){var t=e.theme;return"\n        border-radius: 0;\n        margin: ".concat(t.spacing(3)," 0;\n")}));t.a=function(){return Object(o.jsx)(j,{children:Object(o.jsx)(c.a,{maxWidth:"lg",children:Object(o.jsxs)(n.a,{py:3,display:{xs:"block",md:"flex"},alignItems:"center",textAlign:{xs:"center",md:"left"},justifyContent:"space-between",children:[Object(o.jsx)(n.a,{children:Object(o.jsx)(r.a,{variant:"subtitle1",children:"\xa9 2021 - Tokyo Free White React Admin Dashboard"})}),Object(o.jsxs)(r.a,{sx:{pt:{xs:2,md:0}},variant:"subtitle1",children:["Crafted by ",Object(o.jsx)(i.a,{href:"https://bloomui.com",target:"_blank",rel:"noopener noreferrer",children:"BloomUI.com"})]})]})})})}},543:function(e,t,a){"use strict";var n=a(24);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=n(a(25)),r=a(1),i=(0,c.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"AddTwoTone");t.default=i},544:function(e,t,a){"use strict";var n=a(6),c=a(196),r=a(543),i=a.n(r),s=a(577),o=a(137),j=a(517),l=a(1),d=["heading","subHeading","docs","noButton"];t.a=function(e){var t=e.heading,a=void 0===t?"":t,r=e.subHeading,b=void 0===r?"":r,u=e.docs,h=void 0===u?"":u,O=e.noButton,x=void 0!==O&&O,m=Object(c.a)(e,d);return Object(l.jsxs)(s.a,Object(n.a)(Object(n.a)({container:!0,justifyContent:"space-between",alignItems:"center"},m),{},{children:[Object(l.jsxs)(s.a,{item:!0,children:[Object(l.jsx)(o.a,{variant:"h3",component:"h3",gutterBottom:!0,children:a}),Object(l.jsx)(o.a,{variant:"subtitle2",children:b})]}),!x&&Object(l.jsx)(s.a,{item:!0,children:Object(l.jsx)(j.a,{href:h,target:"_blank",rel:"noopener noreferrer",sx:{mt:{xs:2,md:0}},variant:"contained",startIcon:Object(l.jsx)(i.a,{fontSize:"small"}),children:a})})]}))}},549:function(e,t,a){"use strict";var n=a(2),c=a(3),r=a(0),i=(a(7),a(10)),s=a(193),o=a(9),j=a(12),l=a(105),d=a(136);function b(e){return Object(l.a)("MuiCardContent",e)}Object(d.a)("MuiCardContent",["root"]);var u=a(1),h=["className","component"],O=Object(o.a)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{padding:16,"&:last-child":{paddingBottom:24}}})),x=r.forwardRef((function(e,t){var a=Object(j.a)({props:e,name:"MuiCardContent"}),r=a.className,o=a.component,l=void 0===o?"div":o,d=Object(c.a)(a,h),x=Object(n.a)({},a,{component:l}),m=function(e){var t=e.classes;return Object(s.a)({root:["root"]},b,t)}(x);return Object(u.jsx)(O,Object(n.a)({as:l,className:Object(i.a)(m.root,r),ownerState:x,ref:t},d))}));t.a=x},581:function(e,t,a){"use strict";a(0);var n=a(82),c=a(1);t.a=Object(n.a)(Object(c.jsx)("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight")},582:function(e,t,a){"use strict";a(0);var n=a(82),c=a(1);t.a=Object(n.a)(Object(c.jsx)("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft")},762:function(e,t,a){"use strict";a.r(t);var n=a(17),c=a(6),r=a(196),i=a(195),s=a(544),o=a(541),j=a(557),l=a(577),d=a(568),b=a(803),u=a(499),h=a(549),O=a(0),x=a(781),m=a(814),v=a(137),p=a(516),f=a(542),g=a(1),w=["children","value","index"];function C(e){var t=e.children,a=e.value,n=e.index,i=Object(r.a)(e,w);return Object(g.jsx)("div",Object(c.a)(Object(c.a)({role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},i),{},{children:a===n&&Object(g.jsx)(p.a,{sx:{p:3},children:Object(g.jsx)(v.a,{children:t})})}))}function y(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}t.default=function(){var e=Object(O.useState)(0),t=Object(n.a)(e,2),a=t[0],r=t[1];return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(i.a,{children:Object(g.jsx)("title",{children:"Tabs - Components"})}),Object(g.jsx)(o.a,{children:Object(g.jsx)(s.a,{heading:"Tabs",subHeading:"Tabs make it easy to explore and switch between different views.",docs:"https://material-ui.com/components/tabs/"})}),Object(g.jsx)(j.a,{maxWidth:"lg",children:Object(g.jsx)(l.a,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:Object(g.jsx)(l.a,{item:!0,xs:12,children:Object(g.jsxs)(d.a,{children:[Object(g.jsx)(b.a,{title:"Basic Example"}),Object(g.jsx)(u.a,{}),Object(g.jsx)(h.a,{children:Object(g.jsxs)(p.a,{sx:{width:"100%"},children:[Object(g.jsxs)(x.a,{variant:"scrollable",scrollButtons:"auto",textColor:"primary",indicatorColor:"primary",value:a,onChange:function(e,t){r(t)},"aria-label":"basic tabs example",children:[Object(g.jsx)(m.a,Object(c.a)({label:"Item One"},y(0))),Object(g.jsx)(m.a,Object(c.a)({label:"Item Two"},y(1))),Object(g.jsx)(m.a,Object(c.a)({label:"Item Three"},y(2)))]}),Object(g.jsx)(C,{value:a,index:0,children:"Item One"}),Object(g.jsx)(C,{value:a,index:1,children:"Item Two"}),Object(g.jsx)(C,{value:a,index:2,children:"Item Three"})]})})]})})})}),Object(g.jsx)(f.a,{})]})}}}]);
//# sourceMappingURL=38.49ce3415.chunk.js.map