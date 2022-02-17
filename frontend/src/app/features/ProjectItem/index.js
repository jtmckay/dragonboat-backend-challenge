import React from "react";
import styled from "styled-components";

import { useStore } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const Component = ({ project }) => {
  const projects = useStore().getState().projects.byId;

  return (
    <ProjectItem>
      <Details>
        <Info>{project.title}</Info>
        <Info>Score: {project.score}</Info>
        <Info>Children Score: {project.childrenScore}</Info>
      </Details>
      <ChildProjects>
        {project.children.map(childId => <Component key={childId} project={projects[childId]} />)}
      </ChildProjects>
    </ProjectItem>
  );
};

const Details = styled.div`
  display: flex;
  width: 100%;
`;

const ChildProjects = styled(List)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Info = styled.div`
  width: 200px;
`;

const ProjectItem = styled(ListItem)`
  padding: 20px 0 20px 13px;
  display: flex;
  flex-direction: column;
`;

export default Component;
