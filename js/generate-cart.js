// generate-cart.js
// Loads items from localStorage and displays them in the user's shopping cart.

// This is called when a 'Remove' button is clicked in the shopping cart.
handleRemove = (item) => {

    let row = item.parentElement.parentElement; // Get the row by navigating upwards.
    let id = row.getElementsByTagName("td")[1].innerHTML; // Get the id by viewing the inner HTML of the second column.
    let productName = row.getElementsByTagName("td")[3].innerHTML;

    // Use a yes/no dialog box to ensure the user has not clicked by accident.
    if (confirm("Are you sure you want to remove " + productName + " from your shopping cart?")) {
        localStorage.removeItem("item" + id); // Remove the item from localStorage.
        location.reload(); // Reload the page to refresh the shopping cart.
    }
}


// This is called when the 'Clear All' button is clicked.
handleRemoveAll = () => {

    // Prompt the user with a yes/no dialog to confirm that this is what they want to do.
    if (confirm("Are you sure you want to remove all items?")) {

        // Clear the localStorage and refresh the page.
        localStorage.clear();
        location.reload();
    }
}

// Create constants for the table body and footer.
const cartBody = document.getElementById("cartBody");
const footerBody = document.getElementById("cartFooter");

let cartAmount = localStorage.length; // Get amount of items in the shopping cart.
let subtotal = 0; // Set subtotal to zero.

let rows = {}; // Declare an object to hold key/value pairs of table rows.

// If the shopping cart is empty, then display a message letting the user know.
// Else if it is not empty, programatically create a table row for each item in the shopping cart.
if (cartAmount == 0) {

    let emptyTable = document.getElementsByClassName("empty")[0]; // Get the table row.
    emptyTable.classList.toggle("hidden"); // Toggle the 'hidden' class to show/hide the table row.

} else {
    for (let i = 0; i < localStorage.length; i++) {

        // Ignores entries in the localStorage that have not been created by this application.
        if (localStorage.key(i).slice(0,4) != "item") {
            continue;
        }

        let fullItem = localStorage.getItem(localStorage.key(i)); // Get value of item in localStorage.
        let itemArray = fullItem.split(","); // Split value on commas.
    
        // Declare variables to hold a product's information.
        let tempName = itemArray[0];
        let tempColour = itemArray[1];
        let tempPrice = itemArray[2];
        let tempFilepath = itemArray[3];
    
        // Create new HTML elements to hold the data to be added.
        let tableRow = document.createElement("tr"); 
        let removeCell = document.createElement("td");       
        let idCell = document.createElement("td");
        let imgCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let priceCell = document.createElement("td");
        let buttonNode = document.createElement("button");
        let imgNode = document.createElement("img");
        let colourNode = document.createElement("p");

        buttonNode.classList.add("remove-button"); // Add class to button node.

        // Create attributes needed for the remove button.
        let onclickAtt = document.createAttribute("onclick");
        
        // Create attributes for the <img> tag.
        let srcAtt = document.createAttribute("src");
        let altAtt = document.createAttribute("alt");
    
        // Set attribute values.
        onclickAtt.value = "handleRemove(this)";
        srcAtt.value = tempFilepath;
        altAtt.value = tempColour + " coloured " + tempName + ".";
    
        // Give the attributes a parent element.
        buttonNode.setAttributeNode(onclickAtt);
        imgNode.setAttributeNode(srcAtt);
        imgNode.setAttributeNode(altAtt);
    
        // Create text nodes to hold the text content
        let removeText = document.createTextNode("Remove");
        let idText = document.createTextNode(localStorage.key(i).slice(4)); // Slice is used to extract an elements ID.
        let nameText = document.createTextNode(tempName);
        let colourText = document.createTextNode(tempColour);
        let priceText = document.createTextNode(tempPrice);
    
        // Give the text nodes a parent.
        buttonNode.appendChild(removeText);
        colourNode.appendChild(colourText);
        removeCell.appendChild(buttonNode);
        idCell.appendChild(idText);
        imgCell.appendChild(imgNode);
        imgCell.appendChild(colourNode);
        nameCell.appendChild(nameText);
        priceCell.appendChild(priceText);        

        // Asign the table row to be the parent of the newly created elements.
        tableRow.appendChild(removeCell);
        tableRow.appendChild(idCell);
        tableRow.appendChild(imgCell);
        tableRow.appendChild(nameCell);
        tableRow.appendChild(priceCell);
    
        // Append a key-value pair to the rows dictionary to enable sorting.
        rows[parseInt(localStorage.key(i).slice(4))] = tableRow;  
    
        // Update subtotal
        subtotal += parseFloat(tempPrice.slice(1));
    }

    let keys = Object.keys(rows); // Get array of keys.
    keys.sort(); // Sort keys in asc order.

    // For each sorted key, append the row to the table body.
    for (let i = 0; i < keys.length; i++) {
        cartBody.appendChild(rows[keys[i]]);
    }
    
    // Create the table footer.
    
    // Format the subtotal data.
    subtotal = subtotal.toFixed(2); // Round to two decimal places, toFixed returns a String.
    subtotal = "£" + subtotal;
    
    // Create a new table row for the footer.
    let footerRow = document.createElement("tr");
    let subtotalCell = document.createElement("td");
    let removeAllCell = document.createElement("td");
    let removeAllNode = document.createElement("button");

    removeAllNode.classList.add("remove-button"); // Add class to element.

    // Create onclick attribute.
    let onclickAtt = document.createAttribute("onclick");
    onclickAtt.value = "handleRemoveAll()";
    
    // Set colspan to five to span it across the entire table.
    let colspanAtt = document.createAttribute("colspan");
    colspanAtt.value = "5";
    
    // Set attribute.
    subtotalCell.setAttributeNode(colspanAtt);
    
    // Create text nodes.
    let subtotalText = document.createTextNode("Subtotal: " + subtotal);
    let removeAllText = document.createTextNode("Clear All");
    
    // Append all attributes, text nodes, and elements to their relevent parents.
    removeAllNode.setAttributeNode(onclickAtt);
    removeAllNode.appendChild(removeAllText);
    removeAllCell.appendChild(removeAllNode);
    subtotalCell.appendChild(subtotalText);
    footerRow.appendChild(removeAllCell);
    footerRow.appendChild(subtotalCell);

    footerBody.appendChild(footerRow); // Add the newly created row to the table.
}

