import { FETCH_PROJECT, FETCH_PROJECT_PENDING, FETCH_PROJECT_FULFILLED, FETCH_PROJECTS, FETCH_PROJECTS_PENDING, FETCH_PROJECTS_FULFILLED, MOVE_PROJECT, MOVE_PROJECT_PENDING, MOVE_PROJECT_FULFILLED } from "./types";

const initialState = {
  byId: {},
  ids: [],
  rootIds: [],
};

function parentChildAndScore (projects, childId, parentId) {
  if (parentId !== undefined) {
    projects[childId].parentId = parentId
  }
  const childrenScore = projects[childId].children.reduce((acc, current) => acc + parentChildAndScore(projects, current, childId), 0)
  projects[childId].childrenScore = childrenScore
  return projects[childId].score + childrenScore
}

function parentChildrenAndScore (projects, rootIds) {
  rootIds.forEach(projectId => {
    parentChildAndScore(projects, projectId)
  })
}

function gatherRootIds (projects) {
  return projects.filter(i => !projects.some(d => d.children.includes(i.id))).map((p) => p.id)
}

function isGrandParent (projectsById, parentId, childId) {
  return parentId === childId || (projectsById[parentId].parentId === undefined ? false : isGrandParent(projectsById, projectsById[parentId].parentId, childId))
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS: {
      return { ...state, FETCH_PROJECTS_PENDING }
    }
    case FETCH_PROJECTS_FULFILLED: {
      delete state[FETCH_PROJECTS_PENDING]
      const data = action.payload || [];
      const byId = data.reduce((accumulator, p) => ({ ...accumulator, [p.id]: p }), {})
      const rootIds = gatherRootIds(data)

      parentChildrenAndScore(byId, rootIds)

      return {
        ...state,
        byId,
        ids: data.map((p) => p.id),
        rootIds,
      };
    }
    case FETCH_PROJECT: {
      return { ...state, FETCH_PROJECT_PENDING }
    }
    case FETCH_PROJECT_FULFILLED: {
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
    case MOVE_PROJECT: {
      return { ...state, MOVE_PROJECT_PENDING }
    }
    case MOVE_PROJECT_FULFILLED: {
      const newState = {...state}
      const { newParentId, childId } = action.payload
      const childProject = newState.byId[childId]

      if (childProject.parentId !== undefined) {
        const parentProject = newState.byId[childProject.parentId]
        parentProject.children = parentProject.children.filter(i => {
          return i !== childId
        })
      }

      if (newParentId) {
        newState.byId[newParentId].children.push(childId)
        if (isGrandParent(newState.byId, newParentId, childId)) {
          const grandParent = newState.byId[newState.byId[newParentId].parentId]
          grandParent.children = grandParent.children.filter(i => i !== newParentId)
          delete newState.byId[newParentId].parentId
        }
      }

      const rootIds = gatherRootIds(Object.values(newState.byId))

      parentChildrenAndScore(newState.byId, rootIds)

      return {
        ...newState,
        rootIds
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
