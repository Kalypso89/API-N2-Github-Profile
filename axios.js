const APIURL = 'https://api.github.com/users/';
const profileContainer = document.getElementById('main');
const input = document.getElementById('search');
const form = document.getElementById('form');
form.addEventListener('submit', getProfiles)

function getProfiles (event) {
    event.preventDefault();
    const myEndpoint = `${APIURL}${input.value}`
    axios
        .get(myEndpoint)
        .then((response) => {
            profileContainer.innerHTML = `
            <section class="card">
                <img src=${response.data.avatar_url} class="avatar">
                <div class="user-info">
                    <h2>${response.data.name}</h2>
                    <p>${response.data.bio}</p>
                    <ul>
                        <li><strong>${response.data.followers} Followers</strong></li>
                        <li><strong>${response.data.following} Following</strong></li>
                        <li><strong>${response.data.public_repos} Repos</strong></li>
                    </ul>
                </div>
            </section>
            `
            console.log(response.data)
        })
        .catch((error) => {
            console.log("error")
        })

}
