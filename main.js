
const itemInput = document.getElementById("itemInput"); // itemInput - This is where we will put our text in a place called input feild.
const addButton = document.getElementById("addButton"); // addButton - This connects JavaScript with the button used to add an item. 
const shoppingList = document.getElementById("shoppingList"); //shoppingList - the conects JavaScript to the we
const purchaseButton = document.getElementById("purchaseButton");// purchaseButton - it connects JavaScript to the purchase button.
const totalCost = document.getElementById("totalCost"); //totalCost -this is where the total cost will be displayed
const clearButton = document.getElementById("clearButton"); // clearButton - Connects JavaScript to the button used to clear the shopping list.
const editButton = document.getElementById("editButton");// editButton- Connects JavaScript to the button used to edit an item.
const savedList = localStorage.getItem("shoppingList"); //localStorage - this a browser feature where data can be saved to the user's device.
                                                        // getItem - it retrives the data being saved.
// (=) - assigns the element that was found in the variable.
// const- creates a variable and the values cannot be reassigned.
// getElementById - this tells Javascript to find a HTML element whose element ID is for example "clearButton","addButton" e.t.c

if (savedList) {  // If there is saved data in localStorage, show it again in the shopping list.
  shoppingList.innerHTML = savedList; // Put the saved list back into the page.
}

let selectedItem = null; // selectedItem stores the item currently selected by the user.
                         // null means no item is selected yet.
let total = 0; // total keeps track of the total price of purchased items.
               // It starts at 0 because nothing has been bought yet.

// Array of products and their prices.
const items = [
  { name: "Jacket", price: 1000 },
  { name: "Hoodie", price: 1800 },
  { name: "T-Shirt", price: 500 },
  { name: "Vest", price: 150 },
  { name: "Sneakers", price: 2000 },
];

addButton.addEventListener("click", function() {
  const newItem = itemInput.value; // Read the text typed in the input field.

  // If the input is empty, do nothing.
  if (newItem.trim() === "") {
    return;
  }

  // Create a new <li> element to represent the item in the list.
  const li = document.createElement("li");
  li.textContent = newItem; // Display the item text.

  // When a list item is clicked, highlight it and make it the selected item.
  li.addEventListener("click", function() {
    if (selectedItem) {
      selectedItem.style.backgroundColor = "";
    }

    selectedItem = li;
    li.style.backgroundColor = "lightyellow";
  });

  // Add the new item to the page and save the updated list.
  shoppingList.appendChild(li);
  localStorage.setItem("shoppingList", shoppingList.innerHTML);
  itemInput.value = ""; // Clear the input after adding the item.
});

purchaseButton.addEventListener("click", function() {
  if (selectedItem) { // Only do this if an item is selected.
    selectedItem.style.textDecoration = "line-through"; // Cross out the purchased item.
    selectedItem.style.backgroundColor = "";

    // Find the item in the product list and get its price.
    const matchingItem = items.find(function(item) {
      return item.name.toLowerCase() === selectedItem.textContent.toLowerCase();
    });

    // If the item matches a product, add its price to the total cost.
    if (matchingItem) {
      total += matchingItem.price;
      totalCost.textContent = total;
    }

    selectedItem = null; // Clear the selection after purchasing.
  }
});

clearButton.addEventListener("click", function (){
  shoppingList.innerHTML = ""; // Remove all items from the list.
  total = 0; // Reset total cost to zero.
  totalCost.textContent = total; // Update the visible total.
  selectedItem = null; // No item is selected anymore.

});


editButton.addEventListener("click", function() {
  if (selectedItem) { // Only edit if an item is selected.
    const newName = prompt("Enter the new item name:"); // Ask the user for the updated name.

    // Only update if the user entered a valid name.
    if (newName && newName.trim() !== "") {
      selectedItem.textContent = newName; // Replace the item text with the new name.
    }
  }
});

