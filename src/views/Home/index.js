import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import IntroContent from './content/IntroContent.json';
import MiddleBlockContent from './content/MiddleBlockContent.json';
import AboutContent from './content/AboutContent.json';
import MissionContent from './content/MissionContent.json';
import ProductContent from './content/ProductContent.json';
import MiddleBlock from './components/MiddleBlock';
import Container from './common/Container';
import ScrollToTop from './common/ScrollToTop';
import ContentBlock from './components/ContentBlock';
import Header from './components/Header';
import './styles';

const Home = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  if (isLogged) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <>
      <Header />
      <Container>
        <ScrollToTop />
        <ContentBlock
          type='right'
          title={IntroContent.title}
          content={IntroContent.text}
          button={IntroContent.button}
          icon='developer.svg'
          id='intro'
        />
        <MiddleBlock
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          button={MiddleBlockContent.button}
        />
        <ContentBlock
          type='left'
          title={AboutContent.title}
          content={AboutContent.text}
          section={AboutContent.section}
          icon='graphs.svg'
          id='about'
        />
        <ContentBlock
          type='right'
          title={MissionContent.title}
          content={MissionContent.text}
          icon='product-launch.svg'
          id='mission'
        />
        <ContentBlock
          type='left'
          title={ProductContent.title}
          content={ProductContent.text}
          icon='waving.svg'
          id='product'
        />
      </Container>
    </>
  );
};

export default Home;
