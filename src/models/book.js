const { model, Schema } = require("mongoose")

const BookModel = model(
  "books",
  new Schema({
<<<<<<< HEAD
    name: { type: String, required: true },
    keyw: { type:String, required:true},
=======
    accNo: { type: Number, required: true, unique: false },
    title: { type: String, required: true },
    keyw: { type: String, required: true},
>>>>>>> 569b65a (Changed schema for edition and publisher)
    isbn: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    authorName: { type: String, required: true},
    edition: { type: String, required: true },
    publisher: { type: String, required: true },
    tob: { type: String, required: true},
    borrowedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
    priceHistory: { type: Array, required: true, default: [] },
    quantityHistory: { type: Array, required: true, default: [] },
  })
)

module.exports = { BookModel }
