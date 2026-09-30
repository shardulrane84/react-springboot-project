import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const API_URL = "http://localhost:8080/api/students";

  // Get students from Spring Boot
  const loadStudents = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to load students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Load students when page opens
  useEffect(() => {
    loadStudents();
  }, []);

  // Add student
  const addStudent = async (e) => {
    e.preventDefault();
    if (!name.trim() || !course.trim()) {
      alert("Please enter name and course");
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          course: course,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add student");
      }
      setName("");
      setCourse("");
      loadStudents();
    } catch (error) {
      console.error("Error:", error);
      alert("Could not add student");
    }
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>
      <form onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>
      <h2>Students</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
