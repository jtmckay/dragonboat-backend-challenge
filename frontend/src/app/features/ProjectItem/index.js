import React from "react";
import styled from "styled-components";

import { useStore, useDispatch } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { moveProject as moveProjectAction } from "../../store/projects/actions";

function allowDrop (event) {
  event.preventDefault();
}

const Component = ({ project }) => {
  const projectsById = useStore().getState().projects.byId;
  const dispatch = useDispatch();

  function onDragStart (event) {
    event.dataTransfer.setData('text', project.id)
  }

  function onDrop (event) {
    const childId = parseInt(event.dataTransfer.getData('text'), 10)
    if (childId !== project.id) {
      dispatch(moveProjectAction({ oldParentId: projectsById[childId].parentId, newParentId: project.id, childId }))
    }
  }

  return (
    <ProjectItem>
      <Details draggable onDragStart={onDragStart} onDragOver={allowDrop} onDrop={onDrop}>
        <Info>{project.title}</Info>
        <Info>Score: {project.score}</Info>
        <Info>Children Score: {project.childrenScore}</Info>
      </Details>
      <ChildProjects>
        {project.children.map(childId => <Component key={childId} project={projectsById[childId]} />)}
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
  display: flex;
  flex-direction: column;
  padding: 10px 30px !important;
  cursor: move;
`;

export default Component;