import { FETCH_PROJECT, FETCH_PROJECTS } from "./types";

const initialState = {
  byId: {},
  ids: [],
  rootIds: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS: {
      const data = action.payload || [];
      return {
        ...state,
        byId: data.reduce((accumulator, p) => ({ ...accumulator, [p.id]: p }), {}),
        ids: data.map((p) => p.id),
        rootIds: data.filter(i => !data.some(d => d.children.includes(i.id))).map((p) => p.id),
      };
    }
    case FETCH_PROJECT: {
      const data = action.payload;

      if (!data) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [data.id]: data,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
