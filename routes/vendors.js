/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/orders", (req, res) => {
    // let query = `SELECT user_orders.id as orderNumber, user_orders.prep_time, user_orders.current_status, food_items.name as itemName, count(food_items.name) as quantity,
    // users.name as name, users.phone_number as phone FROM user_orders
    // JOIN line_items ON line_items.user_order_id = user_orders.id
    // JOIN food_items ON line_items.food_item_id = food_items.id
    // JOIN users ON users.id = user_orders.user_id
    // GROUP BY orderNumber, itemName, users.name, users.phone_number`;
    // let query = `SELECT food_items.name as itemName, count(food_items.name) as quantity FROM food_items
    // JOIN line_items ON line_items.food_item_id = food_items.id
    // JOIN user_orders ON line_items.user_order_id = user_orders.id
    // GROUP BY itemName`

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


  return router;
};
