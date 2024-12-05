import React, { useState } from "react";
import "../styles/add.css"; // Make sure the path is correct
import axios from "axios";

const AddMarks = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    student_id: "", // Student ID to associate marks with
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
    subject6: "",
    subject7: "",
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
      // Replace `/api/marks/add` with your backend endpoint for adding marks
      const response = await axios.post("http://localhost:5000/api/marks/add/", formData);
      console.log("Response:", response.data);
      alert("Marks submitted successfully!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the marks.");
    }
  };

  return (
    <div className="add-marks-container">
      <h1>Enter Marks for Student</h1>
      <form onSubmit={handleSubmit}>
        {/* {id} */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="inputStudentId"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
          />
          <label htmlFor="inputStudentId">Student ID</label>
        </div>

        {/* Subject 1 to 7 Marks */}
        {Array.from({ length: 7 }, (_, index) => (
          <div key={`subject${index + 1}`} className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id={`inputSubject${index + 1}`}
              name={`subject${index + 1}`}
              value={formData[`subject${index + 1}`]}
              onChange={handleChange}
              required
            />
            <label htmlFor={`inputSubject${index + 1}`}>
              Subject {index + 1} Marks
            </label>
          </div>
        ))}

        <div className="col-12 d-grid">
          <button className="btn btn-primary" type="submit">
            Submit Marks
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMarks;
