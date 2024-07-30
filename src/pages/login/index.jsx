import { useIntl } from "react-intl";
import { Button, Divider, Flex, List, Popover, Segmented, theme } from "antd";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { GithubOutlined, GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import FloatThemeBtn from "../../components/theme/FloatThemeBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const LoginPage = () => {
  const [status, setStatus] = useState("login");
  const { setAuthenticate } = useAppContext();
  const intl = useIntl();
  const { token } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.has('authenticated');
  if (state) {
    setAuthenticate(true);
    localStorage.setItem('isAuthenticated', true);
    const redirectTo = location.state?.from?.pathname || "/";
    navigate(redirectTo);
  }
  const options = [
    {
      value: "login",
      label: intl.formatMessage({id: "login"})
    },
    {
      value: "register",
      label: intl.formatMessage({id: "register"})
    }
  ];
  return (
    <Flex align="center" justify="center" gap={32} style={{height: "100vh", background:token.colorBgContainer}}>
      <Flex vertical align="center" gap={16} style={{padding:"16px 64px", paddingBottom: 0, borderRadius: 16}}>
        <Segmented options={options} size="large" onChange={(value) => setStatus(value)}/>
        {status === "login" && <Login intl={intl}/>}
        {status === "register" && <Register intl={intl}/>}
        <ProviderOptions intl={intl}/>
      </Flex>
      <FloatThemeBtn/>
    </Flex>
  );
};

const providers = [
  "google",
  "github"
];

const ProviderOptions = ({intl}) => {
  const redirectUrl = (provider) => {window.location.href = `http://localhost:8090/oauth2/authorization/${provider}`};
  return (<Flex vertical align="center" style={{width: '100%'}}>
    <Divider>{intl.formatMessage({id: "or"})}</Divider>
    <List
      grid={{
        gutter: 16,
      }}
      dataSource={providers}
      renderItem={(item) => {
        const providerMessage = intl.formatMessage({ id: item });
        const popoverContent = intl.formatMessage(
          { id: 'oauth2-btn-with-provider' },
          { provider: providerMessage }
        );
        return <List.Item>
          <Popover content={popoverContent} placement="top">
            <Button shape="circle" type={"dashed"} icon={<ProviderIcon provider={item}/>} onClick={() => redirectUrl(item)}/>
          </Popover>
        </List.Item>
      }}
    />
  </Flex>);
};

const ProviderIcon = ({provider, ...props}) => {
  switch (provider) {
    case "google":
      return <GoogleOutlined {...props}/>
    case "github":
      return <GithubOutlined {...props}/>
    default:
      return <LoadingOutlined {...props}/>
  }
}

export default LoginPage;
