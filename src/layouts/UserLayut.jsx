import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { get } from "../utils/request";
import FloatThemeBtn from "../components/theme/FloatThemeBtn";
import { Layout } from "antd";
import Header from "../components/header";

const { Footer, Content } = Layout;

const UserLayout = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const validateUsername = () => {
      get("/public/validate/" + username).then(response => {
        if(response.data) {
          navigate("/error/404");
        }
      })};
      validateUsername();
  }, [username, navigate]);
  return(<Layout style={{minHeight: "100vh"}}>
    <Header/>
    <Content>
      <Outlet/>
    </Content>
    <Footer style={{textAlign: "center"}}>Thunderunruly Community Created by Haosheng Yao</Footer>
    <FloatThemeBtn/>
  </Layout>);
};

export default UserLayout;