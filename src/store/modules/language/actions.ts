export const actionsTypes = {
  SELECT_LANGUAGE: '@language/SELECT_LANGUAGE'
};

const baseSelector = (state: { language: any }) => state.language;

export const setLanguage = ({ language }: { language: string }) => {
  return { type: actionsTypes.SELECT_LANGUAGE, payload: { language } };
};

export const selectors = {
  selectLanguage: (state: { language: any }) => baseSelector(state)?.language
};
