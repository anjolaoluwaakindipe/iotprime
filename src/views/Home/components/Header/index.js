import { useState } from 'react';
import { Row, Col, Drawer } from 'antd';
import Container from '../../common/Container';
import { ReactComponent as SvgIcon } from '../../../../images/justlogowithcompanyname.svg';
import { Button } from '../../common/Button';
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from './styles';
import { useHistory } from 'react-router-dom';

const Header = ({ t }) => {
  const history = useHistory();
  const [visible, setVisibility] = useState(false);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({
        behavior: 'smooth',
      });
      setVisibility(false);
    };
    return (
      <>
        <CustomNavLinkSmall
          style={{ width: '180px' }}
          onClick={() => history.push('/login')}
        >
          <Span>
            <Button>{'Login'}</Button>
          </Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall
          style={{ width: '180px' }}
          onClick={() => history.push('/register')}
        >
          <Span>
            <Button>{'Register'}</Button>
          </Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify='space-between' alignItems='center'>
          <LogoContainer to='/' aria-label='homepage'>
            <SvgIcon width='200px' height='64px' />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} visible={visible} onClose={onClose}>
          <Col style={{ marginBottom: '2.5rem' }}>
            <Label onClick={onClose}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default Header;
