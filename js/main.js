const mainPage = document.querySelector('main');
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








         
    
