const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Model
const Order = require("../../models/Order");
const OrderItem = require("../../models/OrderItem");
const Item = require("../../models/Item");
const Wallet = require("../../models/Wallet");
const RidersProfile = require("../../models/RidersProfile");


// @route  POST api/order
// @desc   Register order
// @access Public
router.post(
  "/:user_id",
  // [
  //   check("order_item_id", "OrderItem ID is required")
  //     .not()
  //     .isEmpty()
  // ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { items, address, city,  otherRequest, reservationTime} = req.body;
    // console.log(items);

    // items.map(item => {
    //   console.log(item.item_1.item_id);
    // })

    try {
      // save Order first
      const delivery_fee = "59";
      const orderCount = await OrderItem.find();
      newOrder = new Order({
        order_user_id: req.params.user_id,
        order_id: "KUMASA_ORDER" + orderCount.length + 1,
        address: address,
        city: city,
        otherRequest: otherRequest,
        reservationTime: reservationTime,
        delivery_fee: delivery_fee
      });
      await newOrder.save();

      let order_total = 0;
      for (let index = 0; index < items.length; index++) {
        console.log(items[index].order_item_id);
        // save Order Item
        const item = await Item.findById(items[index].order_item_id);
        const totalAmount = parseInt(item.price) * parseInt(items[index].qty);
        newOrderItem = new OrderItem({
          order_item_order_id: newOrder._id,
          order_item_id: items[index].order_item_id,
          item_price: item.price,
          qty: items[index].qty,
          total: totalAmount
        });
        await newOrderItem.save();

        order_total = order_total + totalAmount;
      }
      newOrder.order_total = order_total;
      await newOrder.save();
      res.json({
        data: { status: "success", msg: "order saved" },
        newOrder,
        newOrderItem
      });
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

    // console.log(orders);

    for (let index = 0; index < orders.length; index++) {
      const user = await User.findById(orders[index].order_user_id);

      // console.log(user)

      var order_total = 0;

      const order_items = await OrderItem.find({
        order_item_order_id: orders[index]._id
      });
      // return console.log(order_items);

      // return console.log(order_items);
      var item_order_id = "";
      order_items.map(item => {
        order_total = "" + (parseInt(order_total) + parseInt(item.total));
        // console.log();
        item_order_id = item.order_item_id;
      });

      const item = await Item.findById(item_order_id);

      const branch = await Branch.findById(item.item_branch_id);

      // get rider info if order is accepted
      let rider_info = {};
      if (
        orders[index].status == "Accepted" ||
        orders[index].status == "Delivered" ||
        orders[index].status == "Rejected"
      ) {
        rider_info = await User.findById(orders[index].rider_id);
        console.log(rider_info);
      }
      const riderProfile = await RidersProfile.findOne({
        rider_user_id: rider_info._id
      });
      console.log(riderProfile);

      data.push({
        order_id: orders[index]._id,
        order_number: orders[index].order_id,
        order_total: order_total,
        branch_logo: branch.logo,
        order_branch: branch.name,
        branch_order_address: branch.address,
        status: orders[index].status,
        order_date: orders[index].created_at,
        order_address: orders[index].address,
        order_city: orders[index].city,
        delivery_fee: orders[index].delivery_fee,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        address: user.address,
        city: user.city,
        province: user.province,

        rider_id: orders[index].rider_id,
        // rider_code: riderProfile.rider_user_id,
        rider_first_name: rider_info.first_name,
        rider_middle_name: rider_info.middle_name,
        rider_last_name: rider_info.last_name,
        rider_phone_number: rider_info.phone_number,
        rider_email: rider_info.email,
        rider_address: rider_info.rider_address
      });
      // console.log(data);
    }

    // console.log(user);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// get all orders
router.get("/orders/:rider_id", async (req, res) => {
  try {
    // order id from orders
    // name from users
    // phone from users
    // email rom users
    // order total from order items
    // status from order

    const data = [];
    const orders = await Order.find({ rider_id: req.params.rider_id });

    console.log(orders);

    for (let index = 0; index < orders.length; index++) {
      const user = await User.findById(orders[index].order_user_id);

      // console.log(user)

      var order_total = 0;

      const order_items = await OrderItem.find({
        order_item_order_id: orders[index]._id
      });
      // return console.log(order_items);

      // return console.log(order_items);
      var item_order_id = "";
      order_items.map(item => {
        order_total = "" + (parseInt(order_total) + parseInt(item.total));
        // console.log();
        item_order_id = item.order_item_id;
      });

      const item = await Item.findById(item_order_id);

      const branch = await Branch.findById(item.item_branch_id);

      // get rider info if order is accepted
      let rider_info = {};
      if (
        orders[index].status == "Accepted" ||
        orders[index].status == "Delivered" ||
        orders[index].status == "Rejected"
      ) {
        rider_info = await User.findById(orders[index].rider_id);
        console.log(rider_info);
      }

      data.push({
        order_id: orders[index]._id,
        order_number: orders[index].order_id,
        order_total: order_total,
        branch_logo: branch.logo,
        order_branch: branch.name,
        order_address: branch.address,
        status: orders[index].status,
        order_date: orders[index].created_at,
        order_address: orders[index].address,
        order_city: orders[index].city,
        delivery_fee: orders[index].delivery_fee,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        address: user.address,
        city: user.city,
        province: user.province,

        rider_id: orders[index].rider_id,
        rider_first_name: rider_info.first_name,
        rider_middle_name: rider_info.middle_name,
        rider_last_name: rider_info.last_name,
        rider_phone_number: rider_info.phone_number,
        rider_email: rider_info.email,
        rider_address: rider_info.rider_address
      });
      // console.log(data);
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
        price: orders_item[index].item_price,
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

// accept order
router.put("/proccess/:rider_id", async (req, res) => {
  const { order_id, status } = req.body;
  try {
    const order = await Order.findById(order_id);
    order.rider_id = req.params.rider_id;
    order.status = status;
    order.save();

    // check if status Delivered
    if (status == "Delivered") {
      const wallet = await Wallet.findOne({ rider_id: req.params.rider_id });
      const currentSpent = wallet.total_spend;
      wallet.total_spend = parseInt(currentSpent) + parseInt(order.order_total);
      const currentEarned = wallet.total_earned;
      wallet.total_earned =
        parseInt(currentEarned) + parseInt(order.delivery_fee);
      wallet.save();
      console.log(currentEarned);
    }

    res.json({ data: { status: "success", msg: "order " + status }, order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
