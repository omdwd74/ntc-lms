import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Card,
    CardContent,
    CardActions,
    Typography,
    TablePagination,
} from "@mui/material"
import {StudentApi} from '../../client/backend-api/student'
import { useUser } from "../../context/user-context"
import classes from "./styles.module.css"

export const StudentsList = () => {

    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [openModal, setOpenModal] = useState(false)
    const { isAdmin, user } = useUser()


    const fetchStudents = async () => {
        const { students } = await StudentApi.getAllStudents()
        setStudents(students)
        
    }

    const deleteStudent = () => {
        if ( students.length) {
            StudentApi.deletestudent().then(({ success }) => {
                fetchStudents().catch(console.error)
                setOpenModal(false)
                // setActiveBookIsbn("")
            })
        }
    }

    useEffect(() => {
        fetchStudents().catch(console.error)
        // fetchUserBook().catch(console.error)
    }, [user])

    return (
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5">Students List</Typography>
                {isAdmin && (
                    <Button variant="contained" color="primary" component={RouterLink} to="/stForm">
                        Add Student
                    </Button>
                )}
            </div>
            {students.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                    <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Roll No</TableCell>
                                        <TableCell align="right">Branch Name</TableCell>
                                        <TableCell>Semester</TableCell>
                                        <TableCell align="right">Contact No</TableCell>
                                        <TableCell align="right">Book bank</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : students
                                    ).map((student) => (
                                        <TableRow key={student.student_name}>
                                        <TableCell component="th" scope="row">
                                                {student.student_name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {student.roll_number}
                                            </TableCell>
                                            <TableCell align="right">{student.branch_name}</TableCell>
                                            <TableCell>{student.semester}</TableCell>
                                            <TableCell align="right">{student.contact_number}</TableCell>
                                            
                                            <TableCell align="right">{student.book_bank}</TableCell>
                                            {/* <TableCell>{s\.bbk}</TableCell> */}
                                           
                                            <TableCell>
                                                <div className={classes.actionsContainer}>
                                                    <Button
                                                        variant="contained"
                                                        component={RouterLink}
                                                        size="small"
                                                        to={`/student/${student.rollno}`}
                                                    >
                                                        View
                                                    </Button>
                                                    {isAdmin && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                component={RouterLink}
                                                                size="small"
                                                                to={`/admin/students/${student.rollno}/edit`}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                size="small"
                                                                onClick={(e) => {
                                                                    // setActiveStudent(student.rollno)
                                                                    setOpenModal(true)
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={students.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                        <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
                            <Card className={classes.conf_modal}>
                                <CardContent>
                                    <h2>Are you sure?</h2>
                                </CardContent>
                                <CardActions className={classes.conf_modal_actions}>
                                    <Button variant="contained" onClick={() => setOpenModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={deleteStudent}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Modal>
                    </div>
                </>
            ) : (
                <Typography variant="h5">No Students found!</Typography>
            )}

            {
                user && !isAdmin && (
                    <>
                        <div className={`${classes.pageHeader} ${classes.mb2}`}>
                            <Typography variant="h5">Borrowed Books</Typography>
                        </div>
                        {/* {borrowedBook.length > 0 ? (
                            <>
                                <div className={classes.tableContainer}> */}
                                    {/* <TableContainer component={Paper}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">ISBN</TableCell>
                                                    <TableCell>Category</TableCell>
                                                    <TableCell align="right">Price</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {borrowedBook.map((book) => (
                                                    <TableRow key={book.isbn}>
                                                        <TableCell component="th" scope="row">
                                                            {book.title}
                                                        </TableCell>
                                                        <TableCell align="right">{book.isbn}</TableCell>
                                                        <TableCell>{book.category}</TableCell>
                                                        <TableCell align="right">{`$${book.price}`}</TableCell>
                                                        <TableCell>
                                                            <div className={classes.actionsContainer}>
                                                                <Button
                                                                    variant="contained"
                                                                    component={RouterLink}
                                                                    size="small"
                                                                    to={`/books/${book.isbn}`}
                                                                >
                                                                    View
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer> */}
                                {/* </div> */}
                            {/* </> */}
                        ) : (
                            <Typography variant="h5">No books issued!</Typography>
                        )
                    </>
                )
            }
        </>
    )
}