import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

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
      try {
        const userKey = `userData-${user.sub}`;
        const storedUserData = localStorage.getItem(userKey);
        console.log("storedUserData", JSON.parse(storedUserData));
        // if (storedUserData) {
        //   setUserData(JSON.parse(storedUserData));
        // } else {
        // const initialUserData = {
        //   id: user.sub,
        //   description: "",
        //   quantity: 1,
        //   packed: false,
        // };
        // localStorage.setItem(userKey, JSON.stringify(initialUserData));
        // setUserData(initialUserData);
        // }
      } catch (error) {
        console.error(
          "Error accessing or parsing user data from localStorage:",
          error
        );
      }
    }
  }, [isAuthenticated, user]);

  // useEffect(() => {
  //   // Save userData to local storage whenever they change
  //   localStorage.setItem("userData", JSON.stringify(userData));
  // }, [userData]);

  const handleAddItems = (newItem) => {
    if (isAuthenticated && user) {
      try {
        const userKey = `userData-${user.sub}`;
        localStorage.setItem(userKey, JSON.stringify(newItem));
        setUserData((prevItems) => [newItem, ...prevItems]);
      } catch (error) {
        console.error("Error updating user data in localStorage:", error);
      }
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
