import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { fetchProjects as fetchProjectsAction } from "../../store/projects/actions";
import { selectRootProjects } from "../../store/projects/selectors";

const container = (Component) => {
  return (props) => {
    const dispatch = useDispatch();

    const fetchProjects = () => dispatch(fetchProjectsAction());

    const projects = useSelector((state) => selectRootProjects(state));

    useEffect(() => {
      fetchProjects();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Component {...props} projects={projects} />;
  };
};

export default container;
