# LightBnB
A simple multi-page Airbnb clone that uses javascript to query a database being hosted on a postgres server and display the requested information for the user.

## Getting Started
1. Fork and Clone This Repository
2. Install Dependencies with ```npm install```:
  <br/>&ensp; - bcrypt
  <br/>&ensp; - cookie-session
  <br/>&ensp; - express
  <br/>&ensp; - nodemon
  <br/>&ensp; - node postgres
3. Launch the postgres server with ```startpostgres```
4. Launch the web server with ```npm run local```
5. Connect to 'localhost:3000' in a web browser to start using the web app


## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.

## Known Bugs
- Rating is currently displaying 'NaN' on HOMEPAGE and MYLISTINGS page. My Reservations page is displaying rating correctly.
- Some images do not load properly
