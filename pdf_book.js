const book = document.getElementById("book");
const flipSound = document.getElementById("pageSound");

const pagesContent = [

`<div class="subtitle">শ্রীশ্রী গণেশায় নমঃ</div>`,

`<div>
  <div class="couple-name">কাজল ❤️ পূজা</div>
  <div class="couple-wrapper">
    <img src="couple.png" class="couple-img">
  </div>
</div>`,

`<div class="subtitle">
শুভ বিবাহ<br>
০৯ই মার্চ ২০২৬<br>
সাহেবেরহাট, বড় নলাঙ্গি বাড়ি, কোচবিহার
</div>`,

`<div class="subtitle">
রিসেপশন<br>
১২ই মার্চ ২০২৬<br>
সাহেবেরহাট, বড় নলাঙ্গি বাড়ি, কোচবিহার
</div>`,

`<div class="subtitle">
আমাদের গল্প<br><br>
এক নীরব বিকেলের আলোয় শুরু হয়েছিল তাদের পথচলা।<br>
আজ সেই ভালোবাসা পেয়েছে পবিত্র অঙ্গীকার।
</div>`,

`<div class="subtitle">আপনার উপস্থিতি ও আশীর্বাদ একান্ত কাম্য</div>`

];

function createParticles(page){
  for(let i=0;i<15;i++){
    const particle=document.createElement("div");
    particle.className="particle";
    particle.style.left=Math.random()*100+"%";
    particle.style.top=Math.random()*100+"%";
    particle.style.animationDuration=(5+Math.random()*5)+"s";
    page.appendChild(particle);
  }
}

function renderBook(){
  pagesContent.forEach((html,index)=>{
    const page=document.createElement("div");
    page.className="page";
    page.style.zIndex=100-index;
    page.innerHTML=html;

    createParticles(page);

    page.onclick=()=>{
      page.classList.toggle("flipped");
      flipSound.currentTime=0;
      flipSound.play().catch(()=>{});
    };

    book.appendChild(page);
  });
}

renderBook();
