import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../pagination';
import Navigation from "../../components/navigation";
import NavBar from '../../components/nav-bar';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, [store]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} to={`/product`} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <NavBar>
        <Navigation />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
      </NavBar>
      <List list={select.list} renderItem={renders.item} />
      <Pagination />
    </PageLayout>
  );
}

export default memo(Main);
