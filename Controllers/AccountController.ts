import { Request, Response } from "express";
import { AccountModel } from "../Models/accountModel";
import { TransactionModel } from "../Models/transactionModel";





export const depositAmount = async (req: Request, res: Response) => {

  const { amount } = req.body;
  const userId = req.user.id; // from JWT middleware


  try {

    // 1. Find account
    const account = await AccountModel.findOne({
      userId
    });


    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }


    // 2. Add amount
    account.balance += amount;


    // 3. Save account
    await account.save();


    // 4. Create transaction history
    await TransactionModel.create({
     
      receiver: {
        userId
      },
      amount,
      type: "deposit",
      status: "success"
    });


    return res.status(200).json({
      message: "Amount deposited successfully",
      balance: account.balance
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error"
    });

  }

};


export const withdrawAmount = async (req: Request, res: Response) => {

  const { amount } = req.body;

  const userId = req.user.id;

  try {

    // Find account
    const account = await AccountModel.findOne({
      userId
    });


    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }


    // Check balance
    if (account.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }


    // Deduct amount
    account.balance -= amount;


    // Save updated balance
    await account.save();


    // Create transaction record
    await TransactionModel.create({ 
  sender: { 
    userId 
  },
  receiver: {
    userId
  },
  amount,
  type: "withdraw",
  status: "success"
});

    return res.status(200).json({
      message: "Withdrawal successful",
      balance: account.balance
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error"
    });

  }

};

export const getBalance = async (req: Request, res: Response) => {

  const userId = req.user.id;

  try {

    const account = await AccountModel.findOne({
      userId
    });


    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }


    return res.status(200).json({
      balance: account.balance,
      accountType: account.accountType,
      status: account.status
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error"
    });

  }

};












