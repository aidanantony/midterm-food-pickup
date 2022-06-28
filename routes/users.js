/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { sendMessageToClient } = require('../public/scripts/send_sms_twilio');


module.exports = (db) => {
  router.get("/", (req, res) => {//render food menu from DB
    db.query(`SELECT * FROM food_items;`)
      .then(data => {
        const foodItemsForMenu = data.rows;
        console.log(foodItemsForMenu);
        res.render('customerInterface', { foodItemsForMenu });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.post("/orders", (req, res) => {
  //   const userOrder = req.body.food; //bring food items id from front to back
  //   for (let foodItemId of userOrder) {
  //     const foodItemNumberFromUser = parseInt(foodItemId);
  //     db.query(`SELECT * FROM food_items WHERE id = ${foodItemNumberFromUser};`)
  //       .then(data => { //getting corresponding data from database
  //         const foodItemDetailsFromDatabase = data.rows;
  //         const insertOrderDetailsInLineItemsTable = `INSERT INTO line_items(food_item_id,user_order_id) VALUES ($1, $2);`;
  //         db.query(insertOrderDetailsInLineItemsTable, [foodItemDetailsFromDatabase[0].id, 2]); //adding line_items for for users.id = 2
  //       });
  //   }
  //   const insertUserInfoInUserOrdersTable = `INSERT INTO user_orders(user_id, prep_time, current_status) VALUES ($1, $2, $3) RETURNING id;`; //for user.id = 2, hardcoding user atm, //getting newly inserted data id right away
  //   db.query(insertUserInfoInUserOrdersTable, [2, 0, 'In progress']).then((orderId) => {
  //     //console.log(orderId.rows[0].id);//needs to be removed later - fo rdebugging purposes only //bring in newly inserted order #
  //     const newOrderId = orderId.rows[0].id; //extraching order ID from db returned results
  //     db.query(`SELECT users.phone_number FROM users JOIN user_orders ON users.id = user_orders.user_id WHERE user_orders.id = $1;`, [ newOrderId ]).then((phoneNumber) => {
  //       const receiverPhoneNumber = phoneNumber.rows[0].phone_number;
  //       //console.log('receiverPhoneNumber:', receiverPhoneNumber);
  //       const messageForReceiver = `Thank you for ordering with FoodTruck! You order number is ${newOrderId}.`; //creating msg string
  //       //receiverPhoneNumber = '+17802154894'; //need to erase eventually
  //       sendMessageToClient(messageForReceiver, receiverPhoneNumber);
  //       res.render('customerOrderConfirmation', { newOrderId });
  //     });
  //   }); //adding personal phone number for now, should be able to fetch users number from db

  // });

  router.post("/orders", (req, res) => {
    //inserrting order info in user_orders to extract user_orders.id right away
    const insertUserInfoInUserOrdersTable = `INSERT INTO user_orders(user_id, prep_time, current_status) VALUES ($1, $2, $3) RETURNING id;`;
    db.query(insertUserInfoInUserOrdersTable, [2, 0, 'In progress']).then((orderId) => { //2 will be replaced by logged in user info
      const newOrderId = orderId.rows[0].id; //extraching order ID from db returned results
      const userOrder = req.body.food; //bringing food items id from front to back
      for (let foodItemId of userOrder) {
        const foodItemNumberFromUser = parseInt(foodItemId);
        db.query(`SELECT * FROM food_items WHERE id = ${foodItemNumberFromUser};`)
          .then(data => { //getting corresponding data from database for line_items insert
            const foodItemDetailsFromDatabase = data.rows;
            const insertOrderDetailsInLineItemsTable = `INSERT INTO line_items(food_item_id,user_order_id) VALUES ($1, $2);`;
            db.query(insertOrderDetailsInLineItemsTable, [foodItemDetailsFromDatabase[0].id, newOrderId]); //adding line_items for for users.id = 2
          });
      } db.query(`SELECT users.phone_number FROM users JOIN user_orders ON users.id = user_orders.user_id WHERE user_orders.id = $1;`, [     newOrderId ]).then((phoneNumber) => {
        const receiverPhoneNumber = phoneNumber.rows[0].phone_number;
        //console.log('receiverPhoneNumber:', receiverPhoneNumber);
        const messageForReceiver = `Thank you for ordering with FoodTruck! You order number is ${newOrderId}.`; //creating msg string
        //receiverPhoneNumber = '+17802154894'; //need to erase eventually
        sendMessageToClient(messageForReceiver, receiverPhoneNumber);
        res.render('customerOrderConfirmation', { newOrderId });
      });
    }); //adding personal phone number for now, should be able to fetch users number from db

  });


  return router;
};
