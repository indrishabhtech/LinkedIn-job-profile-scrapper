
let jobData = [];
let currentPage = 1;
const jobsPerPage = 5;

document.getElementById('fetch-button').addEventListener('click', fetchData);
document.getElementById('refresh-button').addEventListener('click', fetchData);
document.getElementById('prev-page').addEventListener('click', () => changePage(-1));
document.getElementById('next-page').addEventListener('click', () => changePage(1));

async function fetchData() {
    const url = 'https://fresh-linkedin-profile-data.p.rapidapi.com/search-jobs';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '076439c01cmsh83529df627792f6p1742d3jsnfb2e4eed7953',
            'x-rapidapi-host': 'fresh-linkedin-profile-data.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            keywords: 'marketing',
            geo_code: 92000000,
            date_posted: 'Any time',
            experience_levels: [],
            company_ids: [1035],
            title_ids: [],
            onsite_remotes: [],
            functions: [],
            industries: [],
            job_types: [],
            sort_by: 'Most relevant',
            easy_apply: 'false',
            under_10_applicants: 'false',
            start: 0
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        jobData = result.data;
        currentPage = 1;
        displayJobs();
    } catch (error) {
        console.error(error);
    }
}

function displayJobs() {
    const jobDetailsDiv = document.getElementById('job-details');
    jobDetailsDiv.innerHTML = '';
    
    const start = (currentPage - 1) * jobsPerPage;
    const end = start + jobsPerPage;
    const jobsToDisplay = jobData.slice(start, end);

    jobsToDisplay.forEach(job => {
        jobDetailsDiv.innerHTML += `
            <div class="job-item">
                <h2>${job.company}</h2>
                <img src="${job.company_logo}" alt="${job.company} Logo">
                <p><strong>Job Title:</strong> ${job.job_title}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Remote:</strong> ${job.remote}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Posted Time:</strong> ${job.posted_time}</p>
                <a href="${job.job_url}" target="_blank">View Job on LinkedIn</a>
            </div>
        `;
    });

    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = end >= jobData.length;
}

function changePage(direction) {
    currentPage += direction;
    displayJobs();
}
