import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material"
import { Grid, Paper } from '@mui/material';
import { useUser } from "../../context/user-context"
import { Route, Routes, Navigate, Link } from "react-router-dom"
// import AdbIcon from "@mui/icons-material/Adb"
import { BooksList } from "../books-list/books-list"
import { LoginDialog } from "../login/login-dialog"
import { BookForm } from "../book-form/book-form"
import { Book } from "../book/book"
import Header from '../layout/Header';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { WithLoginProtector } from "../access-control/login-protector"
import { WithAdminProtector } from "../access-control/admin-protector"


export const AppLayout = () => {

    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const { user, loginUser, logoutUser, isAdmin } = useUser()
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLoginSubmit = (username, password) => {
        loginUser(username, password)
        setOpenLoginDialog(false)
    }

    const handleLoginClose = () => {
        setOpenLoginDialog(false)
    }

    const handleLogout = () => {
        logoutUser()
        handleCloseUserMenu()
    }

    useEffect(() => {
        if (!user) {
            navigate("/home")
        } else if (isAdmin) {
            navigate("/adminDash")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isAdmin])


    return (
        <>
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: "flex", mr: 1 }} /> */}
                    <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: "flex",
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "white",
                            }}
                        >
                            Nitra Technical Campus (LMS)
                        </Typography>
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 0,
                        }}
                    >
                        {user ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar> {user.username.charAt(0).toUpperCase()} </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "60px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={() => navigate('/adminDash')}>
                                        <Typography textAlign="center">Dashboard</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/stDues')}>
                                        <Typography textAlign="center">Dues</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                onClick={() => {
                                    setOpenLoginDialog(true)
                                }}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
            <div>


                {/* <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography variant="h6">NITRA TECHNICAL CAMPUS</Typography>
                        <Box
                            sx={{
                                flexGrow: 0,
                            }}
                        >
                            {user ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar> {user.username.charAt(0).toUpperCase()} </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "60px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={() => navigate('/adminDash')}>
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">Dues</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setOpenLoginDialog(true);
                                    } }
                                    sx={{ my: 2, color: "white", display: "block"}}
                                >
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                    </Container>
                </AppBar> */}
                <Routes>
                    <Route path="/booksList" exact element={<BooksList />} />
                    <Route path="/home" exact element={<LandingPage />} />
                    <Route path="/adminDash" exact element={<AdminDashboard />} />
                    <Route path="/stForm" exact element={<StudentForm />} />
                    <Route path="/stList" exact element={<StudentsList />} />
                    <Route path="/stDues" exact element={<calcStDues />} />
                    <Route
                        path="/books/:bookIsbn"
                        element={<WithLoginProtector>
                            <Book />
                        </WithLoginProtector>
                    }
                />
                <Route
                    path="/admin/books/add"
                    element={
                        <WithLoginProtector>
                            <WithAdminProtector>
                                <BookForm />
                            </WithAdminProtector>
                        </WithLoginProtector>}
                        exact />
                    <Route
                        path="/admin/books/:bookIsbn/edit"
                        element={<WithLoginProtector>
                            <WithAdminProtector>
                                <BookForm />
                            </WithAdminProtector>
                        </WithLoginProtector>} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
                <LoginDialog
                    open={openLoginDialog}
                    handleSubmit={handleLoginSubmit}
                    handleClose={handleLoginClose} />

<div className="footer">
      <p>&copy; 2024 NITRA TECHNICAL CAMPUS. All rights reserved.</p>
    </div>

            </div>

        </>
    )
}