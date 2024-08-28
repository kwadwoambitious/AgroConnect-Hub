import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const AllUsers = ({ loading, deletingUserId, users, setDeletingUserId, setUsers, setIsDeleting }) => {
  
  const handleDeleteUser = async (userId) => {
    setDeletingUserId(userId);
    try {
      setIsDeleting(true);
      await axios.delete(
        `https://api-agroconnect.onrender.com/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully!", {
        autoClose: 2000,
      });
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      {loading ? (
              <>
                <div className="submit-loader2 mx-auto mt-10"></div>
                <div className="text-center mt-10">Loading...</div>
              </>
            ) : (
              <>
                <h2 className="text-center text-2xl font-medium mt-28">
                  Registered Users
                </h2>
                <div className="overflow-x-auto my-10">
                  <table
                    border="1"
                    cellPadding="10"
                    cellSpacing="0"
                    className="min-w-full table-fixed border-collapse border"
                  >
                    <thead>
                      <tr>
                        <th className="text-[10px] md:text-base text-center border py-2">
                          Name
                        </th>
                        <th className="text-[10px] md:text-base text-center border py-2">
                          Email
                        </th>
                        <th className="text-[10px] md:text-base text-center border py-2">
                          Phone Number
                        </th>
                        {/* <th className="text-[10px] md:text-base text-center border py-2">
                          Role
                        </th> */}
                        <th className="text-[10px] md:text-base text-center border py-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <tr key={user._id}>
                            <td className="text-[9px] md:text-[15px] border p-2">
                              {user.name}
                            </td>
                            <td className="text-[9px] md:text-[15px] border p-2 max-w-xs truncate">
                              {user.email}
                            </td>
                            <td className="text-[9px] md:text-[15px] border p-2">
                              {user.phone}
                            </td>
                            {/* <td className="text-[9px] md:text-[15px] border p-2">
                              {user.role}
                            </td> */}
                            <td className="text-center border p-2">
                              <button
                                className="bg-red-500 text-white py-1 px-2 md:px-3 md:py-2 border-none text-[10px] md:text-[15px] rounded-md"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                {deletingUserId === user._id
                                  ? "Deleting"
                                  : "Delete"}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center p-2">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
    </div>
  )
}

export default AllUsers