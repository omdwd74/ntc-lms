import React, { useState } from 'react';
import axios from 'axios';

export const AddStudentForm = () => {
  const [student, setStudent] = useState({
    student_name: '',
    roll_number: '',
    branch_name: '',
    semester:'',
    contact_number: '',
    book_bank: false
     // Assuming default value for book_bank is false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/students', student);
      alert('Student added successfully!');
      // Optionally, you can reset the form after successful submission
      setStudent({
        student_name: '',
        roll_number: '',
        branch_name: '',
        semester:'',
        contact_number: '',
        book_bank: false
      });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Student Name:
        <input type="text" name="student_name" value={student.student_name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Roll Number:
        <input type="number" name="roll_number" value={student.roll_number} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Branch Name:
        <input type="text" name="branch_name" value={student.branch_name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Semster:
        <input type="number" name="semester" value={student.semester} onChange={handleChange} required />
      </label>
      <br/>
      <label>
        Contact Number:
        <input type="number" name="contact_number" value={student.contact_number} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Book Bank:
        <input type="checkbox" name="book_bank" checked={student.book_bank} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Add Student</button>
    </form>
  );
};