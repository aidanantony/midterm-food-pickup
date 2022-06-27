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
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.render('customerInterface', { users });
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
          console.log('User Order: ', foodItemDetailsFromDatabase);
        });
    }
    res.render('customerOrderConfirmation');
  });

  return router;
};
