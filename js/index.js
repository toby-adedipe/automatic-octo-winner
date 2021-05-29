import  TOKEN from './token.js';

const form = document.querySelector("#user-search");
console.log(form);
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
  const statusElement = document.getElementById("status");
  const loaderElement = document.getElementById("load-div");

  loaderElement.classList.add("loader")
  statusElement.innerHTML = "";

  let body = JSON.stringify(content);
  try {
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
    loaderElement.classList.remove("loader");
    data = res;
  })
  .catch(err=>{
    loaderElement.classList.remove("loader");
    statusElement.innerHTML = "An error occured while trying to fetch data";
  });
  } catch (error) {
    loaderElement.classList.remove("loader");
    statusElement.innerHTML = "An error occured while trying to fetch data";
  }
  
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
