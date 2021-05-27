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
  const element = document.querySelector(".loading");
  element.classList.add("loader")

  let body = JSON.stringify(content);
  await fetch('https://api.github.com/graphql', {
    method: 'post',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: body
  })
  .then(res=>res.json())
  .then(res => {
    data = res;
    isLoading = false;
  })
  .catch(err=>{
    error= err
    isLoading = false;
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
  element.classList.remove("loader");
  location = "./profile.html";
}
form.addEventListener("submit", loadUser)

