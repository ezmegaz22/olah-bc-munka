import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kérlek, add meg a termék nevét!"],
  },
  description: {
    type: String,
    required: [true, "Kérlek, add meg a termék leírását!"],
  },
  price: {
    type: Number,
    required: [true, "Kérlek, add meg a termék árát!"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Kérlek, add meg a termék kategóriáját!"],
    enum: {
      values: ["Laptop", "Fejhallgató", "Monitor"], //
      message: "Kérlek, válaszd ki a megfelelő kategóriát!",
    },
  },
  seller: {
    type: String,
    required: [true, "Kérlek, add meg a termék brandjét!"],
  },
  stock: {
    type: Number,
    required: [true, "Kérlek, add meg a termék raktár készletét!"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
