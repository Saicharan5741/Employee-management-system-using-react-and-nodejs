import React from "react";
import { Employee } from "@/lib/types";
import { Dropdown } from "./Dropdown";

type EmployeeTableProps = {
  data?: Employee[];
};

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ data }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Employment Code</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Company Email</th>
          <th className="py-2 px-4 border-b">Manager Name</th>
          <th className="py-2 px-4 border-b">Current Project</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((employee) => (
          <tr key={employee.user_id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{employee.employee_code}</td>
            <td className="py-2 px-4 border-b">{employee.user_name}</td>
            <td className="py-2 px-4 border-b">
              {employee.company_mail || "N/A"}
            </td>
            <td className="py-2 px-4 border-b">
              {employee.professional_reporting_manager || "N/A"}
            </td>
            <td className="py-2 px-4 border-b">
              {employee.project_code || "N/A"}
            </td>
            <td className="py-2 px-4 border-b space-x-2">
              <Dropdown id={employee.user_id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
