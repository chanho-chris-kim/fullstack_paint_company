import db from "../config/db.mjs";

class Delivery {
  constructor(
    delivery_address,
    delivery_colour_id,
    status,
    assigned_by_id,
    quantity,
    delivery_order_created_at,
    delivered_at
  ) {
    this.delivery_address = delivery_address;
    this.delivery_colour_id = delivery_colour_id;
    this.status = status;
    this.assigned_by_id = assigned_by_id;
    this.quantity = quantity;
    this.delivery_order_created_at = delivery_order_created_at;
    this.delivered_at = delivered_at;
  }

  async createDelivery() {
    try {
      let sql = `
    INSERT INTO deliveries (
        delivery_address,
        delivery_colour_id,
        status,
        assigned_by_id,
        quantity,
        delivery_order_created_at,
        delivered_at
    )
    VALUES(
        "${this.delivery_address}",
        "${this.delivery_colour_id}",
        "${this.status}",
        "${this.assigned_by_id}",
        "${this.quantity}",
        "${this.delivery_order_created_at}",
        "${this.delivered_at}"
    )
    `;
      const [result] = await db.execute(sql);
      return result.delivery_id; // Return the ID of the newly inserted delivery
    } catch (error) {
      console.error("Error creating delivery:", error);
      throw new Error("Failed to create delivery.");
    }
  }

  static async updateById(id, updatedFields) {
    const {
      delivery_address,
      delivery_colour_id,
      status,
      assigned_by_id,
      quantity,
      delivered_at,
    } = updatedFields;
    const formattedDeliveredAt =
      delivered_at !== null ? `"${delivered_at}"` : null;
    updatedFields.delivered_at = formattedDeliveredAt;
    try {
      let sql = `
        UPDATE deliveries
      SET 
          delivery_address = "${delivery_address}",
          delivery_colour_id = "${delivery_colour_id}",
          status = "${status}",
          assigned_by_id = "${assigned_by_id}",
          quantity = "${quantity}",
          delivered_at = ${updatedFields.delivered_at}
      WHERE delivery_id = ${id};
        `;
      const [result] = await db.execute(sql);
      if (result.affectedRows === 0) {
        throw new Error(`Delivery with ID ${id} not found.`);
      }
    } catch (error) {
      console.error("Error updating delivery:", error);
      throw new Error("Failed to update delivery.");
    }
  }

  static async findById(id) {
    try {
      let sql = `
      SELECT d.*, 
      pc.paint_colour AS delivery_colour,
      u.name AS assigned_by
      FROM deliveries d
      INNER JOIN paint_colours pc ON d.delivery_colour_id = pc.paint_colour_id
      INNER JOIN users u ON d.assigned_by_id = u.user_id
      WHERE d.delivery_id = ${id};
    `;
      const result = await db.execute(sql);

      if (result.length === 0) {
        throw new Error(`Delivery with ID ${id} not found.`);
      }

      return result;
    } catch (error) {
      console.error("Error finding delivery by ID:", error);
      throw new Error("Failed to find delivery by ID.");
    }
  }

  static async deleteById(id) {
    try {
      const sql = `
        DELETE FROM deliveries
        WHERE delivery_id = ${id};
        `;
      const [result] = await db.execute(sql);

      // Check if any rows were affected
      if (result.affectedRows === 1) {
        // If one row was deleted successfully, return a success message or indication
        return {
          success: true,
          message: `Delivery with ID ${id} deleted successfully.`,
        };
      } else {
        // If no rows were affected, it means the delivery with the provided ID doesn't exist
        return { success: false, message: `Delivery with ID ${id} not found.` };
      }
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting delivery:", error);
      return {
        success: false,
        message: "An error occurred while deleting the delivery.",
      };
    }
  }

  static async findAll() {
    try {
      let sql = `
        SELECT d.*, 
        pc.paint_colour AS delivery_colour,
        u.name AS assigned_by
        FROM deliveries d
        INNER JOIN paint_colours pc ON d.delivery_colour_id = pc.paint_colour_id
        INNER JOIN users u ON d.assigned_by_id = u.user_id;
`;
      const [result] = await db.execute(sql);
      return result;
    } catch (error) {
      console.error("Error finding all deliveries:", error);
      throw new Error("Failed to find all deliveries.");
    }
  }
}

export default Delivery;
