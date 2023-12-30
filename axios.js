const APIURL = 'https://api.github.com/users/';
const profileContainer = document.getElementById('main');
const input = document.getElementById('search');
const form = document.getElementById('form');
form.addEventListener('submit', getProfiles)

async function getProfiles (event) {
    event.preventDefault();
    const myEndpointInfo = `${APIURL}${input.value}`
    const myEndpointRepos = `${APIURL}${input.value}/repos?sort=updated&direction=desc&per_page=5`;
    input.value = null; //input.value = "";

    try {
        const profileInfo = await axios.get(myEndpointInfo);
        const reposInfo = await axios.get(myEndpointRepos);
        profileContainer.innerHTML = `
        <section class="card">
            <img src=${profileInfo.data.avatar_url} class="avatar">
            <div class="user-info">
                <h2>${profileInfo.data.name}</h2>
                <p>${profileInfo.data.bio}</p>
                <ul>
                    <li><strong>${profileInfo.data.followers} Followers</strong></li>
                    <li><strong>${profileInfo.data.following} Following</strong></li>
                    <li><strong>${profileInfo.data.public_repos} Repos</strong></li>
                </ul>
                <div>
                ${
                    reposInfo.data.map(({ name }) => `
                        <span class="repo">${name}</span>
                    `).join("") //tiene que ser con span por el display inline-block; usar join para unir los elementos en un string sin comas
                }
                </div>
            </div>
        </section>
        `
    } catch {
        profileContainer.innerHTML = `
        <section class="card">
            <p>No profile with this username</p>
        </section>
        `
    }
}

// https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user