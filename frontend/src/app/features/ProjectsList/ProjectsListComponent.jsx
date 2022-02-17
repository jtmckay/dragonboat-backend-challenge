import React from "react";
import styled from "styled-components";

import { useDispatch, useStore } from "react-redux";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import { moveProject as moveProjectAction } from "../../store/projects/actions";
import ProjectItem from '../ProjectItem'

function allowDrop (event) {
  event.preventDefault();
}

const Component = ({ projects }) => {
  const projectsById = useStore().getState().projects.byId;
  const dispatch = useDispatch();

  function onDrop (event) {
    const childId = parseInt(event.dataTransfer.getData('text'), 10)
    dispatch(moveProjectAction({ oldParentId: projectsById[childId].parentId, childId }))
  }

  return (
    <>
      <Title variant="h4" onDragOver={allowDrop} onDrop={onDrop}>Projects List</Title>
      <List>
        {projects.map((p) => (
          <ProjectItem key={p.id} project={p} />
        ))}
      </List>
    </>
  );
};

const Title = styled(Typography)`
  padding: 20px 0 20px 13px;
`;

export default Component;
