const apiUrl = "https://app.art-ground.com/our_works/";
let currentPage = 1;

// Render works in the container
function renderWorks(data) {
    const worksContainer = document.getElementById("works-container");
    worksContainer.innerHTML = ""; // Clear existing content

    data.results.forEach(work => {
        const workHtml = `
            <div class="col-lg-4 col-md-6 mb-60">
                <div class="item">
                    <div class="img">
                        <img src="${work.main_img}" alt="${work.title}">
                    </div>
                    <div class="bottom-fade"></div>
                    <div class="con active">
                        <div class="title">
                            <h4>${work.title}</h4>
                            <h6><span class="ti-location-pin"></span> ${work.location}</h6>
                        </div>
                        <div class="icon">
                            <a href="portfolio-details.html" class="arrow">
                                <i class="ti-arrow-top-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        worksContainer.insertAdjacentHTML("beforeend", workHtml);
    });
}

// Render pagination links
function renderPagination(data) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // Clear existing pagination

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

// Fetch data from API
async function fetchData(page = 1) {
    try {
        const response = await fetch(`${apiUrl}?page=${page}`);
        const data = await response.json();

        currentPage = page;
        renderWorks(data);
        renderPagination(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Handle pagination clicks
document.getElementById("pagination").addEventListener("click", (event) => {
    event.preventDefault();
    const page = event.target.getAttribute("data-page");
    if (page) {
        fetchData(Number(page));
    }
});

// Initial fetch
fetchData();
