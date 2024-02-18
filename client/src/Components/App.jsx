import MorseForm from "./MorseForm";
import { useTranslation } from "react-i18next";

function App() {

  const [t, i18n] = useTranslation("global")

  const changeLanguage = lang => {
    Array.from(document.getElementById('languages').children).forEach(l => {
      l.disabled = false;
    });

    i18n.changeLanguage(lang);
    document.getElementById(lang.toUpperCase()).disabled = true;
  }

  return (
    <div className="App">
      <div id="top-section">
        <img src="./assets/logo.png" alt="logo"/>
        <div id="languages">
          <button id="EN" onClick={() => changeLanguage("en")}>English</button>
          <button id="FR" onClick={() => changeLanguage("fr")}>Français</button>
          <button id="ES" onClick={() => changeLanguage("es")}>Español</button>
          <button id="IT" onClick={() => changeLanguage("it")}>Italiano</button>
          <button id="CH" onClick={() => changeLanguage("ch")}>中国人</button>
          <button id="JP" onClick={() => changeLanguage("jp")}>日本語</button>
        </div>
        <h1>{t('title.value')}</h1>
      </div>
      <div id="form-section">
        <MorseForm />
      </div>
    </div>
  );
}

export default App;
