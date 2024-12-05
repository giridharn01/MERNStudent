// export default Home;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../styles/Home.css";



function Home() {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({}); // Track marks for each student
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of students
    fetch("http://localhost:5000/api/student")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  useEffect(() => {
    // For each student, fetch their marks
    students.forEach((student) => {
      fetch(`http://localhost:5000/api/marks/${student.id}`)
        .then((res) => res.json())
        .then((data) => {
          // Store marks data in state
          setMarks((prevMarks) => ({
            ...prevMarks,
            [student.id]: data,
          }));
        })
        .catch((err) => console.error("Error fetching marks:", err));
    });
  }, [students]); // This effect runs when students are fetched
  const handleEdit = (id) => {
    navigate(`/updateStudent/${id}`);
  };
  
  
  const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/student/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              // Remove the student from the UI after successful deletion
              setStudents((prevStudents) =>
                prevStudents.filter((student) => student.id !== id)
              );
            } else {
              return res.json().then((data) => alert(data.error));
            }
          })
          .catch((err) => {
            console.error("Error deleting student:", err);
            alert("Error deleting student");
          });
      };

  return (
    <div className="student-list-container">
      <Link to="/addStudent">
        <button className="action-btn">Add Student</button>
      </Link>
      <h1>Student List</h1>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students) &&
            students.map((student) => {
              // Check if marks exist for this student
              const hasMarks = marks[student.id] && marks[student.id].subject1 !== null;

              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleEdit(student.id)}
                      
                    >
                      Edit
                    </button>
                    {hasMarks ? (
                      // If marks exist, show "View Marks" button
                      <Link to={`/viewmarks/${student.id}`}>
                        <button className="action-btn">View Marks</button>
                      </Link>
                    ) : (
                      // If no marks, show "Add Marks" button
                      <Link to={`/addmarks/${student.id}`}>
                        <button className="action-btn">Add Marks</button>
                      </Link>
                    )}

                    <button
                      className="action-btn"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
