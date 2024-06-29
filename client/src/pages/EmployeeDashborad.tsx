import { useEffect } from "react";
import axios from "axios";
import { Employee } from "@/lib/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { employeeData, userInfo } from "../store/atom";
import EmployeeDetail from "@/components/EmployeeDetails";

export default function EmployeeDashborad() {
  const [data, setData] = useRecoilState<Employee | null>(employeeData);
  const user = useRecoilValue(userInfo);
  console.log(user?.UserID);
  const id = user?.UserID;

  useEffect(() => {
    async function getdata() {
      try {
        const responese = await axios.get<Employee>(
          "http://localhost:3000/api/v1/employee/" + id
        );
        const responeseData = await responese.data;
        setData(responeseData);
        sessionStorage.setItem("Edata", JSON.stringify(responeseData));
      } catch (error) {
        console.log("error", error);
        // setError("some thing went worng");
      }
    }
    if (!id) return;
    if (!data) getdata();
  }, [id]);

  return (
    <div className=" h-screen flex items-center justify-center">
      {data && <EmployeeDetail employee={data} />}
    </div>
  );
}
