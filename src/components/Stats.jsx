import { useContext } from "react";
import UserDataContext from "../context/UserDataContext.jsx";

const Stats = () => {
  const { userData } = useContext(UserDataContext);

  const totalItems = userData.length;
  const totalItemsPacked = userData.filter((item) => item.packed).length;
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
        You have {totalItems} items on your list, and {totalItemsLeft} (
        {totalItemsLeftPercentage}%) items left to pack.
      </footer>
    </em>
  );
};

export default Stats;
