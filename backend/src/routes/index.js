const apiV1 = require("express")()
const { router: bookRouter } = require("./book")
const { router: userRouter } = require("./users")
const { router: studentRouter } = require("./student")

apiV1.use("/book", bookRouter)
apiV1.use("/user", userRouter)
apiV1.use("/student", studentRouter)

module.exports = { apiV1 }
