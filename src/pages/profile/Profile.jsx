import { Flex, Typography, Avatar, theme } from "antd";
import { useIntl } from "react-intl";
import styled from "styled-components";

const { Title, Text } = Typography;

const Profile = ({username}) => {
  return (<>{username}</>);
};

const UserIcon = styled(Avatar)`
border: 4px solid ${props => props.$borderColor};
${props => props.$edit && `
    &:hover {
      border: 4px dashed ${props.$borderHover};
      &::after {
        content: "${props.$editText}";
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
        color: white;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      }
    }
  `}
`;

const Banner = styled(Flex)`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin-left: -28px;
  margin-right: -28px;
  margin-top: -14px;
  padding: 16px;
  padding-bottom: 64px;
`;

Profile.Header = ({current=false, user}) => {
  return (<ProfileHeader current={current} user={user}/>);
};

const ProfileHeader = ({current, user}) => {
  const { token } = theme.useToken();
  const intl = useIntl();
  return (<Banner gap={16} style={{backgroundImage: `url(https://picsum.photos/seed/picsum/2000/?blur)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} align={"end"}>
    <UserIcon size={{
      xs: 80,
      sm: 64,
      md: 48,
      lg: 48,
      xl: 64,
      xxl: 100,
    }} src={user?.profile.avatarUrl} $edit={current} $editText={intl.formatMessage({id: "edit.icon"})} $borderHover={token.colorPrimaryBorderHover} $borderColor={token.colorPrimaryBorder} style={{background: token.colorPrimaryTextHover,color: token.colorBgBase}} alt={user?.username}>
      {user?.username}
    </UserIcon>
    <Flex vertical>
      <Title level={3} style={{color: "white", margin: 0}}>{user?.username}</Title>
      <Text style={{color: "white"}}>description</Text>
    </Flex>
  </Banner>);
};

export default Profile;