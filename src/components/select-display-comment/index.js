import React, { useState } from 'react';
import Comment from '../comment';
import WarningLogin from '../warning-login';
import { memo } from 'react';

const SelectDisplayComment = ({ exists, activeModal, closeComment, toLogin }) => {

   const [isOpen, setIsOpen] = useState(false)

   const callbacks = {
      openComment: () => {
         setIsOpen(true)
      },
      closeComment: () => {
         setIsOpen(true)
      },
   };

   return (
      <>
         {exists ? (
            <Comment activeModal={activeModal} closeComment={closeComment} />
         ) : (
            <WarningLogin activeModal={activeModal} closeComment={closeComment} toLogin={toLogin} />
         )}
      </>
   );
};

export default memo(SelectDisplayComment);