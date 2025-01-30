const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(students);
});
router.post("/", (req, res) => {
  //   const { id } = req.params;
  const { name } = req.body;

  if (!name) res.status(400).json({ message: "name is required" });

  const newStudent = { id: Date.now(), name };
  students.push(newStudent);
  res.json(students);
});

export default router;
