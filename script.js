let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(){

let amount =
document.getElementById("amount").value;

let type =
document.getElementById("type").value;

let category =
document.getElementById("category").value;

let date =
document.getElementById("date").value;

if(amount === "" || date === ""){
alert("Please fill all fields");
return;
}

let transaction = {
amount:Number(amount),
type,
category,
date
};

transactions.push(transaction);

saveData();

displayTransactions();

updateDashboard();

document.getElementById("amount").value="";
document.getElementById("date").value="";
}

function displayTransactions(){

let table =
document.getElementById("transactionTable");

table.innerHTML="";

transactions.forEach((t,index)=>{

table.innerHTML += `
<tr>
<td>${t.date}</td>
<td>${t.category}</td>
<td>${t.type}</td>
<td>₹${t.amount}</td>
<td>
<button class="delete-btn"
onclick="deleteTransaction(${index})">
Delete
</button>
</td>
</tr>
`;

});

}

function deleteTransaction(index){

transactions.splice(index,1);

saveData();

displayTransactions();

updateDashboard();
}

function updateDashboard(){

let income=0;
let expense=0;

let categories={};

transactions.forEach(t=>{

if(t.type==="Income"){
income += t.amount;
}
else{
expense += t.amount;

if(categories[t.category]){
categories[t.category]+=t.amount;
}
else{
categories[t.category]=t.amount;
}
}

});

document.getElementById("totalIncome")
.innerText="₹"+income;

document.getElementById("totalExpense")
.innerText="₹"+expense;

document.getElementById("balance")
.innerText="₹"+(income-expense);

let summary =
document.getElementById("summaryList");

summary.innerHTML="";

for(let cat in categories){

summary.innerHTML +=
`<li>${cat} : ₹${categories[cat]}</li>`;

}
}

function saveData(){

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

}

displayTransactions();

updateDashboard();