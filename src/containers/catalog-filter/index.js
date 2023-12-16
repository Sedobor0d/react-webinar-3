import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();
  const { t, lang } = useTranslate();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    listCategory: state.catalog.listCategory,
    category: state.catalog.params.category,

  }));

  const callbacks = {
    onCategory: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      { _id: 'order', title: t('filter.order') },
      { _id: 'title.ru', title: t('filter.by-name') },
      { _id: '-price', title: t('filter.begin-expensive') },
      { _id: 'edition', title: t('filter.old') },
    ]), [lang])
  };

  return (
    <SideLayout padding='medium'>
      <Select options={select.listCategory} value={select.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={t('filter.search')}
        delay={1000} />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
