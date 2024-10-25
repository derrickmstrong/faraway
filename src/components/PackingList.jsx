import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext.jsx";
import Modal from "react-modal";
import List from "./List.jsx";

Modal.setAppElement("#root"); // Set the root element for accessibility

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const PackingList = () => {
  const { items, handleDeleteItem, handleToggleItem, handleClearList } = useContext(ThemeContext);

  const [sortBy, setSortBy] = useState("input");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle sorting items
  const handleSortItems = (e) => {
    setSortBy(e.target.value);
  };

  // Sort items based on the selected option
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === "packed")
    sortedItems = [...items].sort((a, b) => b.packed - a.packed);

  // Reset the sortBy state to "input" when the list is cleared
  const handleResetSortBy = () => {
    setSortBy("input");
  };

  const handleClearLists = () => {
    handleClearList();
    handleResetSortBy();
    setIsModalOpen(false);
  };

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <List
            key={item.id}
            item={item}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        {items.length > 1 && (
          <select value={sortBy} onChange={handleSortItems}>
            <option value="input">Sort by Input Order</option>
            <option value="description">Sort by Description</option>
            <option value="packed">Sort by Packed Status</option>
          </select>
        )}
        {items.length > 0 && (
          <button onClick={() => setIsModalOpen(true)}>Clear List</button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Confirm Clear List"
      >
        <h3>Are you sure you want to clear the list?</h3>
        <button className="clear-list" onClick={handleClearLists}>
          Yes
        </button>
        <button className="clear-list" onClick={() => setIsModalOpen(false)}>
          No
        </button>
      </Modal>
    </div>
  );
};

export default PackingList;
