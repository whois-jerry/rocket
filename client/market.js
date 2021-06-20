let stockTicker = sessionStorage.getItem("stockSymbol");

function getStockPrice() {
  //let stock = document.getElementById(`stocksymbol`).value;
  fetch(
    `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${stockTicker}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4ed5a320f4msh5cfc4ef7d16f2e2p1e376djsn145186147443",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      symbol.innerHTML = `${result.quoteResponse.result[0].symbol}`;
      stockprice.innerHTML = `$${result.quoteResponse.result[0].regularMarketPrice}`;

      fiftyMAbase = `${result.quoteResponse.result[0].fiftyDayAverage}`;
      fiftyMAnum = Number(fiftyMAbase);
      fiftyMA.innerHTML = fiftyMAnum.toFixed(2);

      twohundbase = `${result.quoteResponse.result[0].twoHundredDayAverage}`;
      twohundnum = Number(twohundbase);
      twohundMA.innerHTML = twohundnum.toFixed(2);

      pclose.innerHTML = `$${result.quoteResponse.result[0].regularMarketPreviousClose}`;

      peRatiobase = `${result.quoteResponse.result[0].trailingPE}`;
      peRationum = Number(peRatiobase);
      peRatio.innerHTML = peRationum.toFixed(2);

      eps.innerHTML = `$${result.quoteResponse.result[0].epsTrailingTwelveMonths}`;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getSummary() {
  //let stock = document.getElementById(`stocksymbol`).value;
  fetch(
    `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${stockTicker}&region=US`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4ed5a320f4msh5cfc4ef7d16f2e2p1e376djsn145186147443",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      company.innerHTML = `${result.price.longName}`;
      sector.innerHTML = `${result.summaryProfile.sector}`;
      assetprofile.innerHTML = `${result.summaryProfile.longBusinessSummary}`;
    })
    .catch((err) => {
      console.error(err);
    });
}

function initialize() {
  getStockPrice();
  getSummary();
}
