$(() => {
  $(".header").height($(window).height());
  //make nav bar dark on refresh
  if ($(window).scrollTop() > 150) {
    $("nav").addClass("bg-dark");
  }

  //leave margin when directed to a section
  $("#about-link").click(()=>{
    $(window).scrollTop( 600 );
    console.log($(window).scrollTop());
    console.log("clicked link");
  })


  // make nav bar dark on scroll down
  $(document).scroll(() => {
    const scrollLevel = $(window).scrollTop();
    if (scrollLevel > 150) {
      $("nav").addClass("bg-dark");
    } else {
      $("nav").removeClass("bg-dark");
    }
  });
});

var projectsList = [];

// import a list of projects

try {
  fetch("js/projects.json")
    .then((response) => response.json())
    .then((data) => setProjectList(data));
} catch {
  projectsList = require("./projects.json");
}

const setProjectList = (data) => {
  projectsList = data;
  projectsList.reverse()
  projectsList.forEach((element) => {
    let id = element["id"];
    let liveLink = element["github"];
    let img = element["path"];
    let projectName = element["name"];
    let description = element["description"];
    let languages = element["languages"];
    if (id !== null) {
      createProject(id, img, projectName, description, liveLink,languages);
    }
  });
};

// function to create an element
const makeElement = (element) => {
  return document.createElement(element);
};

const addAttribute = (element, attribute, value) => {
  element.setAttribute(attribute, value);
  return element;
};

//create a project card
const createProject = (id, imgUrl, title, description, liveLink,languagesList) => {
  let columnDiv = makeElement("div");
  addAttribute(columnDiv, "class", "col-12 col-lg-4 col-md-4 col-sm-12");
  let card = addAttribute(makeElement("div"), "class", "card");
  let cardImg = addAttribute(makeElement("div"), "class", "card-img");
  let projectImage = new Image();
  projectImage.src = imgUrl;
  projectImage.className = "img-fluid";
  let cardBody = addAttribute(makeElement("div"), "class", "card-body");
  let cardTitle = addAttribute(makeElement("div"), "class", "card-title");
  let titleText = document.createTextNode(title);
  let cardDesc = addAttribute(makeElement("div"), "class", "card-desc");
  let cardFooter = addAttribute(makeElement("div"), "class", "card-footer");
  let cardDescParagraph = makeElement("p");
  let footerButton = addAttribute(makeElement("a"), "class", "btn btn-primary");
  let buttontext = document.createTextNode("Visit");
  addAttribute(footerButton, "href", liveLink);
  cardTitle.appendChild(titleText);
  addAttribute(cardTitle,"class","font-weight-bold text-center");
  footerButton.appendChild(buttontext);
  cardFooter.appendChild(footerButton);
  let text = document.createTextNode(description);
  let cardLanguages=makeElement("p");
  let languages=document.createTextNode(languagesList);
  cardLanguages.appendChild(languages)
  cardDescParagraph.appendChild(text);
  cardDescParagraph.appendChild(cardLanguages);
  cardDesc.appendChild(cardDescParagraph);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDesc);
  cardImg.appendChild(projectImage);
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  columnDiv.appendChild(card);
  document.querySelector("#projects").appendChild(columnDiv);
};

// toggle about section content

const menu = document.querySelector("#about-menu");
const profileCard=document.querySelector("#profile-card");
const educationCard=document.querySelector('#education-card');
const interestscard=document.querySelector('#interests-card')
menu.addEventListener("click", (event) => {
  const isBtn = event.target.nodeName === "BUTTON";
  
  if (!isBtn) {
    return;
  } else {
    let btnId = event.target.id;
    if (btnId === "profile") {
      profileCard.style="display:flex";
      educationCard.style="display:none"
      interestscard.style="display:none"
    } else if(btnId==="education"){
      profileCard.style="display:none";
      educationCard.style="display:flex"
      interestscard.style="display:none"

    }
    else if(btnId==="interests"){
      profileCard.style="display:none";
      educationCard.style="display:none"
      interestscard.style="display:flex"
    }
    else{
      console.log("nothing");
    }
  }
});
