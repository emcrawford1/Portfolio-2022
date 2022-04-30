//Variables
let position = 0;
let hoverPause = false;
let incrementor = 1;
let lastPressTime = new Date();
const rightArrowImg = document.getElementById("right-arrow");
const leftArrowImg = document.getElementById("left-arrow");
const mainContainer = document.getElementById("main-container");


//Project listing for carousel cards
const projects = [
  {
    name: "Flight!  The Boring Guessing Game.",
    description:
      'This game is essentially a "Hangman" game in which the user tries to guess the letters of a word that the computer has selected. The user has a limited number of wrong guesses and the user wins if they are able to guess all letters without guessing incorrectly too many times.',
    pic: "./assets/images/Flight_Logo.jpeg",
    deployed: "https://emcrawford1.github.io/Word-Guess-Game/",
    github: "https://github.com/emcrawford1/Word-Guess-Game",
  },
  {
    name: "Burger",
    description:
      "Burger app demonstrating the manipulation of DOM elements and storing data about those elements in a database.",
    pic: "./assets/images/Burger_Logo.jpeg",
    github: "https://github.com/emcrawford1/burger",
  },
  {
    name: "Trivia",
    description:
      "This game asks the user a series of questions related to the Nashville Predators. After the user selects an answer, the game notifies the user of the correct answer and displays a GIF related to the question. At the end of the game, the user's statistics are displayed.",
    pic: "./assets/images/Trivia_Logo.jpeg",
    deployed: "https://emcrawford1.github.io/TriviaGame/",
    github: "https://github.com/emcrawford1/TriviaGame",
  },
  {
    name: "PlanIt",
    description:
      "This quasi-social media app will help you plan events with friends - seeing their invitation status in real-time.",
    pic: "./assets/images/planit.jpg",
    github: "https://github.com/emcrawford1/Project1",
  },
  {
    name: "Wisdom Threads",
    description:
      "This web app provides users of all ages and walks of life a platform for sharing wisdom, useful tips, and experiences.",
    pic: "./assets/images/wisdom_threads.png",
    deployed: "https://storythread.herokuapp.com",
    github: "https://github.com/emcrawford1/project2",
  },
];

const cycleRight = () => {
  const currentPressTime = new Date();
  let clickInterval;

  //Only allow button to be responsive when animation is not in transition
  if (!hoverPause) {
    const imgContainer = document.getElementById("img-container");
    const infoNode = document.getElementsByClassName("information")[0];

    imgContainer.classList.remove("img-autocycle");
    infoNode.classList.remove("information-autocycle");

    imgContainer.classList.add("img-slidein-left");
    infoNode.classList.add("information-leftcycle");

    //Get the time interval for the last time the user clicked the button
    clickInterval = currentPressTime - lastPressTime;

    //Add the appropriate CSS class (each has a different animation-duration)
    switch (true) {
      case clickInterval <= 200:
        imgContainer.classList.add("img-fast-cycle");
        infoNode.classList.add("information-fast-cycle");
        break;

      case clickInterval > 200 && clickInterval <= 700:
        imgContainer.classList.add("img-medium-cycle");
        infoNode.classList.add("information-medium-cycle");
        break;

      default:
        imgContainer.classList.add("img-normal-cycle");
        infoNode.classList.add("information-normal-cycle");
    }

    void infoNode.offsetWidth;
  }

  //Set lastPressTime variable to the last time the button was clicked
  lastPressTime = new Date();
};

const cycleLeft = () => {
  //Variable to check speed in between button clicks
  const currentPressTime = new Date();

  //Only allow button to be responsive when animation is not in transition
  if (!hoverPause) {
    const imgContainer = document.getElementById("img-container");
    const infoNode = document.getElementsByClassName("information")[0];

    imgContainer.classList.remove("img-autocycle");
    infoNode.classList.remove("information-autocycle");

    imgContainer.classList.add("img-slidein-right");
    infoNode.classList.add("information-rightcycle");

    //Get the time interval for the last time the user clicked the button
    clickInterval = currentPressTime - lastPressTime;

    //Add the appropriate CSS class (each has a different animation-duration)
    switch (true) {
      case clickInterval <= 200:
        imgContainer.classList.add("img-fast-cycle");
        infoNode.classList.add("information-fast-cycle");
        break;

      case clickInterval > 200 && clickInterval <= 700:
        imgContainer.classList.add("img-medium-cycle");
        infoNode.classList.add("information-medium-cycle");
        break;

      default:
        imgContainer.classList.add("img-normal-cycle");
        infoNode.classList.add("information-normal-cycle");
    }

    void infoNode.offsetWidth;
  }

  //Set lastPressTime variable to the last time the button was clicked
  lastPressTime = new Date();
};

//Function that calls carouselCycle with 1 as the initial argument.  This function is used so that carouselCycle can be
//attached to an event listener and hoverPause can be set to false.
const startCycle = (event) => {
  hoverPause = false;
  if (event.animationName === "right-cycle") carouselCycle(-1);
  else carouselCycle(1);
};

//Do not freeze carousel while animation is in progress
const delayPause = () => (hoverPause = true);

