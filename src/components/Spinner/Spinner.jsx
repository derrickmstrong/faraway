import "./Spinner.css"; // Create a CSS file for the spinner styles

const Spinner = () => (
  <>
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
      <div className="loading-text">Loading...</div>
    </div>
  </>
);

export default Spinner;
