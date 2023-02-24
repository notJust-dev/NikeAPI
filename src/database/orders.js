const getDB = require('./db');

const getOrder = async (ref) => {
  return await getDB().orders.findOne({ ref });
};

const createOrder = async (order) => {
  const result = await getDB().orders.insertOne(order);
  return { ...order, _id: result.insertedId };
};

module.exports = {
  getOrder,
  createOrder,
};
