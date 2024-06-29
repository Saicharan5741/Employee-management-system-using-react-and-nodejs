// import EmployeeDetail from "@/components/EmployeeDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Employee } from "@/lib/types";
import EditEmployeeForm from "@/components/EditEmployeeForm";

export default function EditEmployee() {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    async function getdata() {
      try {
        const responese = await axios.get(
          "http://localhost:3000/api/v1/employee/" + id
        );
        const responeseData = await responese.data;
        setData(responeseData);
      } catch (error) {
        console.log("error", error);
        // setError("some thing went worng");
      }
    }
    if (!data) getdata();
  }, [id]);

  return <div>{data && <EditEmployeeForm employee={data} />}</div>;
}
