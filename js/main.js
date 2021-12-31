const mainPage = document.querySelector(".grid-container");
const submit = document.querySelector(".submit-search");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".form");
const filter = document.querySelector(".filter");
const searchTitle = document.querySelector(".search-input");
const inputLocation = document.querySelector(".input-location");
const checkbox = document.querySelector(".checkbox");
const innerPage = document.querySelector(".inner-page");
//const mainPage = document.querySelector('.main-page')

const inputWrap = document.querySelector(".input-wrap");
const detailContainer = document.querySelector(".detail-container");
// move json out of the function
let data = [];
let searchQuery = "";
let locationQuery = "";
let isFullTimeOnly = false;

//let title = searchTitle.value;
function renderJobs() {
  const filtered = data.filter((job) => {
    return (
      job.location.toLowerCase().includes(locationQuery.toLowerCase()) &&
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!isFullTimeOnly || job.contract === "Full Time")
    );
  });
  mainPage.innerHTML = "";
  filtered.forEach((job) => {
    mainPage.innerHTML += `
        <div data-key=${job.id} class="box">
                <div class="logo-wrap flex-center" style="background-color: ${job.logoBackground};">
                    <img src="${job.logo}" alt="company-logo" class="company-logo"/>
                </div>
                <p class="job-info">${job.postedAt}
                    <span class="dot">.</span>
                    <span class="red">${job.contract}</span>
                </p>
                <h1>${job.position}</h1>
                <p class="job-info">${job.company}</p>
                <h2>${job.location}</h2>
            </div>`;

    const allJobs = [...mainPage.children];
    allJobs.forEach((jobs) => {
      jobs.addEventListener("click", function (e) {
        innerPage.style.display = "block";
        mainPage.style.display = "none";
        inputWrap.style.display = "none";
        // form.syle.display = "none";
        getDetails(this.dataset.key);
      });
    });
  });
}

function getDetails(id) {
  const job = data.find((item) => item.id == id);
  console.log({ job, data });
  detailContainer.innerHTML += `
    <div>
    <div class="detail">
        <div class="details-box">
            <div>
                <div class="company-wrap">
                    <div class="company-logo-inner flex-center" style="style="background-color: ${job.logoBackground};">
                        <img src="${job.logo}" alt="company-logo" class="inner-logo"/>
                    </div>
                    <div>
                        <p class="company-name">${job.company}</p>
                        <p>
                            <a href="${job.website}">${job.company}.com</a>
                        </p>
                    </div>
                </div>
                <button class="company-site">
                    <a href="${job.website}">Company Site</a>
                </button>
            </div>
        </div>

            <div class="description-container">
                <div class="description">
                    <div>
                        <p class="notes">${job.postedAt}
                            <span class="dot">.</span>
                            <span>${job.contract}</span>
                        </p>
                        <h1>${job.position}</h1>
                        <h2 class="job-location">${job.location}</h2>
                    </div>
                    
                    <button class="apply-now">
                        <a href="${job.apply}">Apply Now</a>
                    </button>
                </div>
           
            <p class="notes">${job.description}</p>

            <h2 class="black-h2">Requirements</h2>
            <p class="notes">${job.requirements.content}</p>
            
            <ul>
                <li>Morbi interdum mollis sapien. Sed</li>
                <li>Morbi interdum mollis sapien. Sed</li>
                <li>Morbi interdum mollis sapien. Sed</li>
            </ul>

            <h2 class="black-h2">What You Will Do</h2>
            <p class="notes">${job.role.content}</p>

            <ol>
                <li>Morbi interdum mollis sapien. Sed</li>
                <li>Morbi interdum mollis sapien. Sed</li>
                <li>Morbi interdum mollis sapien. Sed</li>
            </ol>
        </div>
        <div class="footer footer-tab">
            <div class="hide-mobile">
                <h2 class="black-h2">${job.position}</h2>
                <p>${job.company}</p>
            </div>
            <button>
                <a href>Apply Now</a>
            </button>
        </div>
    </div>
    </div>
    `;
}

getJobs();
function getJobs() {
  fetch("data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      //console.log(data)
      data = res;
      renderJobs();
    });
}

/** CLICK LISTENER TO THE FUNNEL ICON TO SHOW OTHER FILTER OPTIONS*/
filter.addEventListener("click", () => {
  overlay.style.display = "block";
  form.style.display = "block";
});

/**CLICK LISTENER TO THE SUBMIT SEARCH BUTTON */
submit.addEventListener("click", () => {
  overlay.style.display = "none";
  form.style.display = "none";
});

/***FILTER SEARCH VALUES */
filterSearch();

function filterSearch() {
  searchTitle.addEventListener("input", () => {
    // const jobPosition = [...document.querySelectorAll("h1")];
    // let title = searchTitle.value;
    searchQuery = searchTitle.value;
    renderJobs();
    // jobPosition.forEach((position) => {
    //   if (position.textContent.toLowerCase().includes(title.toLowerCase())) {
    //     position.parentElement.style.display = "block";
    //   } else {
    //     position.parentElement.style.display = "none";
    //   }
    // });
  });
}

/**FILTER BY LOCATION */
filterLocation();

function filterLocation() {
  submit.addEventListener("click", () => {
    // const jobLocations = [...document.querySelectorAll("h2")];
    locationQuery = inputLocation.value;

    renderJobs();
    // jobLocations.forEach((jobLocation) => {
    //   if (jobLocation.textContent.toLowerCase().includes(locationValue.toLowerCase())) {
    //     jobLocation.parentElement.style.display = "block";
    //   } else {
    //     jobLocation.parentElement.style.display = "none";
    //   }
    // });
  });
}

/*FILTER JOB BY CONTRACT (USING CHECKBOX) */
filterJobContract();

function filterJobContract() {
  submit.addEventListener("click", () => {
    const jobContract = [...document.querySelectorAll(".red")];
    isFullTimeOnly = checkbox.checked;
    renderJobs();
  });
}
