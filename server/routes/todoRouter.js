import { pool } from "../helper/db.js";
import { Router } from "express";
import { auth } from "../helper/auth.js";
import { getTasks, postTask } from "../controllers/TaskController.js";
const router = Router();

router.get("/", getTasks);
/*router.get("/", auth, (req, res, next) => {
  pool.query("SELECT * FROM task", (err, result) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(result.rows || []);
  });
});*/
router.post("/create", auth, postTask);


/*router.post("/create", auth, (req, res) => {
  const { task } = req.body;
  if (!task || !task.description || !task.description.trim()) {
    return res.status(400).json({ error: "Task description is required" });
  }

  pool.query(
    "insert into task (description) values ($1) returning *",
    [task.description],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(result.rows[0]);
    }
  );
});*/

router.delete("/delete/:id", auth,  (req, res, next) => {
  const { id } = req.params;
  pool.query("delete from task WHERE id = $1", [id], (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.rowCount === 0) {
      const error = new Error("Task not found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json({ id: id });
  });
});

export default router;
