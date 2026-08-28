import { Request, Response } from "express";
import { AccountModel } from "../Models/accountModel";
import { TransactionModel } from "../Models/transactionModel";


export const transferMoney = async (req: Request, res: Response) => {

  const senderId = req.user.id;

  const { receiverId, amount } = req.body;


  try {

    // Find sender account
    const senderAccount = await AccountModel.findOne({
      userId: senderId
    });


    if (!senderAccount) {
      return res.status(404).json({
        message: "Sender account not found"
      });
    }


    // Check sender balance
    if (senderAccount.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }


    // Find receiver account
    const receiverAccount = await AccountModel.findOne({
      userId: receiverId
    });


    if (!receiverAccount) {
      return res.status(404).json({
        message: "Receiver account not found"
      });
    }


    // Deduct from sender
    senderAccount.balance -= amount;


    // Add to receiver
    receiverAccount.balance += amount;


    await senderAccount.save();
    await receiverAccount.save();


    // Create transaction record
    await TransactionModel.create({

      sender: {
        userId: senderId
      },

      receiver: {
        userId: receiverId
      },

      amount,

      type: "transfer",

      status: "success"

    });


    return res.status(200).json({
      message: "Money transferred successfully"
    });


  } catch(error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error"
    });

  }

};

export const getTransactions = async (req: Request, res: Response) => {

  const userId = req.user.id;

  try {

    const transactions = await TransactionModel.find({
      $or: [
        { "sender.userId": userId },
        { "receiver.userId": userId }
      ]
    });

    if (transactions.length === 0) {
      return res.status(200).json({
        message: "No transactions found"
      });
    }

    return res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions
    });

  } catch (error) {

    return res.status(500).json({
      message: "Server error"
    });

  }

};