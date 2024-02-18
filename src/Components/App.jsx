import MorseForm from "./MorseForm";

function App() {
  return (
    <div className="App">
      <div id="top-section">
        <img src="./assets/logo.png" alt="logo"/>
        <h1>Morse Code Encoder</h1>
      </div>
      <div id="form-section">
        <MorseForm />
      </div>
    </div>
  );
}

export default App;
