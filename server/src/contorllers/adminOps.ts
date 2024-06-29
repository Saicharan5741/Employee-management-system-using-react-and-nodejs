import pool from "../models/db";
import { Request, Response } from "express";

interface Employee {
  employee_code: string;
  name: string;
  email: string;
  is_admin: boolean;
  password: string;
  full_name: string;
  date_of_birth: string; // Adjust type if using a date object or a different format
  gender: string;
  age: number;
  current_address: string;
  permanent_address: string;
  mobile: string;
  personal_mail: string;
  emergency_contact_name: string;
  emergency_contact_mobile: string;
}

export async function newEmployee(req: Request, res: Response) {
  try {
    const {
      employee_code,
      name,
      email,
      password,
      is_admin,
      full_name,
      date_of_birth,
      gender,
      age,
      current_address,
      permanent_address,
      mobile,
      personal_mail,
      emergency_contact_name,
      emergency_contact_mobile,
      company_mail,
      office_phone,
      city,
      office_address,
      reporting_manager,
      hr_name,
      employment_history,
      date_of_joining,
      project_code,
      project_start_date,
      project_end_date,
      client_name,
      project_reporting_manager,
      pancard,
      aadharcard,
      bank_name,
      branch,
      ifsc_code,
      ctc_breakup,
    } = req.body;

    console.log(req.body);
    // return;

    await pool.query("BEGIN");

    const userInsertQuery = `
        INSERT INTO users (employee_code, name, email, password, is_admin)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING user_id;
    `;
    if (!name && !email && !password && !is_admin)
      return res.json({
        message: " name and emil and passowrd and is_admin",
      });
    const userResult = await pool.query(userInsertQuery, [
      employee_code ?? null,
      name ?? null,
      email ?? null,
      password ?? null,
      is_admin ?? false,
    ]);
    const userId = userResult.rows[0].user_id;

    const personalDetailsInsertQuery = `
        INSERT INTO personal_details (user_id, full_name, date_of_birth, gender, age, current_address, permanent_address, mobile, personal_mail, emergency_contact_name, emergency_contact_mobile)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING employee_id;
    `;
    const personalDetailsResult = await pool.query(personalDetailsInsertQuery, [
      userId,
      full_name ?? "N/A",
      date_of_birth ?? null,
      gender ?? null,
      age ?? null,
      current_address ?? null,
      permanent_address ?? null,
      mobile ?? null,
      personal_mail ?? null,
      emergency_contact_name ?? null,
      emergency_contact_mobile ?? null,
    ]);
    const employeeId = personalDetailsResult.rows[0].employee_id;

    const professionalDetailsInsertQuery = `
        INSERT INTO professional_details (employee_id, user_id, company_mail, office_phone, city, office_address, reporting_manager, hr_name, employment_history, date_of_joining)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;
    await pool.query(professionalDetailsInsertQuery, [
      employeeId,
      userId,
      company_mail ?? null,
      office_phone ?? null,
      city ?? null,
      office_address ?? null,
      reporting_manager ?? null,
      hr_name ?? null,
      employment_history ?? null,
      date_of_joining ?? null,
    ]);

    const projectDetailsInsertQuery = `
        INSERT INTO project_details (employee_id, user_id, project_code, start_date, end_date, client_name, reporting_manager)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    await pool.query(projectDetailsInsertQuery, [
      employeeId,
      userId,
      project_code ?? null,
      project_start_date ?? null,
      project_end_date ?? null,
      client_name ?? null,
      project_reporting_manager ?? null,
    ]);

    const financeDetailsInsertQuery = `
        INSERT INTO finance_details (employee_id, user_id, pancard, aadharcard, bank_name, branch, ifsc_code, ctc_breakup)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    await pool.query(financeDetailsInsertQuery, [
      employeeId,
      userId,
      pancard ?? "N/A",
      aadharcard ?? "N/A",
      bank_name ?? "N/A",
      branch ?? "N/A",
      ifsc_code ?? "N/A",
      ctc_breakup ?? "N/A",
    ]);

    await pool.query("COMMIT");
    res.status(201).send({ message: "Employee added successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error adding employee:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
