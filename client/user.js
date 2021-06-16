function getBal() {
  let name = document.getElementById(`username`).value;
  fetch(`http://localhost:3000/user/bal?name=${name}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      balance.innerHTML = `$${data[0].balance}`;
    })
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


login.addEventListener("click", getBal)
//signup.addEventListener("click",)
addbal.addEventListener("click", deposit)
addbal.addEventListener("click", getBal)
takebal.addEventListener("click", withdraw)
takebal.addEventListener("click", getBal)