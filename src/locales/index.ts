import React from 'react';
import { initReactI18next } from 'react-i18next';
import { useSelector } from 'react-redux';

import i18n from 'i18next';

import { selectors } from '../store/modules/language/actions';
import enUS from './en-US';

const Languages: React.FC = () => {
  const language = useSelector(selectors.selectLanguage);
  i18n.use(initReactI18next).init({
    resources: {
      'en-US': { translation: enUS }
    },
    lng: language || navigator.language,
    fallbackLng: 'en-US',

    interpolation: { escapeValue: false }
  });

  return null;
};

export default Languages;

export const languages = ['en-US'];

export const translate = (key: string, mandatory?: boolean) => {
  if (mandatory) {
    return i18n.t(key).concat(' *');
  }
  return i18n.t(key);
};
