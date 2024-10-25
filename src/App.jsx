import "./App.css";
import Logo from "./components/Logo/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
// import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "./context/UserContext";

const App = () => {
  const { isAuthenticated, items, isLoading, handleAddItems, handleDeleteItem, handleToggleItem, handleClearList } = useUser();

   if (isLoading) {
     return <div>Loading...</div>;
   }

  return (
    <>
      <Logo />
      {isAuthenticated && items ? (
        <>
          <Form handleAddItems={handleAddItems} />
          <PackingList
            user={items}
            handleDeleteItem={handleDeleteItem}
            handleToggleItem={handleToggleItem}
            handleClearList={handleClearList}
          />
          <Stats user={items} />
        </>
      ) : (
        <div className="login-message">Please login to access the app</div>
      )}
    </>
  );
};

export default App;
