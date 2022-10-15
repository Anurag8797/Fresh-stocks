async function getProductList(url) {
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "applcation/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((response) => console.log("response.status :", response.status))
    .then((data) => console.log(data));
}

// function submitForm() {
//   getProductList("http://localhost:3000/productList");
// }

var currentId = 1;
var first = true;
var loading = false;
var listCompleted = false;
loadData();
async function getData(
  url = "http://localhost:3000/productList?currentId=",
  limit = 1,
  id = 1
) {
  // var List = document.getElementById("stocks-list");
  console.log("currentId :", id);

  try {
    // const costNode = document.createTextNode();
    for (var i = 0; i < limit; i++) {
      await fetch(url + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("data:", data.rating.rate);

          const node = document.createElement("div");
          const tittle = document.createElement("h3");
          const cost = document.createElement("h2");
          const rates = document.createElement("h2");
          const aTag = document.createElement("a");
          aTag.setAttribute("href", "next.html");
          const buton = document.createElement("button");
          const img = new Image(300, 350);
          img.src = data.image;
          img.classList.add("stockImg");
          tittle.classList.add("stockTittle");
          cost.classList.add("stockPrices");
          rates.classList.add("stockRates");
          buton.classList.add("addToCart");
          const tittleNode = document.createTextNode(data.title);
          const pricesNode = document.createTextNode(data.price);
          const ratesNode = document.createTextNode(data.rating.rate);
          tittle.appendChild(tittleNode);
          cost.appendChild(pricesNode);
          rates.appendChild(ratesNode);

          const costHeading = document.createElement("h2");
          const ratingHeading = document.createElement("h2");
          const costNode = document.createTextNode("Cost:")
          costHeading.appendChild(costNode);
          const rateNode = document.createTextNode("Rating:");
          ratingHeading.appendChild(rateNode);
          const costHead = document.createElement("div");
          costHead.appendChild(costHeading);
          costHead.appendChild(cost);
          const rateHead = document.createElement("div");
          rateHead.appendChild(ratingHeading);
          rateHead.appendChild(rates);

          costHead.classList.add("attribute");
          rateHead.classList.add("attribute");

          node.appendChild(img);
          node.appendChild(tittle);
          node.appendChild(costHead);
          node.appendChild(rateHead);
          node.appendChild(aTag);
          aTag.appendChild(buton).innerHTML = "Add to Cart";
          node.classList.add("item");
          document.getElementById("stocks-list").appendChild(node);
          loading = false;
        });
      id++;
    }
    currentId = currentId + limit;
  } catch (err) {
    console.log("err:", err);
    listCompleted = true;
  }
}

async function loadData() {
  var limit = 1;
  if (!first) {
    await getData(
      (url = "http://localhost:3000/productList?currentId="),
      limit,
      currentId
    );
  } else {
    await getData(
      (url = "http://localhost:3000/productList?currentId="),
      limit,
      1
    );
  }
  first = false;
}

document.getElementById("stocks-list").addEventListener("scroll", () => {
  // console.log(document.getElementById("stocks-list").scrollTop) //scrolled from top
  // console.log(document.getElementById("stocks-list").offsetHeight) //visible part of screen
  // console.log(document.getElementById("stocks-list").scrollHeight) //total scrolling size
  if (
    document.getElementById("stocks-list").scrollTop +
      document.getElementById("stocks-list").offsetHeight >=
    document.getElementById("stocks-list").scrollHeight
  ) {
    if (!loading && !listCompleted) {
      loading = true;
      loadData();
    }
  }
});
