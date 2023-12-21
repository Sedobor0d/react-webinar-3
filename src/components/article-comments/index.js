import React, { memo } from 'react';
import './style.css';
import CardComment from '../card-comment';
import formatDate from '../../utils/convert-date';
import SelectDisplayComment from '../select-display-comment';

const ArticleComments = ({ comments, countСomments, exists, activeModal, callbacks, toLogin }) => {
   return (
      <div className='ArticleComments'>
         <h2>Комментарии ({countСomments})</h2>
         {comments?.map((item) =>
            <CardComment
               key={item._id}
               item={item}
               openComment={callbacks.openResComment}
               activeModal={activeModal}
            >
               <SelectDisplayComment
                  exists={exists}
                  activeModal={activeModal}
                  closeComment={callbacks.closeResComment}
                  toLogin={toLogin}
               />
            </CardComment>
         )}
         <SelectDisplayComment
            exists={exists}
            activeModal={activeModal}
            closeComment={callbacks.closeResComment}
            toLogin={toLogin}
         />
      </div>
   );
};

export default memo(ArticleComments);