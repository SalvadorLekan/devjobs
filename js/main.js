const mainPage = document.querySelector('section');
const submit = document.querySelector('#submit-search');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const filter = document.querySelector('.filter')
const searchTitle = document.querySelector('.search-input')

//let title = searchTitle.value;
function renderJobs (data) {
    data.forEach( (job) => {
       mainPage.innerHTML += `
        <div class="box">
                <div class="logo-wrap flex-center" style="background-color: ${job.logoBackground};">
                    <img src="${job.logo}" alt="company-logo" class="company-logo"/>
                </div>
                <p class="job-info">${job.postedAt}<span>.</span>${job.contract}</p>
                <h1>${job.position}</h1>
                <p class="job-info">${job.company}</p>
                <h2>${job.location}</h2>
            </div>`
    }) 
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
    } )
}
