//Navigation variables
const aboutMeTitle = document.getElementById("about-title");
const projectsTitle = document.getElementById("projects-title");
const contactTitle = document.getElementById("contacts-title");
const navBar = document.getElementsByClassName("nav-items-container")[0];
const navDivider = document.getElementById("nav-divider");
const aboutContainer = document.getElementsByClassName("about-container")[0];
const projectsContainer = document.getElementsByClassName("main-container")[0];
const contactContainer =
  document.getElementsByClassName("contact-container")[0];

//Variable to throttle scroll event
let scrolling = false;

//Set scrolling variable to true - so that setInterval below knows to run functions in response
//to scroll event
const mouseScrolled = () => (scrolling = true);

//Interval to throttle the scroll event listener.  Several functions on the page react
//to the scroll event
setInterval(() => {
  if (scrolling) {
    scrolling = false;

    navItemResized();
    navHeaderFloat();
  }
}, 150);

const navItemResized = () => {
  switch (true) {
    case window.scrollY <= 500:
      aboutMeTitle.style.fontSize = "22px";
      projectsTitle.style.fontSize = "14px";
      contactTitle.style.fontSize = "14px";
      break;

    case window.scrollY > 500 && window.scrollY <= 1200:
      aboutMeTitle.style.fontSize = "14px";
      projectsTitle.style.fontSize = "22px";
      contactTitle.style.fontSize = "14px";
      break;

    default:
      aboutMeTitle.style.fontSize = "14px";
      projectsTitle.style.fontSize = "14px";
      contactTitle.style.fontSize = "22px";
  }
};

const navHeaderFloat = () => {
  if (window.scrollY > 140) {
    navBar.style.position = "fixed";
    navBar.style.right = "0px";
    navBar.style.left = "0px";
    navBar.style.top = "10px";
    navBar.style.marginRight = "auto";
    navBar.style.marginLeft = "auto";

    navDivider.style.display = "inline";
  } else {
    navBar.style.position = "absolute";
    navBar.style.left = "";
    navBar.style.right = "15%";
    navBar.style.top = "153px";
    navBar.style.marginRight = "0px";
    navBar.style.marginLeft = "0px";

    navDivider.style.display = "none";
  }
};

//Scroll to element when nav link is clicked
const scrollToElement = (event) => {
  //Get element #id
  let element = event.srcElement;
  let scrollAmount;

  if (element.id === "about-title")
    scrollAmount = 0;
  if (element.id === "projects-title")
    scrollAmount = 800;
  if (element.id === "contacts-title")
    scrollAmount = 1600;

    console.log(scrollAmount)
  window.scroll({
    top: scrollAmount,
    left: 0,
    behavior: "smooth",
  });
};

//Event listeners
window.addEventListener("scroll", mouseScrolled);
aboutMeTitle.addEventListener("click", scrollToElement);
projectsTitle.addEventListener("click", scrollToElement);
contactTitle.addEventListener("click", scrollToElement);
