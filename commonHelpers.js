import{a as E,S as L,i as m}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const I="44399697-8bf9b3cb5b10277b4ea62d601",v="https://pixabay.com/api/";async function f(n,t=1,o=15){const s=`${v}?key=${I}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${o}`;try{return(await E.get(s)).data}catch(e){throw console.error("Fetching images failed:",e),e}}const B=document.getElementById("gallery");let d;function h(n){const t=n.map(o=>`
    <li>
      <a href="${o.largeImageURL}" data-lightbox="gallery">
        <img src="${o.webformatURL}" alt="${o.tags}" />
      </a>
      <div class="info">
        <div class="labels">
          <p>Likes</p>
          <p>Views</p>
          <p>Comments</p>
          <p>Downloads</p>
        </div>
        <div class="values">
          <p>${o.likes}</p>
          <p>${o.views}</p>
          <p>${o.comments}</p>
          <p>${o.downloads}</p>
        </div>
      </div>
    </li>
  `).join("");B.insertAdjacentHTML("beforeend",t),d?d.refresh():d=new L('[data-lightbox="gallery"]',{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250})}function $(){m.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}function y(){document.getElementById("loader").style.display="block"}function w(){document.getElementById("loader").style.display="none"}function b(){document.getElementById("load-more").style.display="block"}function p(){document.getElementById("load-more").style.display="none"}function u(){m.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}let a="",i=1;const l=15;let g=0;document.getElementById("search-form").addEventListener("submit",async n=>{if(n.preventDefault(),a=document.getElementById("search-input").value.trim(),!a){iziToast.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}y(),p(),document.getElementById("gallery").innerHTML="",i=1;try{const{hits:t,totalHits:o}=await f(a,i,l);g=o,t.length===0?$():(h(t),g>l&&b())}catch{iziToast.error({title:"Error",message:"Something went wrong while fetching images. Please try again later.",position:"topRight"})}finally{w()}});document.getElementById("load-more").addEventListener("click",async()=>{i+=1,y(),p();try{const{hits:n}=await f(a,i,l);if(n.length===0)u();else{h(n),i*l>=g?(p(),u()):b();const{height:t}=document.querySelector(".gallery li").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}}catch{iziToast.error({title:"Error",message:"Something went wrong while fetching images. Please try again later.",position:"topRight"})}finally{w()}});
//# sourceMappingURL=commonHelpers.js.map
