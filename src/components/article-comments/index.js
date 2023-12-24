import React, { memo } from 'react';
import './style.css';
import CardComment from '../card-comment';
import SelectDisplayComment from '../select-display-comment';
import PropTypes from 'prop-types';

const ArticleComments = ({ exists, userId, select, callbacks, t }) => {
   return (
      <div className='ArticleComments'>
         <h2>{t('comment.title')} ({select.countСomments})</h2>

         {select.comments?.map((item) => {
            return <CardComment
               key={item._id}
               item={item}
               userId={userId}
               openComment={callbacks.openComment}
               parentModal={select.parentModal}
               t={t}
            >
               <SelectDisplayComment
                  exists={exists}
                  activeModal={select.activeModal}
                  closeComment={callbacks.closeComment}
                  toLogin={callbacks.toLogin}
                  parentModal={select.parentModal}
                  sendComment={callbacks.sendComment}
                  t={t}
               />
            </CardComment>
         }
         )}
         {select.parentModal._type === "article" &&
            <SelectDisplayComment
               exists={exists}
               activeModal={select.activeModal}
               closeComment={callbacks.closeComment}
               toLogin={callbacks.toLogin}
               parentModal={select.parentModal}
               sendComment={callbacks.sendComment}
               t={t}
            />
         }
      </div>
   );
};

ArticleComments.propTypes = {
   exists: PropTypes.bool.isRequired,
   select: PropTypes.object.isRequired,
   callbacks: PropTypes.object.isRequired,
};


export default memo(ArticleComments);