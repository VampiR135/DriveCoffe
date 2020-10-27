"use strict";function scrollToElement(e){var t=parseInt(document.querySelector(".".concat(e)).getBoundingClientRect().top+window.pageYOffset-70);window.scrollTo({top:t,left:0,behavior:"smooth"})}if(String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.indexOf(e,t)===t}),window.onload=function(e,o){function t(){var e=window.pageYOffset,t=document.querySelector("header");0!==e?t.classList.contains("header--fixed")||t.classList.add("header--fixed"):t.classList.contains("header--fixed")&&t.classList.remove("header--fixed")}window.addEventListener("scroll",function(){t()}),t();var n=document.querySelector("header");if(document.querySelector(".header_menu_switcher ").onclick=function(){n.classList.contains("header--open")?(n.classList.remove("header--open"),document.body.style.overflow=""):(n.classList.add("header--open"),document.body.style.overflow="hidden")},document.querySelector(".home_slider"))new Swiper(".home_slider",{loop:!0,slidesPerView:"auto",spaceBetween:30,centeredSlides:!0,slideToClickedSlide:!0,pagination:{el:".home_slider_pagination",clickable:!0},breakpoints:{576:{}}});if(document.querySelector(".locations_slider"))new Swiper(".locations_slider",{loop:!0,slidesPerView:1,centeredSlides:!0,spaceBetween:30,pagination:{el:".locations_slider_pagination",clickable:!0},on:{slideChange:function(){var e=document.querySelector(".swiper-slide-active");window.openMarkerBaloon(e.getAttribute("data-id"))}}});function r(e,t){for(var o,n=(o=e,Array.prototype.slice.call(o.elements).reduce(function(e,t){var o={type:t.type,name:t.name,value:t.value};if(-1!==["checkbox","radio"].indexOf(t.type))o.checked=t.checked;else if("select-multiple"===t.type){o.value=[];for(var n=0;n<t.length;n++)o.value.push({value:t.options[n].value,selected:t.options[n].selected})}return o.name&&e.push(o),e},[])),r={},i=0;i<n.length;i++)r[n[i].name]=n[i].value;var a=new XMLHttpRequest;a.open("POST",{vacancy_form:"/api/v1/vacancy/",feedback_form:"/api/v1/feedback/"}[t],!0),a.setRequestHeader("Content-Type","application/json; charset=UTF-8"),a.setRequestHeader("X-CSRFToken",s),a.setRequestHeader("X-Forwarded-Proto",location.protocol.replace(":","")),a.onreadystatechange=function(){this.readyState===XMLHttpRequest.DONE&&(200<=this.status&&this.status<300?Toastify({text:"Данные успешно отправлены",close:!1,gravity:"top",position:"center",backgroundColor:"#99d99e",stopOnFocus:!0,className:"toastify_message"}).showToast():Toastify({text:"Произошла ошибка на сервере",close:!1,gravity:"top",position:"center",backgroundColor:"#ffb2b2",stopOnFocus:!0,className:"toastify_message"}).showToast())},a.onerror=function(){Toastify({text:"Произошла непредвиденная ошибка",close:!1,gravity:"top",position:"center",backgroundColor:"#ffb2b2",stopOnFocus:!0,className:"toastify_message"}).showToast()},a.send(JSON.stringify(r))}var s=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var o=document.cookie.split(";"),n=0;n<o.length;n++){var r=o[n].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}("csrftoken"),i=document.querySelectorAll("form");if(i.length)for(var a=function(t){i[t].addEventListener("submit",function(e){e.preventDefault(),new Wellidate(i[t],o).form()&&r(i[t],i[t].getAttribute("data-type"))},!1)},c=0;c<i.length;c++)a(c);var l=document.querySelectorAll("[data-phone]");if(l.length)for(var p=function(n){l[n].oninput=function(e){if(e.isTrusted){var t=this.value.replace(/\D/g,"").match(/([0-9])(\d{0,3})(\d{0,3})(\d{0,4})/);null!==t&&(this.value=t[2]?t[1]+(t[3]?"("+t[2]+") "+t[3]+(t[4]?"-"+t[4]:""):t[2]):t[1]);var o=document.createEvent("Event");o.initEvent("input",!1,!0),l[n].dispatchEvent(o)}}},d=0;d<l.length;d++)p(d);var u=document.querySelectorAll(".locations_list_item");if(u.length)for(var f=function(t){u[t].onclick=function(){var e=u[t].getAttribute("data-id");window.openMarkerBaloon(e),scrollToElement("map-container")}},y=0;y<u.length;y++)f(y);var b=document.querySelector(".banner_video");b&&new Parallax(b,2,!0)},window.ymaps){var myMap,objectManager,init=function(){myMap=new ymaps.Map("map",{center:[53.500068,49.273561],zoom:17,controls:["zoomControl","searchControl","fullscreenControl"]},{searchControlProvider:"yandex#search"}),(objectManager=new ymaps.ObjectManager({clusterize:!0,gridSize:32,clusterDisableClickZoom:!0})).objects.options.set("preset","twirl#redIcon"),objectManager.objects.options.set("iconColor","#ff0000"),objectManager.clusters.options.set("preset","islands#redClusterIcons"),myMap.geoObjects.add(objectManager);objectManager.add({type:"FeatureCollection",features:[{type:"Feature",id:0,geometry:{type:"Point",coordinates:[53.497424,49.293479]},properties:{balloonContent:"<p><b>Drive Coffee Concept Bar</b></p><p>ул. Спортивная, 1и</p>",clusterCaption:"cluster_1",hintContent:"Drive Coffee Concept Bar"},options:{iconColor:"#ff0000"}},{type:"Feature",id:1,geometry:{type:"Point",coordinates:[53.500064,49.273558]},properties:{balloonContent:"<p><b>Drive Coffee Vega</b></p><p>ул. Юбилейная, 40г</p>",clusterCaption:"cluster_1",hintContent:"Drive Coffee Vega"},options:{iconColor:"#ff0000"}},{type:"Feature",id:2,geometry:{type:"Point",coordinates:[53.472816,49.478163]},properties:{balloonContent:"<p><b>Drive Coffee Komsa</b></p><p>ул. Коммунистическая, 92г</p>",clusterCaption:"cluster_1",hintContent:"Drive Coffee Komsa"},options:{iconColor:"#ff0000"}},{type:"Feature",id:3,geometry:{type:"Point",coordinates:[53.510417,49.410619]},properties:{balloonContent:"<p><b>Drive Coffee Zhilina</b></p><p>ул. Жилина, 9</p>",clusterCaption:"cluster_1",hintContent:"Drive Coffee Zhilina"},options:{iconColor:"#ff0000"}},{type:"Feature",id:4,geometry:{type:"Point",coordinates:[53.539356,49.390381]},properties:{balloonContent:"<p><b>Drive Coffee ParkHouse/Lime</b></p><p>ул. Автозаводское шоссе, 10в</p>",clusterCaption:"cluster_1",hintContent:"Drive Coffee ParkHouse/Lime"},options:{iconColor:"#ff0000"}},{type:"Feature",id:5,geometry:{type:"Point",coordinates:[53.510958,49.275073]},properties:{balloonContent:"<p><b>Drive Coffee Park</b></p><p>Парк Победы Автозаводского района</p>",clusterCaption:"cluster_1",hintContent:"Drive Coffee Park"},options:{iconColor:"#ff0000"}},{type:"Feature",id:6,geometry:{type:"Point",coordinates:[53.501852,49.25238]},properties:{balloonContent:"<p><b>Drive Coffee Naba</b></p><p>Набережная 6 квартала</p>",clusterCaption:"cluster_1",hintContent:"Drive Coffee Naba"},options:{iconColor:"#ff0000"}},{type:"Feature",id:7,geometry:{type:"Point",coordinates:[53.52217,49.414788]},properties:{balloonContent:"<p><b>Drive Coffee</b></p>",clusterCaption:"cluster_1",hintContent:"Drive Coffee"},options:{iconColor:"#ff0000"}}]}),window.openMarkerBaloon(0)},openMarkerBaloon=function(e){var t=window.objectManager.getObjectState(e);t.isClustered?(window.objectManager.clusters.state.set("activeObject",window.objectManager.objects.getById(e)),window.objectManager.clusters.balloon.open(t.cluster.id)):window.objectManager.objects.balloon.open(e)};ymaps.ready(init)}
//# sourceMappingURL=../maps/script.js.map
