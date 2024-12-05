  // const express = require("express");
  // const bodyParser = require("body-parser");
  // const cors = require("cors");
  // const mysql = require("mysql2");

  // const app = express();
  // const PORT = 5000;

  // // Middleware
  // app.use(cors());
  // app.use(bodyParser.json());
  // app.get("/", (req, res) => {
  //     res.send("Welcome to the Students API");
  //   });
    
  // // Database connection
  // const db = mysql.createPool({
  //   host: "localhost",
  //   user: "root",
  //   password: "1234", // Replace with your MySQL password
  //   database: "newapp", // Replace with your database name
  //   port:"3306"
  // });

  // // Routes

  // // Fetch all students
  // app.get("/api/student", (req, res) => {
  //   const query = "SELECT * FROM student";
  //   db.query(query, (err, results) => {
  //     if (err) return res.status(500).json({ error: err.message });
  //     res.status(200).json(results);
  //   });
  // });





  // // Add a student
  // app.post("/api/student/add", (req, res) => {
  //   const { id,first_name, last_name, email, phone } = req.body;
  //   const query = "INSERT INTO student (id,first_name, last_name, email, phone) VALUES (?,?, ?, ?, ?)";
  //   db.query(query, [id,first_name, last_name, email, phone], (err, result) => {
  //     if (err) return res.status(500).json({ error: err.message });
  //     res.status(201).json({ message: "Student added successfully", id: result.insertId });
  //   });
  // });

  // // // Update a student
  // // app.put("/api/students/:id", (req, res) => {
  // //   const { id } = req.params;
  // //   const { first_name, last_name, email, phone } = req.body;
  // //   const query = "UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?";
  // //   db.query(query, [first_name, last_name, email, phone, id], (err, result) => {
  // //     if (err) return res.status(500).json({ error: err.message });
  // //     res.status(200).json({ message: "Student updated successfully" });
  // //   });
  // // });

  // // // Delete a student
  // // Delete a student
  // app.delete("/api/student/delete/:id", (req, res) => {
  //   const { id } = req.params;
  //   const query = "DELETE FROM student WHERE id = ?";
    
  //   db.query(query, [id], (err, result) => {
  //     if (err) return res.status(500).json({ error: err.message });
  //     if (result.affectedRows === 0) {
  //       return res.status(404).json({ error: "Student not found" });
  //     }
  //     res.status(200).json({ message: "Student deleted successfully" });
  //   });
  // });



  // // Start server
  // app.listen(PORT, () => {
  //   console.log(`Server is running on http://localhost:${PORT}`);
  // });
  const express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const mysql = require("mysql2");

  const app = express();
  const PORT = 5000;

  // Middleware
  app.use(cors()); // Allow cross-origin requests (important for React frontend)
  app.use(bodyParser.json());

  // Database connection
  const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234", // Replace with your MySQL password
    database: "newapp", // Replace with your database name
    port: "3306",
  });

  // Routes

  // Welcome route
  app.get("/", (req, res) => {
    res.send("Welcome to the Students API");
  });

  // Fetch all students
  app.get("/api/student", (req, res) => {
    const query = "SELECT * FROM student";
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  });
  app.get("/api/student/:id", (req, res) => {
    const {id} = req.params;
    const query = "SELECT * FROM student where id = ?";
    db.query(query,[id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  });
  
  app.get("/api/marks/:studentId", (req, res) => {
    const { studentId } = req.params;
    const query = `
      SELECT student.first_name, student.last_name, marks.subject1, marks.subject2, marks.subject3, 
             marks.subject4, marks.subject5, marks.subject6, marks.subject7 
      FROM student
      LEFT JOIN marks ON student.id = marks.id  -- Ensure this column is correct
      WHERE student.id = ?`;
  
    db.query(query, [studentId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(404).json({ error: "Student or marks not found" });
      }
      res.status(200).json(results[0]); // Return the first result (combined student info and marks)
    });
  });
  

  app.post("/api/student/add", (req, res) => {
    const { id, first_name, last_name, email, phone } = req.body;
  
    // Validate input
    if (!id || !first_name || !last_name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    const query = "INSERT INTO student (id, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?)";
    
    db.query(query, [id, first_name, last_name, email, phone], (err, result) => {
      if (err) {
        console.error("Database error:", err); // Log error for debugging
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Student added successfully", id });
    });
  });
  
  //add mark
  app.post("/api/marks/add", (req, res) => {
    const { student_id, subject1,subject2,subject3,subject4,subject5,subject6,subject7 } = req.body;
    const query =
      "INSERT INTO marks (id,subject1,subject2,subject3,subject4,subject5,subject6,subject7) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [student_id,subject1,subject2,subject3,subject4,subject5,subject6,subject7], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Marks added successfully"});
    });
  });
  // Update a student
// Update a student
app.put("/api/student/update/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone } = req.body;
  console.log("ID from frontend",id);
  // Make sure the input data is valid (could add validation here)
  if (!first_name || !last_name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = "UPDATE student SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?";
  
  db.query(query, [first_name, last_name, email, phone, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully" });
  });
});


  // Delete a student
  app.delete("/api/student/delete/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM student WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.status(200).json({ message: "Student deleted successfully" });
    });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
