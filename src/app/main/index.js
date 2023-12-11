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
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading';

function Main() {
  const store = useStore();
  const _id = useParams().id

  const select = useSelector(state => ({
    isLoading: state.catalog.isLoading,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load(parseInt(_id || 1));;
  }, [store]);

  console.log('isLoading: ', select.isLoading);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} to={`/product/${item._id}`} />
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
      {!select.isLoading ? (
        <>
          <List list={select.list} renderItem={renders.item} />
          <Pagination />
        </>
      ) : (
        <Loading />
      )}
    </PageLayout>
  );
}

export default memo(Main);
