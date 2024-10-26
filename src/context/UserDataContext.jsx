import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

// Create a Context for the theme
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState(() => {
    // Load userData from local storage if available
    const savedItems = localStorage.getItem("userData");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      const userKey = `userData-${user.sub}`;
      const storedUserData = localStorage.getItem(userKey);
      if (storedUserData) {
        console.log("storedUserData", JSON.parse(storedUserData));
        // setUserData(JSON.parse(storedUserData));
      }
      // else {
      //   const initialUserData = {
      //     id: user.sub,
      //     description: "",
      //     quantity: 1,
      //     packed: false,
      //   };
      //   localStorage.setItem(userKey, JSON.stringify(initialUserData));
      //   setUserData(initialUserData);
      // }
    }
  }, [isAuthenticated, user, userData]);

  // useEffect(() => {
  //   // Save userData to local storage whenever they change
  //   localStorage.setItem("userData", JSON.stringify(userData));
  // }, [userData]);

  const handleAddItems = (newItem) => {
    if (isAuthenticated && user) {
      const userKey = `userData-${user.sub}`;
      localStorage.setItem(userKey, JSON.stringify(newItem));
      setUserData((prevItems) => [newItem, ...prevItems]);
    }
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
