import { Button, Flex, Layout, Menu, theme } from "antd";
import { useAppContext } from "../../contexts/AppContext";
import User from "./User";
import { FormattedMessage, useIntl } from "react-intl";
// import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Header: Head } = Layout;

const items = [
  {
    key: "home",
    label: <FormattedMessage id="home"/>,
    title: <FormattedMessage id="home"/>,
    icon: <HomeOutlined/>
  }
]

const Header = ({logo = false}) => {
  const {token} = theme.useToken();
  const { darkMode, isAuthenticated } = useAppContext();
  const intl = useIntl();
  // const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState(items);

  useEffect(() => {
    const handleResize = () => {
      setMenuItems([
        {
          key: "home",
          label: <FormattedMessage id="home"/>,
          title: <FormattedMessage id="home"/>,
          icon: <HomeOutlined/>
        }
      ]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(menuItems.length === 1) {
      setMenuItems(items)
    }
  }, [menuItems])
  return (
    <Head style={{display: "flex", zIndex: 1000, top: 0, justifyContent: "space-between", position: "sticky", alignItems: "center", background: token.colorBgElevated}}>
      <Flex gap={16} flex={1}>
        {logo && <div>Thunderunruly Community</div>}
        <Menu theme={darkMode?"dark":"light"} style={{flex: 1, background: token.colorBgElevated}} mode="horizontal" items={menuItems}/>
      </Flex>
      {isAuthenticated ? <User/>: <Button type={"primary"} onClick={() => {/**navigate("/login")**/}}>{intl.formatMessage({id: "login"})}</Button>}
    </Head>
  );
};

export default Header;