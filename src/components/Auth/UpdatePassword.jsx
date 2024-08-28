export  const handleUpdate = async (event) => {
  event.preventDefault();
  // Get the token from localStorage or context
  const token = localStorage.getItem("token");

  if(!currentPassword || !newPassword || !confirmPassword){
    toast.error("All fields are required!", {
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

      // Clear the password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error("Failed to update password. Please try again.", {
        autoClose: 2000,
      });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    toast.error("An error occurred while updating your password.", {
      autoClose: 2000,
    });
  } finally {
    setLoading(false);
  }
};