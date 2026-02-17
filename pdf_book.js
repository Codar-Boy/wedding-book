const { jsPDF } = window.jspdf;

const pagesData = [
  {
    title: "শ্রীশ্রী গণেশায় নমঃ",
    content: ""
  },
  {
    title: "কাজল ❤️ পূজা",
    content: "শুভ বিবাহের পবিত্র বন্ধনে আবদ্ধ হতে চলেছি"
  },
  {
    title: "শুভ বিবাহ",
    content: "০৯ই মার্চ ২০২৬\nসাহেবেরহাট, বড় নালাঙ্গি বাড়ি, কোচবিহার"
  },
  {
    title: "রিসেপশন",
    content: "১২ই মার্চ ২০২৬\nসাহেবেরহাট, বড় নালাঙ্গি বাড়ি, কোচবিহার"
  },
  {
    title: "আপনার উপস্থিতি ও আশীর্বাদ একান্ত কাম্য",
    content: ""
  }
];

const previewContainer = document.getElementById("preview-pages");

function createPage(title, content) {
  const page = document.createElement("div");
  page.className = "book-page shadow-gold";

  page.innerHTML = `
    <div class="book-border"></div>
    <div class="flex flex-col h-full justify-center items-center text-center relative z-10">
      <h2 class="text-4xl font-bold mb-4 drop-shadow-glow">${title}</h2>
      <div class="gold-divider w-2/3"></div>
      <p class="text-xl whitespace-pre-line leading-relaxed">${content}</p>
    </div>
  `;

  previewContainer.appendChild(page);
}

pagesData.forEach(page => createPage(page.title, page.content));

document.getElementById("export-pdf").addEventListener("click", async () => {
  const pdf = new jsPDF("p", "pt", "a4");

  const pages = document.querySelectorAll(".book-page");

  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i], {
      scale: 3,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    if (i !== 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, 0, 595, 842);
  }

  pdf.save("Premium_Bengali_Wedding_Book.pdf");
});
