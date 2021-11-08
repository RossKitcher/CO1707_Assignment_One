// generate-cart.js
// Loads items from localStorage and displays them in the user's shopping cart.

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

        let fullItem = localStorage.getItem(localStorage.key(i)); // Get value of item in localStorage.
        let itemArray = fullItem.split(","); // Split value on commas.
    
        // Declare variables to hold a product's information.
        let tempName = itemArray[0];
        let tempColour = itemArray[1];
        let tempPrice = itemArray[2];
        let tempFilepath = itemArray[3];
    
        // Create new HTML elements to hold the data to be added.
        let tableRow = document.createElement("tr");        
        let idCell = document.createElement("td");
        let imgCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let priceCell = document.createElement("td");
        let imgNode = document.createElement("img");
        let colourNode = document.createElement("p");
        
        // Create attributes for the <img> tag.
        let srcAtt = document.createAttribute("src");
        let altAtt = document.createAttribute("alt");
    
        // Set attribute values.
        srcAtt.value = tempFilepath;
        altAtt.value = tempColour + " coloured " + tempName + ".";
    
        // Give the attributes a parent element.
        imgNode.setAttributeNode(srcAtt);
        imgNode.setAttributeNode(altAtt);
    
        // Create text nodes to hold the text content
        let idText = document.createTextNode(localStorage.key(i).slice(4)); // Slice is used to extract an elements ID.
        let nameText = document.createTextNode(tempName);
        let colourText = document.createTextNode(tempColour);
        let priceText = document.createTextNode(tempPrice);
    
        // Give the text nodes a parent.
        colourNode.appendChild(colourText);
        idCell.appendChild(idText);
        imgCell.appendChild(imgNode);
        imgCell.append(colourNode);
        nameCell.appendChild(nameText);
        priceCell.appendChild(priceText);        

        // Asign the table row to be the parent of the newly created elements.
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
    
    // Set colspan to four to span it across the entire table.
    let colspanAtt = document.createAttribute("colspan");
    colspanAtt.value = "4";
    
    subtotalCell.setAttributeNode(colspanAtt);
    
    let subtotalText = document.createTextNode("Subtotal: " + subtotal);
    
    subtotalCell.appendChild(subtotalText);
    footerRow.appendChild(subtotalCell);

    footerBody.appendChild(footerRow); // Add the newly created row to the table.
}

