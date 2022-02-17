import { createSelector } from "reselect";

export const selectProjects = createSelector(
  (state) => state.projects.byId,
  (state) => state.projects.ids,
  (byId, ids) => ids.map((id) => byId[id])
);

export const selectRootProjects = createSelector(
  (state) => state.projects.byId,
  (state) => state.projects.rootIds,
  (byId, rootIds) => rootIds.map((id) => byId[id])
);
