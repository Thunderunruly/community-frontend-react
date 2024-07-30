import { FloatButton } from "antd";
import { useAppContext } from "../../contexts/AppContext";
import { MoonOutlined, SettingOutlined, SunOutlined, TranslationOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";

const FloatThemeBtn = () => {
  const { darkMode, setDarkMode, toggleLocale } = useAppContext();
  const intl = useIntl();
  return (<FloatButton.Group trigger={"click"} icon={<SettingOutlined/>} tooltip={intl.formatMessage({id: "setting"})}>
    <FloatButton type={darkMode?"primary":"default"} tooltip={intl.formatMessage({id: "darkMode"},{
      state:darkMode?intl.formatMessage({id: "on"}):intl.formatMessage({id: "off"})
    })} icon={darkMode?<SunOutlined/>:<MoonOutlined/>} onClick={() => setDarkMode(mode => !mode)}/>
    <FloatButton icon={<TranslationOutlined/>} onClick={() => toggleLocale(1)} tooltip={intl.formatMessage({id: "language"})}/>
    <FloatButton.BackTop/>
  </FloatButton.Group>);
};


export default FloatThemeBtn;