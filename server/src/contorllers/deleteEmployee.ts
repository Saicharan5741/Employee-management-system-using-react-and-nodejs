import { Response, Request } from "express";
import pool from "../models/db";

export default async function deleteEmploye(req: Request, res: Response) {
  const userId = req.params.id;

  try {
    const result = await pool.query(
      "UPDATE users SET is_active = FALSE WHERE user_id = $1",
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deactivated successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
