// export default ViewMarks;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewMarks() {
  const { id } = useParams(); // Get student ID from URL
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/marks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched student data:", data);
        setStudentData(data); // Set student info and marks
      })
      .catch((err) => console.error("Error fetching student data:", err));
  }, [id]);
  // const totalMarks = [
  //   studentData?.subject1 || 0,
  //   studentData?.subject2 || 0,
  //   studentData?.subject3 || 0,
  //   studentData?.subject4 || 0,
  //   studentData?.subject5 || 0,
  //   studentData?.subject6 || 0,
  //   studentData?.subject7 || 0,
  // ].reduce((sum, mark) => sum + mark, 0);
  

  if (!studentData) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <h2>Marks for {studentData.first_name} {studentData.last_name} {id}</h2>
      <table style={{ width: "100%", margin: "auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Subject</th>
            <th style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Subject 1</td>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{studentData.subject1 || "N/A"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Subject 2</td>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{studentData.subject2 || "N/A"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Subject 3</td>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{studentData.subject3 || "N/A"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Subject 4</td>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{studentData.subject4 || "N/A"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Subject 5</td>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{studentData.subject5 || "N/A"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Subject 6</td>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{studentData.subject6 || "N/A"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Subject 7</td>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{studentData.subject7 || "N/A"}</td>
          </tr>
          {/* <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
              {totalMarks}
            </td> */}
        </tbody>
      </table>
    </div>
  );
}

export default ViewMarks;
