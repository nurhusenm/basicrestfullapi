const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, () => console.log("server is listening on 3000"));

//sample data
const students = [
  { id: 1, name: "Nurhussen" },
  { id: 2, name: "mohammed" },
];
app.get("/", (req, res) => {
  res.status(200).send("welcome");
});

app.get("/students", (req, res) => {
  res.status(200).json(students);
});
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((student) => student.id === id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json(`student with this ${id} is not found`);
  }
});
app.post("/students", (req, res) => {
  //   const { id } = req.params;
  const { name } = req.body;

  if (!name) res.status(400).json({ message: "name is required" });

  const newStudent = { id: Date.now(), name };
  students.push(newStudent);
  res.json(students);
});
app.put("students/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const index = students.findIndex((student) => student.id === id);

  // Check if the student exists
  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  // Check if the name is provided
  if (!name) {
    return res.status(400).json({ message: "Student name is required" });
  }

  // Update the student's name
  students[index].name = name;

  // Return the updated student
  res.json(students[index]);
});
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((student) => student.id === id);
  if (index === -1) {
    students.splice(index, 1);
  } else {
    res.status(404).json({ message: "student not found" });
  }
});
