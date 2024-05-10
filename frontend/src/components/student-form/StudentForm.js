import React, { useState, useEffect } from "react";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useParams, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { BackendApi } from "../../client/backend-api";
import classes from "./StudentForm.css";
import {StudentApi} from "../../client/backend-api/student";

dayjs.extend(utc);

export const StudentForm = () => {
    const { studentRoll_no } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        student_name: "",
        roll_number: "",
        branch_name: "",
        semester: "",
        contact_number: "",
        book_bank: "",
    });
    const [errors, setErrors] = useState({
        student_name: "",
        roll_number: "",
        branch_name: "",
        semester: "",
        contact_number: "",
        book_bank: "",
    });

    const isInvalid =
        student.student_name.trim() === "" || student.roll_number.trim() === "" || student.contact_number.trim() === "";

    const formSubmit = (event) => {
        event.preventDefault();
        if (!isInvalid) {
            if (studentRoll_no) {
                // Update student logic

            } else {
                // Add student logic
                StudentApi.addstudent({
                    ...student,
                    
                })
                .then(() => navigate("/adminDash"))
            }
        }
    };

    const updateStudentField = (event) => {
        const { name, value } = event.target;
        if (name === "dte") {
            const dateValue = dayjs(value).utc().format("YYYY-MM-DD");
            setStudent((prevStudent) => ({ ...prevStudent, [name]: dateValue }));
        } else {
            setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
        }
    };

    const validateForm = (event) => {
        const { name, value } = event.target;
        if (["student_name", "roll_number", "branch_name", "semester", "contact_number", "book_bank"].includes(name)) {
            setStudent((prevStudent) => ({ ...prevStudent, [name]: value.trim() }));
            if (!value.trim().length) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "${name} can not be empty "}));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
            }
        }
        if (["roll_number", "semester", "contact_number"].includes(name)) {
            if (isNaN(Number(value))) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "Only numbers are allowed" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
            }
        }
    };

    useEffect(() => {
        if (studentRoll_no) {
            BackendApi.student.getStudentByRoll_no(studentRoll_no).then(({ student: fetchedStudent, error }) => {
                if (error) {
                    navigate("/stForm");
                } else {
                    setStudent(fetchedStudent);
                }
            });
        }
    }, [studentRoll_no, navigate]);

    return (
        <Container component={Paper} className={classes.wrapper}>
            <Typography className={classes.pageHeader} variant="h5">
                {studentRoll_no ? "Update Student" : "Add Student"}
            </Typography>
            <form noValidate autoComplete="off" onSubmit={formSubmit}>
                <FormGroup>
                    <FormControl className={classes.mb2}>
                        <TextField
                            label="Student Name"
                            name="student_name"
                            required
                            value={student.student_name}
                            onChange={updateStudentField}
                            onBlur={validateForm}
                            error={errors.student_name.length > 0}
                            helperText={errors.student_name}
                        />
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <TextField
                            label="Roll Number"
                            name="roll_number"
                            required
                            value={student.roll_number}
                            onChange={updateStudentField}
                            onBlur={validateForm}
                            error={errors.roll_number.length > 0}
                            helperText={errors.roll_number}
                        />
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <InputLabel>Branch</InputLabel>
                        <Select name="branch_name" value={student.branch_name} onChange={updateStudentField} required>
                            <MenuItem value="CSE">C.S.E.</MenuItem>
                            <MenuItem value="CSE (AI & ML)">CSE (AI & ML )</MenuItem>
                            <MenuItem value="TT">TT</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <InputLabel>Semester</InputLabel>
                        <Select name="semester" value={student.semester} onChange={updateStudentField} required>
                            {Array.from({ length: 8 }, (_, index) => (
                                <MenuItem key={index + 1} value={String(index + 1)}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <TextField
                            label="Contact No."
                            name="contact_number"
                            required
                            value={student.contact_number}
                            onChange={updateStudentField}
                            onBlur={validateForm}
                            error={errors.contact_number.length > 0}
                            helperText={errors.contact_number}
                        />
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <InputLabel>Bookbank Status</InputLabel>
                        <Select name="book_bank" value={student.book_bank} onChange={updateStudentField} required>
                            <MenuItem value="1">YES</MenuItem>
                            <MenuItem value="0">NO</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>
                <div className={classes.btnContainer}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
                        {studentRoll_no ? "Update Student" : "Add Student"}
                    </Button>
                </div>
            </form>
        </Container>
    );
};
            