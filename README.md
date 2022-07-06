LHL Node Skeleton
=========

# Welcome to FoodTruck
FoodTruck is a multi page application built with Node, Express, Jquery and that was styled using CSS. The database uses SQL. 

## How it works
FoodTruck is a food pick up ordering application where a user can login and then get access to the restaurants page. It is on the User page that they can add items to their cart and then checkout. Upon checkout they will recieve a text telling them their order number. On the vendor page, the vendor can see all the recieved orders and can confirm a new order. This will send a text to the user that their order is now in progress. Upon completion the vendor can hit the prepared button which will send a 3rd text to the user, telling them that their order is ready for pickup. 

## Final Product 
Home Page
!['Home Page']()

Customer Page
!['Customer Page']()

Vendor Page
!['Vendor Page']()

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Jquery
- Express


