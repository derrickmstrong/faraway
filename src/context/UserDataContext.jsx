import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

// Create a Context for the UserData
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState(() => {
    // Load userData from local storage if available
    const savedData = localStorage.getItem("userData");
    console.log('savedData', savedData);
    return savedData ? JSON.parse(savedData) : [];
  });

  console.log('userData', userData);

   useEffect(() => {
     if (isAuthenticated && user) {
       // Fetch additional data (e.g., from a server) based on the authenticated user
       const fetchUserData = async () => {
         try {
          console.log('Setting user data');
           localStorage.setItem("userData", JSON.stringify(userData));
         } catch (error) {
           console.error("Failed to fetch user data", error);
         }
       };

       fetchUserData();
     }
   }, [isAuthenticated, user, userData]);

  // useEffect(() => {
  //   // Save userData to local storage whenever they change
  //   localStorage.setItem("userData", JSON.stringify(userData));
  // }, [userData]);

  const handleAddItems = (newData) => {
    setUserData((prevData) => [newData, ...prevData]);
  };

  const handleDeleteItem = (id) => {
    setUserData((prevData) => prevData.filter((data) => data.id !== id));
  };

  const handleToggleItem = (id) => {
    setUserData((prevData) =>
      prevData.map((data) =>
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
        setUserData,
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
