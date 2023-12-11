import React, { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ItemInfo from '../../components/item-info';
import PageLayout from '../../components/page-layout';
import Loading from '../../components/loading';
import NavBar from '../../components/nav-bar';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Navigation from '../../components/navigation';

const Product = () => {

   const [isLoading, setIsLoading] = useState(false)

   const store = useStore();
   const _id = useParams().id

   const select = useSelector(state => {
      return ({
         amount: state.basket.amount,
         sum: state.basket.sum,

         product: state.product
      })
   })

   useEffect(() => {
      setIsLoading(true)
   }, [_id])

   useEffect(() => {
      store.actions.modals.close()
      store.actions.product.setProduct(_id)
         .then((data) => {
            const product = {
               _id: data._id,
               title: data.title,
               price: data.price
            }
            store.actions.catalog.setOneProduct(product);
            setIsLoading(false)
         })
         .catch((error) => {
            console.log('Product: ', error)
         })

   }, [store, _id]);

   const callbacks = {
      // Добавление в корзину
      addToBasket: useCallback((_id) => { store.actions.basket.addToBasket(_id) }, [store]),
      // Открытие модалки корзины
      openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store])
   }

   return (
      <>
         {!isLoading ? (
            <PageLayout head={
               <>
                  <Head title={select.product.title} />
                  <NavBar>
                     <Navigation />
                     <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                        sum={select.sum} />
                  </NavBar>
               </>
            }>
               <ItemInfo
                  _id={_id}
                  product={select.product}
                  onAdd={callbacks.addToBasket}
                  setIsLoading={setIsLoading}
               />
            </PageLayout>
         ) : (
            <PageLayout head={
               <>
                  <Head title={select.product.title} />
                  <NavBar>
                     <Navigation />
                     <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                        sum={select.sum} />
                  </NavBar>
               </>
            }>
               <Loading />
            </PageLayout>
         )}
      </>
   );
};

export default memo(Product);