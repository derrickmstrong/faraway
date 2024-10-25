import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Create a Context for the theme
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [items, setItems] = useState(() => {
    // Load items from local storage if available
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("user", JSON.stringify(user));
      setItems(user);
    } else {
      localStorage.removeItem("user");
      setItems(null);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Save items to local storage whenever they change
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddItems = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = () => {
    setItems([]);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        items,
        handleAddItems,
        handleDeleteItem,
        handleToggleItem,
        handleClearList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

