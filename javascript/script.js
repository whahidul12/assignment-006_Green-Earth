
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
    <button type="button" onClick="load_tree_cards(${element.id})" id="${element.id}" class="btn w-full hover:bg-[#15803D] my-1 border-none rounded-sm bg-white hover:text-white">
    ${element.category_name}</button>
    `
    categorie_list_container.appendChild(tree_categories_div);
  });
}

const load_tree_cards = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
  const data = await res.json();
  console.log(data.plants);
  display_tree_cards(data.plants);
}

const display_tree_cards = (plants) => {
  const tree_card_container = document.getElementById("tree-card-container");
  tree_card_container.innerHTML = "";
  plants.forEach(element => {

    const tree_card_div = document.createElement("div");

    tree_card_div.innerHTML = `
        <div class="card max-w-96 mx-auto bg-base-100 shadow-sm col-span-1">
      <figure class="px-4 pt-4">
        <img src="${element.image}" alt="Shoes"
          class="aspect-[4/3] object-cover rounded-xl" />
      </figure>
      <div class="card-body p-4">
        <h2 class="card-title">${element.name}</h2>
        <p class="line-clamp-2">${element.description}</p>
        <div class="flex justify-between items-center">
          <div class="px-3 py-1 bg-[#DCFCE7] text-[#15803D] rounded-3xl">${element.category}</div>
          <span><span>$ </span>${element.price}</span>
        </div>
        <div class="card-actions">
          <button class="btn bg-[#15803D] text-white w-full rounded-full">Add to Cart</button>
        </div>
      </div>
    </div>
    `
    tree_card_container.appendChild(tree_card_div);
  });
}

load_categorie_list();