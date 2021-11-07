// generate-cart.js
// Loads items from localStorage and displays them in the user's shopping cart.

const cartBody = document.getElementById("cartBody");
const footerBody = document.getElementById("cartFooter");

let cartAmount = localStorage.length;
let subtotal = 0;

for (let i = 0; i < cartAmount; i++) {
    let fullItem = localStorage.getItem("item" + (i+1));
    let itemArray = fullItem.split(",");    

    let tempName = itemArray[0];
    let tempColour = itemArray[1];
    let tempPrice = itemArray[2];
    let tempFilepath = itemArray[3];

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

    srcAtt.value = tempFilepath;
    altAtt.value = tempColour + " coloured " + tempName + ".";

    imgNode.setAttributeNode(srcAtt);
    imgNode.setAttributeNode(altAtt);

    let idText = document.createTextNode(i+1);
    let nameText = document.createTextNode(tempName);
    let colourText = document.createTextNode(tempColour);
    let priceText = document.createTextNode(tempPrice);

    colourNode.appendChild(colourText);
    idCell.appendChild(idText);
    imgCell.appendChild(imgNode);
    imgCell.append(colourNode);
    nameCell.appendChild(nameText);
    priceCell.appendChild(priceText);
    

    tableRow.appendChild(idCell);
    tableRow.appendChild(imgCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(priceCell);

    cartBody.appendChild(tableRow);

    // Update subtotal
    subtotal += parseFloat(tempPrice.slice(1));
}

// Create the table footer.

subtotal = subtotal.toFixed(2); // Round to two decimal places, toFixed returns a String.
subtotal = "£" + subtotal;

let footerRow = document.createElement("tr");
let subtotalCell = document.createElement("td");

let colspanAtt = document.createAttribute("colspan");
colspanAtt.value = "4";

subtotalCell.setAttributeNode(colspanAtt);

let subtotalText = document.createTextNode("Subtotal: " + subtotal);

subtotalCell.appendChild(subtotalText);
footerRow.appendChild(subtotalCell);
footerBody.appendChild(footerRow);