//Create and return an array of <img> elements for DOM
const createImage = (portfolio, index) => {
  const imageList = [];
  for (let i = index; i < index + portfolio.length + 2; i++) {
    //Add informational node to image array
    if (
      i % portfolio.length ===
      Math.floor((index + portfolio.length / 2 + 1) % portfolio.length)
    ) {
      const infNode = document.createElement("div");

      //Create information that will appear in the information panel
      const projectName = document.createElement("div");
      const projectDescr = document.createElement("div");
      const projectGitHub = document.createElement("a");

      projectGitHub.setAttribute(
        "href",
        portfolio[i % portfolio.length].github
      );

      projectName.innerHTML = portfolio[i % portfolio.length].name;
      projectDescr.innerHTML = portfolio[i % portfolio.length].description;
      projectGitHub.innerHTML = portfolio[i % portfolio.length].github;

      //Add containers for anchor tags (for formatting)
      const githubContainer = document.createElement("div");
      githubContainer.innerHTML = "GitHub: ";
      githubContainer.appendChild(projectGitHub);

      //Add classes to the information panel items
      projectName.classList.add("project-name");
      projectDescr.classList.add("project-descr");
      githubContainer.classList.add("project-github");

      infNode.appendChild(projectName);
      infNode.appendChild(projectDescr);
      infNode.appendChild(githubContainer);

      //Check if current project object has a deployed link.  If so create and add to information node.
      if (portfolio[i % portfolio.length].hasOwnProperty("deployed")) {
        const deployedContainter = document.createElement("div");
        const projectDeployed = document.createElement("a");

        projectDeployed.setAttribute(
          "href",
          portfolio[i % portfolio.length].deployed
        );
        projectDeployed.innerHTML = portfolio[i % portfolio.length].deployed;

        deployedContainter.classList.add("project-deployed");
        deployedContainter.innerHTML = "Deployed: ";
        deployedContainter.appendChild(projectDeployed);

        infNode.appendChild(deployedContainter);
      }

      infNode.classList.add("information");
      infNode.classList.add("information-autocycle");

      //Add eventlisteners
      infNode.addEventListener("animationend", startCycle);
      infNode.addEventListener("animationstart", delayPause);
      infNode.addEventListener("mouseenter", pauseCarousel);
      infNode.addEventListener("mouseleave", resumeCarousel);

      const focusImg = document.createElement("img");
      const containerDiv = document.createElement("div");
      focusImg.src = portfolio[i % portfolio.length].pic;
      focusImg.alt = portfolio[i % portfolio.length].name;

      //Add event listeners to freeze & resume carousel when mouse enters & exits slide
      focusImg.addEventListener("mouseenter", pauseCarousel);
      focusImg.addEventListener("mouseleave", resumeCarousel);

      focusImg.classList.add("focus-image");

      containerDiv.classList.add("img-container-div");
      containerDiv.appendChild(focusImg);

      imageList.push(infNode);
      imageList.push(containerDiv);
    } else {
      const imgNode = document.createElement("img");
      imgNode.src = portfolio[i % portfolio.length].pic;
      imgNode.alt = portfolio[i % portfolio.length].name;
      imgNode.classList.add("side-images");
      imageList.push(imgNode);
    }
  }
  return imageList;
};

//Remove all <img> elements so that they can be replaced
const resetContainer = () => {
  const removeNode = document.getElementById("img-container");
  const imgContainer = document.createElement("div");
  const infoSlide = document.getElementsByClassName("information")[0];
  const focusSlide = document.getElementsByClassName("focus-image")[0];

  //Remove img-container element from the main container element
  mainContainer.removeChild(removeNode);

  //Add id to new image container element
  imgContainer.id = "img-container";

  //Add img-autocycle class to element that will hold images.  This class has an animation attached that will
  //cycle through the elements
  imgContainer.classList.add("img-autocycle");

  //Attach new image container element to main container element
  mainContainer.appendChild(imgContainer);

  //Remove event listeners if infoSlide node exists
  if (infoSlide) {
    infoSlide.removeEventListener("animationend", startCycle);
    infoSlide.removeEventListener("animationstart", delayPause);
    infoSlide.removeEventListener("mouseenter", pauseCarousel);
    infoSlide.removeEventListener("mouseleave", resumeCarousel);
  }

  //Remove event listeners if focusSlide node exists
  if (focusSlide) {
    focusSlide.removeEventListener("mouseenter", pauseCarousel);
    focusSlide.removeEventListener("mouseleave", resumeCarousel);
  }

  return document.getElementById("img-container");
};

//Carousel cycling function
const carouselCycle = (incrementor) => {
  const imgContainer = resetContainer();
  position = position + incrementor;

  //Ensure that a postive increment and a negative decrement both correspond to the appropriate values
  //I.e., with a starting value of 0, -1 should correspond to arr[arr.length] and +1 should correspond to arr[1].
  //Some modular math is used to obtain the remainders of higher increment/decrement values
  position = ((position % projects.length) + projects.length) % projects.length;

  const imageNodes = createImage(projects, position);
  imageNodes.forEach((node) => imgContainer.appendChild(node));
};

const pauseCarousel = () => {
  if (!hoverPause) {
    document.getElementsByClassName("information")[0].style.animationPlayState =
      "paused";
    document.getElementById("img-container").style.animationPlayState =
      "paused";
  }
};

const resumeCarousel = () => {
  document.getElementsByClassName("information")[0].style.animationPlayState =
    "running";
  document.getElementById("img-container").style.animationPlayState = "running";
};

//Start carousel
carouselCycle(1);

//Find and set width for transparent blurring divs
const windowResize = () => {
  const blurRight = document.getElementById("blur-right");
  blurRight.style.width = `${(window.innerWidth - 450) / 2}px`;

  const blurLeft = document.getElementById("blur-left");
  blurLeft.style.width = `${(window.innerWidth - 450) / 2}px`;
};


//Run windowResize function to set initial values of the blur divs
windowResize();

//Attach event listener to window object so that if the window is resized the applicable divs are resized
window.addEventListener("resize", windowResize);

rightArrowImg.addEventListener("click", cycleRight);
leftArrowImg.addEventListener("click", cycleLeft);
