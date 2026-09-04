import mongoose from "mongoose";


interface ITransaction {

  sender?: {
    userId: mongoose.Types.ObjectId;
  };

  receiver: {
    userId: mongoose.Types.ObjectId;
  };

  amount: number;

  type: string;

  status: string;

  createdAt: Date;

}

const transactionSchema = new mongoose.Schema<ITransaction>({

  sender: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
      
    }
  },

  receiver: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     
    }
  },

  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    default: "transfer"
  },

  status: {
    type: String,
    default: "success"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});


export const TransactionModel = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);