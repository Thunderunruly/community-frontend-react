import { Outlet } from "react-router-dom";
import FloatThemeBtn from "../components/theme/FloatThemeBtn";
import { Layout } from "antd";

const BasicLayout = () => {
  return (<>
  <Layout style={{minHeight: "100vh"}}>
    <Outlet/>
  </Layout>
  <FloatThemeBtn/>
  </>);
};

export default BasicLayout;