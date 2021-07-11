import { Row, Col } from 'antd';
import { SvgIcon } from '../../../common/SvgIcon';
import { Button } from '../../../common/Button';
import { Fade } from 'react-awesome-reveal';
import {
  RightBlockContainer,
  Content,
  ContentWrapper,
  ButtonWrapper,
} from './styles';

import Typography from '@material-ui/core/Typography';

const RightBlock = ({ title, content, button, icon, t, id }) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <RightBlockContainer>
      <Fade direction='right'>
        <Row justify='space-between' align='middle' id={id}>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              <Typography
                variant='h4'
                style={{ fontWeight: '800', color: '#fe7624' }}
              >
                {title}
              </Typography>
              <Content>
                <Typography variant='body1'>{content}</Typography>
              </Content>
              <ButtonWrapper>
                {typeof button === 'object' &&
                  button.map((item, id) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
                        fixedWidth={true}
                        onClick={() => scrollTo('about')}
                      >
                        {item.title}
                      </Button>
                    );
                  })}
              </ButtonWrapper>
            </ContentWrapper>
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width='100%' height='100%' />
          </Col>
        </Row>
      </Fade>
    </RightBlockContainer>
  );
};

export default RightBlock;
