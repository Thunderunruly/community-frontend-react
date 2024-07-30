import { Affix, Button, Flex, Layout, theme, Tooltip, Typography } from "antd";
import ProjectSettingPage from "./ProjectSettingPage";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { HistoryOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const SiderTab = styled.div`
  // border-top: 1px solid ${props => props.$token.colorPrimary}; 
  // border-bottom: 1px solid ${props => props.$token.colorPrimary}; 
  // border-left: 1px solid ${props => props.$token.colorPrimary}; 
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: ${props => props.$token.colorPrimaryBg};
  &:hover {
  background: ${props => props.$token.colorPrimaryBgHover};
  }
`;

const InitialPage = () => {
  const { token } = theme.useToken();
  const intl = useIntl();
  return (<Layout style={{minHeight: "100vh"}}>
    <Affix>
      <Header style={{background: token.colorBgElevated, display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 93}}>
        <Title level={2}>{intl.formatMessage({id: "init.title"})}</Title>
      </Header>
    </Affix>
    <Content style={{display: "grid", placeItems: "center"}}>
      <Flex justify="center" style={{width: "90%", height: "100%", marginTop: 64, overflow: "hidden"}} gap={8}>
        <Flex vertical gap={8} style={{marginTop: 16}}>
          <SiderTab $token={token}>
            <Tooltip title={intl.formatMessage({id: "init.histories"})} placement="left">
              <Button type="link" icon={<HistoryOutlined/>}/>
            </Tooltip>
          </SiderTab>
        </Flex>
        <ProjectSettingPage/>
      </Flex>
    </Content>
    <Footer style={{textAlign: 'center'}}>
      {intl.formatMessage({id: "init.footer"})}
    </Footer>
  </Layout>);
};

export default InitialPage;