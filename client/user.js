let username = document.getElementById(`username`);
let amount = document.getElementById(`amount`);

function getBal() {
  let name = document.getElementById(`username`).value;
  fetch(`http://localhost:3000/user/bal?name=${name}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      balance.innerHTML = `$${data[0].balance}`;
    })
    .catch((error) => console.log("error", error));
}

function addUser() {
  let name = document.getElementById(`username`).value;
  fetch(`http://localhost:3000/user/add/?name=${name}`, { method: "POST" })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function deposit() {
  let name = document.getElementById(`username`).value;
  let amount = document.getElementById(`amount`).value;
  let myheaders = new Headers();
  myheaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    amount: amount,
  });

  var requestOptions = {
    method: "PUT",
    headers: myheaders,
    body: raw,
  };

  fetch(`http://localhost:3000/user/addbal?name=${name}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function withdraw() {
  let name = document.getElementById(`username`).value;
  let amount = document.getElementById(`amount`).value;
  let myheaders = new Headers();
  myheaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    amount: amount,
  });

  var requestOptions = {
    method: "PUT",
    headers: myheaders,
    body: raw,
  };

  fetch(`http://localhost:3000/user/wthdrwbal?name=${name}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// This allows us to login by hitting the 'Enter' key &
// sets the default balance to $0.00 if no valid user login is entered
username.addEventListener("keypress", function (event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case "Enter":
      getBal();
      break;
    default:
      return;
  }
  balance.innerHTML = `$0.00`;
  event.preventDefault();
});

// These are all the button event listeners
login.addEventListener("click", getBal);
signup.addEventListener("click", addUser)
signup.addEventListener("click", getBal);
addbal.addEventListener("click", deposit);
addbal.addEventListener("click", getBal);
takebal.addEventListener("click", withdraw);
takebal.addEventListener("click", getBal);