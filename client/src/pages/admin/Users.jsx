import { useEffect, useState } from "react";
import DeleteModal from "../../components/common/DeleteModal";
import CreateModal from "../../components/common/CreateModal";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Alert } from "flowbite-react";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [userId, setUserId] = useState(null);

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
  }, [openModal, openCreateModal]);

  return (
    <div className="min-h-screen font-lato">
      <div className="p-5 bg-white border-gray-300 shadow-lg table-auto overflow-x-auto">
        <div className="bg-[#212121] text-white px-2 mb-2">
          Registered Users
        </div>
        <Alert color="warning" withBorderAccent>
          <span>
            <span className="font-medium">Module info!</span> This table shows
            the list of all registered users in the system
          </span>
        </Alert>
        <div className="flex items-center justify-between my-2">
          <button
            onClick={() => {
              setOpenCreateModal(true);
            }}
            className="py-2 px-4 bg-[#212121] text-white flex gap-1 items-center shadow-lg hover:shadow-none transition-all duration-100 hover:opacity-80 rounded"
          >
            <TiUserAdd className="w-5 h-5" />
            Create
          </button>
          <input
            type="text"
            placeholder="Search"
            className="border-gray-400 focus:outline-none rounded py-1 px-2"
          />
        </div>
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
                    <td className="p-2 border-b-2">{(index += 1)}</td>
                    <td className="p-2 border-b-2">
                      <img
                        src={user.profilePicture}
                        alt="profile"
                        className="h-9 w-10 object-cover rounded-full"
                      />
                    </td>
                    <td className="p-2 border-b-2">
                      {user.firstName + " " + user.lastName}
                    </td>
                    <td className="p-2 border-b-2">{user.email}</td>
                    <td className="p-2 border-b-2">N/A</td>
                    <td className="p-2 border-b-2">Active</td>
                    <td className="p-2 border-b-2 flex items-center gap-2">
                      <Link
                        to={`/profile/${user._id}`}
                        className="py-1 px-2 hover:opacity-90 shadow-sm hover:shadow-none transition-all duration-100 flex items-center gap-2 hover:bg-blue-100 hover:scale-105"
                      >
                        <FaEdit className="text-blue-500 h-5 w-5" />
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setUserId(user._id);
                        }}
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
      {openModal && (
        <DeleteModal
          role="deleteUser"
          userId={userId}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      {openCreateModal && (
        <CreateModal
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
        />
      )}
    </div>
  );
}
