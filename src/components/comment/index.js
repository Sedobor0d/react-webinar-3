import React, { memo } from 'react';
import './style.css';

const Comment = (props) => {
   const callbacks = {
      closeComment: () => props.closeComment(),
   };

   return (
      <div className='Comment'>
         {props.activeModal === 'newComment' && <span className='Comment-head'>Новый комментарий</span>}
         {props.activeModal === 'newResponse' && <span className='Comment-head'>Новый ответ</span>}

         <textarea type="text" className='Comment-textarea' />

         <div className='Comment-btn'>
            <button className='Comment-btnSend'>Отправить</button>
            {props.activeModal === 'newResponse' &&
               <button className='Comment-btnClose' onClick={callbacks.closeComment}>Отмена</button>
            }
         </div>
      </div>
   );
};

export default memo(Comment);