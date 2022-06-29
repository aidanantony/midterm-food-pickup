/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { sendMessageToClient } = require('../send_sms');

module.exports = (db) => {

  router.get("/orders", (req, res) => {

    let query = `SELECT user_orders.id as ordernumber, user_orders.prep_time as preptime, user_orders.current_status as orderstatus, users.name as name, users.phone_number as phone
    FROM user_orders
    JOIN users ON user_orders.user_id = users.id`;
    console.log(query);
    db.query(query)
      .then(data => {
        const orders = data.rows;

        res.json(orders);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get(`/order/items/:id`, (req, res) => {

    const order_id = req.params.id;
    console.log("order id: ", order_id);
    let query = `SELECT food_items.name as itemname, count(food_items.name) as quantity
    FROM food_items
    JOIN line_items ON line_items.food_item_id = food_items.id
    JOIN user_orders ON line_items.user_order_id = user_orders.id
    WHERE user_orders.id = $1
    GROUP BY food_items.name`;
    const queryParams = [order_id];
    console.log(query);
    db.query(query, queryParams)
      .then(data => {
        const items = data.rows;

        res.json(items);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post(`/order/update/:id/:phone`, (req, res) => {

    const order_id = req.params.id;
    const phone = req.params.phone;
    const {prepTime} = req.body;
    console.log("order id: and prepTime: ", order_id, prepTime);
    let query = `UPDATE user_orders
    SET prep_time = $1, current_status='Confirmed'
    WHERE id=$2 RETURNING *`;
    const queryParams = [prepTime, order_id];
    console.log(query);
    db.query(query, queryParams)
      .then(data => {
        const orders = data.rows;
        const message = `Hi! Your order will be ready in ${orders[0].prep_time} minutes. Thank you!`
        console.log(message, phone);
        sendMessageToClient(message, phone);
        res.json(orders[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get(`/order/status/:id/:phone`, (req, res) => {

    const order_id = req.params.id;
    const phone = req.params.phone;
    console.log("order id: ", order_id);
    let query = `UPDATE user_orders
    SET current_status='Completed'
    WHERE id=$1 RETURNING *`;
    const queryParams = [order_id];
    console.log(query);
    db.query(query, queryParams)
      .then(data => {
        const orders = data.rows;
        const message = `Hi! Your order is ready. Thank you!`
        console.log(message, phone);
        sendMessageToClient(message, phone);
        res.json(orders[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
