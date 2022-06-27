/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

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
          const insertUserInfoInUserOrdersTable = `INSERT INTO user_orders(user_id, prep_time, current_status) VALUES (2, 0, 'In progress');`; //for user.id = 2, hardcoding user atm
          const insertOrderDetailsInLineItemsTable = `INSERT INTO line_items(food_item_id,user_order_id) VALUES (${foodItemDetailsFromDatabase[0].id}, 2);`;
          db.query(insertUserInfoInUserOrdersTable).then(() => db.query(insertOrderDetailsInLineItemsTable)).then(() =>
            db.query(`SELECT * FROM line_items;`));
          console.log('User Order: ', foodItemDetailsFromDatabase);
        });

    }
    res.render('customerOrderConfirmation');
  });

  return router;
};
