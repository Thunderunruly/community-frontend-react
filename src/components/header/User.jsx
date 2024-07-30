import { Badge, Flex } from "antd";
import Avatar from "../avatar";
import { BgColorsOutlined, LogoutOutlined, NotificationOutlined, SkinOutlined, UserOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useAppContext } from "../../contexts/AppContext";
import themes from "../../themes";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { get } from "../../utils/request";
import { useAuth } from "../../contexts/AuthContext";

const subItems = Object.entries(themes).map(([key, theme])=> {
  return {
    key: "theme" + key,
    label: <Flex justify={"flex-start"} gap={8} align="center">
      <BgColorsOutlined style={{color: theme.token.colorPrimary}}/>
      {key}
    </Flex>
  }
});

const items = (count, theme) => [
  {
    key: "profile",
    title: <FormattedMessage id="profile"/>,
    label: <FormattedMessage id="profile"/>,
    icon: <UserOutlined/>
  },
  {
    key: "messages",
    label: <Flex justify={"space-between"} align="center">
      <FormattedMessage id="message"/>
      <Badge count={count}/>
    </Flex>,
    title: <FormattedMessage id="message"/>,
    icon: <NotificationOutlined/>
  },
  {
    label: <FormattedMessage id="setting"/>,
    type: "group",
    children: [
      {
        key: "theme",
        label: <FormattedMessage id="theme.droplist" values={{theme}}/>,
        title: <FormattedMessage id="theme.droplist" values={{theme}}/>,
        icon: <SkinOutlined/>,
        children: subItems
      }
    ]
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    label: <FormattedMessage id="logout"/>,
    title: <FormattedMessage id="tlogout"/>,
    icon: <LogoutOutlined/>,
    danger: true,
  }
];

const User = ({style, selectedKeys=[]}) => {
  const { user, setUser, count, logout } = useAuth();
  const { theme, setTheme } = useAppContext();
  useEffect(() => {
    const fetchUser = () => {
      get("/private/user").then(response => {
        setUser(response?.data);
      })
    };
    fetchUser();
  }, [setUser]);
  const handleClick = ({key}) => {
    if (key.startsWith("theme")) {
      setTheme(key.replace("theme", ""));
    }
    if(key === "logout") {
      logout();
    }
  };
  return (<Flex justify="center" align="center" style={style}>
    <Avatar username={user?.username} arrow selectedKeys={["theme" + theme, ...selectedKeys]} size={48} count={count} avatarUrl={user?.profile.avatarUrl} items={items(count, theme)} onClick={handleClick}/>
  </Flex>);
};

User.propTypes = {
  style: PropTypes.shape({
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })
};

export default User;