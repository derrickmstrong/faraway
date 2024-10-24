import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ThemeContext from "../context/ThemeContext.jsx";

const Form = () => {
  const { handleAddItems } = useContext(ThemeContext);

  const id = uuidv4();
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id,
      description,
      quantity,
      packed: false,
    };

    handleAddItems(newItem);

    setQuantity(1);
    setDescription("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do we need for our trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* Create array with 100 items */}
        {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default Form;
