import PropTypes from "prop-types";

const List = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li key={item.id}>
      <label className={item.packed ? "packed" : ""}>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItem(item.id)}
          className="item-checkbox"
        />{item.description} ({item.quantity})
      </label>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

List.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    packed: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired,
};

export default List;
