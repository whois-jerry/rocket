let stockSymbol = document.getElementById(`stocksymbol`);

// This calls the stored value in sessionStorage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
let storeUser = sessionStorage.getItem("username");
let storeBalance = "";

function getBal() {
  fetch(`http://localhost:3000/user/bal?name=${storeUser}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      storeBalance = `${data[0].balance}`;
      console.log(storeBalance);
    })
    .catch((error) => console.log("error", error));
}

function getTrade() {
  fetch(`http://localhost:3000/transaction/view?fullname=${storeUser}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      var text = `
            <table>
              <tr>
                <th>Order ID</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Order Type</th>
                <th>Amount</th>
                <th>Name</th>
              </tr>`;

      data.forEach((item) => {
        text += `
                  <tr>
                    <td>${item.transaction_id}</td>
                    <td>${item.stock}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>${item.transaction_type}</td>
                    <td>${item.amount}</td>
                    <td>${item.fullname}</td>
                  </tr>`;
      });
      text += "</table>";
      $(".mypanel").html(text);
    })
    .catch((error) => console.log("error", error));
}

function buyTrade() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let s = document.getElementById("stocksymbol").value.toUpperCase();
  let p = stockprice.innerHTML.replace(/\$/g, "");
  let q = document.getElementById("tradeqty").value;
  let trantype = document.getElementById("tradebuy").innerHTML;
  let t_amt = p * q;
  let fullname = storeUser;

  console.log(s);
  console.log(p);
  console.log(q);
  console.log(trantype);
  console.log(t_amt);
  console.log(fullname);
  alert(
    `Your ${trantype} order of ${q} ${s} shares at ${p} will amount to ${t_amt.toFixed(
      2
    )}`
  );

  var raw = JSON.stringify({
    stock: s,
    quantity: q,
    transaction_type: trantype,
    price: p,
    amount: t_amt,
    fullname: storeUser,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  console.log(requestOptions);

  if (t_amt <= storeBalance) {
    fetch(
      `http://localhost:3000/transaction/add?stock=${s}&quantity=${q}&transaction_type=${trantype}&price=${p}&amount=${t_amt}&fullname=${storeUser}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log("error", error));
  } else {
    alert(
      `Your balance of ${storeBalance} is insufficient for this transaction!`
    );
  }

  // This section UPDATES the account user balance after the purchase
  // Can't seem to use a function as t_amt value doesnt pass into nested function

  let newheaders = new Headers();
  newheaders.append("Content-Type", "application/json");

  let newraw = JSON.stringify({
    balance: Number(storeBalance) - Number(t_amt),
  });

  var requestOptions = {
    method: "PUT",
    headers: newheaders,
    body: newraw,
  };

  fetch(`http://localhost:3000/user/newbal?name=${storeUser}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .then(getBal())
    .catch((error) => console.log("error", error));
}

function sellTrade() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let s = document.getElementById("stocksymbol").value.toUpperCase();
  let p = stockprice.innerHTML.replace(/\$/g, "");
  let q = document.getElementById("tradeqty").value;
  let trantype = document.getElementById("tradesell").innerHTML;
  let t_amt = p * q;
  let fullname = storeUser;

  console.log(s);
  console.log(p);
  console.log(q);
  console.log(trantype);
  console.log(t_amt);
  console.log(fullname);
  alert(
    `Your ${trantype} order of ${q} ${s} shares at ${p} will amount to ${t_amt.toFixed(
      2
    )}`
  );

  var raw = JSON.stringify({
    stock: s,
    quantity: q,
    transaction_type: trantype,
    price: p,
    amount: t_amt,
    fullname: storeUser,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  console.log(requestOptions);

  fetch(
    `http://localhost:3000/transaction/add?stock=${s}&quantity=${q}&transaction_type=${trantype}&price=${p}&amount=${t_amt}&fullname=${storeUser}`,
    requestOptions
  )
    .then((response) => response.text())
    .then(function (data) {
      console.log(data);
    })
    .catch((error) => console.log("error", error));

  // This section UPDATES the account user balance after the sale
  // Can't seem to use a function as t_amt value doesnt pass into nested function

  let newheaders = new Headers();
  newheaders.append("Content-Type", "application/json");

  let newraw = JSON.stringify({
    balance: Number(storeBalance) + Number(t_amt),
  });

  var requestOptions = {
    method: "PUT",
    headers: newheaders,
    body: newraw,
  };

  fetch(`http://localhost:3000/user/newbal?name=${storeUser}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .then(getBal())
    .catch((error) => console.log("error", error));
}

/*
function getTradeBal() {
  let name = document.getElementById(`tradename`).value;
  fetch(`http://localhost:3000/user/bal?name=${name}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      tradebalance.innerHTML = `$${data[0].balance}`;
    })
    .catch((error) => console.log("error", error));
}
*/

function getStockPrice() {
  let stock = document.getElementById(`stocksymbol`).value;
  fetch(
    `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${stock}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "daf1ecb604mshf39d0f3eb98728cp19a5f8jsnb4e9180c3729",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      stockprice.innerHTML = `$${result.quoteResponse.result[0].regularMarketPrice}`;
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
}

/*
function updateBalance() {
  let myheaders = new Headers();
  myheaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    balance: storeBalance - t_amt,
  });

  var requestOptions = {
    method: "PUT",
    headers: myheaders,
    body: raw,
  };

  fetch(`http://localhost:3000/user/newbal?name=${storeUser}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .then(getBal())
    .catch((error) => console.log("error", error));
}
*/

// This allows us to hit 'Enter" on the Stock Symbol form field to execute getStockPrice
stockSymbol.addEventListener("keypress", function (event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case "Enter":
      getStockPrice();
      break;
    default:
      return;
  }
  event.preventDefault();
});

getprice.addEventListener("click", getStockPrice);
