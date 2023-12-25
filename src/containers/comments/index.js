import React, { memo, useCallback } from 'react';
import ArticleComments from '../../components/article-comments';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import { useDispatch, useSelector } from 'react-redux';
import useSelectorStore from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import shallowEqual from 'shallowequal';
import articleComments from '../../store-redux/article-comments/actions';
import commentModal from '../../store-redux/comment-modal/actions';
import listToTree from '../../utils/list-to-tree';
import useTranslate from '../../hooks/use-translate';

const Comments = () => {

   const store = useStore();
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const { t } = useTranslate();

   useInit(() => {
      dispatch(articleComments.load(params.id));
      dispatch(commentModal.open('newComment', { _id: params.id, _type: "article" }))
   }, [params.id]);

   const select = useSelector(state => ({
      activeModal: state.commentModal.name,
      parentModal: state.commentModal.parent,
      comments: listToTree(state.articleComments.comments)[0]?.children,
      countСomments: state.articleComments.count,
      commentsWaiting: state.articleComments.waiting,
   }), shallowEqual);

   const selectStore = useSelectorStore(state => ({
      exists: state.session.exists,
      userId: state.session.user._id
   }), [store])

   const callbacks = {
      openComment: useCallback((_id) => dispatch(commentModal.open('newResponse', { _id: _id, _type: "comment" })), [store]),
      closeComment: useCallback(() => dispatch(commentModal.open('newComment', { _id: params.id, _type: "article" })), [store]),
      toLogin: useCallback(() => navigate('/login', { state: { back: location.pathname } }), [location.pathname]),
      sendComment: useCallback((comment) => dispatch(articleComments.create(comment)), [store])
   };

   return (
      <Spinner active={select.commentsWaiting}>
         <ArticleComments
            exists={selectStore.exists}
            userId={selectStore.userId}
            select={select}
            callbacks={callbacks}
            t={t}
         />
      </Spinner>
   );
};

export default memo(Comments);