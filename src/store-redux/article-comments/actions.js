export default {
   load: (id) => {
      return async (dispatch, getState, services) => {
         dispatch({ type: 'comment/start' });
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
         if (comment.text.trim() === '') return

         dispatch({ type: 'comment/start' });
         try {
            comment = {
               ...comment,
               text: comment.text.trim(),
            }
            const res = await services.api.request({
               url: `api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
               method: 'POST',
               body: JSON.stringify(comment)
            });
            dispatch({ type: 'comment/create', payload: { comment: res.data.result } });
         } catch (e) {
            dispatch({ type: 'comment/error' });
         }
      }
   },
}