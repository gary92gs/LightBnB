const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const config = {
  host: 'localhost',
  port: 5432, // database server port, not website port
  database: 'lightbnb',
  user: 'labber',
  password: 'labber',
};

const pool = new Pool(config);

// const pool = new Pool(config);
// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})

// /// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  let resolvedUser = null;
  return pool
    .query(`
      SELECT *
      FROM users
      WHERE email = $1
    `, [email])
    .then((result) => {

      for (const user of result.rows) {
        if (user && user.email.toLowerCase() === email.toLowerCase()) {
          resolvedUser = user;
        }
      }
      return Promise.resolve(resolvedUser);
    })
    .catch((error) => {
      console.log(error.message);
    });

};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1;
    `, [id])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });

};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  pool
    .query(`
      INSERT INTO users (name,email,password)
      VALUES($1,$2,$3)
    `, [user.name, user.email, user.password])
    .then((result) => {
      console.log('new user added to database');
    })
    .catch((error) => {
      console.log(error.message);
    });
  return Promise.resolve(user);
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`
      SELECT reservations.id, reservations.guest_id, reservations.start_date, properties.*, AVG(rating) AS average_rating
      FROM reservations
      JOIN properties ON properties.id = reservations.property_id
      JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      GROUP BY reservations.id, properties.title, properties.id, properties.cost_per_night
      ORDER BY reservations.start_date
      LIMIT $2;
    `, [guest_id, limit])
    .then((result) => {
      const userReservations = {};
      for (let i = 1; i <= result.rows.length; i++) {
        userReservations[i] = result.rows[i - 1];
      }
      return Promise.resolve(userReservations);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryCraftArray = [
    'SELECT properties.*',
    'FROM properties',
    '', // 2 JOIN
    '', // 3 WHERE
    '', // 4 GROUP BY
    '', // 5 HAVING
    'ORDER BY cost_per_night',
    'LIMIT $1;'
  ];
  const escapeArray = [limit];

  let whereClause = [];
  if (options.city) {
    escapeArray.push(options.city);
    whereClause.push(`city = $${escapeArray.length}`);
  }
  if (options.owner_id) {
    escapeArray.push(options.owner_id);
    whereClause.push(`owner_id = $${escapeArray.length}`);
  }
  if (options.minimum_price_per_night) {
    escapeArray.push(options.minimum_price_per_night);
    whereClause.push(`cost_per_night >= $${escapeArray.length}`);
  }
  if (options.maximum_price_per_night) {
    escapeArray.push(options.maximum_price_per_night);
    whereClause.push(`cost_per_night <= $${escapeArray.length}`);
  }
  if (whereClause.length) {
    queryCraftArray[3] = 'WHERE ' + whereClause.join(' AND ');
  }

  //HAVING
  if (options.minimum_rating) {
    queryCraftArray[0] += ', AVG(rating)';
    queryCraftArray[2] = 'JOIN property_reviews ON property_id = properties.id';
    queryCraftArray[4] = 'GROUP BY properties.id';
    escapeArray.push(options.minimum_rating);
    queryCraftArray[5] = `HAVING AVG(rating) >= $${escapeArray.length}`;
  }

  //put crafted query together
  const queryString = queryCraftArray.filter(element => element !== '').join(' ');

  //query for properties
  const limitedProperties = {};
  return pool
    .query(queryString, escapeArray)
    .then((result) => {
      for (let i = 1; i <= result.rows.length; i++) {
        limitedProperties[i] = result.rows[i - 1];
      }
      return Promise.resolve(limitedProperties);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  console.log(property);
  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
  RETURNING *;
  `;
  const escapeArray = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code,
    'true' //property active
  ];

  return pool
    .query(queryString, escapeArray)
    .then((property) =>{
      return Promise.resolve(property);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
