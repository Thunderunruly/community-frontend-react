import { Flex, Menu, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Prism from 'prismjs';
import { useFrontInitial } from "../../../../contexts/FrontendContext";

const MenuDiv = styled.div`
  margin-top: 16px;
`;

const Preview = () => {
  const { init, items } = useFrontInitial();
  const [type, setType] = useState();
  const [selectedKey, setSelectKey] = useState("package");
  const values = useMemo(() => {
    switch (selectedKey) {
      case "package":
        setType("javascript");
        return JSON.stringify(init?.packageJson, null, 2);
  
      case "env":
        setType("javascript");
        return `VITE_PORT=${init?.env}`;
  
      case "gitignore":
        setType("markdown");
        return init?.gitignore;
  
      case "license":
        setType("markdown");
        return init?.license;
  
      case "readme":
        setType("markdown");
        return init?.readme;
  
      case "config":
        setType("javascript");
        return init?.viteConfig;
  
      case "eslint":
        setType("javascript");
        return init?.eslintConfig;
  
      case "index":
        setType("html");
        return init?.htmlIndex;
  
      default:
        return "";
    }
  }, [selectedKey, init]);
  
  const handleClick = ({key}) => {
   setSelectKey(key);
  };
  return (<Flex style={{flex: 1}}>
    <MenuDiv>
      <Menu items={items} onClick={handleClick} selectedKeys={[selectedKey]} mode={"inline"}/>
    </MenuDiv>
    <TextArea values={values} type={type}/>
  </Flex>);
};

const TextArea = ({values, type}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [values, type]);
  return (<Typography style={{width: "100%", flex: 1, display: "flex", overflow: "auto"}}>
    <pre style={{height: "auto", flex: 1}}>
      <code className={`language-${type}`}>
        {values}
      </code>
    </pre>
  </Typography>);
};

export default Preview;