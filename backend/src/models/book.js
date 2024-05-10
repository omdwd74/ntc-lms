const { model, Schema } = require("mongoose");

const BookModel = model(
  "books",
  new Schema({
    accNo: { type: String, unique: true },
    title: String,
    edition: String,
    publisher: String,
    keyw: String,
    isbn: String,
    category: String,
    price: String,
    tob: String,
    quantity:String,
    authorName: String,
    nop: String,
    vol: String,
    supname: String,
    supplc: String,
    curr: String,
    disc: String, 
    dte: Date,
    borrowedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
    priceHistory: { type: Array, default: [] },
    quantityHistory: { type: Array, default: [] },
  })
);

module.exports = { BookModel };
