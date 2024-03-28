import Delivery from "../models/Delivery.mjs";

//@desc Get all deliveries
//@route GET /api/deliveries
//@access public
const getDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.findAll();
    res.status(200).json({ count: deliveries.length, deliveries: deliveries });
  } catch (err) {
    console.error("Error fetching deliveries:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc Get delivery
//@route GET /api/deliveries/:id
//@access public
const getDelivery = async (req, res, next) => {
  try {
    const deliveryId = req.params.id;
    const [deliveryResult, _] = await Delivery.findById(deliveryId);
    if (!deliveryResult) {
      return res
        .status(404)
        .json({ error: `Delivery with ID ${deliveryId} not found` });
    }
    const delivery = deliveryResult[0];

    res.status(200).json({ delivery });
  } catch (err) {
    console.error("Error fetching delivery:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc create a Delivery
//@route POST /api/deliveries
//@access public
const createDelivery = async (req, res, next) => {
  try {
    const {
      delivery_address,
      delivery_colour_id,
      status,
      assigned_by_id,
      quantity,
      delivery_order_created_at,
      delivered_at,
    } = req.body;

    let delivery = new Delivery(
      delivery_address,
      delivery_colour_id,
      status,
      assigned_by_id,
      quantity,
      delivery_order_created_at,
      delivered_at
    );

    const deliveryId = await delivery.createDelivery();
    res
      .status(201)
      .json({ message: "Delivery created successfully", deliveryId });
  } catch (err) {
    console.error("Error creating delivery:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc Update a delivery
//@route PUT /api/deliveries/:id
//@access public
const updateDelivery = async (req, res, next) => {
  try {
    const deliveryId = req.params.id;
    const updatedFields = req.body;
    await Delivery.updateById(deliveryId, updatedFields);
    res
      .status(200)
      .json({ message: `Delivery updated successfully for ${deliveryId}` });
  } catch (err) {
    console.error("Error updating delivery:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc Delete a delivery
//@route DELETE /api/deliveries/:id
//@access public
const deleteDelivery = async (req, res, next) => {
  try {
    const deliveryId = req.params.id;

    // Delete delivery by ID
    const result = await Delivery.deleteById(deliveryId);
    if (!result.success) {
      return res.status(404).json({ error: result.message });
    }
    res
      .status(204)
      .json({ message: `Delivery deleted successfully for ${deliveryId}` });
  } catch (err) {
    console.error("Error deleting delivery:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getDeliveries,
  getDelivery,
  createDelivery,
  updateDelivery,
  deleteDelivery,
};
