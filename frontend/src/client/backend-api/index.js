const { BookApi } = require("./book")
const { UserApi } = require("./user")
const {StudentApi} = require("./student")

const BackendApi = {
  book: BookApi,
  user: UserApi,
  student:StudentApi,

}

module.exports = { BackendApi }
