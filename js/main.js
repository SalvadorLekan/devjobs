const mainPage = document.querySelector('.main-page');
const submit = document.querySelector('.submit-search');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.form');
const filter = document.querySelector('.filter')
const searchTitle = document.querySelector('.search-input')
const inputLocation = document.querySelector('.input-location')
const checkbox = document.querySelector('.checkbox');


const detailContainer = document.querySelector('.detail-container')

//let title = searchTitle.value;
function renderJobs (data) {
    data.forEach( (job) => {
       mainPage.innerHTML += `
        <div class="box">
                <div class="logo-wrap flex-center" style="background-color: ${job.logoBackground};">
                    <img src="${job.logo}" alt="company-logo" class="company-logo"/>
                </div>
                <p class="job-info">${job.postedAt}<span class="dot">.</span></p>
                <p class="red">${job.contract}</p>
                
                <h1>${job.position}</h1>
                <p class="job-info">${job.company}</p>
                <h2>${job.location}</h2>
            </div>`

            const allJobs = [...mainPage.children]  
            allJobs.forEach( (jobs) => {
                jobs.addEventListener('click', () => {
                    detailContainer.style.display = 'block'
                    getDetails(job);
                });
            })
    }) 
}

function getDetails (job) {
    detailContainer.innerHTML += `
    <div class="detail">
        <p class="blue">${job.description}</p>
        <p class="blue">${job.apply}</p>
    </div>
    `
}

getJobs();
function getJobs () {
    fetch('data.json')
    .then (function (response) {
        return response.json();
    }) 
    .then (function (data) {
        //console.log(data)
        renderJobs(data);
    })
}

/** CLICK LISTENER TO THE FUNNEL ICON TO SHOW OTHER FILTER OPTIONS*/
filter.addEventListener ('click', () => {
    overlay.style.display = 'block';
    form.style.display = 'block';
})

/**CLICK LISTENER TO THE SUBMIT SEARCH BUTTON */
submit.addEventListener('click', () => {
    overlay.style.display = 'none';
    form.style.display = 'none';
})

/***FILTER SEARCH VALUES */
filterSearch();

function filterSearch () {
    searchTitle.addEventListener('input', () => {
        const jobPosition = [...document.querySelectorAll('h1')]
        let title = searchTitle.value;
        jobPosition.forEach( (position) => {
            if(position.textContent.toLowerCase().includes(title.toLowerCase())) {
                position.parentElement.style.display = 'block';
            } else {
                position.parentElement.style.display = 'none';
            }
        })
    })
}

/**FILTER BY LOCATION */
filterLocation();

function filterLocation (){
    submit.addEventListener('click', () => {
        const jobLocations = [...document.querySelectorAll('h2')]
        let locationValue = inputLocation.value;
        jobLocations.forEach( (jobLocation) => {
            if(jobLocation.textContent.toLowerCase().includes(locationValue.toLowerCase())){
                jobLocation.parentElement.style.display = 'block';
            }else {
                jobLocation.parentElement.style.display = 'none'
            }
        })
    })
}

/*FILTER JOB BY CONTRACT (USING CHECKBOX) */
filterJobContract();

function filterJobContract () {
    submit.addEventListener('click', () => {
        const jobContract = [...document.querySelectorAll('.red')]
        if (checkbox.checked) {
            console.log(checkbox.checked)
            jobContract.forEach( (contract) => {
                if (contract.textContent.includes('Full Time')){
                    contract.parentElement.style.display = 'block';
                }else {
                    contract.parentElement.style.display = 'none'
                }
            })
        }
    })

   
}