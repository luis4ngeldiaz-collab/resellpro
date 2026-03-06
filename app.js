console.log("ResellPro loaded");

let items = [];

function addItem(){

const sku = document.getElementById("sku").value;
const itemName = document.getElementById("item").value;
const cost = document.getElementById("cost").value;
const price = document.getElementById("price").value;
const bin = document.getElementById("bin").value;

const item = {
sku: sku,
name: itemName,
cost: cost,
price: price,
bin: bin,
id: Date.now()
};

items.push(item);

saveItems();

renderItems();

clearInputs();

}

function saveItems(){
localStorage.setItem("resellItems", JSON.stringify(items));
}

function loadItems(){

const data = localStorage.getItem("resellItems");

if(data){
items = JSON.parse(data);
}

renderItems();

}

function renderItems(){

const list = document.getElementById("inventory");

list.innerHTML = "";

items.forEach(item => {

const li = document.createElement("li");

li.textContent =
`${item.sku} | ${item.name} | Cost $${item.cost} | Price $${item.price} | Bin ${item.bin}`;

list.appendChild(li);

});

}

function clearInputs(){

document.getElementById("sku").value = "";
document.getElementById("item").value = "";
document.getElementById("cost").value = "";
document.getElementById("price").value = "";
document.getElementById("bin").value = "";

}

loadItems();
