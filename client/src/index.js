import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './Components/App';
import './style/style.css'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next'

import global_en from './translations/en/global.json'
import global_fr from './translations/fr/global.json'

i18next.init({
  interpolation: { escapeValue: true },
  lng: 'en',
  resources: {
    en: {
      global: global_en
    },
    fr: {
      global: global_fr
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next} >
      <App />
    </I18nextProvider>
  </React.StrictMode>
);