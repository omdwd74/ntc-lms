// import { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { BooksList } from "../books-list/books-list"
import './adminDashboard.css'
import { BackendApi } from "../../client/backend-api"
import { Link as RouterLink } from "react-router-dom"
import { useUser } from "../../context/user-context"
import { useState, useEffect } from "react"
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
import classes from "../books-list/styles.module.css"
import FontAwesomeIcon from 'react-fontawesome'
import {StudentForm} from '../student-form/StudentForm';

// let menuicn = document.querySelector(".menuicn"); 
// let nav = document.querySelector(".navcontainer"); 
  
// menuicn.addEventListener("click", () => { 
//     nav.classList.toggle("navclose"); 
// })


// Import additional components needed for the dashboard, e.g., charts, tables, etc.
export const AdminDashboard = () => {
  const { user, loginUser, logoutUser, isAdmin } = useUser()
  const [books, setBooks] = useState([]);
    const [borrowedBook, setBorrowedBook] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [activeBookIsbn, setActiveBookIsbn] = useState("")
    const [openModal, setOpenModal] = useState(false)
    // const { isAdmin, user } = useUser()


    const fetchBooks = async () => {
        const { books } = await BackendApi.book.getAllBooks()
        setBooks(books)
    }

    const fetchUserBook = async () => {
        const { books } = await BackendApi.user.getBorrowBook()
        setBorrowedBook(books)
    }

    const deleteBook = () => {
        if (activeBookIsbn && books.length) {
            BackendApi.book.deleteBook(activeBookIsbn).then(({ success }) => {
                fetchBooks().catch(console.error)
                setOpenModal(false)
                setActiveBookIsbn("")
            })
        }
    }

    useEffect(() => {
        fetchBooks().catch(console.error)
        fetchUserBook().catch(console.error)
    }, [user])

const [openLoginDialog, setOpenLoginDialog] = useState(false)
const [anchorElUser, setAnchorElUser] = useState(null)

const handleCloseUserMenu = () => {
  setAnchorElUser(null)
}

const handleLoginClose = () => {
  setOpenLoginDialog(false)
}

const handleLogout = () => {
  logoutUser()
  handleCloseUserMenu()
}
    const navigate = useNavigate();
  
    // Add functionalities specific to the admin dashboard, e.g., fetching data
    // ...
  
    // const handleNavigateToBooks = () => {
    //   Navigate('/BooksList'); // Replace with the desired route for books
    // }
  
    // Add other navigation functions based on your admin dashboard needs
  
    return (
        
        <>
      <div>


  {/* <div class="searchbar"> 
      <input type="text" 
             placeholder="Search"> 
      <div class="searchbtn"> 
        <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              class="icn srchicn" 
              alt="search-icon" /> 
        </div> 
  </div>  */}

  {/* <div class="message"> 
      <div class="dp"> 
        <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              class="dpicn" 
              alt="dp" /> 
        </div> 
  </div>  */}


<div class="main-container"> 
  <div class="navcontainer"> 
      <nav class="nav"> 
          <div class="nav-upper-options"> 
              <div class="nav-option option1"> 
                  <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                      class="nav-img" 
                      alt="dashboard" /> 
                  <h3> Dashboard</h3> 
              </div> 

              <div class="option2 nav-option" onClick={() => navigate('/booksList')}> 
                  <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                      class="nav-img" 
                      alt="articles" /> 
                  <h3>Books List</h3> 
              </div> 

              <div class="option2 nav-option" onClick={() => navigate('/stList')}> 
                  <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                      class="nav-img" 
                      alt="articles" /> 
                  <h3>Students List</h3> 
              </div>

              <div class="nav-option option3"> 
                  <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                      class="nav-img" 
                      alt="report" /> 
                  <h3> Report</h3> 
              </div> 

              <div class="nav-option option4"> 
                  <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                      class="nav-img" 
                      alt="institution" /> 
                  <h3> Institution</h3> 
              </div> 

              <div class="nav-option option5" onClick={() => navigate('/admin/books/add')}> 
                  <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                      class="nav-img" 
                      alt="blog" /> 
                  <h3> Add Book</h3> 
              </div> 
              <div class="nav-option option6" onClick={() => navigate('/stForm')}> 
                  <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                      class="nav-img" 
                      alt="blog" /> 
                  <h3> Add Student</h3> 
              </div> 

              <div class="nav-option option7"> 
                  <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                      class="nav-img" 
                      alt="settings" /> 
                  <h3> Settings</h3> 
              </div> 

              <div class="nav-option logout" onClick={handleLogout}> 
                  <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                      class="nav-img" 
                      alt="logout" /> 
                  <h3>Logout</h3> 
              </div> 

          </div> 
      </nav> 
  </div> 
  <div class="main"> 

      {/* <div class="searchbar2"> 
          <input type="text" 
                 name="" 
                 id="" 
                 placeholder="Search"> 
          <div class="searchbtn"> 
            <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                  class="icn srchicn" 
                  alt="search-button" /> 
            </div> 
      </div>  */}

      <div class="box-container"> 

          <div class="box box1"> 
              <div class="text"> 
                  <h2 class="topic-heading">9.2k</h2> 
                  <h2 class="topic">Books Total Available </h2> 
              </div> 
              <FontAwesomeIcon icon="fa-regular fa-eye" style={{color: "#ffffff",}} />
              <img src= 
"https://cdn-icons-png.freepik.com/256/3917/3917052.png?semt=ais_hybrid"
                  alt="Views" /> 
          </div> 

          <div class="box box2"> 
              <div class="text"> 
                  <h2 class="topic-heading">150</h2> 
                  <h2 class="topic">Dues Pending</h2> 
              </div> 

              <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210185030/14.png" 
                   alt="likes" /> 
          </div> 

          <div class="box box3"> 
              <div class="text"> 
                  <h2 class="topic-heading">320</h2> 
                  <h2 class="topic">Recently Added</h2> 
              </div> 

              <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                  alt="comments" /> 
          </div> 

          <div class="box box4"> 
              <div class="text"> 
                  <h2 class="topic-heading">700</h2> 
                  <h2 class="topic">Books Issued</h2> 
              </div> 

              <img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png" alt="published" /> 
          </div> 
      </div> 

      <div class="report-container"> 
          <div class="report-header"> 
              <h1 class="recent-Articles">Recent Books</h1> 
              <button class="view" onClick={() => navigate('/booksList')}>View All</button> 
          </div> 

          <div class="report-body"> 
              

              <div class="items"> 
              <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                    <TableCell align="right">Acc. No.</TableCell>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">ISBN</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Author Name</TableCell>
                                        <TableCell align="right">Type Of Binding</TableCell>
                                        <TableCell align="right">Available</TableCell>
                                        <TableCell align="right">Edition</TableCell>
                                        <TableCell align="right">Publisher</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">No. of Pages</TableCell>
                                        <TableCell align="right">Supplier Name</TableCell>
                                        <TableCell align="right">Supplier Place</TableCell>
                                        <TableCell align="right">Currency</TableCell>
                                        <TableCell align="right">Discount</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : books
                                    ).map((book) => (
                                        <TableRow key={book.isbn}>
                                        <TableCell component="th" scope="row">
                                                {book.accNo}
                                            </TableCell>
                                            <TableCell align="right">
                                                {book.title}
                                            </TableCell>
                                            <TableCell align="right">{book.isbn}</TableCell>
                                            <TableCell>{book.category}</TableCell>
                                            <TableCell align="right">{book.quantity}</TableCell>
                                            <TableCell align="right">{book.authorName}</TableCell>
                                            <TableCell>{book.tob}</TableCell>
                                            <TableCell align="right">{book.availableQuantity}</TableCell>
                                            <TableCell align="right">{book.edition}</TableCell>
                                            <TableCell align="right">{book.publisher}</TableCell>
                                            <TableCell align="right">{`₹${book.price}`}</TableCell>
                                            <TableCell align="right">{book.nop}</TableCell>
                                            <TableCell align="right">{book.supname}</TableCell>
                                            <TableCell align="right">{book.supplc}</TableCell>
                                            <TableCell align="right">{book.curr}</TableCell>
                                            <TableCell align="right">{book.disc}</TableCell>
                                            <TableCell align="right">{book.dt}</TableCell>
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
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={books.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                    </div> 

              </div> 
          </div> 
      </div> 
  </div> 
</div> 
        {/* <h1>Admin Dashboard</h1>
        Add UI elements for your admin dashboard
        <button onClick={() => navigate('/admin/books/add')}>Add Book</button>
        Example button for navigating to books list
        <button onClick={() => navigate('/BooksList')}>Manage Books</button> */}
        <Routes>
        <Route path="/booksList" exact element={<BooksList />} />
        <Route path="/stForm" exact element={<StudentForm />} />
        </Routes>
      </div>
      
      
      </>
    );
  };
  