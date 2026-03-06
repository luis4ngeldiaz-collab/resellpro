console.log("ResellPro app loaded");

let items = [];

function addItem(name, price) {
  const item = {
    name: name,
    price: price,
    id: Date.now()
  };

  items.push(item);
  saveItems();
}

function saveItems() {
  localStorage.setItem("resellItems", JSON.stringify(items));
}

function loadItems() {
  const data = localStorage.getItem("resellItems");
  if (data) {
    items = JSON.parse(data);
  }
}

loadItems();
