import React from 'react';
import Comment from '../comment';
import WarningLogin from '../warning-login';
import { memo } from 'react';
import PropTypes from 'prop-types';

const SelectDisplayComment = ({ exists, ...props }) => {

   return (
      <>
         {exists ? (
            <Comment
               activeModal={props.activeModal}
               closeComment={props.closeComment}
               parentModal={props.parentModal}
               sendComment={props.sendComment}
               t={props.t}
            />
         ) : (
            <WarningLogin
               activeModal={props.activeModal}
               closeComment={props.closeComment}
               toLogin={props.toLogin}
               t={props.t}
            />
         )}
      </>
   );
};

SelectDisplayComment.propTypes = {
   exists: PropTypes.bool.isRequired,
   props: PropTypes.object
};

export default memo(SelectDisplayComment);