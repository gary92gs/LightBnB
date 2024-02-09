SELECT reservations.id, properties.title, reservations.start_date, properties.cost_per_night, AVG(rating) AS average_rating
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE properties.id = 4
GROUP BY reservations.id, properties.title, properties.cost_per_night
ORDER BY reservations.start_date
LIMIT 10;
