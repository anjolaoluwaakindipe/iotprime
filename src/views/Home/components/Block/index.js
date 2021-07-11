import React from 'react';
import { Container, TextWrapper, Content } from './styles';

const Block = ({ title, content, t }) => {
  return (
    <Container>
      <h6>{title}</h6>
      <TextWrapper>
        <Content>{content}</Content>
      </TextWrapper>
    </Container>
  );
};

export default Block;
