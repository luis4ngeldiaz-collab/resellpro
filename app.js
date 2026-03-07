let cost=Number(document.getElementById("cost").value.replace("$",""));
let price=Number(document.getElementById("price").value.replace("$",""));function save(){

localStorage.setItem("inventory",JSON.stringify(inventory));
localStorage.setItem("sales",JSON.stringify(sales));

}

function addItem(){

let sku=document.getElementById("sku").value;
let item=document.getElementById("item").value;
let cost=Number(document.getElementById("cost").value);
let price=Number(document.getElementById("price").value);
let bin=document.getElementById("bin").value;
let batch=document.getElementById("batch").value;

let profit=price-cost;

let photoInput=document.getElementById("photo");
let photo="";

if(photoInput.files[0]){

let reader=new FileReader();

reader.onload=function(e){

photo=e.target.result;

let obj={sku,item,cost,price,bin,batch,photo,profit};

inventory.push(obj);

save();
renderInventory();
updateDashboard();

};

reader.readAsDataURL(photoInput.files[0]);

}else{

let obj={sku,item,cost,price,bin,batch,photo,profit};

inventory.push(obj);

save();
renderInventory();
updateDashboard();

}

}

function renderInventory(){

let list=document.getElementById("inventory");

list.innerHTML="";

inventory.forEach((i,index)=>{

let li=document.createElement("li");

li.innerHTML=

`
${i.sku} | ${i.item}<br>
Cost $${i.cost} | Price $${i.price} | Profit $${i.profit}<br>
Bin ${i.bin} | Batch ${i.batch}
<br>
<button onclick="deleteItem(${index})">Delete</button>
<button onclick="editItem(${index})">Edit</button>
`;

if(i.photo){

let img=document.createElement("img");

img.src=i.photo;
img.style.width="80px";
img.style.borderRadius="8px";
img.style.display="block";
img.style.marginTop="6px";

li.appendChild(img);

}

list.appendChild(li);

});

}

function deleteItem(i){

inventory.splice(i,1);

save();
renderInventory();
updateDashboard();

}

function editItem(i){

let item=inventory[i];

document.getElementById("sku").value=item.sku;
document.getElementById("item").value=item.item;
document.getElementById("cost").value=item.cost;
document.getElementById("price").value=item.price;
document.getElementById("bin").value=item.bin;
document.getElementById("batch").value=item.batch;

inventory.splice(i,1);

save();
renderInventory();
updateDashboard();

}

function logSale(){

let sku=document.getElementById("saleSku").value;
let soldPrice=Number(document.getElementById("soldPrice").value);

let item=inventory.find(i=>i.sku==sku);

if(!item){

alert("SKU not found");
return;

}

let profit=soldPrice-item.cost;

sales.push({sku,soldPrice,profit});

save();

renderSales();
updateDashboard();

}

function renderSales(){

let list=document.getElementById("sales");

list.innerHTML="";

sales.forEach(s=>{

let li=document.createElement("li");

li.textContent=`SKU ${s.sku} | Sold $${s.soldPrice} | Profit $${s.profit}`;

list.appendChild(li);

});

}

function updateDashboard(){

let profit=sales.reduce((t,s)=>t+Number(s.profit),0);

let value=inventory.reduce((t,i)=>t+Number(i.price),0);

document.getElementById("profit").textContent="$"+profit;
document.getElementById("sold").textContent=sales.length;
document.getElementById("count").textContent=inventory.length;

let valueEl=document.getElementById("value");

if(valueEl){

valueEl.textContent="$"+value;

}

}

function searchItems(){

let q=document.getElementById("search").value.toLowerCase();

let items=document.querySelectorAll("#inventory li");

items.forEach(i=>{

if(i.textContent.toLowerCase().includes(q)){

i.style.display="block";

}else{

i.style.display="none";

}

});

}

renderInventory();
renderSales();
updateDashboard();
