/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
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
    let query = `SELECT food_items.name as itemname, count(food_items.name) as quantity
    FROM food_items
    JOIN line_items ON line_items.food_item_id = food_items.id
    JOIN user_orders ON line_items.user_order_id = user_orders.id
    WHERE user_orders.id = $1
    GROUP BY food_items.name`;
    const queryParams = [order_id];
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
    let query = `UPDATE user_orders
    SET prep_time = $1, current_status='Confirmed'
    WHERE id=$2 RETURNING *`;
    const queryParams = [prepTime, order_id];
    db.query(query, queryParams)
      .then(data => {
        const orders = data.rows;
        const message = `Hi! Your order will be ready in ${orders[0].prep_time} minutes. Thank you!`
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
    let query = `UPDATE user_orders
    SET current_status='Completed'
    WHERE id=$1 RETURNING *`;
    const queryParams = [order_id];
    db.query(query, queryParams)
      .then(data => {
        const orders = data.rows;
        const message = `Hi! Your order is ready. Thank you!`
        sendMessageToClient(message, phone);
        res.json(orders[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


router.get("/", (req, res) => {
  db.query(`SELECT * FROM users WHERE id = 3;`)
    .then(data => {
      const user = data.rows[0];
      res.cookie('user_id', 3)
      res.render("vendorInterface",{ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
  return router;
};
