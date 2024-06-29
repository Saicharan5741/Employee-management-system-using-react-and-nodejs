import pool from "../models/db";
import { Request, Response } from "express";

export async function editEmployee(req: Request, res: Response) {
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
    const user_id = req.params.userId;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    await pool.query("BEGIN");

    if (name || email || password || is_admin !== undefined) {
      const userUpdateQuery = `
            UPDATE users
            SET 
              employee_code = COALESCE($1, employee_code),
              name = COALESCE($2, name),
              email = COALESCE($3, email),
              password = COALESCE($4, password),
              is_admin = COALESCE($5, is_admin)
            WHERE user_id = $6;
        `;
      await pool.query(userUpdateQuery, [
        employee_code ?? null,
        name ?? null,
        email ?? null,
        password ?? null,
        is_admin !== undefined ? is_admin : null,
        user_id,
      ]);
    }

    if (
      full_name ||
      date_of_birth ||
      gender ||
      age ||
      current_address ||
      permanent_address ||
      mobile ||
      personal_mail ||
      emergency_contact_name ||
      emergency_contact_mobile
    ) {
      const personalDetailsUpdateQuery = `
            UPDATE personal_details
            SET 
              full_name = COALESCE($1, full_name),
              date_of_birth = COALESCE($2, date_of_birth),
              gender = COALESCE($3, gender),
              age = COALESCE($4, age),
              current_address = COALESCE($5, current_address),
              permanent_address = COALESCE($6, permanent_address),
              mobile = COALESCE($7, mobile),
              personal_mail = COALESCE($8, personal_mail),
              emergency_contact_name = COALESCE($9, emergency_contact_name),
              emergency_contact_mobile = COALESCE($10, emergency_contact_mobile)
            WHERE user_id = $11;
        `;
      await pool.query(personalDetailsUpdateQuery, [
        full_name ?? null,
        date_of_birth ?? "2000-01-01",
        gender ?? null,
        age ?? null,
        current_address ?? null,
        permanent_address ?? null,
        mobile ?? null,
        personal_mail ?? null,
        emergency_contact_name ?? null,
        emergency_contact_mobile ?? null,
        user_id,
      ]);
    }

    if (
      company_mail ||
      office_phone ||
      city ||
      office_address ||
      reporting_manager ||
      hr_name ||
      employment_history ||
      date_of_joining
    ) {
      const professionalDetailsUpdateQuery = `
            UPDATE professional_details
            SET 
              company_mail = COALESCE($1, company_mail),
              office_phone = COALESCE($2, office_phone),
              city = COALESCE($3, city),
              office_address = COALESCE($4, office_address),
              reporting_manager = COALESCE($5, reporting_manager),
              hr_name = COALESCE($6, hr_name),
              employment_history = COALESCE($7, employment_history),
              date_of_joining = COALESCE($8, date_of_joining)
            WHERE user_id = $9;
        `;
      await pool.query(professionalDetailsUpdateQuery, [
        company_mail ?? null,
        office_phone ?? null,
        city ?? null,
        office_address ?? null,
        reporting_manager ?? null,
        hr_name ?? null,
        employment_history ?? null,
        date_of_joining ?? "2023-01-01",
        user_id,
      ]);
    }

    if (
      project_code ||
      project_start_date ||
      project_end_date ||
      client_name ||
      project_reporting_manager
    ) {
      const projectDetailsUpdateQuery = `
            UPDATE project_details
            SET 
              project_code = COALESCE($1, project_code),
              start_date = COALESCE($2, start_date),
              end_date = COALESCE($3, end_date),
              client_name = COALESCE($4, client_name),
              reporting_manager = COALESCE($5, reporting_manager)
            WHERE user_id = $6;
        `;
      await pool.query(projectDetailsUpdateQuery, [
        project_code ?? null,
        project_start_date ?? "2000-01-01",
        project_end_date ?? "2000-01-01",
        client_name ?? null,
        project_reporting_manager ?? null,
        user_id,
      ]);
    }

    if (
      pancard ||
      aadharcard ||
      bank_name ||
      branch ||
      ifsc_code ||
      ctc_breakup
    ) {
      const financeDetailsUpdateQuery = `
            UPDATE finance_details
            SET 
              pancard = COALESCE($1, pancard),
              aadharcard = COALESCE($2, aadharcard),
              bank_name = COALESCE($3, bank_name),
              branch = COALESCE($4, branch),
              ifsc_code = COALESCE($5, ifsc_code),
              ctc_breakup = COALESCE($6, ctc_breakup)
            WHERE user_id = $7;
        `;
      await pool.query(financeDetailsUpdateQuery, [
        pancard ?? null,
        aadharcard ?? null,
        bank_name ?? null,
        branch ?? null,
        ifsc_code ?? null,
        ctc_breakup ?? null,
        user_id,
      ]);
    }

    await pool.query("COMMIT");
    res.status(200).send({ message: "Employee details updated successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error updating employee:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
