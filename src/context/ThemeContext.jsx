import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Create a Context for the theme
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // Load items from local storage if available
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

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
    <ThemeContext.Provider
      value={{
        items,
        handleAddItems,
        handleDeleteItem,
        handleToggleItem,
        handleClearList,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;
