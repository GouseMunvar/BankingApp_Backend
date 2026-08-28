import mongoose from "mongoose";

interface IAccount {

  userId: mongoose.Types.ObjectId;

  accountType: string;

  balance: number;

  status: string;

}


const accountSchema = new mongoose.Schema<IAccount>({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  accountType: {
    type: String,
    default: "saving"
  },

  balance: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    default: "active"
  }

});


export const AccountModel = mongoose.model<IAccount>(
  "Account",
  accountSchema
);