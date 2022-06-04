//Buttons
let clearBtn = document.getElementById('clear-btn');
let submitBtn = document.getElementById('submit-btn');

//Input fields
let fullName = document.getElementById('name');
let company = document.getElementById('company');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let message = document.getElementById('message');

//Error messages
let nameError = document.getElementById('name-error');
let emailError = document.getElementById('email-error');
let messageError = document.getElementById('message-error');


const clearForm = () => {
  fullName.value = "";
  company.value = "";
  email.value = "";
  phone.value = "";
  message.value = "";

  nameError.style.display = "none";
  emailError.style.display = "none";
  messageError.style.display = "none";

}

const submitForm = () => {
  //Set all error messages to default value 
  nameError.style.display = "none";
  emailError.style.display = "none";
  messageError.style.display = "none";

  //Display error messages for required fields that are blank
  if(fullName.value === "") nameError.style.display = "block";
  if(email.value === "") emailError.style.display = "block";
  if(message.value === "") messageError.style.display = "block";
}

clearBtn.addEventListener('click', clearForm);
submitBtn.addEventListener('click', submitForm)
