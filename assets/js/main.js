//Global position variable for cycling through projects
let position = 0;
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

//Add window event listener for window resize
window.addEventListener('resize', () => console.log(window.innerWidth, window.innerHeight))

//Create image nodes for DOM
const createImage = (...args) => {
  const imageList = args.map(position => {
      let imgNode = document.createElement('img');
      imgNode.src = projects[position].pic;
      imgNode.alt = projects[position].name;  
      return imgNode;
  })
  return imageList;
}

const resetContainer = () => {
  const removeNode = document.getElementById('img-container');
  mainContainer.removeChild(removeNode);

  const imgContainer = document.createElement('div');

  imgContainer.class = "image-container";
  imgContainer.id = "img-container";

  mainContainer.appendChild(imgContainer);

  return document.getElementById('img-container');
}

//Carousel cycling function
const carouselCycle = (incrementor) => {
  const imgContainer = resetContainer();
  const infoNode = document.getElementById('information');
  const titleNode = document.createElement('h3');

  let leftPosition = position % projects.length;
  let centerPosition = (position + incrementor) % projects.length;
  let rightPosition = (position + (incrementor * 2)) % projects.length;

  const imageNodes = createImage(leftPosition, centerPosition, rightPosition);

  imageNodes.forEach(node => imgContainer.appendChild(node));

  titleNode.innerHTML = projects[leftPosition].name;
  infoNode.appendChild(titleNode);
  console.log(titleNode);
  infoNode.innerHTML = projects[leftPosition].description;
 position = position + incrementor;
}

//Initial run of function to immediately populate page 
carouselCycle(1);

//Interval to periodically switch out cards on carousel
let interval = setInterval(() => carouselCycle(1), 1000);