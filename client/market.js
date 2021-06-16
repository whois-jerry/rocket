
function getStockPrice() {
let stock = document.getElementById(`stocksymbol`).value;
fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${stock}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "daf1ecb604mshf39d0f3eb98728cp19a5f8jsnb4e9180c3729",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
.then(response => response.json())
.then((result) => {
    console.log(result)
    stockprice.innerHTML = `$${result.quoteResponse.result[0].regularMarketPrice}`;
  })
.catch(err => {console.error(err);
});
}

getprice.addEventListener("click", getStockPrice)
