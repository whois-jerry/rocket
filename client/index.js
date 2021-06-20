function logIn() {
  let username = document.getElementById(`username`).value;
  let password = document.getElementById(`password`).value;
  let valueCheck = "";

  // This allows us to store the username value for recall on another html page
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
  sessionStorage.setItem("username", username);

  fetch(`http://localhost:3000/user/bal?name=${username}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      valueCheck = `${data[0].balance}`;
      console.log(valueCheck);
    })
    .catch((error) => console.log("error", error));

  // This slows things down so we can a response for the balance query before checking if > 0
  setTimeout(function () {
    if (valueCheck > 0 && password == `password`) {
      window.location.href = "main.html";
    }
  }, 1000);
}

function addUser() {
  let username = document.getElementById(`username`).value;
  fetch(`http://localhost:3000/user/add/?name=${username}`, { method: "POST" })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
    //.finally(() => {
      //window.location.href = "main.html";
    //});
  
  // This slows things down so the user can be created before the redirect & onload.
  setTimeout(function () {
    window.location.href = "main.html";
  }, 1000);
}

// This allows us to login by hitting the 'Enter' key
// when cursor at username form
username.addEventListener("keypress", function (event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case "Enter":
      logIn();
      break;
    default:
      return;
  }
  event.preventDefault();
});

// This allows us to login by hitting the 'Enter' key
// when cursor at password form
password.addEventListener("keypress", function (event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case "Enter":
      logIn();
      break;
    default:
      return;
  }
  event.preventDefault();
});
