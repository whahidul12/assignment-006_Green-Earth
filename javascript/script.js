const load_all_tree_cards = (id) => {
  manage_spinner(true)
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(res => res.json())
    .then(data => {
      removeActive();
      const click_categories = document.getElementById(`categorie-name-${id}`);
      click_categories.classList.add("active");
      display_tree_cards(data.plants);
    })
}

const manage_spinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("tree-card-panel-container").classList.add("hidden")
  }
  else {
    document.getElementById("tree-card-panel-container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
  }
}

const removeActive = () => {
  const all_categories_name = document.querySelectorAll(".categorie-class-name")
  all_categories_name.forEach(btn => {
    btn.classList.remove("active");
  })
}

const load_categorie_list = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/categories");
  const data = await res.json();
  display_categorie_list(data.categories);
}
const display_categorie_list = (categories) => {
  const categorie_list_container = document.getElementById("categorie-list-container");
  categories.forEach(element => {
    const tree_categories_div = document.createElement("div");
    tree_categories_div.innerHTML = `
    <button type="button" onClick="load_tree_cards(${element.id})" id="categorie-name-${element.id}" class="categorie-class-name py-2 px-3 w-[145px] md:w-full cursor-pointer text-sm md:text-base text-center md:text-left border-2 md:border-none border-[#15803D] bg-[#F0FDF4] hover:bg-[#15803D] hover:text-white my-1 rounded-xl">
    ${element.category_name}</button>
    `
    categorie_list_container.appendChild(tree_categories_div);
  });
}

const load_tree_cards = (id) => {
  manage_spinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      removeActive();
      const click_categories = document.getElementById(`categorie-name-${id}`);
      click_categories.classList.add("active");
      display_tree_cards(data.plants);
    })
}

const display_tree_cards = (plants) => {
  const tree_card_container = document.getElementById("tree-card-container");
  tree_card_container.innerHTML = "";
  plants.forEach(element => {

    const tree_card_div = document.createElement("div");

    tree_card_div.innerHTML = `
        <div class="card max-w-96 mx-auto bg-base-100 shadow-sm col-span-1">
      <figure class="px-4 pt-4">
        <img src="${element.image}" alt="${element.name}"
          class="aspect-[4/3] object-cover rounded-xl" />
      </figure>
      <div class="card-body p-4">
        <h2 onClick="plants_detail(${element.id})" class="card-title text-sm font-semibold text-[#1F2937] cursor-pointer inline hover:text-[#15803D] ">${element.name}</h2>
        <p class="line-clamp-2 text-xs text-[#1F2937]">${element.description}</p>
        <div class="flex justify-between items-center">
          <div class="px-3 py-1 bg-[#DCFCE7] text-[#15803D] rounded-3xl">${element.category}</div>
          <span class="font-semibold text-sm"><span>৳</span>${element.price}</span>
        </div>
        <div class="card-actions">
          <button onClick="add_to_cart(${element.id})" class="btn bg-[#15803D] text-white w-full rounded-full">Add to Cart</button>
        </div>
      </div>
    </div>
    `
    tree_card_container.appendChild(tree_card_div);
  });
  manage_spinner(false)
}


const plants_detail = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  load_tree_detail(data.plants);
}

const load_tree_detail = (detail) => {
  const tree_detail_container = document.getElementById("tree-detail-container")
  tree_detail_container.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
      <div class="card bg-base-100">
        <h2 class="card-title mb-2">${detail.name}</h2>
        <figure class="">
          <img src="${detail.image}" alt="${detail.name}" class="aspect-[4/3] object-cover rounded-xl" />
        </figure>
        <div class="card-body p-0 mt-4 space-y-1">
          <div class=""><span class="font-bold">Category:
            </span>${detail.category}</div>
          <span><span class="font-bold">Price:
            </span><span>৳</span>${detail.price}</span>
          <p class=""><span class="font-bold">Description:
            </span>${detail.description}</p>
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
  `
  tree_detail_container.appendChild(div);
  document.getElementById("tree_modal").showModal();
}

const add_to_cart = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  display_add_to_cart(data.plants);
}

const cart = [];
const cart_occurrence = [];
const cart_items = {};

const update_total_price = () => {
  let total = 0;

  Object.keys(cart_items).forEach(cart_id => {
    const item = cart_items[cart_id];
    const quantity = cart_occurrence.filter(id => id == cart_id).length;
    total += item.price * quantity;
  });

  document.getElementById("total-price").innerText = `৳${total}`;
}

const display_add_to_cart = (tree_detail) => {
  const cart_id = tree_detail.id;
  cart_occurrence.push(cart_id);
  const cart_occurrence_numbers = cart_occurrence.filter(e => e === cart_id).length;

  cart_items[cart_id] = {
    name: tree_detail.name,
    price: tree_detail.price
  };

  if (!cart.includes(cart_id)) {
    const cart_container = document.getElementById("cart-container");
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="flex justify-between items-center my-2 py-2 px-3 bg-[#F0FDF4]">
            <div>
            <h1 class="text-sm">${tree_detail.name}</h1>
            <p class="text-base text-[#1F2937]"> <span id="price-tag-${cart_id}">${tree_detail.price}</span> x <span id="cart-tree-number-${cart_id}">${cart_occurrence_numbers}</span></p>
            </div>
            <button type="button" onclick="this.parentElement.remove();remove_cart_from_array(${cart_id})" class="cursor-pointer">
            <i class="fa-solid fa-xmark text-red-500"></i>
              </button>
              </div>
              `
    cart_container.appendChild(div)
    cart.push(cart_id);
  }

  document.getElementById(`cart-tree-number-${cart_id}`).innerText = cart_occurrence_numbers;
  document.getElementById("total-price-container").classList.remove("hidden");

  update_total_price();
}

const remove_cart_from_array = (cart_id) => {
  const cart_index = cart.indexOf(cart_id);
  if (cart_index !== -1) {
    cart.splice(cart_index, 1);
  }
  for (let i = cart_occurrence.length - 1; i >= 0; i--) {
    if (cart_occurrence[i] === cart_id) {
      cart_occurrence.splice(i, 1)
    }
  }

  if (!cart_occurrence.includes(cart_id)) {
    delete cart_items[cart_id];
  }

  if (cart.length === 0) {
    document.getElementById("total-price-container").classList.add("hidden");
  } else {
    update_total_price();
  }
}



load_categorie_list();
load_all_tree_cards(0);