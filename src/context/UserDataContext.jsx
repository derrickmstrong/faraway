import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

// Create a Context for the UserData
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState(() => {
    // Retrieve stored user data from localStorage, if available
    const savedData = localStorage.getItem("userData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if data for the authenticated user is already stored
      const storedUserData = localStorage.getItem("userData");

      if (!storedUserData) {
        // Create initial user data if not already present
        const initialUserData = {
          id: "1",
          description: "",
          quantity: 1,
          packed: false,
        };

        // Store it in localStorage
        localStorage.setItem("userData", JSON.stringify(initialUserData));
        setUserData(initialUserData);
      } else {
        // Use the existing data from localStorage
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, [isAuthenticated, user]);

  // Function to update user data and save to localStorage
  const handleAddItems = (newData) => {
    setUserData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      localStorage.setItem("userData", JSON.stringify(updatedData));
      console.log("updatedData 5", updatedData);
      return updatedData;
    });
  };

  const handleDeleteItem = (id) => {
    setUserData((prevData) => prevData?.filter((data) => data.id !== id));
  };

  const handleToggleItem = (id) => {
    setUserData((prevData) =>
      prevData?.map((data) =>
        data.id === id ? { ...data, packed: !data.packed } : data
      )
    );
  };

  const handleClearList = () => {
    setUserData([]);
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        handleAddItems,
        handleDeleteItem,
        handleToggleItem,
        handleClearList,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserDataContext;
