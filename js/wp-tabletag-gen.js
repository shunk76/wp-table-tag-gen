/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(a,b,c){if(arguments.length>1&&"[object Object]"!==String(b)){if(c=jQuery.extend({},c),(null===b||void 0===b)&&(c.expires=-1),"number"==typeof c.expires){var d=c.expires,e=c.expires=new Date;e.setDate(e.getDate()+d)}return b=String(b),document.cookie=[encodeURIComponent(a),"=",c.raw?b:encodeURIComponent(b),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}c=b||{};var f,g=c.raw?function(a){return a}:decodeURIComponent;return(f=new RegExp("(?:^|; )"+encodeURIComponent(a)+"=([^;]*)").exec(document.cookie))?g(f[1]):null};
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.11
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.11",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b)["offsetParent"in a.fn?"offsetParent":"parent"]();return c.length||(c=a("body")),parseInt(c.css("fontSize"),10)},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/**
 * WP TableTagGen script
 *
 * Copyright (c) 2014 Shunsuke KUSAKABE
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery(function(a){function b(){var b=.9*a(window).width(),c=.9*a(window).height();a("#TB_window").css({width:b+"px","margin-left":.5*-b+"px"}),a("#TB_ajaxContent").css({padding:"0",width:b+"px",height:c+"px"})}var c="WP TableTagGen";window.QTags&&QTags.addButton("ttg","table",function(){tb_show(c,"#TB_inline?height=&width=&inlineId=tabletag-gen",!1),b(),a(window).resize(function(){a("#TB_ajaxWindowTitle").text()===c&&b()}),window.localStorage&&(localStorage.clear(),localStorage.setItem("index",0),localStorage.setItem("undo",0),localStorage.setItem("o0",JSON.stringify({row:a("[name=row]").val(),col:a("[name=col]").val()})),localStorage.setItem("data0",a("#tag-wrapper").html()),a("#undo").attr("disabled","disabled"),a("#redo").attr("disabled","disabled"))},!1,!1,"Insert a table from WP TableTagGen",116)});
jQuery(function(a){function b(a){return new RegExp(a,"i").test(navigator.userAgent)}function c(b,c){l.find("table").empty();var d,e,f;for(d=0;b>d;d++){for(f=a("<tr />"),e=0;c>e;e++)a("<td />").appendTo(f);f.appendTo(l.find("table"))}}function d(b,d){var f;return 0>d?(f=a(this).val(),a(this).val(++f),c(o.val(),p.val()),g(e())):d>0&&(f=a(this).val(),--f,f>0&&(a(this).val(f),c(o.val(),p.val()),g(e()))),i(),!1}function e(){if(window.localStorage){var a=localStorage.getItem("index"),b=localStorage.getItem("undo"),c=l.html(),d={row:o.val(),col:p.val()};return a==b?(a++,localStorage.setItem("data"+a,c),localStorage.setItem("o"+a,JSON.stringify(d)),localStorage.setItem("index",a),localStorage.setItem("undo",a)):a>b&&(b++,localStorage.setItem("data"+b,c),localStorage.setItem("o"+b,JSON.stringify(d)),localStorage.setItem("index",b),localStorage.setItem("undo",b)),f(),c}}function f(){if(window.localStorage){var b=Number(localStorage.getItem("index")),c=Number(localStorage.getItem("undo"));b==c?0==c?(a("#undo").attr("disabled","disabled"),a("#redo").attr("disabled","disabled")):(a("#undo").removeAttr("disabled"),a("#redo").attr("disabled","disabled")):0==c?(a("#undo").attr("disabled","disabled"),a("#redo").removeAttr("disabled")):(a("#undo").removeAttr("disabled"),a("#redo").removeAttr("disabled"))}}function g(c){var d;d=c?c:l.html(),d=d.toLowerCase().replace(/<\/table>/g,"\n</table>").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/ui-selecte(d\s|d)/g,"").replace(/ui-selecte(e\s|e)/g,"").replace(/ttg-merged/g,"").replace(/ class=\"\"/g,"").replace(/ class=\" \"/g,"").replace(/ style=\".*?\"/g,"").replace(/<tb.*?>/g,"\n<tbody>").replace(/<\/tbo.*?>/g,"\n</tbody>").replace(/<tr/g,"\n<tr").replace(/<\/tr/g,"\n</tr").replace(/<td/g,"\n<td").replace(/<th/g,"\n<th"),b("msie|trident")&&(d=d.replace(/ class=>/g,">").replace(/^\n/g,"")),a("[name=source]").val("").val(d)}function h(){a(".ui-selected."+s).each(function(){var b=Number(a(this).attr("rowspan")),c=Number(a(this).attr("colspan"));for(isNaN(c)&&(c=1),a(this).removeAttr("rowspan"),a(this).removeAttr("colspan"),e=1;c>e;e++){if(a(this).get(0).tagName.match(/td/i))var d=a("<td>");else a(this).get(0).tagName.match(/th/i)&&(d=a("<th>"));d.addClass("ui-selected"),d.insertAfter(a(this))}var e,f,g,h=a(this).parent("tr"),i=a("tr").index(h),j=i+1,k=(Number(p.val()),a(this).parent().children().index(a(this))-1);for(e=j;j+b-1>e;e++)for(g=a("tr:eq("+e+")").children(),f=0;c>f;f++)a(this).get(0).tagName.match(/td/i)?d=a("<td>"):a(this).get(0).tagName.match(/th/i)&&(d=a("<th>")),d.addClass("ui-selected"),-1==k?d.insertBefore(g[0]):d.insertAfter(g[k]?g[k]:g[g.length-1]);a(this).removeClass(s)})}function i(){l.find("input").remove(),a("#stripe-label").remove()}function j(b){var b=b||".default";a("#generator .message p").hide(),a(b).show();var c;a(b).hasClass("alert")&&(c=setTimeout(function(){a(b).fadeOut("normal",function(){a(".default").fadeIn()})},5e3)),clearTimeout(c)}var k="#tag-wrapper",l=a(k),m=l.find("table"),n=a("#ttg-header"),o=n.find("[name=row]"),p=n.find("[name=col]"),q=n.find("[name=row], [name=col]"),r=n.find(".button"),s="TTG-merged";c(o.val(),p.val()),g(),a("#class, #chars").show(),a("#output-chars, #output-class").hide(),a.cookie("checked",""),r.not("#undo, #redo").removeAttr("disabled"),l.mousedown(function(a){a.metaKey=!1}).selectable(),q.mouseup(function(){c(o.val(),p.val()),g(e())}).mousewheel(d),q.keyup(function(){var b=1*a(this).val();return/[0-9]/.test(b)===!1?void j("#ent-num"):1>b?void j("#ent-natural-num"):(c(o.val(),p.val()),void g(e()))}),window.localStorage?(localStorage.clear(),localStorage.setItem("index",0),localStorage.setItem("undo",0)):a("#undo, #redo, #initialize").hide(),a("#output-chars").click(function(){j(),r.not("#undo, #redo").removeAttr("disabled"),a("#chars").show(),a(this).hide(),q.mousewheel(d),l.find("td, th").each(function(){content=a(this).children("textarea").val(),content=content.replace(/<script.*?>/gi,"&lt;script&gt;").replace(/<\/script>/gi,"&lt;/script&gt;"),a(this).children("textarea").remove(),a(this).text(content)}),g(e())}),a("#output-class").click(function(){j(),r.not("#undo, #redo").removeAttr("disabled"),a("#class").show(),a(this).hide(),q.mousewheel(d),l.find("td, th").each(function(){var b=a(this).children("input").val();a(this).children("input").remove(),a(this).addClass(b).removeClass("class")});var b=a(".table-class").val();m.removeAttr("class"),b&&m.addClass(b);var c=[];a(".tr-class").each(function(b){c[b]=a(this).val()}),l.find("tr").each(function(b){a(this).removeAttr("class"),void 0!=c[b]&&a(this).addClass(c[b])}),i(),g(e())}),a("#chars").click(function(){j("#ent-chars"),a(".ui-selected").removeClass("ui-selected"),r.not("#output-chars").attr("disabled","disabled"),a(this).hide(),a("#output-chars").show(),q.unbind("mousewheel"),l.find("td, th").each(function(){var b=a(this).text();a(this).html('<textarea rows="2" name="textarea">'+b+"</textarea> ")}),b("webkit")&&l.find("td:has( input ), th:has( input )").css("padding","1px 3px 2px")}),a(document).on({focus:function(){var b=a(this).parents("tr");b.find("textarea").attr("rows","4"),b.prevAll().find("textarea").attr("rows","2"),b.nextAll().find("textarea").attr("rows","2")},blur:function(){m.find("textarea").attr("rows","2")}},"[name=textarea]"),a("#class").click(function(){j("#ent-class-names"),r.not("#output-class").attr("disabled","disabled"),a(this).hide(),a("#output-class").show(),q.unbind("mousewheel"),l.find("td, th").each(function(){a(this).removeClass("ui-selectee ui-selected "+s);var b=a(this).attr("class");void 0==b&&(b=""),a('<input type="text" value="'+b+'" size="5">').appendTo(this),a(this).children().addClass("class")});var c=-30;b("webkit")&&(c=-33,l.find("td:has( input ), th:has( input )").css("padding","3px"));var d=m.find("tr:first").position().left,e=m.attr("class");void 0!=e&&(e=e.replace(/ui-selecte(d\s|d)/g,"").replace(/ui-selecte(e\s|e)/g,"")),e||(e=""),a("<input />").val(e).attr({type:"text",size:"5",placeholder:"table","class":"table-class"}).css({position:"absolute",top:c+"px",left:d+4+"px"}).appendTo(k),a("<label />").attr("id","stripe-label").css({position:"absolute",top:c+5+"px",left:d-69+"px"}).appendTo(k),a("<input />").attr({type:"checkbox",id:"stripe"}).appendTo("#stripe-label").after("<span>stripe</span>"),l.find("tr").each(function(){c=b("firefox")?a(this).position().top+3:b("webkit")?a(this).position().top+4:b("meie|trident")?a(this).position().top+6:a(this).position().top+3;var d=a(this).position().left,e=a(this).attr("class");void 0!=e&&(e=e.replace(/ui-selecte(d\s|d)/g,"").replace(/ui-selecte(e\s|e)/g,"")),e||(e=""),a("<input />").val(e).attr({type:"text",size:"5",placeholder:"tr","class":"tr-class"}).css({position:"absolute",top:c+"px",left:d-75+"px"}).appendTo(k)}),a("#stripe").removeAttr("checked");var f=a.cookie("checked");1==f&&a("#stripe").attr("checked","checked");var g=[];a("#stripe-label").click(function(){a("#stripe").is(":checked")?(a.cookie("checked",1),a(".tr-class").each(function(b){g[b]=a(this).val();var c=a(this).val();a(this).val(b%2==0?"even"+(""!=c?" "+c:""):"odd"+(""!=c?" "+c:""))})):(a.cookie("checked",""),a(".tr-class").each(function(b){g[b]=a(this).val(),void 0!=g[b]?(g[b]=g[b].replace(/eve(n\s|n)/g,"").replace(/od(d\s|d)/g,""),a(this).val(g[b])):a(this).val("")}))})}),a(window).resize(function(){var c=-30;b("webkit")&&(c=-33);var d=m.find("tr:first").position().left;a(".table-class").css({position:"absolute",top:c+"px",left:d+4+"px"}),a("#stripe-label").css({position:"absolute",top:c+5+"px",left:d-69+"px"}),c=[],d=0,l.find("tr").each(function(e){b("firefox")?c[e]=a(this).position().top+3:b("webkit")&&(c[e]=a(this).position().top+4),d=a(this).position().left}),a(".tr-class").each(function(b){a(this).css({position:"absolute",top:c[b]+"px",left:d-75+"px"})})}),a("#merge").click(function(){var b=null,c=null,d=l.find("td.ui-selected, th.ui-selected");if(0===d.length&&j("#select-cells"),d.each(function(){a(this).get(0).tagName.match(/td/i)?b=!0:a(this).get(0).tagName.match(/th/i)&&(c=!0)}),1==b&&1==c)return j("#cant-merge"),!1;if(1==b&&null==c)var f="td";else null==b&&1==c&&(f="th");a(f+".ui-selected").each(function(){return a(this).hasClass(s)?(a(".ui-selected").removeClass("ui-selected"),j("#cant-remerge"),!1):void 0});var h=o.val(),i=p.val(),k=a(f+".ui-selected").parent("tr").addClass("ui-selected").length,n=a(f+".ui-selected").length/k;if(h==k&&i==n)m.html("<tr><"+f+"></"+f+"></tr>");else{h!=k&&i==n?k>1&&(a("tr.ui-selected:not( tr.ui-selected:first )").remove(),k=1):h==k&&i!=n&&n>1&&(l.find("tr.ui-selected").each(function(){a(this).children(f+".ui-selected:not( .ui-selected:first )").remove()}),n=1);var q=(a("tr").index(a("tr.ui-selected:first")),a(f).index(a(f+".ui-selected:first")));if(i>q);else;a("tr.ui-selected").each(function(b){0==b?n>1&&a(this).children(f+".ui-selected:not(.ui-selected:first)").remove():a(this).children(f+".ui-selected").remove()}),n>1&&a(f+".ui-selected:first").attr("colspan",n).addClass(s),k>1&&a(f+".ui-selected:first").attr("rowspan",k).addClass(s);var r=a("tr:empty").length;r>0&&(l.find("[rowspan]").each(function(){var b=a(this).attr("rowspan")-r;a(this).attr("rowspan",b),1==a(this).attr("rowspan")&&a(this).removeAttr("rowspan")}),l.find("tr:empty").remove(),h-=r),a("."+s).each(function(){void 0===a(this).attr("rowspan")&&void 0===a(this).attr("colspan")&&a(this).removeClass(s)})}g(e())}),a("#replace").click(function(){var b=l.find("td.ui-selected, th.ui-selected");0===b.length&&j("#select-cells"),b.each(function(){var b=a(this).text(),c=a(this).attr("colspan"),d=a(this).attr("rowspan"),e=a(this).attr("class"),f=a("td"==a(this).get(0).tagName.toLowerCase()?"<th>":"<td>");a(this).replaceWith(function(){return f.text(b),c&&f.attr("colspan",c),d&&f.attr("rowspan",d),e&&f.addClass(e).removeClass("ui-selected"),f})}),g(e())}),a("#split").click(function(){var a=l.find("td.ui-selected, th.ui-selected");0===a.length&&j("#select-cells"),h(),g(e())}),a("#undo").click(function(){if(window.localStorage){var a=localStorage.getItem("undo");a--;var b=JSON.parse(localStorage.getItem("o"+a));o.val(b.row),p.val(b.col);var c=localStorage.getItem("data"+a);l.empty().html(c),localStorage.setItem("undo",a),g(c),f(),i()}}),a("#redo").click(function(){if(window.localStorage){var a=(localStorage.getItem("index"),localStorage.getItem("undo"));a++;var b=JSON.parse(localStorage.getItem("o"+a));o.val(b.row),p.val(b.col);var c=localStorage.getItem("data"+a);l.empty().html(c),localStorage.setItem("undo",a),g(c),f(),i()}}),a("#initialize").click(function(){c(o.val(),p.val()),g(),window.localStorage&&(localStorage.clear(),localStorage.setItem("index",0),localStorage.setItem("undo",0),localStorage.setItem("o0",JSON.stringify({row:o.val(),col:p.val()})),localStorage.setItem("data0",l.html())),i(),f()}),a("#insert").click(function(){var b=a("[name=source]","#generator").val();a("#content").insertAtCaret(b),tb_remove()}),a.fn.extend({insertAtCaret:function(a){var b=this.get(0);b.focus();var c=b.value,d=b.selectionStart,e=d+a.length;b.value=c.substr(0,d)+a+c.substr(d),b.setSelectionRange(e,e)}})});