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

    
    var textdata = [];
    textdata[0] = "HTML";
    textdata[1] = "JavaScript";
    textdata[2] = "Bootstrap";
    textdata[3] = "CSS";
    var i = 0;
    // alert(textdata.length);
    const gettext = () => {
        document.getElementById('getstyle').innerHTML = textdata[i];
    if(i < textdata.length - 1){
        i++;
    }else{
        i =0;
    }
   
    setTimeout("gettext()", 2000);
}
window.onload = gettext;

const validate = () => {
    var phone = document.getElementById('number').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var response = document.getElementById('response');
    // var colo = "rgb(206,212,218)";
    if(phone == ""){
       response.innerHTML = "Please add phone number";
       document.getElementById('number').style.border = "1px solid red";
       return false;
    }else if(email == ""){
        response.innerHTML = "Please add user email";
        document.getElementById('number').style.border = "1px solid rgb(206,212,218)";
        document.getElementById('email').style.border = "1px solid red";
        return false;
    }else if(message == ""){
        response.innerHTML = "Please add message";
        document.getElementById('number').style.border = "1px solid rgb(206,212,218)";
        document.getElementById('email').style.border = "1px solid rgb(206,212,218)";
        document.getElementById('message').style.border = "1px solid red";
        return false;
    }else{

    }
}