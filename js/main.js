const mainPage = document.querySelector('section');
const submit = document.querySelector('#submit-search');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const filter = document.querySelector('.filter')

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
fetch('data.json')
.then (function (response) {
    return response.json();
}) 
.then (function (data) {
    //console.log(data)
    renderJobs(data);
})

/** Click listener to the funnel icon */
filter.addEventListener ('click', () => {
    overlay.style.display = 'block';
    form.style.display = 'block';
})

/**Click listener to to submit search button */
submit.addEventListener('click', () => {
    overlay.style.display = 'none';
    form.style.display = 'none';
})
