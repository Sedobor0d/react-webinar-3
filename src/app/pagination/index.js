import React, { useCallback } from 'react';
import PaginationBtn from '../../components/pagination-btn/index.js';
import PaginationDots from '../../components/pagination-dots/index.js';
import useStore from '../../store/use-store.js';
import useSelector from '../../store/use-selector.js';
import PaginationLayout from '../../components/pagination-layout.js/index.js';

const Pagination = () => {

   const store = useStore();

   const select = useSelector(state => ({
      currentPage: state.catalog.currentPage,
      totalPages: state.catalog.totalPages,
      numArrPages: state.catalog.numArrPages
   }));

   const callbacks = {
      handlePageClick: useCallback(pageNumber => {
         store.actions.catalog.clickToPageNum(pageNumber);
      }, [store])
   }

   return (
      <PaginationLayout>
         {select.currentPage > 2 && (
            <>
               <PaginationBtn setCurrentPage={callbacks.handlePageClick}>
                  1
               </PaginationBtn>
               <PaginationDots />
            </>
         )}
         {select.numArrPages.map((pageNumber) => (
            <PaginationBtn
               key={pageNumber}
               setCurrentPage={callbacks.handlePageClick}
               isActive={pageNumber === select.currentPage}
            >
               {pageNumber}
            </PaginationBtn>
         ))}

         {select.currentPage < select.totalPages - 1 && (
            <>
               <PaginationDots />
               <PaginationBtn setCurrentPage={callbacks.handlePageClick} >
                  {select.totalPages}
               </PaginationBtn>
            </>
         )}
      </PaginationLayout>
   );
};

export default React.memo(Pagination);