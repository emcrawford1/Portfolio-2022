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
  // {
  //   name: "Wisdom Threads",
  //   description:
  //     "This web app provides users of all ages and walks of life a platform for sharing wisdom, useful tips, and experiences.",
  //   pic: "./assets/images/wisdom_threads.png",
  //   deployed: "https://storythread.herokuapp.com",
  //   github: "https://github.com/emcrawford1/project2",
  // },
];

const cycleRight = () => {
  const currentPressTime = new Date();

  //Only allow button to be responsive when animation is not in transition
  if (!hoverPause) {
    const spokes = document.getElementsByClassName("spoke");
    const blocks = document.getElementsByClassName("block");

    //Get the amount of time in between clicks
    clickInterval = currentPressTime - lastPressTime;

    for (let i = 0; i < spokes.length; i++)
      spokes[i].classList.remove(
        "img-autocycle",
        `spoke-${i + 1}r`,
        `spoke-${i + 1}l`
      );
    for (let i = 0; i < blocks.length; i++)
      blocks[i].classList.remove(
        "img-autocycle",
        `block-${i + 1}r`,
        `block-${i + 1}l`
      );

    void leftArrowImg.offsetHeight;

    for (let i = 0; i < spokes.length; i++)
      spokes[i].classList.add("cycle-once", `spoke-${i + 1}r`, "cycle-speed");
    for (let i = 0; i < blocks.length; i++)
      blocks[i].classList.add("cycle-once", `block-${i + 1}r`, "cycle-speed");
  }
  //Set lastPressTime variable to the last time the button was clicked
  lastPressTime = new Date();
};

const cycleLeft = () => {
  //Variable to check speed in between button clicks
  const currentPressTime = new Date();
  let clickInterval;

  //Only allow button to be responsive when animation is not in transition
  if (!hoverPause) {
    const spokes = document.getElementsByClassName("spoke");
    const blocks = document.getElementsByClassName("block");

    //Get the time interval for the last time the user clicked the button
    clickInterval = currentPressTime - lastPressTime;

    for (let i = 0; i < spokes.length; i++)
      spokes[i].classList.remove(
        "img-autocycle",
        `spoke-${i + 1}r`,
        `spoke-${i + 1}l`
      );
    for (let i = 0; i < blocks.length; i++)
      blocks[i].classList.remove(
        "img-autocycle",
        `block-${i + 1}r`,
        `block-${i + 1}l`
      );

    void leftArrowImg.offsetHeight;

    for (let i = 0; i < spokes.length; i++) spokes[i].classList.add("cycle-once",`spoke-${i + 1}l`,"cycle-speed");
    for (let i = 0; i < blocks.length; i++) blocks[i].classList.add("cycle-once", `block-${i + 1}l`, "cycle-speed");

  }

  //Set lastPressTime variable to the last time the button was clicked
  lastPressTime = new Date();
};

//Function that calls carouselCycle with 1 as the initial argument.  This function is used so that carouselCycle can be
//attached to an event listener and hoverPause can be set to false.
const startCycle = (event) => {
  hoverPause = false;
  if (event.animationName === "block-rotate-left-2") carouselCycle(-1);
  else carouselCycle(1);
};

//Do not freeze carousel while animation is in progress
const delayPause = () => {
  
  //Remove transition during carousel movement
  const card = document.getElementsByClassName("portfolio-card")[0];
  card.classList.remove("portfolio-card");
  card.classList.add("card-transition");
  hoverPause = true

};

//Create and return an array of <img> elements for DOM
const createImage = (portfolio, index) => {
  const imageList = [];

  for (let i = index, j = 1; i < index + portfolio.length; i++, j++) {

    const spoke = document.createElement("div");
    const block = document.createElement("div");
    const img = document.createElement("img");

    spoke.classList.add("spoke");
    spoke.classList.add(`spoke-${j}r`);
    spoke.classList.add("img-autocycle");
    block.classList.add("block");
    block.classList.add(`block-${j}r`);
    block.classList.add("img-autocycle");
    img.classList.add("carousel-image");
    img.src = portfolio[i % portfolio.length].pic;
    img.alt = portfolio[i % portfolio.length].name;

    if (j === 2) {
      const card = createCard(portfolio, img, i);
      block.classList.add("focus-slide");
      spoke.classList.add("focus-slide");
      block.addEventListener("animationend", startCycle);
      block.addEventListener("animationstart", delayPause);
      block.addEventListener("mouseenter", pauseCarousel);
      block.addEventListener("mouseleave", resumeCarousel);
      block.appendChild(card);
    }

    else block.appendChild(img)

    spoke.appendChild(block);

    imageList.push(spoke);
  }
  return imageList;
};

const createIndicators = (portfolio, currentPosition) => {
  
  const indicators = []

  //The focus element is technically the second item in the array; however, since it is the "focus element" we 
  //need for it to appear as the first item in the indicator listing.   
  const focusPosition = ((currentPosition - 1) + portfolio.length) % portfolio.length;

  for(let i = 0; i < portfolio.length; i++) {
    const iElement = document.createElement('div');

    if(i === focusPosition) iElement.classList.add('current-indicator');
    else iElement.classList.add('blank-indicator');

    indicators.push(iElement)
  }
  return indicators;
}

