import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

interface EmployeeDetails {
  employee_code?: string;
  name?: string;
  email?: string;
  password?: string;
  is_admin?: boolean;
  full_name?: string;
  date_of_birth?: string;
  gender?: "Male" | "Female" | "Other";
  age?: number;
  current_address?: string;
  permanent_address?: string;
  mobile?: string;
  personal_mail?: string;
  emergency_contact_name?: string;
  emergency_contact_mobile?: string;
  company_mail?: string;
  office_phone?: string;
  city?: string;
  office_address?: string;
  reporting_manager?: string;
  hr_name?: string;
  employment_history?: string;
  date_of_joining?: string;
  project_code?: string;
  start_date?: string;
  end_date?: string;
  client_name?: string;
  project_reporting_manager?: string;
  pancard?: string;
  aadharcard?: string;
  bank_name?: string;
  branch?: string;
  ifsc_code?: string;
  ctc_breakup?: string;
}

const EmployeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: EmployeeDetails) => {
    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/newemployee",
        data
      );
      console.log(response.data);
      console.log(data);
      toast.success("Employee added successfully");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
      {/* User Details */}
      <section className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">User Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2">Employee Code</label>
            <input
              type="text"
              {...register("employee_code")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          {/* <div>
            <label className="block mb-2">Is Admin</label>
            <input
              type="checkbox"
              {...register("is_admin")}
              className="p-2 border rounded"
            />
          </div> */}
        </div>
      </section>

      {/* Personal Details */}
      <section className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Personal Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              {...register("full_name")}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Date of Birth</label>
            <input
              defaultValue="2000-01-01"
              type="date"
              {...register("date_of_birth")}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Gender</label>
            <select
              {...register("gender")}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Age</label>
            <input
              defaultValue={"00"}
              type="number"
              {...register("age", { min: 0, max: 999 })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Current Address</label>
            <input
              type="text"
              {...register("current_address")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Permanent Address</label>
            <input
              type="text"
              {...register("permanent_address")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Mobile</label>
            <input
              type="text"
              {...register("mobile")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Personal Email</label>
            <input
              type="email"
              {...register("personal_mail")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Emergency Contact Name</label>
            <input
              type="text"
              {...register("emergency_contact_name")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Emergency Contact Mobile</label>
            <input
              type="text"
              {...register("emergency_contact_mobile")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Professional Details */}
      <section className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Professional Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2">Company Email</label>
            <input
              type="email"
              {...register("company_mail")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Office Phone</label>
            <input
              type="text"
              {...register("office_phone")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">City</label>
            <input
              type="text"
              {...register("city")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Office Address</label>
            <input
              type="text"
              {...register("office_address")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Reporting Manager</label>
            <input
              type="text"
              {...register("reporting_manager")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">HR Name</label>
            <input
              type="text"
              {...register("hr_name")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Employment History</label>
            <textarea
              {...register("employment_history")}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2">Date of Joining</label>
            <input
              defaultValue="2000-01-01"
              type="date"
              {...register("date_of_joining")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Project Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2">Project Code</label>
            <input
              type="text"
              {...register("project_code")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              value="2000-01-01"
              {...register("project_start_date")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">End Date</label>
            <input
              defaultValue="2000-01-01"
              type="date"
              {...register("project_end_date")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Client Name</label>
            <input
              type="text"
              {...register("client_name")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Project Reporting Manager</label>
            <input
              type="text"
              {...register("project_reporting_manager")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Finance Details */}
      <section className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Finance Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2">PAN Card</label>
            <input
              type="text"
              {...register("pancard")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Aadhar Card</label>
            <input
              type="text"
              {...register("aadharcard")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Bank Name</label>
            <input
              type="text"
              {...register("bank_name")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Branch</label>
            <input
              type="text"
              {...register("branch")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">IFSC Code</label>
            <input
              type="text"
              {...register("ifsc_code")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">CTC Breakup</label>
            <textarea
              defaultValue={"Basic: 50000, HRA: 20000, Allowances: 10000"}
              {...register("ctc_breakup")}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
        </div>
      </section>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
      <button
        type="submit"
        className="px-4 ml-1 py-2 bg-blue-500 text-white rounded"
      >
        save
      </button>
    </form>
  );
};

export default EmployeeForm;
