import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

// Create a Context for the theme
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { user } = useAuth0();
  const [userData, setUserData] = useState(() => {
    if (user) console.log('sub', user.sub); // This is the user's unique identifier
    // Load userData from local storage if available
    const savedItems = localStorage.getItem("userData");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    // Save userData to local storage whenever they change
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const handleAddItems = (newItem) => {
    setUserData((prevItems) => [newItem, ...prevItems]);
  };

  const handleDeleteItem = (id) => {
    setUserData((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setUserData((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
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
