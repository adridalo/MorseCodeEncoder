import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './Components/App';
import './style/style.css'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next'

import global_en from './translations/en/global.json'
import global_fr from './translations/fr/global.json'
import global_it from './translations/it/global.json'
import global_jp from './translations/jp/global.json'
import global_es from './translations/es/global.json'
import global_ch from './translations/ch/global.json'

i18next.init({
  interpolation: { escapeValue: true },
  lng: 'en',
  resources: {
    en: {
      global: global_en
    },
    fr: {
      global: global_fr
    },
    it: {
      global: global_it
    },
    jp: {
      global: global_jp
    },
    es: {
      global: global_es
    },
    ch: {
      global: global_ch
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