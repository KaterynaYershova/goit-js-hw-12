import{a as b,S as E,i as s}from"./assets/vendor-ee72e1a4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const L="44399697-8bf9b3cb5b10277b4ea62d601",I="https://pixabay.com/api/";async function m(n,t=1,o=15){const a=`${I}?key=${L}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${o}`;try{return(await b.get(a)).data}catch(e){throw console.error("Fetching images failed:",e),e}}const v=document.getElementById("gallery");let B=new E('[data-lightbox="gallery"]',{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250});function f(n){const t=n.map(o=>`
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
  `).join("");v.insertAdjacentHTML("beforeend",t),B.refresh()}function R(){s.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}function h(){document.getElementById("loader").style.display="block"}function y(){document.getElementById("loader").style.display="none"}function w(){document.getElementById("load-more").style.display="block"}function p(){document.getElementById("load-more").style.display="none"}function u(){s.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}let l="",i=1;const c=15;let g=0;document.getElementById("search-form").addEventListener("submit",async n=>{if(n.preventDefault(),l=document.getElementById("search-input").value.trim(),!l){s.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}h(),p(),document.getElementById("gallery").innerHTML="",i=1;try{const{hits:t,totalHits:o}=await m(l,i,c);g=o,t.length===0?R():(f(t),g>c&&w())}catch{s.error({title:"Error",message:"Something went wrong while fetching images. Please try again later.",position:"topRight"})}finally{y()}});document.getElementById("load-more").addEventListener("click",async()=>{i+=1,h(),p();try{const{hits:n}=await m(l,i,c);if(n.length===0)u();else{f(n),i*c>=g?(p(),u()):w();const{height:t}=document.querySelector(".gallery li").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}}catch{s.error({title:"Error",message:"Something went wrong while fetching images. Please try again later.",position:"topRight"})}finally{y()}});
//# sourceMappingURL=commonHelpers.js.map
