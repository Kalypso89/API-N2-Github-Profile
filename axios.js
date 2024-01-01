const APIURL = 'https://api.github.com/users/';
const profileContainer = document.getElementById('main');
const input = document.getElementById('search');
const form = document.getElementById('form');
form.addEventListener('submit', getProfiles);

async function getProfiles (event) {
    event.preventDefault();
    const myEndpointInfo = `${APIURL}${input.value}`
    const myEndpointRepos = `${APIURL}${input.value}/repos?sort=updated&direction=desc&per_page=5`;
    input.value = null;

    try {
        const [profileInfo, reposInfo] = await Promise.all([
            axios.get(myEndpointInfo),
            axios.get(myEndpointRepos),
        ]);
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
                    `).join("")
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