//Buttons
let clearBtn = document.getElementById("clear-btn");
let submitBtn = document.getElementById("submit-btn");

//Input fields
let fullName = document.getElementById("name");
let company = document.getElementById("company");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let message = document.getElementById("message");

//Error messages
let nameError = document.getElementById("name-error");
let emailError = document.getElementById("email-error");
let messageError = document.getElementById("message-error");

//Contact form response message
let successResponse = document.getElementById("response-success");
let errResponse = document.getElementById("response-err");

//Boolean to determine if loading icon should display
let showLoading = false;

const clearForm = () => {
  fullName.value = "";
  company.value = "";
  email.value = "";
  phone.value = "";
  message.value = "";

  nameError.style.display = "none";
  emailError.style.display = "none";
  messageError.style.display = "none";
};

const submitForm = () => {
  let error = false;
  let contactReq = {};

  //Set all error messages to default value
  nameError.style.display = "none";
  emailError.style.display = "none";
  messageError.style.display = "none";

  //Display error messages for required fields that are blank
  if (fullName.value === "") {
    nameError.style.display = "block";
    error = true;
  }

  if (email.value === "") {
    emailError.style.display = "block";
    error = true;
  }

  if (message.value === "") {
    messageError.style.display = "block";
    error = true;
  }

  //If no error submit fetch request
  if (!error) {
    contactReq.fullName = fullName.value;
    contactReq.company = company.value || "";
    contactReq.email = email.value;
    contactReq.phone = phone.value || "";
    contactReq.message = message.value;

    postContact(contactReq)
      .then((res) => {
        showMessage(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//POST request for contact form
const postContact = async (data) => {
  const response = await fetch("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

//Show post-contact message
const showMessage = (status) => {
  let messageElement;
  if (status >= 200 && status <= 299) { 
    messageElement = successResponse;
    clearForm();
    console.log(messageElement)
  }
  else messageElement = errResponse;
  
  console.log(messageElement);
  messageElement.style.display = "block";
  setTimeout(() => {
    messageElement.style.display = "none";
  }, 2000);

};

clearBtn.addEventListener("click", clearForm);
submitBtn.addEventListener("click", submitForm);
