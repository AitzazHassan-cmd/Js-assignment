let products = [
  {
    id: 1,
    name: "Laptop",
    price: "$550",
    category: "Electronics",
    Image: "images/laptop.jpg",
  },
  {
    id: 2,
    name: "Bag",
    price: "$150",
    category: "Fashion",
    Image: "images/bag.jpg",
  },
  {
    id: 3,
    name: "BagPack",
    price: "$170",
    category: "Fashion",
    Image: "images/bagpack.jpg",
  },
  {
    id: 4,
    name: "clothes",
    price: "$210",
    category: "Fashion",
    Image: "images/clothes.jpg",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: "$50",
    category: "Electronics",
    Image: "images/gammingmouse.jpg",
  },
  {
    id: 6,
    name: "Jursey",
    price: "$30",
    category: "Fashion",
    Image: "images/jursey.jpg",
  },
  {
    id: 7,
    name: "Keyboard",
    price: "$70",
    category: "Electronics",
    Image: "images/keyboard.jpg",
  },
  {
    id: 8,
    name: "Laptop Dell",
    price: "$450",
    category: "Electronics",
    Image: "images/laptop2.jpg",
  },
  {
    id: 9,
    name: "Shirt",
    price: "$20",
    category: "Fashion",
    Image: "images/shirts.jpg",
  },
];

let allProducts = [...products]; //copy of original array
// render Products
function ShowProducts(productsli) {
  const container = document.getElementById("container");
  const fragment = document.createDocumentFragment();
  container.innerHTML = "";

  if (productsli.length === 0) {
    container.innerHTML = `
      <p class="text-center font-bold text-2xl">No Product Found</p>`;
  }
  productsli.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "one bg-white p-4 rounded shadow cursor-pointer product hover:translate-y-[-8px] transition-all duration-150";
    card.innerHTML = `
       <img src="${product.Image}" class="w-full mb-3 size-48 object-cover">
       <h2 class="text-lg font-bold product-name">${product.name}</h2>
       <p class="text-gray-600">${product.price}</p>
      <button onclick='AddToCart()'
      class="mt-3 bg-green-500 text-white px-4 py-2 rounded w-full object-cover">
      Add to Cart
      </button>
      `;

   card.querySelector("button").onclick = function (e) {
  e.stopPropagation();
  AddToCart(this); 
};
    card.onclick = () => openModal(product);
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
}

// pop up open
function openModal(product) {
  document.getElementById("modalTitle").innerText = product.name;
  document.getElementById("modalPrice").innerText = product.price;
  document.getElementById("modalImg").src = product.Image;

  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// pop up close
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// search Term

const searchInput = document.getElementById("searchInput");
const notFound = document.getElementById("notFound"); // message element

searchInput.addEventListener("keyup", function () {
  const value = searchInput.value.toLowerCase();
  const products = document.querySelectorAll(".one");

  let found = false;

  products.forEach((product) => {
    const name = product.querySelector(".product-name").innerText.toLowerCase();

    if (name.includes(value)) {
      product.classList.remove("hidden");
      found = true;
    } else {
      product.classList.add("hidden");
    }
  });

  if (found) {
    notFound.classList.add("hidden");
  } else {
    notFound.classList.remove("hidden");
  }
});
// Price Based filter
function sort(value) {
  if (value === "Low-to-Heigh") {
    allProducts.sort((a, b) => {
      const priceA = Number(a.price.replace("$", ""));
      const priceB = Number(b.price.replace("$", ""));
      return priceA - priceB;
    });
  } else if (value === "Heigh-to-Low") {
    allProducts.sort((a, b) => {
      const priceA = Number(a.price.replace("$", ""));
      const priceB = Number(b.price.replace("$", ""));
      return priceB - priceA;
    });
  } else if (value === "all") {
    allProducts = [...products];
  }
  const searchIn = document.getElementById("searchInput");
  searchIn.value = "";
  ShowProducts(allProducts);
}

// categroy based filter
const selectedCat = document.getElementById("Categories");
function Category(catvalue) {
  let found = false;
  let filetred = [...products];
  if (catvalue.value !== "All") {
    filetred = products.filter(
      (product) => product.category === selectedCat.value,
    );
    found = true;
  } else if (found) {
    notFound.classList.add("hidden");
  } else {
    notFound.classList.remove("hidden");
  }
  const searchIn = document.getElementById("searchInput");
  searchIn.value = "";
  allProducts = filetred;
  ShowProducts(allProducts);
}


const CountEl = document.getElementById("cart-count");
let count = Number(localStorage.getItem("cart-count") || 0);
CountEl.innerText = count;

function AddToCart(btn) {
  count++;
  CountEl.innerText = count;
  localStorage.setItem("cart-count", count);

  alert("Added To Cart");

  btn.innerText = 'Added';   
  btn.disabled = true;      
}
ShowProducts(allProducts);
