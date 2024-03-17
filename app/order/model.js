const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const Invoice = require("../invoice/model");
const OrderItem = require("../order-item/model");

const orderSchema = Schema(
  {
    status: {
      type: String,
      enum: ["waiting_payment", "processing", "in_delivery", "delivery"],
      default: "waiting_payment",
    },
    delivery_fee: {
      type: Number,
      default: 0,
    },

    delivery_address: {
      provinsi: { type: String, required: [true, "provinsi harus diisi"] },
      kabupaten: { type: String, required: [true, "kabupaten harus diisi"] },
      kecamatan: { type: String, required: [true, "kecamatan harus diisi"] },
      kelurahan: { type: String, required: [true, "kelurahan harus diisi"] },
      detail: { type: String },
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    order_items: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
  },
  { timestamps: true }
);


orderSchema.virtual("items_count").get(function () {
  return this.order_items.reduce(
    (total, item) => total + parseInt(item.qty),
    0
  );
});

// Perbaikan pada post save hook
orderSchema.post("save", async function () {
  // Mengambil semua item pesanan dari model OrderItem yang terkait dengan pesanan ini
  let orderItems = await OrderItem.find({ order: this._id });

  // Menghitung sub total dari semua item pesanan
  let sub_total = orderItems.reduce(
    (total, item) => (total += item.price * item.qty),
    0
  );

  let invoice = new Invoice({
    user: this.user,
    order: this._id,
    sub_total: sub_total,
    delivery_fee: parseInt(this.delivery_fee),
    total: parseInt(sub_total + parseInt(this.delivery_fee)),
    delivery_address: this.delivery_address,
  });
  await invoice.save();
});
module.exports = model("Order", orderSchema);
