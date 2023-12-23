import React from 'react';
import './style.css';
import { memo } from 'react';
import formatDate from '../../utils/convert-date';
import PropTypes from 'prop-types';

const CardComment = ({ children, item, openComment, parentModal }) => {

   const callbacks = {
      openComment: () => openComment(item._id)
   };

   const isOpen = parentModal._type === 'comment' && parentModal._id === item._id

   return (
      <>
         <div className={`CardComment`}>
            <div className='CardComment-head'>
               <span className='CardComment-username'>{item.author.profile.name}</span>
               <div className='CardComment-date'>{formatDate(item.dateCreate)}</div>
            </div>
            <div className='CardComment-comment'>
               {item.text}
            </div>
            <span className='CardComment-btn' onClick={callbacks.openComment}>Ответить</span>

            <div className='CardComment--child'>
               {item.children.map((item) => (
                  <CardComment
                     key={item._id}
                     item={item}
                     openComment={openComment}
                     parentModal={parentModal}
                  >
                     {children}
                  </CardComment>)
               )}
            </div>
         </div>

         {isOpen && children}
      </>
   );
};

CardComment.propTypes = {
   children: PropTypes.node,
   item: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      author: PropTypes.object,
      dateCreate: PropTypes.string,
      text: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape({
         _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })).isRequired,
   }).isRequired,
   parentModal: PropTypes.object.isRequired,
   openComment: PropTypes.func.isRequired
};

export default memo(CardComment);