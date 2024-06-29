import { userInfo } from "@/store/atom";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function AdminNav() {
  const [user, setUser] = useRecoilState(userInfo);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user") || "null");

    if (sessionUser) {
      setUser(sessionUser);
      setIsAdmin(sessionUser.IsAdmin);
    }
    setLoading(false);
  }, []);

  const handleOnclick = () => {
    sessionStorage.clear();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="sidebar text-white w-64 p-5 space-y-6 flex flex-col justify-between bg-gradient-to-r from-fuchsia-500 to-cyan-500 min-h-screen">
        <div>
          <div className="text-center text-2xl font-bold mb-6">
            {user && (
              <>
                {isAdmin ? <p>Admin dashboard</p> : <p>Employee dashboard</p>}
              </>
            )}
          </div>
          {user && (
            <>
              {isAdmin ? (
                <div className="space-y-3">
                  <div>
                    <Link
                      to={"/dashboard/admin"}
                      className="w-full text-left px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Dashboard
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={"/dashboard/newemployee"}
                      className="w-full text-left px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Add employee
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 flex flex-col">
                  <Link
                    to="/dashboard/employee"
                    className="w-full text-left px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/dashboard/payslip"
                    className="w-full text-left px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download My Payslip
                  </Link>
                </div>
              )}
            </>
          )}
          <Link
            to={"/"}
            onClick={handleOnclick}
            className="w-full text-left px-4 py-2 rounded hover:bg-blue-700"
          >
            log out
          </Link>
        </div>
        <div className="text-center text-sm">
          &copy; 2024 Employee Management System
        </div>
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
