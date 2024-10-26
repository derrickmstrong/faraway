import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();

  const [userData, setUserData] = useState([]);

  const initialUserData = () => {
    // Load userData from local storage if available
    if (isAuthenticated && user) {
      const userKey = `userData-${user.nickname}`;
      const storedUserData = localStorage.getItem(userKey);
      console.log("storedUserData", storedUserData);
      // const savedItems = localStorage.getItem("userData");
      // return storedUserData ? JSON.parse(storedUserData) : [];
    }
  };
  initialUserData();

  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     try {
  //       const userKey = `userData-${user.sub}`;
  //       const storedUserData = localStorage.getItem(userKey);
  //       console.log("storedUserData", JSON.parse(storedUserData));
  //       if (storedUserData) {
  //         setUserData(JSON.parse(storedUserData));
  //       } else {
  //         const initialUserData = {
  //           id: user.sub,
  //           description: "",
  //           quantity: 1,
  //           packed: false,
  //         };
  //         localStorage.setItem(userKey, JSON.stringify(initialUserData));
  //         setUserData(initialUserData);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Error accessing or parsing user data from localStorage:",
  //         error
  //       );
  //     }
  //   }
  // }, [isAuthenticated, user]);

  useEffect(() => {
    // Save userData to local storage whenever they change
    if (isAuthenticated && user) {
      const userKey = `userData-${user.nickname}`;
      localStorage.setItem(userKey, JSON.stringify(userData));
    }
  }, [isAuthenticated, user, userData]);

  const handleAddItems = (newItem) => {
    if (isAuthenticated && user) {
      try {
        const userKey = `userData-${user.nickname}`;
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
