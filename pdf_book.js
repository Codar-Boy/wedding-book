const { jsPDF } = window.jspdf;
const book = document.getElementById("book");
const flipSound = document.getElementById("pageSound");

const pagesContent = [

`<h3 class="gold">শ্রীশ্রী গণেশায় নমঃ</h3>`,

`<div style="text-align:center;">

<h2 class="gold">কাজল ❤️ পূজা</h2>

<svg width="280" height="280" viewBox="0 0 300 300" style="margin-top:20px">

  <!-- Bride -->
  <g id="bride">

    <!-- Face -->
    <circle cx="110" cy="90" r="24" fill="#f3c16d"/>

    <!-- Hair -->
    <path d="M85 85 Q110 50 135 85" fill="#111"/>

    <!-- Saree Body -->
    <path d="M80 115 Q110 200 140 115 Z" fill="#b5111f"/>

    <!-- Saree Pallu -->
    <path d="M85 115 Q50 180 100 220"
          stroke="#d4af37"
          stroke-width="10"
          fill="none"
          class="pallu"/>

    <!-- Bride Arm -->
    <rect x="120" y="130" width="14" height="55"
          rx="8"
          fill="#f3c16d"
          class="handBride"/>

  </g>

  <!-- Groom -->
  <g id="groom">

    <!-- Face -->
    <circle cx="190" cy="90" r="24" fill="#f3c16d"/>

    <!-- Hair -->
    <path d="M165 80 Q190 55 215 80" fill="#111"/>

    <!-- Sherwani -->
    <rect x="165" y="115"
          width="50"
          height="95"
          rx="22"
          fill="#1a1a1a"/>

    <!-- Groom Arm -->
    <rect x="175" y="130"
          width="14"
          height="55"
          rx="8"
          fill="#f3c16d"
          class="handGroom"/>

  </g>

  <!-- Joined Hands -->
  <circle cx="160" cy="170"
          r="10"
          fill="#f3c16d"
          class="hold"/>

</svg>

</div>`,

`<h3 class="gold">শুভ বিবাহ<br>০৯ই মার্চ ২০২৬<br>সাহেবেরহাট, বড় নালাঙ্গি বাড়ি, কোচবিহার</h3>`,

`<h3 class="gold">রিসেপশন<br>১২ই মার্চ ২০২৬<br>সাহেবেরহাট, বড় নালাঙ্গি বাড়ি, কোচবিহার</h3>`,

`<h3 class="gold">আমাদের গল্প<br><br>
এক নীরব বিকেলের আলোয় শুরু হয়েছিল তাদের পথচলা।<br>
আজ সেই ভালোবাসা পেয়েছে পবিত্র অঙ্গীকার।
</h3>`,

`<h3 class="gold">আপনার উপস্থিতি ও আশীর্বাদ একান্ত কাম্য</h3>`

];

function renderBook(){
  pagesContent.forEach((html,index)=>{
    const page=document.createElement("div");
    page.className="page";
    page.style.zIndex=100-index;
    page.innerHTML=html;

    page.onclick = () => {
    page.classList.toggle("flipped");
    flipSound.currentTime = 0;
    flipSound.play().catch(() => {});
    };

    book.appendChild(page);
  });
}

renderBook();

async function exportPDF(){
  const pdf=new jsPDF("p","mm","a4");
  const pages=document.querySelectorAll(".page");

  for(let i=0;i<pages.length;i++){
    const canvas=await html2canvas(pages[i],{scale:3});
    const img=canvas.toDataURL("image/jpeg",1);

    if(i!==0) pdf.addPage();
    pdf.addImage(img,"JPEG",0,0,210,297);
  }

  pdf.save("Wedding_Invitation.pdf");
}


