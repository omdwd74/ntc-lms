const { BookApi } = require("./book")
const { UserApi } = require("./user")
// const {StudentApi} = reqquire("./student")

const BackendApi = {
  book: BookApi,
  user: UserApi,
  // student:StudentApi,

}

module.exports = { BackendApi }
