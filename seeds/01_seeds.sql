INSERT INTO users (name, email, password)
VALUES ('Fred Flintstone', 'fred@snailmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Barney Rubble', 'barney@snailmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Wilma Flintstone', 'wilma@snailmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 
'flintstone house',
'description', 
'https://static.wikia.nocookie.net/the-flintstones-wiki/images/d/db/The_Flintstones_-_Flintstone_House.png/revision/latest?cb=20200325224247',
'https://static.wikia.nocookie.net/flinstones/images/5/5e/Flintstone_and_Rubble_Homes_-_Hollyrock%2C_Here_I_Come_-_The_Flintstones.jpg/revision/latest/scale-to-width-down/250?cb=20211212072324',
200,
1,
1,
2,
'US',
'Bedrock Boulevard',
'Bedrock',
'Bedrock County',
'1',
TRUE
),
(2, 
'rubbles house',
'description',  
'https://static.wikia.nocookie.net/flinstones/images/c/ce/Rubble_Home_-_Fred%27s_Second_Car_-_The_Flintstones.jpg/revision/latest/scale-to-width-down/250?cb=20211214055721',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAWpx-TImxKSNAHmIhhx_hAi3qcxA-3kH6qVEoyejbstyAzG9INsNqvWru3gWDGGYyVdo&usqp=CAU',
150,
1,
1,
2,
'US',
'Bedrock Boulevard',
'Bedrock',
'Bedrock County',
'2',
TRUE
),
(1, 
'flintstone garage', 
'description', 
'https://static.wikia.nocookie.net/the-flintstones-wiki/images/d/db/The_Flintstones_-_Flintstone_House.png/revision/latest?cb=20200325224247',
'https://static.wikia.nocookie.net/flinstones/images/5/5e/Flintstone_and_Rubble_Homes_-_Hollyrock%2C_Here_I_Come_-_The_Flintstones.jpg/revision/latest/scale-to-width-down/250?cb=20211212072324',
50,
2,
0,
0,
'US',
'Bedrock Boulevard',
'Bedrock',
'Bedrock County',
'1',
TRUE
);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 2),
('2019-01-04', '2019-02-01', 2, 1),
('2021-10-01', '2021-10-14', 3, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 1, 1, 3, 'messages'),
(1, 2, 2, 4, 'messages'),
(2, 3, 3, 3, 'messages');