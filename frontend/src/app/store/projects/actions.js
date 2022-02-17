import axios from "axios";

import { FETCH_PROJECTS, FETCH_PROJECTS_FULFILLED, FETCH_PROJECT, FETCH_PROJECT_FULFILLED, MOVE_PROJECT, MOVE_PROJECT_FULFILLED } from "./types";

export const fetchProjects = () => {
  return (dispatch) =>
    dispatch({
      type: FETCH_PROJECTS,
      payload: axios.get("/projects").then((data) => {
        dispatch({
          type: FETCH_PROJECTS_FULFILLED,
          payload: data.data,
        });
        return data.data
      }),
    });
};

export const fetchProject = (id) => {
  return (dispatch) =>
    dispatch({
      type: FETCH_PROJECT,
      payload: axios.get(`/projects/${id}`).then((data) => {
        dispatch({
          type: FETCH_PROJECT_FULFILLED,
          payload: data.data,
        });
        return data.data
      }),
    });
};

export const moveProject = ({ oldParentId, newParentId, childId }) => {
  return (dispatch) =>
    dispatch({
      type: MOVE_PROJECT,
      payload: axios.post(`/projects/${childId}`, { oldParentId, newParentId }).then(() => dispatch({
        type: MOVE_PROJECT_FULFILLED,
        payload: { oldParentId, newParentId, childId }
      })),
    });
};
