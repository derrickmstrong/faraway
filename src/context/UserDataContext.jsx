import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

// Create a Context for the UserData
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState([]);

  console.log("userData 1", userData);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("userData", JSON.stringify(user));
      setUserData(user);
    } else {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, [isAuthenticated, user]);

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
