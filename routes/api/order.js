const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Model
const Order = require("../../models/Order");
const OrderItem = require("../../models/OrderItem");
const Item = require("../../models/Item");

// @route  POST api/order
// @desc   Register order
// @access Public
router.post(
  "/:user_id",
  [
    check("order_item_id", "OrderItem ID is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { order_item_id, qty } = req.body;

    try {
      // save Order first
      const orderCount = await OrderItem.find();
      newOrder = new Order({
        order_user_id: req.params.user_id,
        order_id: "KUMASA_ORDER" + orderCount.length + 1
      });
      await newOrder.save();

      // save Order Item
      const item = await Item.findById(order_item_id);
      const totalAmount = item.price * qty;
      newOrderItem = new OrderItem({
        order_item_order_id: newOrder._id,
        order_item_id,
        qty,
        total: totalAmount
      });

      await newOrderItem.save();

      res.json(newOrderItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const order = await OrderItem.find();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get all orders
router.get("/orders", async (req, res) => {
  try {
    // order id from orders
    // name from users
    // phone from users
    // email rom users
    // order total from order items
    // status from order

    const data = [];
    const orders = await Order.find();

    console.log(orders)

    for (let index = 0; index < orders.length; index++) {
      const user = await User.findById(orders[index].order_user_id);

      // console.log(user)

      var order_total = "";

      const order_items = await OrderItem.find({
        order_item_order_id: orders[index]._id
      });
      // return console.log(order_items);

      // return console.log(order_items);
      var item_order_id = "";
      order_items.map(item => {
        order_total = order_total + item.total;
        item_order_id = item.order_item_id;
      });

      const item = await Item.findById(item_order_id);

      const branch = await Branch.findById(item.item_branch_id);

      data.push({
        order_id: orders[index]._id,
        order_number: orders[index].order_id,
        order_total: order_total,
        branch_logo: branch.logo,
        order_branch: branch.name,
        status: orders[index].status,
        order_date: orders[index].created_at,

        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        address: user.address,
        city: user.city,
        province: user.province
      });
      console.log(data);
    }

    // console.log(user);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get all orders item
router.get("/ordersItem/:order_id", async (req, res) => {
  try {
    const data = [];
    const orders_item = await OrderItem.find({
      order_item_order_id: req.params.order_id
    });
    // console.log(orders_item)
    for (let index = 0; index < orders_item.length; index++) {
      const itemData = await Item.findById(orders_item[index].order_item_id);

      data.push({
        id: index + 1,
        logo: itemData.logo,
        item_name: itemData.item_name,
        qty: orders_item[index].qty,
        price: itemData.price,
        total: orders_item[index].total
      });
      console.log(data);
    }

    // console.log(user);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
