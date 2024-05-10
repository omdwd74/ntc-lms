const router = require("express")()
const { StudentModel } = require("../models/student")

router.get("/", async (req, res, next) => {
  try {
    const students = await StudentModel.find({})
    return res.status(200).json({
      students: students.map((student) => ({
        ...student.toJSON(),
      })),
    })
  } catch (err) {
    next(err)
  }
})

router.get("/:studentRoll_no", async (req, res, next) => {
  try {
    const student = await StudentModel.findOne({ roll_number: req.params.studentRoll_no })
    if (student == null) {
      return res.status(404).json({ error: "Student not found" })
    }
    return res.status(200).json({
      student: {
        ...student.toJSON(),
        // availableQuantity: student.quantity - student.borrowedBy.length,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const student = await StudentModel.findOne({ roll_number: req.body.roll_number })
    if (student != null) {
      return res.status(400).json({ error: "student with same roll_number already found" })
    }
    const newstudent = await StudentModel.create(req.body)
    return res.status(200).json({ student: newstudent })
  } catch (err) {
    next(err)
  }
})

router.patch("/:studentRoll_no", async (req, res, next) => {
  try {
    const student = await StudentModel.findOne({ roll_number: req.params.studentRoll_no })
    if (student == null) {
      return res.status(404).json({ error: "student not found" })
    }
    const { _id, roll_number, ...rest } = req.body
    const updatedstudent = await student.update(rest)
    return res.status(200).json({ student: updatedstudent })
  } catch (err) {
    next(err)
  }
})

router.delete("/:studentRoll_no", async (req, res, next) => {
  try {
    const student = await StudentModel.findOne({ roll_number: req.params.studentRoll_no })
    if (student == null) {
      return res.status(404).json({ error: "student not found" })
    }
    await student.delete()
    return res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
})

module.exports = { router }