//Create rotating informational card (this will be the focus slide in the carousel)
const createCard = (portfolio, imgElement, index) => {

  const card = document.createElement('div');
  const cardInner = document.createElement('div');
  const cardFront = document.createElement('div');
  
  //Project information
  const cardBack = document.createElement('div');
  const infoDescription = document.createElement('div');
  const infoTitle = document.createElement('div');
  const githubContainer = document.createElement('div');
  const githubLink = document.createElement('a');
 

  //Add classes
  card.classList.add('portfolio-card');
  cardInner.classList.add('card-inner');
  cardFront.classList.add('card-front');
  cardBack.classList.add('card-back');
  infoTitle.classList.add('info-title');
  infoDescription.classList.add('info-description');
  githubContainer.classList.add('github-container');

  githubLink.classList.add('github-link');

  imgElement.classList.add("rotate-image");

  //Add information to back of card
  infoDescription.innerHTML = portfolio[index%portfolio.length].description;
  infoTitle.innerHTML = portfolio[index%portfolio.length].name;
  githubContainer.innerHTML = "GitHub: "
  githubLink.setAttribute("href", portfolio[index%portfolio.length].github);
  githubLink.setAttribute("target","_blank");
  githubLink.innerHTML = portfolio[index%portfolio.length].github;


  //Build back of card
  cardBack.appendChild(infoTitle);
  cardBack.appendChild(infoDescription);
  cardBack.appendChild(githubContainer);

  //Check to see if the current project has a deployed link.  If so add to card
  if(portfolio[index % portfolio.length].hasOwnProperty("deployed")) {
    const deployedContainer = document.createElement('div');
    const deployedLink = document.createElement('a');

    deployedContainer.classList.add('deployed-container');
    deployedLink.classList.add('deployed-link');

    deployedLink.setAttribute("href", portfolio[index%portfolio.length].deployed);
    deployedLink.setAttribute("target","_blank");

    deployedContainer.innerHTML = "Deployed: "
    deployedLink.innerHTML = portfolio[index%portfolio.length].deployed;

    deployedContainer.appendChild(deployedLink);
    cardBack.appendChild(deployedContainer);
  }

  //Build rest of card
  githubContainer.appendChild(githubLink);
  cardFront.appendChild(imgElement);
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card;
}

//Remove all <img> elements so that they can be replaced
const resetContainer = () => {

  const removeNode = document.getElementById("carousel-items");
  const carousel = document.getElementById("carousel");
  const focusSlide = document.getElementsByClassName("focus-slide")[0];

  const carouselItems = document.createElement("div");
  const imgContainer = document.createElement("div");
  const indicatorContainer = document.createElement("div");

  //Remove event listeners if focusSlide node exists
  if (focusSlide) {
    focusSlide.removeEventListener("animationend", startCycle);
    focusSlide.removeEventListener("animationstart", delayPause);
    focusSlide.removeEventListener("mouseenter", pauseCarousel);
    focusSlide.removeEventListener("mouseleave", resumeCarousel);
  }

  //Remove current carousel items from carousel element
  carousel.removeChild(removeNode);

  //Add id & classnames to elements
  carouselItems.id = "carousel-items";
  imgContainer.id = "img-container";
  indicatorContainer.id = "indicator-container";
  
  //Build carousel
  carouselItems.appendChild(imgContainer);
  carouselItems.appendChild(indicatorContainer);
  carousel.appendChild(carouselItems);

  return document.getElementById("img-container");
};

//Carousel cycling function
const carouselCycle = (incrementor) => {
  const imgContainer = resetContainer();
  const indicatorContainer = document.getElementById("indicator-container");
  position = position + incrementor;

  //Ensure that a postive increment and a negative decrement both correspond to the appropriate values
  //I.e., with a starting value of 0, -1 should correspond to arr[arr.length] and +1 should correspond to arr[1].
  //Some modular math is used to obtain the remainders of higher increment/decrement values
  position = ((position % projects.length) + projects.length) % projects.length;

  const imageNodes = createImage(projects, position);
  const indicators = createIndicators(projects, position);

  indicators.forEach((node) => indicatorContainer.appendChild(node));
  imageNodes.forEach((node) => imgContainer.appendChild(node));
};

//Pause carousel if user hovers over focused slide
const pauseCarousel = () => {
  if (!hoverPause) {
    const spokes = document.getElementsByClassName("spoke");
    const blocks = document.getElementsByClassName("block");

    for (let i = 0; i < spokes.length; i++)
      spokes[i].style.animationPlayState = "paused";
    for (let i = 0; i < blocks.length; i++)
      blocks[i].style.animationPlayState = "paused";
  }
};

//Resume carousel if user moves mouse out of focused slide
const resumeCarousel = () => {
  const spokes = document.getElementsByClassName("spoke");
  const blocks = document.getElementsByClassName("block");

  for (let i = 0; i < spokes.length; i++)
    spokes[i].style.animationPlayState = "running";
  for (let i = 0; i < blocks.length; i++)
    blocks[i].style.animationPlayState = "running";
};

//Start carousel
carouselCycle(1);

rightArrowImg.addEventListener("click", cycleRight);
leftArrowImg.addEventListener("click", cycleLeft);
