import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function RecentRequests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("/api/users/get/users");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          toast(data.message, { type: "error", theme: "colored" });
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false);
        setUsers(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="bg-white p-5 shadow-lg hover:scale-105 transition-all duration-500 flex- flex-col items-start table-auto overflow-x-auto">
      <table className="w-full">
        <thead className="p-2 bg-gray-300 text-left">
          <tr>
            <th className="border-b P-2">No.</th>
            <th className="border-b P-2">Image</th>
            <th className="border-b P-2">Name</th>
            <th className="border-b P-2">Email</th>
            <th className="border-b P-2">Rights</th>
            <th className="border-b P-2 text-nowrap">Account Status</th>
            <th className="border-b P-2">Action</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={7}>
                <div className="w-full flex items-center justify-center mt-2">
                  <div className="rounded-full h-12 w-12 animate-spin border-b-2 border-r-2 border-b-orange-500 border-r-blue-700"></div>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {!loading &&
              !error &&
              users.length > 0 &&
              users.map((user, index) => (
                <tr
                  key={index}
                  className={index % 2 === 1 ? "bg-gray-200" : ""}
                >
                  <td className=" border-b-2">{(index += 1)}</td>
                  <td className=" border-b-2">
                    <img
                      src={user.profilePicture}
                      alt="profile"
                      className="h-5 w-6 object-cover rounded-full"
                    />
                  </td>
                  <td className=" border-b-2">
                    {user.firstName + " " + user.lastName}
                  </td>
                  <td className=" border-b-2">{user.email}</td>
                  <td className=" border-b-2">N/A</td>
                  <td className=" border-b-2">Active</td>
                  <td className=" border-b-2 flex items-center gap-2">
                    <Link
                      to={`/profile/${user._id}`}
                      className="py-1 px-2 hover:opacity-90 shadow-sm hover:shadow-none transition-all duration-100 flex items-center gap-2 hover:bg-blue-100 hover:scale-105"
                    >
                      <FaEdit className="text-blue-500 h-5 w-5" />
                      Edit
                    </Link>
                    <button
                    
                      
                      className="py-1 px-2 hover:opacity-90 shadow-sm hover:shadow-none transition-all duration-100 flex items-center gap-2 hover:bg-blue-100 hover:scale-105"
                    >
                      <MdDelete className="text-red-500 h-5 w-5" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
