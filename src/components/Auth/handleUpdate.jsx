import axios from "axios";
import { toast } from "react-toastify";

export const handleUpdate = async (event, currentPassword, newPassword, confirmPassword, setLoading) => {
  event.preventDefault();
  // Get the token from localStorage or context
  const token = localStorage.getItem("token");

  if (!currentPassword || !newPassword || !confirmPassword) {
    toast.error("All fields are required!", {
      autoClose: 2000,
    });
    return;
  }
  else if (currentPassword.length < 8 || newPassword.length < 8 || confirmPassword.length < 8) {
    toast.error("Password must be at least 8 characters long.", {
      autoClose: 2000,
    });
    return;
  } else if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match.", {
      autoClose: 2000,
    });
    return;
  }

  setLoading(true);

  try {
    const response = await axios.patch(
      "https://api-agroconnect.onrender.com/api/v1/users/updateMyPassword",
      {
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Password updated successfully!", {
        autoClose: 2000,
      });
      // Return a success indication if needed
      return true;
    } else {
      toast.error("Failed to update password. Please try again.", {
        autoClose: 2000,
      });
      // Return a failure indication if needed
      return false;
    }
  } catch (error) {
    console.error("Error updating password:", error);
    toast.error("An error occurred kindly check your inputs.", {
      autoClose: 2000,
    });
    return false;
  } finally {
    setLoading(false);
  }
};
