export const initialState = {
   comments: [],
   waiting: false,
   count: 0
}

function reducer(state = initialState, action) {
   switch (action.type) {
      case "comment/start":
         return { ...state, waiting: true };
      case "comment/load":
         return { ...state, comments: action.payload.comments, count: action.payload.count, waiting: false };
      case "comment/create":
         return { ...state, comments: [...state.comments, action.payload.comment], count: state.count + 1, waiting: false };
      case "comment/error":
         return { ...state, waiting: false };
      default:
         return state;
   }
}

export default reducer;