import { employeeSalaryData } from "@/store/atom";
import { forwardRef, RefObject } from "react";
import { useRecoilValue } from "recoil";

const Payslip = forwardRef<HTMLDivElement>((props, ref) => {
  const data = useRecoilValue(employeeSalaryData);

  if (!data) {
    return <>loading data</>;
  }

  return (
    <div className="max-w-xl mx-auto p-8 border border-gray-300 rounded-md shadow-md">
      {
        <div ref={ref as RefObject<HTMLDivElement>} className="p-6">
          <h1 className="text-2xl font-bold mb-4">Payslip</h1>
          <p className="mb-2">Dear {data.username},</p>

          <p className="mb-4">
            Please find below the details of your salary for this month. Should
            you have any queries, feel free to reach out to the HR department.
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Employee Details</h2>
            <p>
              <strong>PAN Card:</strong> {data.pancard}
            </p>
            <p>
              <strong>Month:</strong> {data.salary_month}
            </p>
            <p>
              <strong>Aadhar Card:</strong> {data.aadharcard}
            </p>
            <p>
              <strong>Bank Name:</strong> {data.bank_name}
            </p>
            <p>
              <strong>Branch:</strong> {data.branch}
            </p>
            <p>
              <strong>IFSC Code:</strong> {data.ifsc_code}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Salary Details</h2>
            <p>
              <strong>Basic Salary:</strong> ₹
              {data.ctc_breakup.split(" ")[1].slice(0, 5)}
            </p>
            <p>
              <strong>HRA:</strong> ₹
              {data.ctc_breakup.split(" ")[3].slice(0, 5)}
            </p>
            <p>
              <strong>Allowances:</strong> ₹
              {data.ctc_breakup.split(" ")[5].slice(0, 5)}
            </p>
            <hr className="my-2" />
            {/* <p>
              <strong>Gross Salary:</strong> ₹
              {Number(data.ctc_breakup.split(" ")[5].slice(0, 5)) +
                Number(data.ctc_breakup.split(" ")[3].slice(0, 5)) +
                Number(data.ctc_breakup.split(" ")[1].slice(0, 5))}
            </p> */}
          </div>
          <p className="mt-4">Thank you for your hard work and dedication.</p>
          <p>Sincerely,</p>
          <p>HR Department</p>
        </div>
      }
    </div>
  );
});

export default Payslip;
