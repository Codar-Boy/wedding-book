const { jsPDF } = window.jspdf;
const container = document.getElementById("preview-pages");

/* ========== Editable Data ========== */
let data = {
  groom: "কাজল",
  bride: "পূজা",
  weddingDate: "০৯ই মার্চ ২০২৬",
  receptionDate: "১২ই মার্চ ২০২৬",
  venue: "সাহেবেরহাট, বড় নলাঙ্গি বাড়ি, কোচবিহার"
};

/* ========== Admin Panel ========== */
function createAdmin(){
  const panel=document.createElement("div");
  panel.className="admin-panel";
  panel.innerHTML=`
  <h2>✏ Edit Wedding Info</h2>
  Groom Name<input id="groom" value="${data.groom}">
  Bride Name<input id="bride" value="${data.bride}">
  Wedding Date<input id="wdate" value="${data.weddingDate}">
  Reception Date<input id="rdate" value="${data.receptionDate}">
  Venue<input id="venue" value="${data.venue}">
  <button id="update" style="background:gold;color:black;padding:8px 15px;border-radius:8px;">Update Book</button>
  `;
  container.appendChild(panel);

  document.getElementById("update").onclick=()=>{
    data.groom=groom.value;
    data.bride=bride.value;
    data.weddingDate=wdate.value;
    data.receptionDate=rdate.value;
    data.venue=venue.value;
    renderBook();
  }
}

/* ========== Page Creation ========== */
function createPage(content,index){
  const page=document.createElement("div");
  page.className="page";
  page.style.zIndex=100-index;

  page.innerHTML=`
  <div class="binding"></div>
  <div class="border"></div>
  <div style="padding:80px;text-align:center;">
    ${content}
  </div>
  `;

  page.onclick=()=> page.classList.toggle("flipped");
  return page;
}

/* ========== Render Book ========== */
function renderBook(){
  container.innerHTML="";
  createAdmin();

  const bookContainer=document.createElement("div");
  bookContainer.className="book-container book-open";

  const book=document.createElement("div");
  book.className="book";

  const pagesContent=[
    `<h1 class="gold-text" style="font-size:36px">শ্রীশ্রী গণেশায় নমঃ</h1>`,
    `<h1 class="gold-text" style="font-size:40px">${data.groom} ❤️ ${data.bride}</h1>`,
    `<h2 class="gold-text">শুভ বিবাহ</h2>
     <p>${data.weddingDate}<br>${data.venue}</p>`,
    `<h2 class="gold-text">রিসেপশন</h2>
     <p>${data.receptionDate}<br>${data.venue}</p>`,
    `<h2 class="gold-text">আপনার উপস্থিতি ও আশীর্বাদ একান্ত কাম্য</h2>`
  ];

  pagesContent.forEach((c,i)=>{
    book.appendChild(createPage(c,i));
  });

  bookContainer.appendChild(book);
  container.appendChild(bookContainer);
}

renderBook();

/* ========== CMYK + Bleed Export ========== */
document.getElementById("export-pdf").addEventListener("click",async()=>{
  const pdf=new jsPDF("p","mm","a4");

  const pages=document.querySelectorAll(".page");

  for(let i=0;i<pages.length;i++){
    const canvas=await html2canvas(pages[i],{
      scale:4,
      backgroundColor:"#5a0000"
    });

    const img=canvas.toDataURL("image/jpeg",1);

    if(i!==0) pdf.addPage();

    /* 3mm Bleed */
    pdf.addImage(img,"JPEG",-3,-3,216,303);

    /* Crop Marks */
    pdf.setDrawColor(0);
    pdf.line(5,5,15,5);
    pdf.line(5,5,5,15);
    pdf.line(200,5,210,5);
    pdf.line(210,5,210,15);
  }

  pdf.save("CMYK_Print_Ready_Wedding_Book.pdf");
});
