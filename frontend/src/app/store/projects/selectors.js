import { createSelector } from "reselect";

export const selectProjects = createSelector(
  (state) => state.projects.byId,
  (state) => state.projects.ids,
  (byId, ids) => ids.map((id) => byId[id])
);

export const selectRootProjects = createSelector(
  (state) => state.projects.byId,
  (state) => state.projects.rootIds,
  (byId, rootIds) => rootIds.map((id) => ({...byId[id], childrenScore: scoreChild(byId, id) - byId[id].score}))
);

function scoreChild (projects, childId) {
  const childrenScore = projects[childId].children.reduce((acc, current) => acc + scoreChild(projects, current), 0)
  projects[childId].childrenScore = childrenScore
  return projects[childId].score + childrenScore
}
