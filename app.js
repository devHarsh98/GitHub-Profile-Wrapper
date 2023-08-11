const usernameInput = document.getElementById('username');
const searchProfileButton = document.getElementById('searchProfile');
const showProfileDiv = document.getElementById('showProfile');
const showReposDiv = document.getElementById('showRepos');

async function showRepos(username) {
    try {
        let res = await fetch(`https://api.github.com/users/${username}/repos`);
        let projects = await res.json();
        for(let i=0;i<projects.length;i++) {
            if(projects[i].language === null) {
                projects[i].language = '😊';
            }
            showReposDiv.innerHTML += `
            <div id="card-body">
                <div id="project-title">${projects[i].name}</div>
                <div id="project-language">${projects[i].language}</div>
                <button id="showReposButton">
                    <a href=${projects[i].html_url} target="_blank">Checkout Project</a>
                </button>
            </div>`
        }
    }
    catch(err) {
        console.log(err.message);
    }
}

function showProfile(data) {
    showProfileDiv.innerHTML += `
    <div id="card">
        <div id="title">${data.name}</div>
        <div id="subHeading">${data.login}</div>
        <div id="card-img">
            <img src=${data.avatar_url} alt=${data.name}>
        </div>
        <div id="card-text">
            <p id="bio">${data.bio}</p>
            <p>${data.followers} Followers ${data.following} Following</p>
        </div>
        <button id="showProfileButton">
            <a href=${data.html_url} target="_blank">Checkout Profile</a>
        </button>
    </div>`
}

searchProfileButton.addEventListener('click', async () => {
    try {
        const username = usernameInput.value;
        let res = await fetch(`https://api.github.com/users/${username}`);
        let data = await res.json();
        showProfile(data);
        showRepos(username);
    }
    catch(err) {
        console.log(err.message);
    }
})