import React, { useState, useEffect } from "react"
import * as dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { useParams, useNavigate } from "react-router-dom"
import {
    Paper,
    Container,
    Button,
    TextField,
    FormGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    // Dialog,
    // DialogActions,
    // DialogContent,
    // DialogContentText,
    // DialogTitle,
} from "@mui/material"
import { BackendApi } from "../../client/backend-api"
import classes from "./styles.module.css"
import { BookApi } from "../../client/backend-api/book"

dayjs.extend(utc)

  

export const BookForm = () => {
    
    const [categories, setCategories] = useState([]);
    const { bookIsbn } = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState({
        // dte : Date().toLocaleString().split(',')[0],
        accNo: "",
        title: "",
        keyw: "",
        isbn: bookIsbn || "",
        category: "",
        price: 0,
        quantity: 0,
        authorName: "",
        tob: "",
        edition: "",
        publisher: "",
        nop: 0,
        priceHistory: [],
        quantityHistory: [],
        supname: "",
        supplc: "",
        vol: "",
        curr: "",
        disc: "",
        dte: dayjs().utc().format("YYYY-MM-DD"),
        cmp: "",
        trans: "",
        remarks: "",
    })
    const [errors, setErrors] = useState({
        accNo: "",
        title: "",
        keyw: "",
        isbn: "",
        category: "",
        price: "",
        quantity: "",
        tob: "",
        edition: "",
        publisher: "",
        nop: "",
        authorName: "",
        supname: "",
        supplc: "",
        vol: "",
        curr: "",
        disc: "",
        dte: "",
        cmp: "",
        trans: "",
        remarks: "",
    })

    const isInvalid =
        book.title.trim() === "" || book.isbn.trim() === "" || book.category.trim() === ""

    const formSubmit = (event) => {
        event.preventDefault()
        if (!isInvalid) {
            if (bookIsbn) {
                const newPrice = parseInt(book.price, 10)
                const newQuantity = parseInt(book.quantity, 10)
                let newPriceHistory = book.priceHistory.slice()
                let newQuantityHistory = book.quantityHistory.slice()
                if (
                    newPriceHistory.length === 0 ||
                    newPriceHistory[newPriceHistory.length - 1].price !== newPrice
                ) {
                    newPriceHistory.push({ price: newPrice, modifiedAt: dayjs().utc().format() })
                }
                if (
                    newQuantityHistory.length === 0 ||
                    newQuantityHistory[newQuantityHistory.length - 1].quantity !== newQuantity
                ) {
                    newQuantityHistory.push({ quantity: newQuantity, modifiedAt: dayjs().utc().format() })
                }
                BookApi
                    .patchBookByIsbn(bookIsbn, {
                        ...book,
                        priceHistory: newPriceHistory,
                        quantityHistory: newQuantityHistory,
                    })
                    .then(() => navigate(-1))
            } else {
                BookApi.addBook({
                        ...book,
                        priceHistory: [{ price: book.price, modifiedAt: dayjs().utc().format() }],
                        quantityHistory: [{ quantity: book.quantity, modifiedAt: dayjs().utc().format() }],
                    })
                    .then(() => navigate("/adminDash"))
            }
        }
    }

    const updateBookField = (event) => {
        const field = event.target
        if (field.name === "dte") {
            // Extract only the date from the input value
            const dateValue = dayjs(field.value).utc().format("YYYY-MM-DD")
            setBook((prevProd) => ({ ...prevProd, [field.name]: dateValue }))
        } else {
            setBook((book) => ({ ...book, [field.name]: field.value }))
        }
    }


    const validateForm = (event) => {
        const { name, value } = event.target
        if (["accNo", "title", "isbn", "price", "quantity", "authorName", "edition", "publisher", "supname", "supplc", "vol", "curr", "dte", "cmp", "trans", "remarks"].includes(name)) {
            setBook((prevProd) => ({ ...prevProd, [name]: value.trim() }))
            if (!value.trim().length) {
                setErrors({ ...errors, [name]: `${name} can't be empty` })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
        if (["accNo", "price", "quantity", "disc"].includes(name)) {
            if (isNaN(Number(value))) {
                setErrors({ ...errors, [name]: "Only numbers are allowed" })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
          const response = await BookApi.addCategory();
          const categories = response.data; // or however your API responds
          setCategories(categories);
        };
      
        fetchCategories();
      }, []); // fetch on component mount
      

    useEffect(() => {
        if (bookIsbn) {
            BookApi.book.getBookByIsbn(bookIsbn).then(({ book, error }) => {
                if (error) {
                    navigate("/")
                } else {
                    setBook(book)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookIsbn])

//     const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
    
//     const [newCategory, setNewCategory] = useState("");
//     BookApi.addCategory(newCategory);

//   const handleAddCategory = async () => {
//     try {
//         console.log(BackendApi);
//       // Update the state with the new category list
      
//       const createdCategory = await BookApi.addCategory(newCategory);
//       setCategories([...categories, createdCategory.name]); // Use the name property
//       setOpenAddCategoryDialog(false);
//     } catch (error) {
//       // Handle error gracefully, e.g., display an error message to the user
//       console.error('Error adding category:', error);
//     }
// }



    return (
        <>
        
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                    {bookIsbn ? "Update Book" : "Add Book"}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={formSubmit}>
                    <FormGroup>
                    <FormControl className={classes.mb2}>
                            <TextField
                                label="Accession No"
                                name="accNo"
                                required
                                value={book.accNo}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.accNo.length > 0}
                                helperText={errors.accNo}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Title"
                                name="title"
                                required
                                value={book.title}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.title.length > 0}
                                helperText={errors.title}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <InputLabel>Keyword</InputLabel>
                            <Select name="keyw" value={book.keyw} onChange={updateBookField} required>
                                <MenuItem value="Computer">Computer</MenuItem>
                                <MenuItem value="Programming">Programming</MenuItem>
                                {/* This functionality is temporary stop  */}
                                <MenuItem value="Add Category">+ Add keyword</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="ISBN"
                                name="isbn"
                                required
                                value={book.isbn}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.isbn.length > 0}
                                helperText={errors.isbn}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <InputLabel>Category</InputLabel>
                            <Select name="category" value={book.category} onChange={updateBookField} required>
                                <MenuItem value="Journals">Journals</MenuItem>
                                <MenuItem value="Book Bank">Book Bank</MenuItem>
                                <MenuItem value="Fiction">Programming</MenuItem>
                                <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                            </Select>
        {/* <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={book.category}
          onChange={updateBookField}
          required
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
          <MenuItem value="Add Category" onClick={() => setOpenAddCategoryDialog(true)}>
            + Add Category
          </MenuItem> */}
        {/* </Select> */}
      </FormControl>

      <Dialog open={openAddCategoryDialog} onClose={() => setOpenAddCategoryDialog(false)}>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter the new category name:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        value={newCategory} // Use newCategory state variable
                        onChange={(e) => setNewCategory(e.target.value)}
 // Use the existing state setter
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddCategoryDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddCategory} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog> */}
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Price"
                                name="price"
                                required
                                value={book.price}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.price.length > 0}
                                helperText={errors.price}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={book.quantity}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.quantity.length > 0}
                                helperText={errors.quantity}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Author Name"
                                name="authorName"
                                required
                                value={book.authorName}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.authorName.length > 0}
                                helperText={errors.authorName}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Edition"
                                name="edition"
                                required
                                value={book.edition}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.edition.length > 0}
                                helperText={errors.edition}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Publisher"
                                name="publisher"
                                required
                                value={book.publisher}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.publisher.length > 0}
                                helperText={errors.publisher}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Number of Pages"
                                name="nop"
                                required
                                value={book.nop}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.nop.length > 0}
                                helperText={errors.nop}
                            />
                        </FormControl>
                        
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Supplier Name"
                                name="supname"
                                required
                                value={book.supname}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.supname.length > 0}
                                helperText={errors.supname}
                            />
                            </FormControl>

                            <FormControl className={classes.mb2}>
                            <TextField
                                label="Supplier Place"
                                name="supplc"
                                required
                                value={book.supplc}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.supplc.length > 0}
                                helperText={errors.supplc}
                            />
                            </FormControl>

                            <FormControl className={classes.mb2}>
                            <TextField
                                label="Volume"
                                name="vol"
                                required
                                value={book.vol}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.vol.length > 0}
                                helperText={errors.vol}
                            />
                            </FormControl>

                            <FormControl className={classes.mb2}>
                            <TextField
                                label="Currency"
                                name="curr"
                                required
                                value={book.curr}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.curr.length > 0}
                                helperText={errors.curr}
                            />
                            </FormControl>

                            <FormControl className={classes.mb2}>
                            <TextField
                                label="Discount"
                                name="disc"
                                required
                                value={book.disc}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.disc.length > 0}
                                helperText={errors.disc}
                            />
                            </FormControl>

                        <FormControl className={classes.mb2}>
                            <InputLabel>Type of Binding</InputLabel>
                            <Select name="tob" value={book.tob} onChange={updateBookField} required>
                                <MenuItem value="Paperback">Paperback</MenuItem>
                                <MenuItem value="Hardcover">Hardcover</MenuItem>
                                <MenuItem value="Spiral Bound">Spiral Bound</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Date"
                                name="dte"
                                required
                                value={book.dte}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.dte.length > 0}
                                helperText={errors.dte}
                            />
                            </FormControl>
                            <FormControl className={classes.mb2}>
                            <TextField
                                label="Compiler"
                                name="cmp"
                                required
                                value={book.cmp}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.cmp.length > 0}
                                helperText={errors.cmp}
                            />
                            </FormControl>
                            <FormControl className={classes.mb2}>
                            <TextField
                                label="Translator"
                                name="trans"
                                required
                                value={book.trans}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.trans.length > 0}
                                helperText={errors.trans}
                            />
                            </FormControl>
                            <FormControl className={classes.mb2}>
                            <TextField
                                label="Remarks"
                                name="remarks"
                                required
                                value={book.remarks}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.remarks.length > 0}
                                helperText={errors.remarks}
                            />
                            </FormControl>
                    </FormGroup>
                    <div className={classes.btnContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
                            {bookIsbn ? "Update Book" : "Add Book"}
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}
