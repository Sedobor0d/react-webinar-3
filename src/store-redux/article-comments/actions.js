export default {
   load: (id) => {
      return async (dispatch, getState, services) => {
         dispatch({ type: 'comment/start' });
         try {
            const res = await services.api.request({
               url:
                  `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
            });
            dispatch({ type: 'comment/load', payload: { data: res.data.result.items, count: res.data.result.count } });
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
            console.log('res: ', res);
            dispatch({ type: 'comment/create' });
         } catch (e) {
            dispatch({ type: 'comment/error' });
         }
      }
   },
}