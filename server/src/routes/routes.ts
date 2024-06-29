import { Router } from "express";
import { sigin } from "../contorllers/users";
import { allEmployees } from "../contorllers/allemplyees";
import { newEmployee } from "../contorllers/adminOps";
import { getEmployeeById } from "../contorllers/specficEmployee";
import deleteEmploye from "../contorllers/deleteEmployee";
import { editEmployee } from "../contorllers/editEmployee";
import { getFinanceDetailsByUserId } from "../contorllers/getFinanceDetails";

const router = Router();

router.post("/signin", sigin);
router.get("/employees", allEmployees);
router.post("/newemployee", newEmployee);
router.put("/editemployee/:userId", editEmployee);
router.get("/employee/:userId", getEmployeeById);
router.put("/delete/:id", deleteEmploye);
router.get("/finance/:id", getFinanceDetailsByUserId);
// router.post("/signup", (req, res) => {});

export default router;
