import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Col, Flex, Row, theme } from "antd";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import { get } from "../../utils/request";



const ProfilePage = () => {
  const { username } = useParams();
  const { user:authUser } = useAuth();
  const {token} = theme.useToken();
  const [isCurrent, setCurrent] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (username === authUser?.username) {
      setCurrent(true);
      setUser(authUser);
    } else {
      setCurrent(false);
      get("/public/user", {username}).then(response => {
        setUser(response?.data);
      })
    }
  }, [authUser, username]);
  return (<Flex justify="center" style={{minHeight: "calc(100vh - 160px)", marginTop: 16}}>
    <Row gutter={[24, 16]} justify={"start"} style={{background: token.colorBgContainer, width: "80vw", borderRadius: 16, padding: 16}}>
      <Col span={24}>
        <Profile.Header current={isCurrent} user={user}/>
      </Col>
    </Row>
  </Flex>);
};

export default ProfilePage;