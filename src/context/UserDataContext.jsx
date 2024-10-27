import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

// Create a Context for the theme
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const userKey = `userData-${user.sub}`;
      const savedItems = localStorage.getItem(userKey);
      console.log("userKey", userKey);
      console.log("savedItems", savedItems);
      // setUserData(savedItems ? JSON.parse(savedItems) : []);
    }
  }, [isLoading, isAuthenticated, user]);

  useEffect(() => {
    if (user) {
      const userKey = `userData-${user.sub}`;
      localStorage.setItem(userKey, JSON.stringify(userData));
    }
  }, [userData, user]);

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
