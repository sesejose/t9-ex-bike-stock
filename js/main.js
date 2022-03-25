const url = "http://sesejose.com/kea/wp_bike_stock/wp-json/wp/v2/bike?_embed";

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    handleBikes(data);
  });

function handleBikes(data) {
  console.log(data); //This show the array in the console
  data.forEach(showBike); //this assings a function for every item in the array
}

const template = document.querySelector("#bikeTemplate").content;

function showBike(bike) {
  //   console.log(bike);
  const copy = template.cloneNode(true);
  //Brand
  copy.querySelector(".brand").textContent =
    bike._embedded["wp:term"][0][0].name; //brackets because of the array
  //Model
  copy.querySelector(".model").textContent = bike.title.rendered;
  //Price
  //   copy.querySelector(".price-nr").textContent = bike._embedded["wp:term"][1][0].name;
  copy.querySelector(".price-nr").textContent = bike.price_1;
  copy.querySelector(".stock-amount").textContent = bike.in_stock;
  //Image */
  copy.querySelector(".picture img").src =
    bike._embedded["wp:featuredmedia"][0].source_url;
  //Colours
  //
  //
  const colors = bike._embedded["wp:term"][1];
  if (colors.length) {
    //   alert("hey");
    copy.querySelector(".color-value").textContent = "";
    const ulNew = document.createElement("ul");
    colors.forEach((color) => {
      const liNew = document.createElement("li");
      liNew.style.backgroundColor = color.name;
      ulNew.appendChild(liNew);
    });
    copy.querySelector(".color-value").appendChild(ulNew);
  }
  //
  //
  //
  //Button
  //   copy.querySelector("full").setAttribute("href", `product.html?id=${bike._id}`);
  //Where?
  const parent = document.querySelector("#main-grid");
  parent.appendChild(copy);
}
