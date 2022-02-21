//Variables
let position = 0;
let hoverPause = false;
let hoverEnter = false;
let incrementVal = 1;
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
    github: "https://github.com/emcrawford1/TriviaGame"
  },
  {
    name: "PlanIt",
    description: "This quasi-social media app will help you plan events with friends - seeing their invitation status in real-time.",
    pic: "./assets/images/planit.jpg",
    github: "https://github.com/emcrawford1/Project1"
  },
  {
    name: "Wisdom Threads",
    description: "This web app provides users of all ages and walks of life a platform for sharing wisdom, useful tips, and experiences.",
    pic: "./assets/images/wisdom_threads.png",
    deployed: "https://storythread.herokuapp.com",
    github: "https://github.com/emcrawford1/project2"
  }
];

//Function that calls carouselCycle with incrementVal as arguments.  This function is used so that carouselCycle can be
//attached to an event listener with incrementVal as an argument
const startCycle = () => {
  hoverPause = false;
  carouselCycle(incrementVal);
}

//Do not freeze carousel while animation is in progress
const delayPause = () => hoverPause = true;

//Create and return an array of <img> elements for DOM
const createImage = (portfolio, index) => {
  const imageList = [];
  for(let i = (index); i < index + portfolio.length + 2; i++) {
 
    //Add informational node to image array
    if(i % portfolio.length === Math.floor((index + portfolio.length/2 + 1) % portfolio.length)) {

      const infNode = document.createElement('div');
      infNode.innerHTML = portfolio[i % portfolio.length].description;
      infNode.classList.add("information");
      
      //Add eventlisteners
      infNode.addEventListener('animationend', startCycle);  //This will fire after animation creating a recursive call to startCycle
      infNode.addEventListener('animationstart', delayPause);

      const header = document.createElement('h2');
      const headerText = document.createTextNode(projects[i % projects.length].name);
      header.appendChild(headerText);
      infNode.appendChild(header);

      const focusImg = document.createElement('img');
      focusImg.src = portfolio[i % portfolio.length].pic;
      focusImg.alt = portfolio[i % portfolio.length].name
      focusImg.classList.add("focus-image");
     
      imageList.push(infNode);
      imageList.push(focusImg)
    }

    else {
      const imgNode = document.createElement('img');
      imgNode.src = portfolio[i % portfolio.length].pic;
      imgNode.alt = portfolio[i % portfolio.length].name;
      imgNode.classList.add("side-images");
      imageList.push(imgNode);
    }
  }
  return imageList;
}

//Remove all <img> elements so that they can be replaced
const resetContainer = () => {
  
  const removeNode = document.getElementById('img-container');
  const imgContainer = document.createElement('div');
  const infoSlide = document.getElementsByClassName('information')[0];

  mainContainer.removeChild(removeNode);

  imgContainer.class = "image-container";
  imgContainer.id = "img-container";
  mainContainer.appendChild(imgContainer);

  //Remove event listener if infoSlide node exists
  if(infoSlide) {
    infoSlide.removeEventListener('animationend', startCycle);
    infoSlide.removeEventListener('animationstart', delayPause);
  }

  return document.getElementById('img-container');
}

//Carousel cycling function
const carouselCycle = (incrementor) => {
  
  const imgContainer = resetContainer();
  const imageNodes = createImage(projects, position)
  imageNodes.forEach(node => imgContainer.appendChild(node));
  position = position + incrementor;

 //Ensure that a postive increment and a negative decrement both correspond to the appropriate values
 //I.e., -1 should correspond to arr[arr.length] and +1 should correspond to arr[1].  Some modular
 //math is used to obtain the remainders of higher increment/decrement values
  position = ((position % projects.length) + projects.length) % projects.length;
}

const pauseCarousel = () => {
  hoverEnter = true;
  
  if(!hoverPause) {
    document.getElementsByClassName('information')[0].style.animationPlayState = 'paused';
    document.getElementById("img-container").style.animationPlayState = 'paused';
  }
}

const resumeCarousel = () => {
  document.getElementsByClassName('information')[0].style.animationPlayState = 'running';
  document.getElementById("img-container").style.animationPlayState = 'running';
}

//Event listeners for pausing & resuming carousel
mainContainer.addEventListener("mouseenter", pauseCarousel)
mainContainer.addEventListener("mouseleave", resumeCarousel)

//Start carousel
carouselCycle(incrementVal);

// const windowResize = () => console.log('Available width: ', window.innerWidth);

// window.addEventListener('resize', windowResize);

//Next Steps
// 1) Maybe add buffer slides based on how wide the screen is
// 2) Figure out how to make the 'navbar' clickable and responsive
// 3) Position the nav bar completely behind the carousel
// 4) Add the About Me & Contact portions of the site
// 5) Finish up any loose ends & deploy!!

