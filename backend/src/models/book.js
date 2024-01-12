const { model, Schema } = require("mongoose")

const BookModel = model(
  "books",
  new Schema({
    accNo: {type: Number, required: true },
    title: { type: String, required: true },
    edition: { type: String, required: true },
    publisher: { type: String, required: true  },
    keyw: { type:String, required:true},
    isbn: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    tob: {type: String, required: true },
    quantity: { type: Number, required: true },
    authorName: { type: String, required: true},
    borrowedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
    priceHistory: { type: Array, required: true, default: [] },
    quantityHistory: { type: Array, required: true, default: [] },
  })
)

module.exports = { BookModel }
