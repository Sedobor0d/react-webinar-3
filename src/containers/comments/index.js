import React, { useCallback } from 'react';
import ArticleComments from '../../components/article-comments';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import { useDispatch, useSelector } from 'react-redux';
import useSelectorStore from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import shallowEqual from 'shallowequal';
import commentActions from '../../store-redux/article-comments/actions';
import commentModal from '../../store-redux/comment-modal/actions';

const Comments = () => {

   const store = useStore();
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   useInit(() => {
      dispatch(commentActions.load(params.id));
      // const com = {
      //    "text": "tot",
      //    "parent": {
      //       _id: "65817bee5c295a2ff2fcd19a",
      //       _type: "article"
      //    }
      // }
      // dispatch(commentActions.create(com, params.id));
   }, [params.id]);

   const select = useSelector(state => ({
      activeModal: state.commentModal.name,
      comments: state.articleComments.data,
      countСomments: state.articleComments.count,
      commentsWaiting: state.articleComments.waiting,
   }), shallowEqual);

   const selectStore = useSelectorStore(state => ({
      exists: state.session.exists,
   }), [store])

   const callbacks = {
      openResComment: useCallback(() => dispatch(commentModal.open('newResponse')), [store]),
      closeResComment: useCallback(() => dispatch(commentModal.close()), [store]),
      // Переход к авторизации
      toLogin: useCallback(() => {
         navigate('/login', { state: { back: location.pathname } });
      }, [location.pathname]),
   };

   return (
      <Spinner active={select.commentsWaiting}>
         <ArticleComments
            comments={select.comments}
            countСomments={select.countСomments}
            exists={selectStore.exists}
            activeModal={select.activeModal}
            callbacks={callbacks}
            toLogin={callbacks.toLogin}
         />
      </Spinner>
   );
};

export default Comments;