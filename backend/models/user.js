import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kérlek, ird be a neved!"],
  },
  email: {
    type: String,
    required: [true, "Kérlek, ird be az email címed!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Kérlek, adj meg egy jelszót!"],
    minLength: [6, "A jelszavadnak hosszabbnak kell lennie, mint 6 karakter!"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.User || mongoose.model("User", userSchema);
