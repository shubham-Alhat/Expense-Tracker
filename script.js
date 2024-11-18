const expenseNameBox = document.getElementById("namebox");
const amountBox = document.getElementById("amountbox");
const form = document.querySelector("form");
const addButton = form.querySelector("button");
const expenseBoxContainer = document.getElementById("expense-box-container");
let totalBox = document.getElementById("total-box");

// Define function to Calculate Total.
function totalCalculate() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let amount = parseFloat(localStorage.getItem(localStorage.key(i)));
    total = total + amount;
  }
  totalBox.innerText = `Total : $${total}`;
}

// Define function to display existing expenses in local Storage.
function displayExpense() {
  // for loop to load all expenses on screen.
  for (let i = 0; i < localStorage.length; i++) {
    // create container to have expense and delete button.
    let expenseBox = document.createElement("div");
    expenseBox.classList.add(
      "w-full",
      "h-12",
      "flex",
      "justify-between",
      "items-center",
      "bg-slate-800",
      "px-3"
    );
    // create p to have expense info inside it
    let pElement = document.createElement("p");
    pElement.innerText = `${localStorage.key(i)} - $${localStorage.getItem(
      localStorage.key(i)
    )}`;
    // create delete button.
    let delButton = document.createElement("button");
    delButton.classList.add(
      "bg-slate-100",
      "text-black",
      "font-semibold",
      "w-20",
      "h-8",
      "rounded-md"
    );
    delButton.innerText = "Delete";
    expenseBox.append(pElement);
    expenseBox.append(delButton);
    expenseBoxContainer.append(expenseBox);

    // Add Event listener to Delete Button.
    delButton.addEventListener("click", () => {
      for (let i = 0; i < localStorage.length; i++) {
        if (
          delButton.previousElementSibling.innerText.includes(
            localStorage.key(i)
          )
        ) {
          localStorage.removeItem(localStorage.key(i));
          break;
        }
      }
      // Remove expense box from Screen i.e expenseBoxContainer
      delButton.parentElement.remove();
      // update Total Amount
      totalCalculate();
    });
  }
}

// call function to display existing expenses.
displayExpense();
// call function to display Total Amount
totalCalculate();

// Process Begins Here.
form.addEventListener("submit", (event) => {
  let expenseName = expenseNameBox.value;
  let expenseAmount = amountBox.value;

  // save Expense Locally.
  localStorage.setItem(expenseName, expenseAmount);
  // Clears the input values
  expenseNameBox.value = "";
  amountBox.value = "";
  // Remove old Expense-List. So that new updated Expense-List can be Added.
  expenseBoxContainer.innerHTML = "";
  // call function to add updated Expense-List from LocalStorage.
  displayExpense();
  // call function to update Total Amount.
  totalCalculate();
  // prevents page to refresh.
  event.preventDefault();
});
