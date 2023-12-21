export const initialState = {
   data: [],
   waiting: false,
   count: 0
}

function reducer(state = initialState, action) {
   switch (action.type) {
      case "comment/start":
         return { ...state, waiting: true };
      case "comment/load":
         return { ...state, data: action.payload.data, count: action.payload.count, waiting: false };
      case "comment/create":
         return { ...state, waiting: false };
      case "comment/error":
         return { ...state, waiting: false };
      default:
         return state;
   }
}

export default reducer;