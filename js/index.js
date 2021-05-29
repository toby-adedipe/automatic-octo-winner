import  TOKEN from './token.js';

const form = document.querySelector("#user-search");

const loadUser = async (ev)=>{
  ev.preventDefault();

  const value = form.elements["search"].value;

  let data;
  let content = {
    "query": `{
      user(login: "${value}") {
        login
        name
        avatarUrl
        bio
        repositories(first: 20) {
          totalCount
          edges {
            node {
              name
              description
              primaryLanguage {
                color
                name
              }
              stargazerCount
              updatedAt
              forks {
                totalCount
              }
            }
          }
        }
      }
    }`
  }
  const element = document.getElementById("status");
  element.classList.add("loader")

  let body = JSON.stringify(content);
  await fetch('https://api.github.com/graphql', {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: body
  })
  .then(res=>res.json())
  .then(res => {
    element.classList.remove("loader");
    data = res;
  })
  .catch(err=>{
    element.innerHTML = "An error occured while trying to fetch data";
    //element.classList.remove("loader");
  });

  // need to change the profiledata from obj to string
  // or find a way to save objects in localsstorage

  sessionStorage.setItem("profileData", data);
  const avatarUrl = data.data.user.avatarUrl;
  const bio = data.data.user.bio;
  const handle = data.data.user.login;
  const name = data.data.user.name;
  const totalCount = data.data.user.repositories.totalCount;
  const allRepositories = data.data.user.repositories.edges;
  
  sessionStorage.setItem("avatarUrl", avatarUrl);
  sessionStorage.setItem("bio", bio);
  sessionStorage.setItem("handle", handle);
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("totalCount", totalCount);
  sessionStorage.setItem("allRepositories", JSON.stringify(allRepositories));
  location = "./profile.html";
}
form.addEventListener("submit", loadUser)

