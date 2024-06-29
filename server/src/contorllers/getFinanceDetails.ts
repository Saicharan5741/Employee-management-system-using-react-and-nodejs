import { Request, Response } from "express";
import pool from "../models/db"; // Ensure to import your pool configuration

export async function getFinanceDetailsByUserId(req: Request, res: Response) {
  const { id } = req.params;

  console.log(req.params);

  try {
    const result = await pool.query(
      `
      SELECT 
        fd.*,
        u.name AS username
      FROM finance_details fd
      LEFT JOIN users u ON fd.user_id = u.user_id
      WHERE fd.user_id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Finance details not found for this user");
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}
