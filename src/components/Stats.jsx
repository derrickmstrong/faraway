import PropTypes from "prop-types";

const Stats = ({ items }) => {

  const totalItems = items.length;
  const totalItemsPacked = items.filter((item) => item.packed).length;
  const totalItemsLeft = totalItems - totalItemsPacked;
  const totalItemsLeftPercentage = Math.round(
    (totalItemsLeft / totalItems) * 100
  );

  if (totalItems === 0) {
    return (
      <em>
        <footer className="stats">
          Start adding some items to the list. 🚀
        </footer>
      </em>
    );
  }

  return (
    <em>
      <footer className="stats">
        We have {totalItems} items on our list, and {totalItemsLeft} (
        {totalItemsLeftPercentage}%) items left to pack.
      </footer>
    </em>
  );
};

Stats.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Stats;
