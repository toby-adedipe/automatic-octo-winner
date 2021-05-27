let avatarUrl = sessionStorage.getItem("avatarUrl");
let bio = sessionStorage.getItem("bio");
let handle = sessionStorage.getItem("handle");
let fullName = sessionStorage.getItem("name");
let totalCount = sessionStorage.getItem("totalCount");
let allRepositories = JSON.parse(sessionStorage.getItem("allRepositories"));
let ul = document.getElementById("list");

//set images
document.getElementById("mini-avatar").src = avatarUrl;
document.getElementById("large-avatar").src = avatarUrl;

//set full name
document.getElementById("full-name").innerHTML = fullName;

//set handles
document.getElementById("nav-handle").innerHTML = handle;
document.getElementById("page-handle").innerHTML = handle;

//set bio
document.getElementById("bio").innerHTML = bio;

//set totalCount
document.getElementById("total-count").innerHTML = totalCount;

//a function to convert month from digits to word format;
const getMonth = (month)=>{
  switch(month){
    case 1:
      return "Jan"
    case 2:
      return "Feb"
    case 3:
      return "Mar"
    case 4:
      return "Apr"
    case 5:
      return "May"
    case 6:
      return "Jun"
    case 7:
      return "Jul"
    case 8:
      return "Aug"
    case 9:
      return "Sep"
    case 10:
      return "Oct"
    case 11:
      return "Nov"
    case 12:
      return "Dec"
  }
}

//set repositories
allRepositories.map((data)=>{
  let node = data.node;

  //get currentyear
  let currentYear = new Date().getFullYear();

  //convert date from  date-string formate to digit format
  let date = new Date(node.updatedAt);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDate();

  let li = document.createElement("li");
  li.setAttribute("class", "repo");

  li.innerHTML = `<div class="repo-info">
      <a href="https://github.com/${handle}/${node.name}" class="repo-title">${node.name}</a>
      <p class="repo-description">${node.description?node.description:""}</p>
      <div class="repo-options">
        <div class="language">
          <div class="language-color" style="background-color:${node.primaryLanguage.color}"></div>
          <p>${node.primaryLanguage.name}</p>
        </div>
        <div>
          <i data-feather="star" class="star-icon"></i>           
          <p>${node.stargazerCount}</p>
        </div>
        <div>
          <i data-feather="git-branch" class="star-icon"></i>           
          <p>${node.forks.totalCount}</p>
        </div>
        <div class="last-update">
          <p>Updated on ${day} ${getMonth(month)} ${year===currentYear?"":year}</p>
        </div>
      </div>
    </div>
    <div>
      <button class="star-btn">
        <i data-feather="star" class="star-icon"></i>           
        <p>Star</p>
      </button>
    </div>`

  ul.appendChild(li);
})