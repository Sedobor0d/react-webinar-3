import React, { useState } from 'react';
import './style.css';
import { memo } from 'react';
import formatDate from '../../utils/convert-date';

const CardComment = ({ children, item, ...props }) => {


   const [isOpen, setIsOpen] = useState(false)

   const callbacks = {
      openComment: () => {
         props.openComment()
         setIsOpen(true)
      },
   };

   return (
      <>
         <div className='CardComment'>
            <div className='CardComment-head'>
               <span className='CardComment-username'>{item.author.profile.name}</span>
               <div className='CardComment-date'>{formatDate(item.dateCreate)}</div>
            </div>
            <div className='CardComment-comment'>
               {item.text}
            </div>
            <span className='CardComment-btn' onClick={callbacks.openComment}>Ответить</span>
         </div>
         {children}
      </>
   );
};

export default memo(CardComment);