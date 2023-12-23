export default {
   load: (id) => {
      return async (dispatch, getState, services) => {
         if (!getState().articleComments.waiting) dispatch({ type: 'comment/start' });
         try {
            const res = await services.api.request({
               url:
                  `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
            });
            dispatch({ type: 'comment/load', payload: { comments: res.data.result.items, count: res.data.result.count } });
         } catch (e) {
            dispatch({ type: 'comment/error' });
         }
      }
   },
   create: (comment) => {
      return async (dispatch, getState, services) => {
         dispatch({ type: 'comment/start' });
         try {
            const res = await services.api.request({
               url: `/api/v1/comments?`,
               method: 'POST',
               body: JSON.stringify(comment)
            });
         } catch (e) {
            dispatch({ type: 'comment/error' });
         }
      }
   },
}