(this["webpackJsonptype-chart-builder"]=this["webpackJsonptype-chart-builder"]||[]).push([[0],{100:function(e,t,n){},143:function(e,t,n){"use strict";n.r(t);var i=n(3),r=n.n(i),o=n(21),s=n.n(o),a=(n(99),n(12)),l=n(13),c=n(15),p=n(14),d=(n(100),n(162)),h=n(163),u=n(152),y=n(164),b=n(165),j=n(166),f=n(167),x=n(150),g=n(151),m=n(153),O=n(169),v=n(155),C=n(146),k=n(147),T=n(2);var w=function(e,t,n){return Object(T.jsx)("th",{children:Object(T.jsx)("div",{style:{width:"40px",textAlign:"left"},children:Object(T.jsx)(C.a,{style:{height:"40px",width:"80px",paddingLeft:"5px",backgroundColor:e[t].color,borderRadius:10,borderColor:"#CED4DA",borderWidth:"thin",transform:[{rotate:"270deg"},{translateX:20},{translateY:-20}]},children:Object(T.jsx)(k.a,{style:{height:"40px",width:"70px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",lineHeight:"40px",fontWeight:"bold",textShadow:"-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000",color:"#FFFFFF",textAlign:"left",paddingLeft:"2px",paddingRight:"2px"},children:t})})})},n)},F=function(e){Object(c.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(a.a)(this,n),(e=t.call(this)).state={hovering:!1},e}return Object(l.a)(n,[{key:"handleOnMouseHover",value:function(e){this.props.hoverable&&this.setState((function(t){return t.hovering=e,t}))}},{key:"handleOnMouseClick",value:function(){this.props.hoverable&&this.props.onClick()}},{key:"render",value:function(){var e=this;return Object(T.jsx)(C.a,{onClick:function(){return e.handleOnMouseClick()},onMouseEnter:function(){return e.handleOnMouseHover(!0)},onMouseLeave:function(){return e.handleOnMouseHover(!1)},style:{height:"40px",width:"80px",paddingLeft:"5px",backgroundColor:this.props.color,opacity:this.props.opacity?this.props.opacity:1,borderRadius:10,borderColor:"#CED4DA",borderWidth:"thin",transform:[{translateY:this.state.hovering?-2:0}],cursor:this.props.hoverable?"pointer":""},children:Object(T.jsx)(k.a,{style:{height:"40px",width:"70px",lineHeight:"40px",fontWeight:"bold",textShadow:"-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000",color:"#FFFFFF",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:this.props.rightAlign?"right":"left",paddingLeft:"2px",paddingRight:"2px"},children:this.props.type})},this.props.type)}}]),n}(r.a.Component),E=n(148),S=n(87),N=function(e){Object(c.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(a.a)(this,n),(e=t.call(this)).state={hovering:!1,editting:!1,editValue:1},e}return Object(l.a)(n,[{key:"handleOnMouseHover",value:function(e){this.setState((function(t){return t.hovering=e,t}))}},{key:"handleOnClick",value:function(e){this.props.edittable&&this.setState((function(t){return t.editting=!0,t.editValue=e,t}))}},{key:"handleOnValueChange",value:function(e){var t=e.target.value;!t.toString().includes("-")&&t>=0&&this.setState((function(e){return e.editValue=t,e}))}},{key:"handleOnFocus",value:function(e){e.target.select()}},{key:"handleOnBlur",value:function(e){this.props.onChange(e),this.setState((function(e){return e.editting=!1,e}))}},{key:"handleKeyPress",value:function(e){13===e.keyCode&&e.target.blur()}},{key:"calculateBackgroundColor",value:function(e){if(0===e)return"#646464";if(1===e)return"#E6E6FA";var t=Math.log2(e),n=1-Math.min(Math.abs(t),2)/2,i=Math.round(255*n).toString(16),r=i.length>1?i:"0"+i;return t<0?"#"+r+"FF"+r:"#FF"+r+r}},{key:"render",value:function(){var e=this;if(this.props.edittable&&this.state.editting)return Object(T.jsx)("td",{children:Object(T.jsx)(C.a,{style:{height:"40px",width:"40px"},children:Object(T.jsx)(E.a,{type:"number",min:0,max:99,precision:2,autoFocus:!0,onFocus:function(t){return e.handleOnFocus(t)},onBlur:function(t){return e.handleOnBlur(t)},onKeyDown:function(t){return e.handleKeyPress(t)},onMouseEnter:function(){return e.handleOnMouseHover(!0)},onMouseLeave:function(){return e.handleOnMouseHover(!1)},style:{height:"40px",width:"40px",lineHeight:"40px",textAlign:"center",paddingLeft:"0",paddingRight:"0"},value:this.state.editValue,onChange:function(t){return e.handleOnValueChange(t)}})})});var t=this.props.defendingTypeNames.map((function(t){return e.props.typeLookup[t].values[e.props.attackIndex]})).reduce((function(e,t){return e*t}),1),n=this.calculateBackgroundColor(t);return Object(T.jsx)("td",{children:Object(T.jsx)(C.a,{onMouseEnter:function(){return e.handleOnMouseHover(!0)},onMouseLeave:function(){return e.handleOnMouseHover(!1)},style:{height:"40px",width:"40px"},children:Object(T.jsx)(S.Textfit,{mode:"single",forceSingleModeWidth:!1,max:20,onClick:function(){return e.handleOnClick(t)},style:{height:"40px",width:"40px",lineHeight:"40px",fontWeight:"bold",textShadow:"-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000",color:"#FFFFFF",backgroundColor:n,borderRadius:this.props.edittable&&this.state.hovering?0:10,textAlign:"center",cursor:this.props.edittable?"pointer":""},children:t})})})}}]),n}(r.a.Component),M=function(e){Object(c.a)(n,e);var t=Object(p.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"horizontalTypeMap",value:function(e,t,n){var i=this;return Object(T.jsxs)("tr",{children:[Object(T.jsx)("td",{children:Object(T.jsx)(F,{type:t,color:this.props.types[t].color,rightAlign:!0})}),e.map((function(t,r){return Object(T.jsx)(N,{typeLookup:i.props.types,defendingTypeNames:[e[r]],attackIndex:n,edittable:!0,onChange:function(t){return i.props.onTypeMultiplierCellChange(t,e[r],n)}},n+"_"+r)}))]},t+n)}},{key:"render",value:function(){var e=this,t=Object.keys(this.props.types);return Object(T.jsxs)("div",{children:[Object(T.jsx)(k.a,{style:{paddingBottom:"10px",display:"inherit",textAlign:"center",width:0,minWidth:"100%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontSize:"x-large",fontWeight:"bold",textShadow:"-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000",color:"#FFFFFF"},children:this.props.title}),Object(T.jsxs)("div",{style:{paddingLeft:"115px"},children:[Object(T.jsx)("h6",{children:Object(T.jsx)(k.a,{style:{fontSize:20,fontWeight:"bold",textShadow:"-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000",color:"#FFFFFF"},children:"Defending Type"})}),Object(T.jsxs)(C.a,{style:{paddingTop:"40px",transform:[{translateX:-40}]},children:[Object(T.jsx)(C.a,{style:{position:"absolute",left:"auto",paddingTop:"45px",top:"50%",transform:[{rotate:"270deg"},{translateY:"-115px"}]},children:Object(T.jsx)("h6",{children:Object(T.jsx)(k.a,{style:{fontSize:20,fontWeight:"bold",textShadow:"-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000",color:"#FFFFFF"},children:"Attacking Type"})})}),Object(T.jsxs)("table",{children:[Object(T.jsx)("thead",{children:Object(T.jsxs)("tr",{children:[Object(T.jsx)("td",{}),t.map((function(t,n){return w(e.props.types,t,n)}))]})}),Object(T.jsx)("tbody",{children:t.map((function(n,i){return e.horizontalTypeMap(t,n,i)}))})]})]})]}),Object(T.jsx)("div",{id:this.props.watermarkId,style:{visibility:"hidden"},children:Object(T.jsxs)(k.a,{style:{paddingTop:"30px",paddingRight:"2px",paddingBottom:"2px",fontSize:"10px",display:"block",textAlign:"end"},children:["Made with TypeCharts (",window.location.href,")"]})})]})}}]),n}(r.a.Component),I=n(26),L=n(149),A=n(42),R=n(35),P=function(e){Object(c.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(a.a)(this,n),(e=t.call(this)).containerRef=r.a.createRef(),e.handleClickOutside=e.handleClickOutside.bind(Object(I.a)(e)),e.state={isEditting:!1,name:"",types:[]},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.handleClickOutside)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClickOutside)}},{key:"handleClickOutside",value:function(e){this.state.isEditting&&this.containerRef&&!this.containerRef.current.contains(e.target)&&this.setState((function(e){return e.isEditting=!1,e}))}},{key:"handleToggleEdit",value:function(){var e=this,t=!this.state.isEditting;this.setState((function(n){return n.isEditting=t,t&&(n.name=e.props.name,n.types=e.props.types),n}))}},{key:"handleNameChange",value:function(e){var t=e.target.value;this.setState((function(e){return e.name=t,e}))}},{key:"handleTypeClick",value:function(e){var t=this.state.types.includes(e)?this.state.types.filter((function(t){return t!==e})):this.state.types.concat(e);this.setState((function(e){return e.types=t,e}))}},{key:"render",value:function(){var e=this,t=Object.keys(this.props.typeLookup);return Object(T.jsx)(L.a,{style:{padding:0},children:Object(T.jsx)("div",{ref:this.containerRef,style:{paddingTop:"2%",paddingBottom:"2%",paddingLeft:"4%",paddingRight:"3%"},children:Object(T.jsxs)(x.a,{children:[Object(T.jsxs)(g.a,{sm:11,children:[Object(T.jsxs)(x.a,{style:{marginBottom:"1%"},children:[Object(T.jsx)(g.a,{sm:4,style:{paddingLeft:0,paddingRight:"1%"},children:Object(T.jsx)(E.a,{type:"text",value:this.state.isEditting?this.state.name:this.props.name,onChange:function(t){return e.handleNameChange(t)},disabled:!this.state.isEditting})}),Object(T.jsx)(g.a,{sm:8,children:Object(T.jsx)(x.a,{children:(this.state.isEditting?this.state.types:this.props.types).map((function(t){return Object(T.jsx)(F,{type:t,color:e.props.typeLookup[t].color,onClick:function(){return e.handleTypeClick(t)},hoverable:e.state.isEditting},t)}))})})]}),Object(T.jsx)(u.a,{isOpen:this.state.isEditting,onExiting:function(){return e.props.onEditted(e.state.name,e.state.types)},children:Object(T.jsx)(x.a,{style:{marginLeft:"5%",marginRight:"5%",marginBottom:"2%"},children:Object.keys(this.props.typeLookup).map((function(t){return Object(T.jsx)(F,{type:t,color:e.props.typeLookup[t].color,onClick:function(){return e.handleTypeClick(t)},opacity:e.state.types.includes(t)?.25:1,hoverable:!e.state.types.includes(t)},t)}))})}),Object(T.jsx)(x.a,{style:{paddingTop:"40px"},children:Object(T.jsxs)("table",{children:[Object(T.jsx)("thead",{children:Object(T.jsx)("tr",{children:t.map((function(t,n){return w(e.props.typeLookup,t,n)}))})}),Object(T.jsx)("tbody",{children:Object(T.jsx)("tr",{children:t.map((function(t,n){return Object(T.jsx)(N,{typeLookup:e.props.typeLookup,defendingTypeNames:e.state.isEditting?e.state.types:e.props.types,attackIndex:n,edittable:!1},t)}))})})]})})]}),Object(T.jsx)(g.a,{children:Object(T.jsxs)(x.a,{children:[Object(T.jsx)(m.a,{color:"danger",onClick:function(){return e.props.onDelete()},children:Object(T.jsx)(A.a,{})}),Object(T.jsx)(m.a,{color:"info",onClick:function(){return e.handleToggleEdit()},children:Object(T.jsx)(R.a,{})})]})})]})})})}}]),n}(r.a.Component),D=function(e){Object(c.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(a.a)(this,n),(e=t.call(this)).containerRef=r.a.createRef(),e.handleClickOutside=e.handleClickOutside.bind(Object(I.a)(e)),e.hasChanges=!1,e.state={typeCombos:[]},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.handleClickOutside)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClickOutside)}},{key:"handleClickOutside",value:function(e){if(this.hasChanges&&this.containerRef&&!this.containerRef.current.contains(e.target)){var t=this.state.typeCombos;this.hasChanges=!1,this.props.onSendChanges(t),this.setState((function(e){return e.typeCombos=null,e}))}}},{key:"handleTypeComboAdd",value:function(){var e=[{name:"",types:[]}].concat(this.hasChanges?this.state.typeCombos:this.props.typeCombos);this.hasChanges=!0,this.setState((function(t){return t.typeCombos=e,t}))}},{key:"handleTypeComboEditted",value:function(e,t,n){var i=(this.hasChanges?this.state.typeCombos:this.props.typeCombos).map((function(i,r){return r===e?{name:t,types:n}:i}));this.hasChanges=!0,this.setState((function(e){return e.typeCombos=i,e}))}},{key:"handleTypeComboDelete",value:function(e){var t=(this.hasChanges?this.state.typeCombos:this.props.typeCombos).filter((function(t,n){return n!==e}));this.hasChanges=!0,this.setState((function(e){return e.typeCombos=t,e}))}},{key:"render",value:function(){var e=this;return Object(T.jsxs)("div",{ref:this.containerRef,children:[Object(T.jsx)(m.a,{color:"success",block:!0,onClick:function(){return e.handleTypeComboAdd()},style:{marginBottom:"1%"},children:"New Type Combo"}),Object(T.jsx)("div",{className:"list-group",children:(this.hasChanges?this.state.typeCombos:this.props.typeCombos).map((function(t,n){return Object(T.jsx)(P,{typeLookup:e.props.typeLookup,name:t.name,types:t.types,onEditted:function(t,i){return e.handleTypeComboEditted(n,t,i)},onDelete:function(){return e.handleTypeComboDelete(n)}},n)}))})]})}}]),n}(r.a.Component),B=n(154),V=n(156),W=n(157),H=n(168);var z=function(e){return Object(T.jsxs)(L.a,{style:{paddingLeft:"0%"},children:[Object(T.jsxs)(x.a,{children:[Object(T.jsx)(g.a,{sm:2,style:{paddingLeft:"5%",visibility:e.deletable?"visible":"hidden"},children:Object(T.jsx)(m.a,{color:"danger",onClick:e.deletable?e.onDelete:null,children:Object(T.jsx)(A.a,{})})}),Object(T.jsx)(g.a,{sm:6,style:{paddingRight:"1%"},children:Object(T.jsx)(E.a,{value:e.typeName,onChange:e.onTypeNameChange,invalid:e.errorMessage.length>0,id:"typeFieldId"+e.uniqueId})}),Object(T.jsx)(g.a,{sm:1,style:{paddingRight:0,paddingLeft:"1%"},children:Object(T.jsx)(E.a,{type:"color",value:e.color,onChange:e.onColorChange,style:{padding:"5%",cursor:"pointer"}})}),Object(T.jsx)(g.a,{sm:3,style:{paddingLeft:"8%"},children:Object(T.jsx)(F,{type:e.typeName,color:e.color})})]}),e.errorMessage&&e.errorMessage.length>0&&Object(T.jsx)(H.a,{placement:"bottom",target:"typeFieldId"+e.uniqueId,children:e.errorMessage})]})},J=n(90),G=function(e){Object(c.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(a.a)(this,n),(e=t.call(this)).state={editTitle:"",editTypes:[]},e}return Object(l.a)(n,[{key:"handleRefreshForm",value:function(){var e=this,t=this.props.title;this.setState((function(n){return n.editTitle=t,n.editTypes=Object.keys(e.props.types).map((function(t){return{oldName:t,newName:t,color:e.props.types[t].color,errorMessage:""}})),n}))}},{key:"handleEditTitleNameChanged",value:function(e){var t=e.target.value;this.setState((function(e){return e.editTitle=t,e}))}},{key:"handleEditTypeNameChanged",value:function(e,t){var n=e.target.value;(/^[a-zA-Z]/.test(n)||n.length<=0)&&this.setState((function(e){return e.editTypes[t].newName=n,e}))}},{key:"handleEditTypeColorChanged",value:function(e,t){var n=e.target.value;this.setState((function(e){return e.editTypes[t].color=n,e}))}},{key:"handleEditTypeAdd",value:function(){var e=this.state.editTypes.concat({oldName:"",newName:"",color:"#FFFFFF",errorMessage:""});this.setState((function(t){return t.editTypes=e,t}))}},{key:"handleEditTypeDelete",value:function(e){if(this.state.editTypes.length>1){var t=this.state.editTypes.filter((function(t,n){return n!==e}));this.setState((function(e){return e.editTypes=t,e}))}}},{key:"handleEditTypesSubmit",value:function(){for(var e=[],t=!0,n=new Set,i=0;i<this.state.editTypes.length;++i){var r="";this.state.editTypes[i].newName.length<=0?(t=!1,r="Name cannot be blank"):n.has(this.state.editTypes[i].newName)?(t=!1,r='Type "'+this.state.editTypes[i].newName+'" already exists'):n.add(this.state.editTypes[i].newName),e.push({oldName:this.state.editTypes[i].oldName,newName:this.state.editTypes[i].newName,color:this.state.editTypes[i].color,errorMessage:r})}t?this.props.onSubmit(this.state):this.setState((function(t){return t.editTypes=e,t}))}},{key:"render",value:function(){var e=this;return Object(T.jsxs)(O.a,{isOpen:this.props.modalVisibility,backdrop:"static",toggle:function(){return e.props.toggle()},onOpened:function(){return e.handleRefreshForm()},children:[Object(T.jsx)(B.a,{toggle:function(){return e.props.toggle()},children:Object(T.jsx)(E.a,{id:"title",type:"text",onChange:function(t){return e.handleEditTitleNameChanged(t)},value:this.state.editTitle})}),Object(T.jsxs)(v.a,{children:[Object(T.jsx)(V.a,{flush:!0,children:this.state.editTypes.map((function(t,n){return Object(T.jsx)(z,{uniqueId:n,typeName:t.newName,color:t.color,deletable:e.state.editTypes.length>2,errorMessage:t.errorMessage,onTypeNameChange:function(t){return e.handleEditTypeNameChanged(t,n)},onColorChange:function(t){return e.handleEditTypeColorChanged(t,n)},onDelete:function(){return e.handleEditTypeDelete(n)}},n)}))}),Object(T.jsx)(m.a,{color:"success",block:!0,onClick:function(){return e.handleEditTypeAdd()},style:{marginTop:"2%"},children:Object(T.jsx)(J.a,{})})]}),Object(T.jsxs)(W.a,{children:[Object(T.jsx)(m.a,{color:"success",onClick:function(){return e.handleEditTypesSubmit()},children:"Save"}),Object(T.jsx)(m.a,{color:"danger",onClick:function(){return e.props.toggle()},children:"Cancel"})]})]})}}]),n}(r.a.Component),U=n(158),Y=n(159),q=n(160),K=[n(91),n(92)],X=function(e){Object(c.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(a.a)(this,n),(e=t.call(this)).importFile=null,e.state={selectedPreset:0,importFileError:""},e}return Object(l.a)(n,[{key:"handleRefreshForm",value:function(){this.importFile=null,this.setState((function(e){return e.importFileError="",e}))}},{key:"handlePresetSelected",value:function(e){var t=e.target.value;this.setState((function(e){return e.selectedPreset=t,e}))}},{key:"handleImportdata",value:function(e){if(!e.hasOwnProperty("title"))throw new Error("Missing or invalid title");if(!e.hasOwnProperty("types"))throw new Error("Missing types");var t=Object.keys(e.types);if(t.forEach((function(n){if(!/^[a-zA-Z]/.test(n))throw new Error("Invalid type: "+n);if("object"!==typeof e.types[n]||null===e.types[n])throw new Error("Invalid or missing type body: "+n);if(!e.types[n].hasOwnProperty("color")||!/^#[0-9A-Fa-f]{6}$/i.test(e.types[n].color))throw new Error("Invalid or missing color");if(!(e.types[n].hasOwnProperty("values")&&Array.isArray(e.types[n].values)&&e.types[n].values.length===t.length&&e.types[n].values.every((function(e){return!isNaN(e)&&Number(e)>=0}))))throw new Error("Invalid or missing values")})),!(e.hasOwnProperty("typeCombos")&&Array.isArray(e.typeCombos)&&e.typeCombos.every((function(e){return"object"===typeof e&&null!==e&&e.hasOwnProperty("name")&&e.hasOwnProperty("types")&&Array.isArray(e.types)&&e.types.every((function(e){return t.includes(e)}))}))))throw new Error("invalid or missing typeCombos");this.props.onImport(e.title,e.types,e.typeCombos),this.importFile=null,this.setState((function(e){return e.importFileError="",e}))}},{key:"handleFileUpload",value:function(e){this.importFile=e.target.files[0],this.setState((function(e){return e.importFileError="",e}))}},{key:"handleImportFromFile",value:function(){var e=this;if(this.importFile){var t=this.importFile,n=new FileReader;n.onload=function(t){var n=t.target.result;try{var i=JSON.parse(n);e.handleImportdata(i)}catch(t){e.importFile=null,e.setState((function(e){return e.importFileError="Error parsing file: "+t.message,e}))}},n.onerror=function(t){e.importFile=null,e.setState((function(e){return e.importFileError="Error reading file: "+n.error,e}))};try{n.readAsText(t,"UTF-8")}catch(i){this.importFile=null,this.setState((function(e){return e.importFileError="An unexpected error occurred. Please try again.",e}))}}else this.setState((function(e){return e.importFileError="You must upload a file to import!",e}))}},{key:"render",value:function(){var e=this;return Object(T.jsxs)(O.a,{isOpen:this.props.modalVisibility,backdrop:"static",toggle:function(){return e.props.toggle()},onOpened:function(){return e.handleRefreshForm()},children:[Object(T.jsx)(B.a,{toggle:function(){return e.props.toggle()},children:"Import Type Chart"}),Object(T.jsxs)(v.a,{children:[Object(T.jsxs)(U.a,{body:!0,style:{marginBottom:"2%"},children:[Object(T.jsx)(Y.a,{tag:"h4",children:"Import from Preset"}),Object(T.jsx)(q.a,{children:"Import a premade type chart to view and customize."}),Object(T.jsx)(q.a,{children:Object(T.jsx)(E.a,{type:"select",value:this.state.selectedPreset,onChange:function(t){return e.handlePresetSelected(t)},style:{width:"50%"},children:K.map((function(e,t){return Object(T.jsx)("option",{value:t,children:e.title},t)}))})}),Object(T.jsx)(m.a,{color:"success",onClick:function(){return e.handleImportdata(K[e.state.selectedPreset])},children:"Import"})]}),Object(T.jsxs)(U.a,{body:!0,children:[Object(T.jsx)(Y.a,{tag:"h4",children:"Import from JSON"}),Object(T.jsx)(q.a,{children:"Import a previously created type chart from a JSON file."}),Object(T.jsxs)(q.a,{children:[Object(T.jsx)(E.a,{type:"file",accept:".tych.json",onChange:function(t){return e.handleFileUpload(t)}}),Object(T.jsx)("span",{style:{color:"#FF0000",display:"inline-block"},children:this.state.importFileError})]}),Object(T.jsx)(m.a,{color:"success",onClick:function(){return e.handleImportFromFile()},children:"Import"})]})]}),Object(T.jsx)(W.a,{children:Object(T.jsx)(m.a,{color:"danger",onClick:function(){return e.props.toggle()},children:"Cancel"})})]})}}]),n}(r.a.Component),Z=n(161),_=n(93),Q=n(94),$=function(e){Object(c.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(a.a)(this,n),(e=t.call(this)).state={includeTypeCombos:!1},e}return Object(l.a)(n,[{key:"handleCheckboxChange",value:function(e){var t=e.target.checked;this.setState((function(e){return e.includeTypeCombos=t,e}))}},{key:"handleExportAsPNG",value:function(){var e=this;Object(_.exportComponentAsPNG)(this.props.typeChartImageRef,{fileName:this.props.title.replaceAll(" ","-"),html2CanvasOptions:{letterRendering:!0,scale:2,backgroundColor:"azure",onclone:function(t){t.getElementById(e.props.watermarkId).style.visibility="visible"}}})}},{key:"handleExportAsJSON",value:function(){console.log("exporting as json");var e={title:this.props.title,types:this.props.types,typeCombos:this.state.includeTypeCombos?this.props.typeCombos:[],note:"You can import this file to "+window.location.href+" to view its contents"},t=new Blob([JSON.stringify(e)],{type:"application/json;charset=utf-8"});Object(Q.saveAs)(t,this.props.title.replaceAll(" ","-")+".tych.json")}},{key:"render",value:function(){var e=this;return Object(T.jsxs)(O.a,{isOpen:this.props.modalVisibility,backdrop:"static",toggle:function(){return e.props.toggle()},children:[Object(T.jsx)(B.a,{toggle:function(){return e.props.toggle()},children:"Export Type Chart"}),Object(T.jsxs)(v.a,{children:[Object(T.jsxs)(U.a,{body:!0,style:{marginBottom:"2%"},children:[Object(T.jsx)(Y.a,{tag:"h4",children:"Export as PNG"}),Object(T.jsx)(q.a,{children:"Export as an image to store or share. Note that PNGs cannot be imported to edit in the future."}),Object(T.jsx)(q.a,{}),Object(T.jsx)(m.a,{color:"success",onClick:function(){return e.handleExportAsPNG()},children:"Export"})]}),Object(T.jsxs)(U.a,{body:!0,children:[Object(T.jsx)(Y.a,{tag:"h4",children:"Export as JSON"}),Object(T.jsx)(q.a,{children:"Export as metadata to store for later use. This file can be imported in the future to view and edit from this site."}),Object(T.jsxs)(q.a,{children:[Object(T.jsx)(E.a,{type:"checkbox",id:"check",onChange:function(t){return e.handleCheckboxChange(t)},checked:this.includeTypeCombos,style:{marginLeft:"inherit"}}),Object(T.jsx)(Z.a,{for:"check",style:{marginLeft:"5%"},children:"Include Type Combos"})]}),Object(T.jsx)(m.a,{color:"success",onClick:function(){return e.handleExportAsJSON()},children:"Export"})]})]}),Object(T.jsx)(W.a,{children:Object(T.jsx)(m.a,{color:"danger",onClick:function(){return e.props.toggle()},children:"Cancel"})})]})}}]),n}(r.a.Component),ee=n(37),te=function(e){Object(c.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(a.a)(this,n),e=t.call(this),window.location.href.includes("?")&&(window.location.href="/"),e.typeChartImageRef=r.a.createRef(),e.watermarkId="TypeChartWatermark",e.state={modalVisibility:{edit:!1,import:!1,export:!1,info:!1},title:"Software Engineering",types:{Human:{color:"#C77B3D",values:[2,1,2,1,2,2]},Bug:{color:"#86FF24",values:[2,.5,1,1,1,.5]},Tech:{color:"#B6CDC6",values:[.5,2,2,2,0,0]},Coder:{color:"#00F010",values:[1,2,.5,.5,2,0]},Meeting:{color:"#E60000",values:[.5,.5,2,.5,.5,1]},Sleep:{color:"#3D3D3D",values:[.5,2,1,2,.5,2]}},typeCombos:[{name:"Programmer",types:["Human","Coder"]}]},e}return Object(l.a)(n,[{key:"handleTypeMultiplierCellChange",value:function(e,t,n){var i=e.target.value;this.setState((function(e){return e.types[t].values[n]=i,e}))}},{key:"handleModalToggle",value:function(e){var t=this.state.modalVisibility[e];this.setState((function(n){return n.modalVisibility[e]=!t,n}))}},{key:"handleEditTypesSubmit",value:function(e){for(var t=this,n=e.editTitle,i={},r=0;r<e.editTypes.length;++r){i[e.editTypes[r].newName]={color:e.editTypes[r].color,values:[]};for(var o=0;o<e.editTypes.length;++o)if(e.editTypes[r].oldName.length<=0||e.editTypes[o].oldName.length<=0)i[e.editTypes[r].newName].values.push(1);else{var s=Object.keys(this.state.types).indexOf(e.editTypes[o].oldName);i[e.editTypes[r].newName].values.push(this.state.types[e.editTypes[r].oldName].values[s])}}for(var a=[],l=function(n){var i={name:t.state.typeCombos[n].name,types:[]};t.state.typeCombos[n].types.forEach((function(t){var n=e.editTypes.find((function(e){return e.oldName===t}));n&&i.types.push(n.newName)})),a.push(i)},c=0;c<this.state.typeCombos.length;++c)l(c);this.setState((function(e){return e.title=n,e.types=i,e.typeCombos=a,e.modalVisibility.edit=!1,e}))}},{key:"handleTypeComboListChanged",value:function(e){this.setState((function(t){return t.typeCombos=e,t}))}},{key:"handleImport",value:function(e,t,n){this.setState((function(i){return i.title=e,i.types=t,i.typeCombos=n,i.modalVisibility.import=!1,i}))}},{key:"render",value:function(){var e=this;return Object(T.jsxs)("div",{className:"App",children:[Object(T.jsxs)(d.a,{color:"dark",dark:!0,expand:"md",children:[Object(T.jsx)(h.a,{href:"/",children:"TypeCharts"}),Object(T.jsxs)(u.a,{navbar:!0,children:[Object(T.jsxs)(y.a,{className:"mr-auto",navbar:!0,children:[Object(T.jsx)(b.a,{children:Object(T.jsx)(j.a,{onClick:function(){return e.handleModalToggle("info")},style:{cursor:"pointer"},children:"Info"})}),Object(T.jsx)(b.a,{children:Object(T.jsx)(j.a,{href:"https://github.com/mlaikhram/type-chart-builder",target:"_blank",children:"GitHub"})})]}),Object(T.jsx)(f.a,{children:"Made by Matthew Laikhram"})]})]}),Object(T.jsxs)("div",{className:"container-fluid",children:[Object(T.jsxs)(x.a,{style:{paddingTop:"40px"},children:[Object(T.jsxs)(g.a,{style:{paddingLeft:"3%",paddingBottom:"5%"},children:[Object(T.jsx)(x.a,{children:Object(T.jsx)(M,{ref:this.typeChartImageRef,title:this.state.title,types:this.state.types,onTypeMultiplierCellChange:function(t,n,i){return e.handleTypeMultiplierCellChange(t,n,i)},watermarkId:this.watermarkId})}),Object(T.jsx)(C.a,{style:{display:"inherit",transform:[{translateY:"-40px"}]},children:Object(T.jsxs)(x.a,{style:{paddingLeft:"75px"},children:[Object(T.jsx)(m.a,{color:"info",onClick:function(){return e.handleModalToggle("edit")},children:Object(T.jsx)(R.a,{})}),Object(T.jsx)(m.a,{color:"primary",onClick:function(){return e.handleModalToggle("import")},children:Object(T.jsx)(ee.b,{})}),Object(T.jsx)(m.a,{color:"success",onClick:function(){return e.handleModalToggle("export")},children:Object(T.jsx)(ee.a,{})})]})})]}),Object(T.jsx)(g.a,{children:Object(T.jsx)(D,{typeLookup:this.state.types,typeCombos:this.state.typeCombos,onSendChanges:function(t){return e.handleTypeComboListChanged(t)}})})]}),Object(T.jsx)(G,{title:this.state.title,types:this.state.types,modalVisibility:this.state.modalVisibility.edit,toggle:function(){return e.handleModalToggle("edit")},onSubmit:function(t){return e.handleEditTypesSubmit(t)}}),Object(T.jsx)(X,{onImport:function(t,n,i){return e.handleImport(t,n,i)},modalVisibility:this.state.modalVisibility.import,toggle:function(){return e.handleModalToggle("import")}}),Object(T.jsx)($,{title:this.state.title,types:this.state.types,typeCombos:this.state.typeCombos,typeChartImageRef:this.typeChartImageRef,modalVisibility:this.state.modalVisibility.export,toggle:function(){return e.handleModalToggle("export")},watermarkId:this.watermarkId}),Object(T.jsx)(O.a,{isOpen:this.state.modalVisibility.info,toggle:function(){return e.handleModalToggle("info")},children:Object(T.jsxs)(v.a,{children:[Object(T.jsx)("h5",{children:"What is TypeCharts?"}),Object(T.jsx)("p",{children:"Typecharts is a sandbox for gamers and designers to experiment with Type Charts and type combinations either for existing games or for the purpose of building a game that utilizes the Type Chart as a combat mechanic."}),Object(T.jsx)("h5",{children:"What can I do in TypeCharts?"}),Object(T.jsx)("p",{children:"TypeCharts allows you to customize your Type Chart by editting the values directly in each cell and by using the various options listed below:"}),Object(T.jsxs)("ul",{children:[Object(T.jsxs)("li",{children:[Object(T.jsx)(R.a,{}),"Edit: Modify the title and types displayed in the Type Chart"]}),Object(T.jsxs)("li",{children:[Object(T.jsx)(ee.b,{}),"Import: Load an existing Type Chart from one of the presets available, or from a previously exported file"]}),Object(T.jsxs)("li",{children:[Object(T.jsx)(ee.a,{}),"Export: Save your Type Chart as an image or as a tych.json file, which can be re-imported for later use"]})]}),Object(T.jsxs)("p",{children:["With TypeCharts, you can also test out your creation by adding Type Combos using the ",Object(T.jsx)("b",{children:"New Type Combo"})," button. Each Type Combo allows you to add a name and one or more types, which it will then use to calculate your combo's stats. This can help you determine which type combos are best for your strategy, or in a designer's case it could help determine if your type chart needs tweaking based on under/overtuned combinations."]}),Object(T.jsx)("h5",{children:"Upcoming Features"}),Object(T.jsx)("p",{children:"While TypeCharts is currently geared toward defensive typing analysis, there are plans to implement a feature for analysing offensive type combinations as well. Look out for more updates on that!"}),Object(T.jsx)("p",{children:"There are also various QoL updates being looked into, including a visual indicator to help more quickly determine which two types intersect with the Type Chart cell you are currently hovering over."})]})})]})]})}}]),n}(r.a.Component),ne=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,170)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),i(e),r(e),o(e),s(e)}))};n(142);s.a.render(Object(T.jsx)(r.a.StrictMode,{children:Object(T.jsx)(te,{})}),document.getElementById("root")),ne()},91:function(e){e.exports=JSON.parse('{"title":"Pok\xe9mon","types":{"Normal":{"color":"#aaaa99","values":["1",1,1,1,1,1,"2",1,1,1,1,1,1,"0",1,1,1,1]},"Fire":{"color":"#ec4225","values":[1,"0.5","2",1,"0.5","0.5",1,1,"2",1,1,"0.5","2",1,1,1,"0.5","0.5"]},"Water":{"color":"#4e9aff","values":[1,"0.5","0.5","2","2","0.5",1,1,1,1,1,1,1,1,1,1,"0.5",1]},"Electric":{"color":"#f5cc34","values":[1,1,"1","0.5","1",1,1,1,"2","0.5",1,1,1,1,1,1,"0.5",1]},"Grass":{"color":"#77cc55","values":[1,"2","0.5","0.5","0.5","2",1,"2","0.5","2",1,"2",1,1,1,1,1,1]},"Ice":{"color":"#66ccff","values":[1,"2",1,1,1,"0.5","2",1,1,1,1,1,"2",1,1,1,"2",1]},"Fighting":{"color":"#bb5545","values":[1,1,1,1,1,1,1,1,1,"2","2","0.5","0.5",1,1,"0.5",1,"2"]},"Poison":{"color":"#aa5599","values":[1,1,1,1,"0.5",1,"0.5","0.5","2",1,"2","0.5",1,1,1,1,1,"0.5"]},"Ground":{"color":"#ddbb55","values":[1,1,"2","0","2","2",1,"0.5",1,1,1,1,"0.5",1,1,1,1,1]},"Flying":{"color":"#8899ff","values":[1,1,1,"2","0.5","2","0.5",1,"0",1,1,"0.5","2",1,1,1,1,1]},"Psychic":{"color":"#ee5499","values":[1,1,1,1,1,1,"0.5",1,1,1,"0.5","2",1,"2",1,"2",1,1]},"Bug":{"color":"#aabb22","values":[1,"2",1,"1","0.5",1,"0.5",1,"0.5","2",1,1,"2",1,1,1,1,1]},"Rock":{"color":"#bbaa66","values":[1,"0.5","2",1,"2",1,"2","0.5","2","0.5",1,1,1,1,1,1,"2",1]},"Ghost":{"color":"#6667bc","values":["0",1,1,1,1,1,"0","0.5",1,1,1,"0.5",1,"2",1,"2",1,1]},"Dragon":{"color":"#7867ee","values":[1,"0.5","0.5","0.5","0.5","2",1,1,1,1,1,1,1,1,"2",1,1,"2"]},"Dark":{"color":"#775544","values":[1,1,1,1,1,1,"2",1,1,1,"0","2",1,"0.5",1,"0.5",1,"2"]},"Steel":{"color":"#aaaabb","values":["0.5","2",1,1,"0.5","0.5","2","0","2","0.5","0.5","0.5","0.5",1,"0.5",1,"0.5","0.5"]},"Fairy":{"color":"#ee99ee","values":[1,"1",1,1,1,1,"0.5","2",1,1,1,"0.5",1,1,"0","0.5","2",1]}},"typeCombos":[]}')},92:function(e){e.exports=JSON.parse('{"title":"Temtem","types":{"Neutral":{"color":"#e6f6f5","values":["1",1,1,1,1,1,1,"2",1,1,1,1]},"Wind":{"color":"#0dfdae","values":["1","0.5","0.5",1,1,1,"2",1,1,1,1,1]},"Earth":{"color":"#b77c60","values":[1,1,1,"2","0.5","2","0.5",1,1,"2","0.5","0.5"]},"Water":{"color":"#47cbff","values":[1,1,"0.5","0.5","0.5","2","2",1,1,1,1,"2"]},"Fire":{"color":"#e55e52","values":[1,1,"2","2","0.5","0.5",1,1,1,1,"0.5",1]},"Nature":{"color":"#abde72","values":[1,1,"0.5","0.5","2","0.5","0.5",1,1,1,1,"2"]},"Electric":{"color":"#fee37d","values":[1,"0.5","2",1,1,1,"0.5",1,1,1,"2",1]},"Mental":{"color":"#bc689b","values":["0.5",1,1,1,1,1,"2",1,"2","0.5","2",1]},"Digital":{"color":"#a6c0be","values":[1,1,1,"2",1,1,"2",1,"2",1,1,"0.5"]},"Melee":{"color":"#f5966b","values":[1,1,1,1,1,1,1,"2","2","0.5",1,1]},"Crystal":{"color":"#e04b6b","values":[1,1,"2",1,"2",1,"0.5","0.5",1,"2",1,"0.5"]},"Toxic":{"color":"#5a5a5a","values":[1,"2",1,"0.5",1,"0.5",1,1,1,1,1,"0.5"]}},"typeCombos":[]}')},99:function(e,t,n){}},[[143,1,2]]]);
//# sourceMappingURL=main.2397224b.chunk.js.map