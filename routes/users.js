/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { sendMessageToClient } = require('../public/scripts/send_sms_customer');


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM food_items;`)
      .then(data => {
        const foodItemsForMenu = data.rows;
        console.log(foodItemsForMenu);
        res.render('customerInterface', {foodItemsForMenu});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/orders", (req, res) => {
    console.log(req.body.food[0]);
    const userOrder = req.body.food;
    for (let foodItemId of userOrder) {
      const foodItemNumberFromUser = parseInt(foodItemId);
      db.query(`SELECT * FROM food_items WHERE id = ${foodItemNumberFromUser};`)
        .then(data => {
          const foodItemDetailsFromDatabase = data.rows;
          // console.log(foodItemDetailsFromDatabase[0].id);
          const insertOrderDetailsInLineItemsTable = `INSERT INTO line_items(food_item_id,user_order_id) VALUES ($1, $2);`;
          db.query(insertOrderDetailsInLineItemsTable, [foodItemDetailsFromDatabase[0].id, 2]);
          console.log('User Order: ', foodItemDetailsFromDatabase);
        });
    }
    const insertUserInfoInUserOrdersTable = `INSERT INTO user_orders(user_id, prep_time, current_status) VALUES ($1, $2, $3) RETURNING id;`; //for user.id = 2, hardcoding user atm, //getting newly inserted data id right away
    db.query(insertUserInfoInUserOrdersTable, [2, 0, 'In progress']).then((data) => {
      console.log(data.rows[0].id);
      const newOrderId = data.rows[0].id; //extraching order ID from db returned results
      const messageForReceiver = `You order number is ${newOrderId}.`; //creating msg string
      const receiverPhoneNumber = '+17802154894';
      sendMessageToClient(messageForReceiver, receiverPhoneNumber);
    }); //adding personal ohone number for now, should be able to fetch users number from db
    res.render('customerOrderConfirmation');
  });

  return router;
};
