curl(["js!"+z.moo],function(){function e(){var e=n().hash.replace("#",m),t=$$("#"+e+", a[name="+e+"]");return e&&t[f]?t[0]:0}function t(e){var t=n();return e.replace(t.protocol+"//"+t.host,m)}function n(){return i.location}function s(e,t){i.location=e}function a(e,t,n){var s;return function(){var a=this,i=arguments;clearTimeout(s),s=setTimeout(function(){s=null,n||e.apply(a,i)},t),n&&!s&&e.apply(a,i)}}var i=z.w,o=z.d,r=$(o.body),c=$("main"),l="/page/loaded",u="/sidebar/loaded",h="click",d="value",f="length",m="",p=function(){};z.isDebug&&sessionStorage.clear();var v=function(){var e;return function(){return e||(e=new Element("div",{"class":"device-state offscreen"}).inject(r)),parseInt(e.getStyle("z-index"),10)}}(),g={reloadAll:function(){this.reloadBSA()},reloadSidebar:function(){this.reloadBSA()},reloadBSA:function(){curl(["js!//s3.buysellads.com/ac/bsa.js"],function(){$$("script[id^=_bsap_js_]").destroy(),$$(".bsa").each(function(e){var t=e.get("data-bsa");if(t){var n=t.split("|");e.innerHTML='<div id="bsap_'+n[0]+'" class="bsarocks bsap_'+n[1]+'"></div>'}}),i._bsap&&_bsap.exec()})}},b=function(){var e={},t=e.hasOwnProperty;return{subscribe:function(n,s,a){t.call(e,n)||(e[n]=[]);var i=e[n].push(s)-1;return a&&s({}),{remove:function(){delete e[n][i]}}},publish:function(n,s){t.call(e,n)&&e[n].each(function(e){e(s||{})})}}}();Class.Binds=new Class({$bound:{},bound:function(e){return this.$bound[e]?this.$bound[e]:this.$bound[e]=this[e].bind(this)}}),Request.JSONP=new Class({Implements:[Chain,Events,Options],options:{onRequest:function(e){this.options.log&&winconsole&&console.log},onError:function(e){this.options.log&&winconsole&&console.warn},url:m,callbackKey:"callback",injectScript:o.head,data:m,link:"ignore",timeout:0,log:!1},initialize:function(e){this.setOptions(e)},send:function(e){if(!Request.prototype.check.call(this,e))return this;this.running=!0;var t=typeOf(e);("string"==t||"element"==t)&&(e={data:e}),e=Object.merge(this.options,e||{});var n=e.data;switch(typeOf(n)){case"element":n=$(n).toQueryString();break;case"object":case"hash":n=Object.toQueryString(n)}var s=this.index=Request.JSONP.counter++,a=e.url+(e.url.test("\\?")?"&":"?")+e.callbackKey+"=Request.JSONP.request_map.request_"+s+(n?"&"+n:m);a[f]>2083&&this.fireEvent("error",a),Request.JSONP.request_map["request_"+s]=function(){this.success(arguments,s)}.bind(this);var i=this.getScript(a).inject(e.injectScript);return this.fireEvent("request",[a,i]),e.timeout&&this.timeout.delay(e.timeout,this),this},getScript:function(e){return this.script||(this.script=new Element("script",{type:"text/javascript",async:!0,src:e})),this.script},success:function(e,t){this.running&&this.clear().fireEvent("complete",e).fireEvent("success",e).callChain()},cancel:function(){return this.running&&this.clear().fireEvent("cancel"),this},isRunning:function(){return!!this.running},clear:function(){return this.running=!1,this.script&&(this.script.destroy(),this.script=null),this},timeout:function(){return this.running&&(this.running=!1,this.fireEvent("timeout",[this.script.get("src"),this.script]).fireEvent("failure").cancel()),this}}),Request.JSONP.counter=0,Request.JSONP.request_map={},function(){function e(e){return/^(?:body|html)$/i.test(e.tagName)}Fx.Scroll=new Class({Extends:Fx,options:{offset:{x:0,y:0},wheelStops:!0},initialize:function(e,t){var n,s;this.element=this.subject=$(e),this.parent(t),"element"!=typeOf(this.element)&&(this.element=$(this.element.getDocument().body)),this.options.wheelStops&&(n=this.element,s=this.cancel.pass(!1,this),this.addEvent("start",function(){n.addEvent("mousewheel",s)},!0),this.addEvent("complete",function(){n.removeEvent("mousewheel",s)},!0))},set:function(){var e=Array.flatten(arguments);return Browser.firefox&&(e=[Math.round(e[0]),Math.round(e[1])]),this.element.scrollTo(e[0],e[1]),this},compute:function(e,t,n){return[0,1].map(function(s){return Fx.compute(e[s],t[s],n)})},start:function(e,t){var n;return this.check(e,t)?(n=this.element.getScroll(),this.parent([n.x,n.y],[e,t])):this},calculateScroll:function(e,t){var n,s=this.element,a=s.getScrollSize(),i=s.getScroll(),o=s.getSize(),r=this.options.offset,c={x:e,y:t};for(n in c)!c[n]&&0!==c[n]&&(c[n]=i[n]),"number"!=typeOf(c[n])&&(c[n]=a[n]-o[n]),c[n]+=r[n];return[c.x,c.y]},toTop:function(){return this.start.apply(this,this.calculateScroll(!1,0))},toLeft:function(){return this.start.apply(this,this.calculateScroll(0,!1))},toRight:function(){return this.start.apply(this,this.calculateScroll("right",!1))},toBottom:function(){return this.start.apply(this,this.calculateScroll(!1,"bottom"))},toElement:function(t,n){var s,a;return n=n?Array.from(n):["x","y"],s=e(this.element)?{x:0,y:0}:this.element.getScroll(),a=Object.map($(t).getPosition(this.element),function(e,t){return n.contains(t)?e+s[t]:!1}),this.start.apply(this,this.calculateScroll(a.x,a.y))},toElementEdge:function(e,t,n){var s,a,i,o,r,c;return t=t?Array.from(t):["x","y"],e=$(e),s={},a=e.getPosition(this.element),i=e.getSize(),o=this.element.getScroll(),r=this.element.getSize(),c={x:a.x+i.x,y:a.y+i.y},["x","y"].each(function(e){t.contains(e)&&(c[e]>o[e]+r[e]&&(s[e]=c[e]-r[e]),a[e]<o[e]&&(s[e]=a[e])),null==s[e]&&(s[e]=o[e]),n&&n[e]&&(s[e]=s[e]+n[e])},this),(s.x!=o.x||s.y!=o.y)&&this.start(s.x,s.y),this},toElementCenter:function(e,t,n){var s,a,i,o,r;return t=t?Array.from(t):["x","y"],e=$(e),s={},a=e.getPosition(this.element),i=e.getSize(),o=this.element.getScroll(),r=this.element.getSize(),["x","y"].each(function(e){t.contains(e)&&(s[e]=a[e]-(r[e]-i[e])/2),null==s[e]&&(s[e]=o[e]),n&&n[e]&&(s[e]=s[e]+n[e])},this),(s.x!=o.x||s.y!=o.y)&&this.start(s.x,s.y),this}})}();var y=function(e){return function(t){e.toElement(t)}}(new Fx.Scroll(i,{onComplete:function(){b.publish("/scroll/complete")}})),E={set:function(e,t){try{sessionStorage.setItem(e,t)}catch(n){}},get:function(e){try{return sessionStorage.getItem(e)}catch(t){}return null}};!function(){function e(e){return e.preventDefault(),e.type==h&&o.hasClass(l)?void t(m):(s&&clearTimeout(s),a=setTimeout(function(){n(c[0]),o.addClass(l),u.removeClass(d).addClass(f)},e.type==h?0:m),!1)}function t(e){a&&clearTimeout(a),s=setTimeout(function(){o.removeClass(l),u.removeClass(f).addClass(d)},e)}function n(e){o.getElements("."+l).removeClass(l),e.addClass(l),$("nav-"+e.get(r)).addClass(l)}var s,a,i=$$(".logo")[0],o=$("main-nav"),r="data-content",c=o.getElements("a["+r+"]"),l="active",u=$("logo-icon"),d=u.get("class").split(" ")[1],f=u.get("data-open-icon"),m=200;i.addEvents({mouseenter:e,click:e}),c.each(function(e){e.addEvent("mouseenter",function(){n(e)})}),o.addEvent("mouseenter",function(){s&&clearTimeout(s)}),$$(o,i).addEvent("mouseleave",function(){t(m)}).addEvent(h+":relay(a)",function(){a&&clearTimeout(a),o.removeClass(l)})}(),z.loadSidebar&&function(){function e(e){var t=new Element("div",{"class":"sidebar",html:e});c.parentNode.appendChild(t),t.fade(1)}var t="sidebar",n=E.get(t+"-punky"),s=function(){setTimeout(function(){g.reloadSidebar()},1e3)};n?(e(n),b.publish(u),s()):curl(["text!"+z.themePath+"/"+t+".php"],function(n){E.set(t+"-punky",n),e(n),b.publish(u),s()})}();var C=function(){return{trackPageView:function(){i.ga&&ga("send","pageview",location+m)},trackEvent:function(e,t){var n={hitType:"event",eventCategory:e.category||m,eventAction:e.action||m,eventLabel:e.label||m,eventValue:e.value||0,hitCallback:t||p};i.ga?ga("send",n):t&&t()}}}();z.analyticsID&&b.subscribe(l,function(){C.trackPageView()}),location.search&&C.trackEvent({category:"Search",label:location.search.replace("?s=",m)}),curl(["js!libs/prism.js"],function(){function e(e){$$(e||"pre, .comments code").each(function(e){if(!(e.get("prism")||e.hasClass("codepen")||e.getParent(".gist"))){var t=e.get("html");if("code"==e.get("tag")){if(-1==t.indexOf("\n"))return;e=new Element("pre").replaces(e),t=t.replace(/<br( \/)?>/g,"")}t=t.replace(/>/g,"&gt;").replace(/</g,"&lt;").trim();var n=e.className||"js",s="language-"+n.toLowerCase();e.set({html:'<code class="'+s+'">'+t+"</code>",prism:1,"class":s}),Prism.highlightElement(e)}})}var t=Prism.languages;t.xml=t.html=t.markup,t.json=t.js=t.javascript,t.shell=t.bash,t.sass=t.stylus=t.scss=t.css,b.subscribe(l,function(){e()},!0),b.subscribe("/comments/placed",function(t){e(t.element.getElements("pre, code"))})}),function(){function e(e,t,s){var a=t+s,i=function(t){e.get(n)||t&&"undefined"!=t&&"0"!=t&&new Element("span",{html:t}).inject(e.parentNode)&&e.set(n,1)},o=E.get(a);null!=o?i(o):new Request.JSONP({url:t,callback:"callback",timeout:5e3,onComplete:function(e){var t=e[s];i(t),E.set(a,t)}}).send()}function t(){var t=$$(".meta .get-count");t[f]&&t.each(function(t){{var n=t.getParent("ul"),s=n.get("data-url").replace(location.host,z.domain);n.get("data-title")}t.hasClass("twitter")||t.hasClass("facebook")&&e(t,"https://graph.facebook.com/?id="+s,"shares")})}var n="data-counted";r.addEvent(h+":relay(.social-icons a.soc)",function(e,t){e.stop();var n=t.getParent("ul"),s=encodeURIComponent(n.get("data-url")),a=n.get("data-title"),i=n.get("data-twitter-handle")||"davidwalshblog";t.hasClass("twitter")?open("http://twitter.com/share?url="+s+"&text="+a+" by @"+i,"tshare","height=400,width=550,resizable=1,toolbar=0,menubar=0,status=0,location=0"):t.hasClass("facebook")?open("http://facebook.com/sharer.php?s=100&p[url]="+s+"&p[images][0]="+z.themePath+"/images/open-graph.png&p[title]="+a,"fbshare","height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"):t.hasClass("google-plus")&&open("https://plus.google.com/share?url="+s,"gshare","height=270,width=630,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0")}),v()<=2&&function(){b.subscribe(l,function(){t()},!0)}()}(),b.subscribe(l,function(){var e=function(){i.CodePenEmbed&&CodePenEmbed.init()};$$(".codepen")[f]&&function(){if(i.CodePenEmbed)return e();var t=o.createElement("script");t.onload=e,t.async=!0,t.src="//codepen.io/assets/embed/ei.js",r.appendChild(t)}()},!0),b.subscribe(l,function(){$$(".twitter-tweet")[f]&&curl(["js!//platform.twitter.com/widgets.js"],function(){i.twttr&&twttr.widgets.load()})},!0),function(e){e.addEvent(h+":relay(.post-list > li)",function(e,t){var n=$(e.target);if("a"!=n.get("tag")&&!n.getParents("a")[f]){var a=t.get("data-url");if(e.meta||e.control)return e.preventDefault(),i.open(a),!1;History.push&&a.indexOf(location.hostname)>-1?(History.push(a),C.trackEvent({category:"Post List Click",action:a})):(s(a,"post-items"),C.trackEvent({category:"Post List Click _else_",action:a}))}})}(c),function(){var e=function(){var e="data-src";$$("img["+e+"]").each(function(t){t.addEvent("load",function(){t.removeAttribute(e)}),t.set("src",t.get(e))})};b.subscribe(l,e,!0),b.subscribe(u,e,!0)}(),function(){function e(e){$("comment-form").inject(e)}function t(t){var n=t.get("id").replace("comment-",m),s=$("comment");v()<=2&&new Element("img",{src:t.get("data-avatar"),alt:""}).inject(t,"top"),new Element("a",{html:'<i aria-hidden="true" class="fa fa-reply"></i>',href:"javascript:;",events:{click:function(){$("comment_parent").set(d,n),e(t),s.focus()}}}).inject(t.getElement(".comment-controls")),t.getElements("div[data-gist]").each(function(e){new Request.JSONP({url:e.get("data-gist")+".json",callback:"callback",timeout:5e3,onComplete:function(t){e.set("html",t.div),curl(["css!"+t.stylesheet])}}).send()}),t.getElements("div[data-fiddle]").each(function(e){new IFrame({src:e.get("data-fiddle")}).inject(e)})}var n;b.subscribe(l,function(){var e=$("comment-list");e&&e.addClass("avatars").getElements("li[data-avatar]").each(t)},!0),c.addEvent(h+":relay(#launch-editor)",function(){var e=($("launch-editor"),$("comment"));this.addClass("hidden");var t="libs/ace/",s=e;curl(["js!"+t+"consolidated.js"],function(){var e=new Element("div",{id:"ace-box"}).inject(s,"after");s.addClass("hidden");var t=n=ace.edit(e);t.setTheme("ace/theme/dreamweaver");var a=this.aceSession=t.getSession();a.setMode(new require("ace/mode/javascript").Mode()),a.setValue(s.get(d)),a.on("change",function(){s.set(d,t.getSession().getValue())}),setTimeout(function(){t.focus()},1e3)}),C.trackEvent({category:"Comments",action:"ACE code editor requested"})}),c.addEvent("submit:relay(#cForm)",function(e){e.preventDefault();var s=$("cForm");s.disabled||new Request({url:s.action,method:"post",onRequest:function(){s.disabled=!0},onSuccess:function(e){if("0"!=e){var a=$("comment_parent"),i=$("comment-list");if(a.get(d)){var o=s.getParent("li"),r=$(o.parentNode);if(r.hasClass("children"))r.insertAdjacentHTML("beforeend",e),i=r;else{var c=new Element("ul",{"class":"children"}).inject(o);c.insertAdjacentHTML("beforeend",e),i=c}}else i.insertAdjacentHTML("beforeend",e);var l=i.lastChild;t(l),b.publish("/comments/placed",{element:l}),$("comment").set(d,m),a.set(d,m),n&&n.setValue(m),$(s.parentNode).inject($("comment-form-holder")),y(l)}},onComplete:function(){s.disabled=!1}}).send(s.toQueryString()+"&legit=1")})}(),function(){var e=Element.NativeEvents,t=window.location,n=function(e){return e&&e.match(/^https?:\/\//)&&(e="/"+e.split("/").slice(3).join("/")),e},s=n(t.href),a=window.history,i="pushState"in a,o=i?"popstate":"hashchange";this.History=new new Class({Implements:[Class.Binds,Events],initialize:i?function(){e[o]=2,window.addEvent(o,this.bound("pop"))}:function(){e[o]=1,window.addEvent(o,this.bound("pop")),this.hash=t.hash;var n="onhashchange"in window;n&&(void 0===document.documentMode||document.documentMode>7)||(this.timer=this.check.periodical(200,this))},cleanURL:n,push:i?function(e,t,i){e=n(e),s&&s!=e&&(s=null),a.pushState(i||null,t||null,e),this.onChange(e,i)}:function(e){t.hash=n(e)},replace:i?function(e,t,s){a.replaceState(s||null,t||null,n(e))}:function(e){e=n(e),this.hash="#"+e,this.push(e)},pop:i?function(e){var a=n(t.href);return a==s?void(s=null):void this.onChange(a,e.event.state)}:function(){var e=t.hash;this.hash!=e&&(this.hash=e,this.onChange(n(e.substr(1))))},onChange:function(e,t){this.fireEvent("change",[e,t||{}])},back:function(){a.back()},forward:function(){a.forward()},getPath:function(){return n(i?t.href:t.hash.substr(1))},hasPushState:function(){return i},check:function(){this.hash!=t.hash&&this.pop()}})}.call(this),curl([],function(){function s(){r.addClass(S)}function a(){r.removeClass(S)}function u(t){r.hasClass("demo")&&d();var n=p(t);r.className=n.classes,c.set("html",n.postContent),z.d.title=n.title,$$("link[rel=canonical]").set("href",n.canonical),$$("#masthead-title-text").set("html",n.heading),b.publish(l),y(e()||$("top"))}function d(e){return $$(".demo-iframe").setStyle("display","none").destroy(),void 0!=g&&e&&setTimeout(function(){i.scrollTo(0,g);try{v&&v.focus()}catch(e){}},50),r.removeClass("demo"),!1}function p(e){var s="CONTENT",a="MASTHEAD",i=e.match(/<title>(.*)<\/title>/)[1],o={postContent:e.substring(e.indexOf("<!--"+s+"-->"),e.indexOf("<!--/"+s+"-->")),title:i,heading:(e.substring(e.indexOf("<!--"+a+"-->"),e.indexOf("<!--/"+a+"-->"))||i).replace(/\s(?=[^\s]*$)/g,"&nbsp;")},r=e.match(/body class="([^"]*)"/);o.classes=r&&r[1]?r[1]:m;var c=e.match(/<link rel="canonical" href="(.*)"/),l=n()+m;return o.canonical=c&&c[f]>1?c[1]:l,w[t(l)]=e,o}var v,g,E,w={},S="loading";c.addEvent("click:relay(.demo-closer)",function(e){e.preventDefault()}),p(o.documentElement.innerHTML),r.addEvent(h+":relay(a:not([href=#],[href=javascript:;],[data-noxhr]))",function(e,t){if(v=e.target,g=i.scrollY,!e.meta&&!e.control&&2!=e.event.which&&-1!=t.href.indexOf(location.hostname)){var s=t.href,a=n(),o=a+m;-1==s.indexOf(a.host)||s.split("#")[0]==o.split("#")[0]||t.get("target")||(e.stop(),(-1!==s.indexOf("/http")||-1!==s.indexOf('"'))&&C.trackEvent({category:"Suspicious History.push URL",action:s,label:t.outerHTML}),History.push(s))}});var x,E,j=new Request({method:"get",timeout:1e4,link:"cancel",onRequest:s,onSuccess:u,onFailure:function(){C.trackEvent({category:"AJAX Page Load Failure",action:this.url,label:location+m})},onComplete:a});History.addEvent("change",function(i){j.cancel();var o=e();if(z.d.body.hasClass("demo")||!o){i=function(){var e=n();return-1==i.indexOf("http")&&(i=e.protocol+"//"+e.host+i),i}();var c=i.split(".").pop();if(-1==i.indexOf("/demo/")||"php"!==c&&"html"!==c)w[t(i)]?(s(),a(),u(w[t(i)])):(j.url=i,j.send());else{if(!x){var l="$$('.demo-iframe').setStyle('display', 'none').destroy();History.back();return false;";x=new Element("div",{"class":"demo-box",html:'<div class="demo-toolbar">                   <span class="intro">Demo for:                     <a href="javascript:;" class="demo-closer" id="demo-title"></a>                   </span>                   <a href="javascript:;" class="green-button demo-closer close data-noxhr" on'+h+'="'+l+'">Close Demo<i class="fa fa-times"></i></a>                 </div><div class="demo-iframe-holder"></div>'}).inject(r)}E=new IFrame({src:i,frameborder:0,"class":"demo-iframe",events:{load:function(){try{E.contentWindow.document.documentElement.className="demo-frame"}catch(e){}}}}).inject(x.getFirst(".demo-iframe-holder")),linkEl=x.getElements(".intro a")[0],E.addClass("fadeIn"),E.src=i+"?";var d=$$("a[href="+i+"]"),m=$$("h1, h2")[0].innerHTML;if(d[f]){var p=d[0].getParent("li");p&&(m=p.getFirst("h2 a").innerHTML)}linkEl.set("html",m),r.addClass("demo")}}})}),function(){var e="fixed",t=a(function(t){var n=i.scrollY,s=r.hasClass(e),a=$("single-social");n>200?s||(r.addClass(e),a.inject($("masthead-title-text"),"before")):s&&(r.removeClass(e),$("meta").appendChild(a))},10);b.subscribe(l,function(){i[(r.hasClass("single")?"add":"remove")+"Event"]("scroll",t)},!0),b.subscribe(l,function(){$$("#masthead-title .social-icons").destroy()})}(),b.subscribe(l,function(){g.reloadAll(1)}),function(){function e(e){var s=$("x-secondary");if(s){var a=$$("article");if(a[f]){var i=$(a[0]).getFirst("> p");i&&s.inject(i,"after")}s.removeClass("hidden"),setTimeout(function(){$$(".wufoo").addClass(t+(n?"":" now")),n=!1},e)}}var t="complete",n=($("header-fx"),!0);b.subscribe(l,function(){e(0)}),e(1e3)}()});