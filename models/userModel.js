import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    role: { type: Number, default: 1 },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: async function (email) {
          // Buscar si existe un usuario con este email
          const user = await mongoose.models.users.findOne({ email });

          // Si no existe ningún usuario, el email es válido
          if (!user) return true;

          // Si existe un usuario, verificar si es el mismo documento (update)
          // this._id existe cuando estamos actualizando un documento existente
          if (this._id && user._id.toString() === this._id.toString()) {
            return true; // Es el mismo usuario actualizando su propio email
          }

          // El email ya está siendo usado por otro usuario
          return false;
        },
        message: 'El email ya está registrado'
      }
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

export default User;
