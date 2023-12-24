import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Comment = (props) => {
   const [text, setText] = useState('')
   const inputRef = useRef(null);

   useEffect(() => {
      setText('')
      inputRef.current.focus();
   }, [inputRef])

   const callbacks = {
      closeComment: () => props.closeComment(),
      onChange: useCallback((e) => setText(e.target.value), []),
      onSubmit: (e) => {
         e.preventDefault()
         const comment = {
            text: text,
            parent: props.parentModal
         }
         props.sendComment(comment)
      }
   };

   return (
      <>
         {props.activeModal === 'newResponse' && (
            <form onSubmit={callbacks.onSubmit}>
               <div className='Comment Comment--response'>
                  <label htmlFor="comment" className='Comment-head'>{props.t('comment.new-response')}</label>
                  <textarea id='comment' ref={inputRef} value={text} onChange={callbacks.onChange} className='Comment-textarea' />
                  <div className='Comment-btn'>
                     <button type="submit" className='Comment-btnSend'>{props.t('comment.send')}</button>
                     <button className='Comment-btnClose' onClick={callbacks.closeComment}>{props.t('comment.cancel')}</button>
                  </div>
               </div>
            </form>
         )}
         {props.activeModal === 'newComment' && (
            <form onSubmit={callbacks.onSubmit}>
               <div className='Comment'>
                  <label htmlFor="comment" className='Comment-head'>{props.t('comment.new-comment')}</label>
                  <textarea id='comment' ref={inputRef} value={text} onChange={callbacks.onChange} className='Comment-textarea' />
                  <div className='Comment-btn'>
                     <button type="submit" className='Comment-btnSend'>{props.t('comment.send')}</button>
                  </div>
               </div>
            </form>
         )}
      </>
   );
};

Comment.propTypes = {
   closeComment: PropTypes.func.isRequired,
   sendComment: PropTypes.func.isRequired,
   parentModal: PropTypes.object.isRequired,
   activeModal: PropTypes.string.isRequired,
};


export default memo(Comment);