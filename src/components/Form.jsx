import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UserDataContext from "../context/UserDataContext.jsx";

const Form = () => {
  const { handleAddItems } = useContext(UserDataContext);

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

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {isMobile ? (
        <>
          <h3 className="packing">What do you need for your trip?</h3>
          <form className="add-form" onSubmit={handleSubmit}>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: "15%" }}
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
              style={{ width: "50%" }}
            />
            <button style={{ width: "25%" }}>Add</button>
          </form>
        </>
      ) : (
        <form className="add-form" onSubmit={handleSubmit}>
          <h3>What do you need for your trip?</h3>
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
      )}
    </>
  );
};

export default Form;
