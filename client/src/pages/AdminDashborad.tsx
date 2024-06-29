import { Employee } from "@/lib/types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { EmployeeTable } from "@/components/EmployeeTable";

import Search from "@/components/Search";

export default function AdminDashborad() {
  const [data, setData] = useState<Employee[]>();
  const [employessCount, setEmployessCount] = useState<number>();
  const [originalData, setOriginalData] = useState<Employee[]>();

  const [error, setError] = useState<string>();
  useEffect(() => {
    async function getdata() {
      try {
        const responese = await axios.get<Employee[]>(
          "http://localhost:3000/api/v1/employees"
        );
        const responeseData = await responese.data;
        setData(responeseData);
        setOriginalData(responeseData);
      } catch (error) {
        console.log("error", error);
        setError("some thing went worng");
      }
    }
    if (!data) getdata();
  }, []);

  useMemo(() => {
    if (data) {
      setEmployessCount(data.length);
    }
  }, [data]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") return setData(originalData);
    const searchList = data?.filter((data) =>
      data.user_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(searchList);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10 space-y-10">
        <div className="flex justify-between items-center mb-10">
          <div className="text-2xl font-bold">Dashboard</div>
          <div className=" w-96">
            <Search handleOnchange={handleOnChange} />
          </div>
          <div className="space-x-4"></div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold">Employees</h3>
            <p className="text-blue-600 text-4xl">{employessCount}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold">Projects</h3>
            <p className="text-red-600 text-4xl">0</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-4">Employee Records</h3>
          {error ? (
            <h1>some thing went worng</h1>
          ) : (
            <EmployeeTable data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
