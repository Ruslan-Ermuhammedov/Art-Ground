const apiUrl = "https://app.art-ground.com/our_works/";
let currentPage = 1;

// Ishlarni render qilish
function renderWorks(data) {
    const worksContainer = document.getElementById("works-container");
    worksContainer.innerHTML = ""; // Eski ma'lumotlarni tozalash

    data.results.forEach(work => {
        const workHtml = `
        <div class="col-lg-4 col-md-6 mb-60">
            <div class="item">
                <div class="img" style="min-height: 356px;"> 
                    <img src="${work.main_img}" alt="${work.title}">
                </div>
                <div class="bottom-fade"></div>
                <div class="con active">
                    <div class="title">
                        <h4>${work.title}</h4>
                        <h6><span class="ti-location-pin"></span> ${work.location}</h6>
                    </div>
                    <div class="icon">
                        <a href="#" class="arrow view-details" data-id="${work.id}">
                            <i class="ti-arrow-top-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
        worksContainer.insertAdjacentHTML("beforeend", workHtml);
    });

    // Har bir "view-details" tugmasiga hodisa biriktirish
    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", async (event) => {
            event.preventDefault();
            const workId = event.target.closest("a").getAttribute("data-id");
            await fetchWorkDetails(workId);
        });
    });
}

// Batafsil ma'lumotlarni olish
async function fetchWorkDetails(workId) {
    try {
        const response = await fetch(`${apiUrl}${workId}/`);
        const workDetails = await response.json();
        console.log("Ishning batafsil ma'lumotlari:", workDetails);
    } catch (error) {
        console.error("Batafsil ma'lumotlarni yuklashda xatolik:", error);
    }
}

// Paginationni render qilish
function renderPagination(data) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // Eski paginationni tozalash

    if (data.previous) {
        pagination.insertAdjacentHTML("beforeend", `<li><a href="#" data-page="${currentPage - 1}"><i class="ti-angle-left"></i></a></li>`);
    }

    for (let i = 1; i <= Math.ceil(data.count / data.results.length); i++) {
        pagination.insertAdjacentHTML("beforeend", `<li><a href="#" data-page="${i}" class="${i === currentPage ? "active" : ""}">${i}</a></li>`);
    }

    if (data.next) {
        pagination.insertAdjacentHTML("beforeend", `<li><a href="#" data-page="${currentPage + 1}"><i class="ti-angle-right"></i></a></li>`);
    }
}

// API ma'lumotlarini olish
async function fetchData(page = 1) {
    try {
        const response = await fetch(`${apiUrl}?page=${page}`);
        const data = await response.json();

        currentPage = page;
        renderWorks(data);
        renderPagination(data);
    } catch (error) {
        console.error("API ma'lumotlarini yuklashda xatolik:", error);
    }
}

// Pagination tugmalarini boshqarish
document.getElementById("pagination").addEventListener("click", (event) => {
    event.preventDefault();
    const page = event.target.getAttribute("data-page");
    if (page) {
        fetchData(Number(page));
    }
});

// Sahifa yuklanganda ma'lumotlarni yuklash
fetchData();
