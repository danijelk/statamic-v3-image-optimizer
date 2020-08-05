!function(t){var i={};function e(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="/",e(e.s=3)}([function(t,i){t.exports=function(t,i,e,s,n,a){var r,o=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(r=t,o=t.default);var l,u="function"==typeof o?o.options:o;if(i&&(u.render=i.render,u.staticRenderFns=i.staticRenderFns,u._compiled=!0),e&&(u.functional=!0),n&&(u._scopeId=n),a?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},u._ssrRegister=l):s&&(l=s),l){var p=u.functional,d=p?u.render:u.beforeCreate;p?(u._injectStyles=l,u.render=function(t,i){return l.call(i),d(t,i)}):u.beforeCreate=d?[].concat(d,l):[l]}return{esModule:r,exports:o,options:u}}},function(t,i,e){"use strict";i.a={computed:{translations:function(){return this.$store.state.statamic.config.translations}}}},function(t,i,e){"use strict";i.a={methods:{getBytes:function(t){var i=0==t?0:Math.floor(Math.log(t)/Math.log(1024));return 1*(t/Math.pow(1024,i)).toFixed(2)+" "+["B","kB","MB","GB","TB"][i]}}}},function(t,i,e){t.exports=e(4)},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e(5),n=e.n(s),a=e(8),r=e.n(a);Statamic.booting(function(){Statamic.$components.register("image_optimizer-fieldtype",n.a),Statamic.$components.register("image_optimizer-utility",r.a)})},function(t,i,e){var s=e(0)(e(6),e(7),!1,null,null,null);t.exports=s.exports},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e(1),n=e(2);i.default={mixins:[n.a,Fieldtype,s.a],created:function(){this.getAssetEditor()},data:function(){return{assetEditor:!1,asset:!1,loading:!1}},methods:{getAssetEditor:function(){for(var t=this.$stacks.stacks[0].$parent;t;){if(t.asset){this.assetEditor=t,this.asset=t.asset;break}t=!!t.$parent&&t.$parent}},doOptimize:function(){var t=this,i=cp_url("utilities/imageoptimizer/"+this.asset.id);this.$axios.post(i,{},this.toEleven).then(function(i){t.asset=i.data.asset,t.loading=!1}).catch(function(i){t.loading=!1}),this.loading=!0}},computed:{isImage:function(){return this.asset&&this.asset.isImage&&"svg"!==this.asset.extension},savings:function(){return this.asset.values.imageoptimizer.original_size-this.asset.values.imageoptimizer.current_size},percentage:function(){return(this.savings/this.asset.values.imageoptimizer.original_size*100).toFixed(2)}}}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.isImage?e("div",[t.loading?e("div",[e("loading-graphic",{staticClass:"mt-1"})],1):e("div",{staticClass:"text-sm text-grey"},[t.asset.values.imageoptimizer?e("div",[t._v("\n\n\t    \t\t"+t._s(t.translations["imageoptimizer::cp.original"])+": "+t._s(t.getBytes(t.asset.values.imageoptimizer.original_size))),e("br"),t._v("\n\t    \t\t"+t._s(t.translations["imageoptimizer::cp.reduced"])+": "+t._s(t.getBytes(t.savings))+" ("+t._s(t.percentage)+"%)"),e("br"),t._v(" "),e("a",{staticClass:"inline-block mt-1 text-red hover:underline",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.doOptimize(i)}}},[t._v(t._s(t.translations["imageoptimizer::cp.optimize-again"]))])]):e("div",[t._v("\n\n\t    \t\t"+t._s(t.translations["imageoptimizer::cp.not-optimized"])),e("br"),t._v(" "),e("a",{staticClass:"inline-block mt-1 text-red hover:underline",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.doOptimize(i)}}},[t._v(t._s(t.translations["imageoptimizer::cp.optimize"]))])])])]):t._e()},staticRenderFns:[]}},function(t,i,e){var s=e(0)(e(9),e(10),!1,null,null,null);t.exports=s.exports},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e(1),n=e(2);i.default={mixins:[n.a,Fieldtype,s.a],props:["stats"],data:function(){return{optimizing:!1,store:!1,list:[],index:0}},methods:{doOptimizeNew:function(){var t=this;this.list=this.statistics.images.filter(function(i){return t.statistics.optimized.indexOf(i)<0}),this.doOptimize()},doOptimizeAll:function(){this.list=this.statistics.images,this.doOptimize()},doOptimize:function(){var t=this,i=cp_url("utilities/imageoptimizer/"+this.list[this.index]+"?statistics=1");i+=this.index==this.list.length-1?"&clearcache=1":"",this.$axios.post(i,{},this.toEleven).then(function(i){t.index<t.list.length-1?(t.$nextTick(t.doOptimize),t.index++):(t.optimizing=!1,t.index=0),t.store=i.data.stats}).catch(function(i){t.optimizing=!1,t.index=0}),this.optimizing=!0}},computed:{statistics:function(){return this.store?this.store:this.stats},filesize:function(){return this.statistics.original_size-this.statistics.current_size},percentage:function(){return(this.filesize/this.statistics.original_size*100).toFixed(2)},progress:function(){return this.index/(this.list.length-1)*100+"%"},current:function(){return this.list[this.index]}}}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"image_optimizer-utility flex items-center justify-between"},[e("div",{staticClass:"flex items-center text-base text-grey"},[t._t("default"),t._v(" "),t.statistics.images.length?e("div",[t._v("\n\t\t\n\t\t\t"+t._s(t.translations["imageoptimizer::cp.optimized"])+" "+t._s(t.statistics.optimized.length)+" "+t._s(t.translations["imageoptimizer::cp.of"])+" "+t._s(t.statistics.images.length)+" "+t._s(t.translations["imageoptimizer::cp.images"])+"\n\t\t\t"),t.filesize?e("div",[t._v(t._s(t.translations["imageoptimizer::cp.reduced"])+" "+t._s(t.getBytes(t.filesize))+" ("+t._s(t.percentage)+"%)")]):t._e()]):e("div",[t._v("\n\t\t\t\n\t\t\t"+t._s(t.translations["imageoptimizer::cp.empty"])+"\n\n\t\t")])],2),t._v(" "),t.optimizing?e("div",{staticClass:"w-1/3 text-right"},[e("div",{staticClass:"progress h-3 mb-1 shadow"},[e("div",{staticClass:"progress-bar h-full bg-blue transition-width duration-500 ease-in-out",style:{width:t.progress}})]),t._v(" "),e("small",{staticClass:"text-s text-grey whitespace-no-wrap"},[t._v(t._s(t.translations["imageoptimizer::cp.optimizing"])+" "+t._s(t.index+1)+" "+t._s(t.translations["imageoptimizer::cp.of"])+" "+t._s(t.statistics.images.length)+" ("+t._s(t.current)+")")])]):t._e(),t._v(" "),t.statistics.images.length&&!t.optimizing?e("div",[e("button",{staticClass:"btn btn-primary",on:{click:t.doOptimizeAll}},[t._v(t._s(t.translations["imageoptimizer::cp.optimize"]))]),t._v(" "),t.statistics.images.length>t.statistics.optimized.length?e("button",{staticClass:"btn",on:{click:t.doOptimizeNew}},[t._v(t._s(t.translations["imageoptimizer::cp.optimize-new"]))]):t._e()]):t._e()])},staticRenderFns:[]}}]);