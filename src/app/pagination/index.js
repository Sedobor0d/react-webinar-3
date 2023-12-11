import React, { useCallback } from 'react';
import PaginationBtn from '../../components/pagination-btn/index.js';
import PaginationDots from '../../components/pagination-dots/index.js';
import useStore from '../../store/use-store.js';
import useSelector from '../../store/use-selector.js';
import PaginationLayout from '../../components/pagination-layout.js/index.js';
import { getNumArrPages } from "../../utils.js";

const Pagination = () => {

   const store = useStore();

   const select = useSelector(state => ({
      currentPage: state.catalog.currentPage,
      totalPages: state.catalog.totalPages
   }));

   const numArrPages = getNumArrPages(select.currentPage, select.totalPages)

   const callbacks = {
      handlePageClick: useCallback(pageNumber => {
         store.actions.catalog.load(pageNumber);
      }, [store])
   }

   return (
      <PaginationLayout>
         {select.currentPage > 2 && (
            <>
               <PaginationBtn setCurrentPage={callbacks.handlePageClick} to={`/page`}>
                  {1}
               </PaginationBtn>
               <PaginationDots />
            </>
         )}
         {numArrPages.map((pageNumber) => (
            <PaginationBtn
               key={pageNumber}
               setCurrentPage={callbacks.handlePageClick}
               isActive={pageNumber === select.currentPage}
               to={`/page`}
            >
               {pageNumber}
            </PaginationBtn>
         ))}

         {select.currentPage < select.totalPages - 1 && (
            <>
               <PaginationDots />
               <PaginationBtn setCurrentPage={callbacks.handlePageClick} to={`/page`}>
                  {select.totalPages}
               </PaginationBtn>
            </>
         )}
      </PaginationLayout>
   );
};

export default React.memo(Pagination);