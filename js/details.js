const detailContainer = document.querySelector(".detail-container");

let data = [];

getJobs();
function getJobs() {
  fetch("/data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      data = res; //keeping the responses in the data array
      getDetails();
    });
}

function getDetails() {
  const id = window.location.hash.replace("#", "");
  const job = data.find((item) => item.id == id) || {};
  detailContainer.innerHTML += `
    <div>
    <div class="detail">
        <div class="details-box">
            <div>
                <div class="company-wrap">
                    <div class="company-logo-inner flex-center" style="background-color: ${job.logoBackground};">
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
