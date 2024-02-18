import MorseForm from "./MorseForm";
import { useTranslation } from "react-i18next";

function App() {

  const [t, i18n] = useTranslation("global")

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
  }

  return (
    <div className="App">
      <div id="top-section">
        <img src="./assets/logo.png" alt="logo"/>
        <h1>{t('title.value')}</h1>
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("fr")}>FR</button>
      </div>
      <div id="form-section">
        <MorseForm />
      </div>
    </div>
  );
}

export default App;
