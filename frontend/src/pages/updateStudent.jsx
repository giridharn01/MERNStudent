import React, { useState, useEffect } from "react";
import "../styles/add.css"; // Make sure the path is correct
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateStudent = () => {
  const { id } = useParams(); // Get student ID from route parameters
  const navigate = useNavigate(); // Navigate back after submission

  // State for form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  // State for loading and error
  const [loading, setLoading] = useState(true);

  // Fetch student data when the component loads
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/student/${id}`)
        .then((response) => {
          setFormData(response.data); // Pre-fill the form with existing data
          setLoading(false); // Stop loading when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
          alert("Failed to load student details.");
          setLoading(false); // Stop loading even if there's an error
        });
    }
  }, [id]);

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
      // Update existing student
      const response = await axios.put(
        `http://localhost:5000/api/student/update/${id}`,
        formData
      );
      console.log("Update Response:", response.data);
      alert("Student details updated successfully!");
      navigate("/"); // Redirect to home page after submission
    } catch (error) {
      console.error("Error updating student:", error);
      alert("An error occurred while updating the student.");
    }
  };

  // Display loading message until data is fetched
  if (loading) {
    return <div>Loading student data...</div>;
  }

  return (
    <div className="add-student-container">
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
          />
          <label htmlFor="inputPhone">Phone</label>
        </div>
        <div className="col-12 d-grid">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;
