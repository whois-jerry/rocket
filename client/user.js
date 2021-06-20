let username = document.getElementById(`username`);
let amount = document.getElementById(`amount`);

// This calls the stored value in sessionStorage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
let storeUser = sessionStorage.getItem('username');

function getBal() {
  //let name = document.getElementById(`username`).value;
  fetch(`http://localhost:3000/user/bal?name=${storeUser}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      balance.innerHTML = `$${data[0].balance}`;
    })
    .catch((error) => console.log("error", error));
}

/*
function addUser() {
  let name = document.getElementById(`username`).value;
  fetch(`http://localhost:3000/user/add/?name=${name}`, { method: "POST" })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
*/

function deposit() {
  //let name = document.getElementById(`username`).value;
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

  fetch(`http://localhost:3000/user/addbal?name=${storeUser}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .then(getBal())
    .catch((error) => console.log("error", error));
}

function withdraw() {
  //let name = document.getElementById(`username`).value;
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

  fetch(`http://localhost:3000/user/wthdrwbal?name=${storeUser}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .then(getBal())
    .catch((error) => console.log("error", error));
}

/*
function testOnly() {
  tester.innerHTML = `${storeUser}`
}
*/

// This allows us to login by hitting the 'Enter' key &
// sets the default balance to $0.00 if no valid user login is entered
/*
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
*/

// These are all the button event listeners
addbal.addEventListener("click", deposit);
addbal.addEventListener("click", getBal);
takebal.addEventListener("click", withdraw);
takebal.addEventListener("click", getBal);