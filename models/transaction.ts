import mongoose, { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    sessionId: String,
    customerId: String,
    invoiceId: String,
    subscriptionId: String,
    mode: String,
    paymentStatus: String,
    customerEmail: String,
    amountTotal: Number,
    status: String,
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
