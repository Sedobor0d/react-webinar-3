import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";

/**
 * Контейнер для смены языка
 */
function LocaleSelect() {

  const { t, lang, setLang } = useTranslate();

  const options = {
    lang: useMemo(() => ([
      { _id: 'ru', title: t('locale.ru') },
      { _id: 'en', title: t('locale.en') },
    ]), [lang])
  };

  return (
    <Select onChange={setLang} value={lang} options={options.lang} />
  );
}

export default memo(LocaleSelect);
