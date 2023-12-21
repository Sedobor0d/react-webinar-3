// Начальное состояние
export const initialState = {
  data: {},
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/load-start":
      return { ...state, data: {}, waiting: true };
    case "article/load-success":
      return { ...state, data: action.payload.data, waiting: false };
    case "article/load-error":
      return { ...state, data: {}, waiting: false };
    default:
      return state;
  }
}

export default reducer;
