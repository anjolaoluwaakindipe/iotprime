import { Row, Col } from 'antd';

import { SvgIcon } from '../../../common/SvgIcon';

import { Fade } from 'react-awesome-reveal';
import {
  LeftContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
} from './styles';

import Typography from '@material-ui/core/Typography';

const LeftContentBlock = ({ icon, title, content, section, t, id }) => {
  return (
    <LeftContentSection>
      <Fade direction='left'>
        <Row justify='space-between' align='middle' id={id}>
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width='100%' height='100%' />
          </Col>
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
              <ServiceWrapper>
                <Row justify='space-between'>
                  {typeof section === 'object' &&
                    section.map((item, id) => {
                      return (
                        <Col key={id} span={11}>
                          <SvgIcon src={item.icon} width='60px' height='60px' />
                          <MinTitle>
                            <Typography variant='h6'>{item.title}</Typography>
                          </MinTitle>
                          <MinPara>
                            <Typography variant='body1'>
                              {item.content}
                            </Typography>
                          </MinPara>
                        </Col>
                      );
                    })}
                </Row>
              </ServiceWrapper>
            </ContentWrapper>
          </Col>
        </Row>
      </Fade>
    </LeftContentSection>
  );
};

export default LeftContentBlock;
