const { jsPDF } = window.jspdf;
const book = document.getElementById("book");
const flipSound = document.getElementById("pageSound");

const pagesContent = [

`<h3 class="gold">শ্রীশ্রী গণেশায় নমঃ</h3>`,

`<div style="text-align:center;">
  <h2 class="gold">কাজল ❤️ পূজা</h2>

  <div style="margin-top:20px; display:flex; justify-content:center;">
    <img
      src="https://cdn.iconscout.com/illustration/premium/thumb/bengali-mariage-couple-4467548-3703815.png"
      alt="Bengali Marriage Couple"
      class="couple-img"
    />
  </div>
</div>`,

`<h3 class="gold">
শুভ বিবাহ<br>
০৯ই মার্চ ২০২৬<br>
সাহেবেরহাট, বড় নলাঙ্গি বাড়ি, কোচবিহার
</h3>`,

`<h3 class="gold">
রিসেপশন<br>
১২ই মার্চ ২০২৬<br>
সাহেবেরহাট, বড় নলাঙ্গি বাড়ি, কোচবিহার
</h3>`,

`<h3 class="gold">
আমাদের গল্প<br><br>
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

    page.onclick=()=>{
      page.classList.toggle("flipped");
      flipSound.currentTime=0;
      flipSound.play().catch(()=>{});
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
