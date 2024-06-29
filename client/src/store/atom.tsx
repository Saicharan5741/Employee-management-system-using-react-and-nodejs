import { Employee } from "@/lib/types";
import { atom } from "recoil";

interface User {
  UserID: number;
  UserCode: string;
  FirstName: string;
  Email: string;
  IsAdmin: boolean;
}

export const userInfo = atom<User | null>({
  key: "userInfo",
  default: null,
});

export const employeeData = atom<Employee | null>({
  key: "employeeData",
  default: null,
});

interface EmployeeInfo {
  employee_id: number;
  user_id: number;
  pancard: string;
  aadharcard: string;
  bank_name: string;
  branch: string;
  ifsc_code: string;
  ctc_breakup: string;
  monthly_salary: string;
  salary_month: number;
  username: string;
}

export const employeeSalaryData = atom<EmployeeInfo | null>({
  key: "employeeSalaryData",
  default: null,
});
