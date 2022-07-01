/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { sendMessageToClient } = require('../public/scripts/send_sms_twilio');


module.exports = (db) => {




  router.get("/", (req, res) => {//render food menu from DB
    db.query(`SELECT * FROM users WHERE id = 2;`)
      .then(data => {
        res.cookie('user_id', 2);
        return data.rows[0];
      }).then((user) => {

        db.query(`SELECT * FROM food_items;`)
          .then(data => {
            const foodItemsForMenu = data.rows;
            res.render('customerInterface', { foodItemsForMenu, user });

          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/orders", (req, res) => {
    const userId = parseInt(req.cookies.user_id); //extracting user_id from cookies
    console.log('userID: ', userId);
    const insertUserInfoInUserOrdersTable = `INSERT INTO user_orders(user_id, prep_time, current_status) VALUES ($1, $2, $3) RETURNING id;`;
    db.query(insertUserInfoInUserOrdersTable, [userId, 'N/A', 'New Order']).then((orderId) => {
      const newOrderId = orderId.rows[0].id; //extraching order ID from db returned results
      console.log('order id', newOrderId);
      const userOrder = req.body.food; //bringing food items id from front to back
      for (let foodItemId of userOrder) {
        const foodItemNumberFromUser = parseInt(foodItemId);
        db.query(`SELECT * FROM food_items WHERE id = ${foodItemNumberFromUser};`)
          .then(data => { //getting corresponding data from database for line_items insert
            const foodItemDetailsFromDatabase = data.rows;
            const insertOrderDetailsInLineItemsTable = `INSERT INTO line_items(food_item_id,user_order_id) VALUES ($1, $2);`;
            db.query(insertOrderDetailsInLineItemsTable, [foodItemDetailsFromDatabase[0].id, newOrderId]); //adding line_items for for users.id = 2
          });
      } db.query(`SELECT users.phone_number FROM users JOIN user_orders ON users.id = user_orders.user_id WHERE user_orders.id = $1;`, [newOrderId]).then((phoneNumber) => {
        const receiverPhoneNumber = phoneNumber.rows[0].phone_number;
        const messageForReceiver = `Thank you for ordering with FoodTruck! You order number is ${newOrderId}.`;
        let user = userId;
        sendMessageToClient(messageForReceiver, receiverPhoneNumber);
        res.render('customerOrderConfirmation', { newOrderId, user });

      });
    });

  });


  return router;
};
