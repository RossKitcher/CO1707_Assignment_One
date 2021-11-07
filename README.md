# CO1707_Assignment_One
Front end web application for the Student Union's shop.
The current web pages implemented:
* index.html
* products.html


All webpages feature the same __Navigation__ and __Footer__. 
## index.html
This page acts as the Student Union Shop's home page. It will provide a brief introduction as to what the Student Union is as well as including an embedded YouTube video displaying the UCLan culture.  
The operation of this page includes a responsive design featuring header and paragraph tags. Additionally, an iFrame tag is used to embed a YouTube video onto the home page.
## products.html
This page displays all products available in the Student Union's shop. This includes all hoodies, jumpers, and t-shirts.  
Each product displayed features an image, title, description, price, a 'read more' button, and an 'add to cart' button. Each image features a unique alt text for accessibility.  
The 'read more' button will take the user to another page in which further details of the product are displayed. This makes use of HTML5's sessionStorage to hold temporary data until the page session ends.  
The 'add to cart' button will add the selected product to the user's shopping cart. This operation makes use of HTML5's localStorage which stores data locally on the user's machine. This keeps peristent data between multiple sessions.
## Navigation
The page navigation allows the user to browse through all pages on the website. It features a logo, a header, and the navigation links.  
Additionally, the navigation is responsive, it will change size depending on the width of the browser. When the screen becomes too narrow to display the navigation links, they are replaced with a burger menu icon.  
This menu icon is animated and, when clicked, will show new navigation links below the Navigation Header.
## Footer
The footer is displayed at the bottom of all webpages and features information such as links, contact info, and location.  
To display this information in a responsive manner, a flexbox is used to create three columns that are resized and wrapped depending on the screen size.