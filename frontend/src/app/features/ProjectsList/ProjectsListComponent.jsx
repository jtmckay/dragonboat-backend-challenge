import React from "react";
import styled from "styled-components";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import ProjectItem from '../ProjectItem'

const Component = ({ projects }) => {
  return (
    <>
      <Title variant="h4">Projects List</Title>
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
