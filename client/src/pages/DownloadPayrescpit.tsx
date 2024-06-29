import Payslip from "@/components/Payslip";
import { RefObject, useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { employeeSalaryData } from "@/store/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmployeeInfo } from "@/lib/types";

export default function DownloadPayrescpit() {
  const payslipRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useRecoilState(employeeSalaryData);
  const [mouth, setMouth] = useState<number>(1);

  const [payslipData, setPayslioData] = useState<EmployeeInfo[]>();

  const handleOnClick = () => {
    if (!payslipData) return;
    const mouthData = payslipData.filter(
      (employ) => employ.salary_month == mouth
    );
    if (mouthData.length === 0) return setData(payslipData[0]);
    setData(mouthData[0]);
  };

  useEffect(() => {
    if (!data) {
      const Edata = JSON.parse(sessionStorage.getItem("Edata") || "");
      if (Edata) {
        getMonthlySalary(Edata.user_id);
      }
    }

    async function getMonthlySalary(id: number) {
      try {
        const responese = await axios.get(
          "http://localhost:3000/api/v1/finance/" + id
        );
        const responeseData = await responese.data;
        setData(responeseData[0]);
        setPayslioData(responeseData);
      } catch (error) {
        console.log("error", error);
        return;
      }
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => payslipRef.current,
  });

  if (!data) return <>loading data</>;
  return (
    <div className="p-4 flex flex-col items-center justify-center h-screen">
      <div className="mb-2  rounded-md">
        <div className="flex gap-3 items-center justify-center">
          <p>month</p>
          <Input
            className="flex gap-3"
            placeholder="enter a salary mouth"
            type="number"
            max={12}
            min={1}
            defaultValue={1}
            onChange={(e) => setMouth(Number(e.target.value))}
          />
          <Button onClick={handleOnClick}>enter</Button>
        </div>
      </div>
      <Payslip ref={payslipRef as RefObject<HTMLDivElement>} />
      <div className="">
        <button
          onClick={handlePrint}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download Payslip
        </button>
      </div>
    </div>
  );
}
