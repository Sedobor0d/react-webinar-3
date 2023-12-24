import { useEffect, useState } from 'react';
import useServices from './use-services';;

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [lang, setLang] = useState(i18n.getLang());

  const updateLang = (newLang) => {
    i18n.setLang(newLang);
  };

  const t = (text, number) => i18n.translate(lang, text, number);

  useEffect(() => {
    const listener = () => {
      setLang(i18n.getLang());
    };

    const unsubscribe = i18n.subscribe(listener);

    return () => {
      unsubscribe();
    };
  }, [i18n]);

  return { lang, setLang: updateLang, t };
}