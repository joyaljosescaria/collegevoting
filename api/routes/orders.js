const express = require("express");
const router = express.Router();

const orders = require('../controllers/orders.js')

router.get("/" , orders.getOrders) //Get all orders
router.post("/" , orders.makeOrder) //Make an order
router.get("/:orderId" , orders.getOrder) //Get an order by ID
router.delete("/:orderId" , orders.deleteOrder) //Delete an order by ID

module.exports = router;