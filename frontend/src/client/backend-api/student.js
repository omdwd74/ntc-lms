const StudentApi = {
  getAllStudents: async () => {
    const res = await fetch("/v1/student", { method: "GET" })
    return res.json()
  },
  getstudentByroll_number: async (studentRoll_no) => {
    const res = await fetch(`/v1/student/${studentRoll_no}`, { method: "GET" })
    return res.json()
  },
  addstudent: async (data) => {
    // console.log(data)
    const res = await fetch("/v1/student", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  patchstudentByroll_number: async (studentRoll_no, data) => {
    const res = await fetch(`/v1/student/${studentRoll_no}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  deletestudent: async (studentRoll_no) => {
    const res = await fetch(`/v1/student/${studentRoll_no}`, { method: "DELETE" })
    return res.json()
  },
  
}

module.exports = { StudentApi }