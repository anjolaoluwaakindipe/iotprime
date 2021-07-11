import { Row, Col } from 'antd';
import { Slide } from 'react-awesome-reveal';
import { Button } from '../../common/Button';
import { MiddleBlockSection, Content, ContentWrapper } from './styles';

import Typography from '@material-ui/core/Typography';

const MiddleBlock = ({ title, content, button, t }) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <MiddleBlockSection>
      <Slide direction='up'>
        <Row justify='center' align='middle'>
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Typography
                variant='h4'
                style={{ fontWeight: '800', color: '#fe7624' }}
              >
                {title}
              </Typography>
              <Content>
                <Typography variant='body1'>{content}</Typography>
              </Content>
              {button && (
                <Button name='submit' onClick={() => scrollTo('mission')}>
                  {button}
                </Button>
              )}
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </MiddleBlockSection>
  );
};

export default MiddleBlock;
