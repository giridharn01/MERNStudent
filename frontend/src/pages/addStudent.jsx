import React, { useState } from "react";
import "../styles/add.css"; // Make sure the path is correct
import axios from "axios";

const AddStudent = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    // comments: "" // Uncomment if comments are needed
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace `/api/students` with your backend endpoint
      const response = await axios.post("http://localhost:5000/api/student/add", formData);
      console.log("Response:", response.data);
      alert("Student details submitted successfully!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="add-student-container">
      <h1>New Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="inputId"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
          <label htmlFor="inputId">ID</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <label htmlFor="inputFirstName">First Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <label htmlFor="inputLastName">Last Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="inputEmail">E-Mail</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <label htmlFor="inputPhone">Phone</label>
        </div>
       
        <div className="col-12 d-grid">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
