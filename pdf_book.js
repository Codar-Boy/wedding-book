const { jsPDF } = window.jspdf;
const book = document.getElementById("book");
const flipSound = document.getElementById("pageSound");

const pagesContent = [

`<h3 class="gold">শ্রীশ্রী গণেশায় নমঃ</h3>`,

`<div style="text-align:center;">
<h2 class="gold">কাজল ❤️ পূজা</h2>

<svg width="260" height="260" viewBox="0 0 260 260" style="margin-top:20px">

  <!-- Groom -->
  <g>
    <circle cx="170" cy="80" r="22" fill="#f3c16d"/>
    <rect x="150" y="100" width="40" height="80" rx="20" fill="#1a1a1a"/>
    <rect x="145" y="110" width="15" height="50" rx="10" fill="#f3c16d" class="hand"/>
  </g>

  <!-- Bride -->
  <g>
    <circle cx="90" cy="80" r="22" fill="#f3c16d"/>
    <path d="M60 100 Q90 160 120 100 Z" fill="#b5111f"/>
    <path d="M60 100 Q40 150 80 180" stroke="#d4af37" stroke-width="8" fill="none" class="pallu"/>
  </g>

  <!-- Joined Hands -->
  <circle cx="130" cy="140" r="10" fill="#f3c16d" class="hold"/>

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

