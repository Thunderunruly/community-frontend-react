import { Button } from "antd";
import { Outlet } from "react-router-dom";
import { useData } from "../contexts/DataContext";

const TopSiderLayout = () => {
  const {logout} = useData();
  return (<>
  WOWO
    <Button onClick={() => {
      logout()
    }}>Log out</Button>
    <Outlet/>
  </>);
};

export default TopSiderLayout;