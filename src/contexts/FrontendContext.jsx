import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import FloatThemeBtn from "../components/theme/FloatThemeBtn";
import { Form } from "antd";

const FrontendContext = createContext();

const extraKeys = ["framework", "PORT"];

export const useFrontInitial = () => useContext(FrontendContext); 

const items = [
  {
    key: "public",
    label: "public",
    children: [
      {
        key: "vite",
        label: "vite.svg"
      }
    ]
  },
  {
    key: "src",
    label: "src",
    children: [
      {
        key: "assets",
        label: "assets",
        children: [
          {
            key: "react",
            label: "react.svg"
          }
        ]
      },
      {
        key: "app",
        label: "App.jsx"
      },
      {
        key: "main",
        label: "main.jsx"
      }
    ]
  },
  {
    key: "env",
    label: ".env"
  },
  {
    key: "eslint",
    label: ".eslintrc.cjs"
  },
  {
    key: "gitignore",
    label: ".gitignore"
  },
  {
    key: "index",
    label: "index.html"
  },
  {
    key: "license",
    label: "LICENSE"
  },
  {
    key: "package",
    label: "package.json"
  },
  {
    key: "readme",
    label: "README.md"
  },
  {
    key: "config",
    label: "vite.config.js"
  },
];

const FrontendProvider = () => {
  const [histories, setHistories] = useState(localStorage.getItem("histories"));
  const [init, setInit] = useState();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const responses = await Promise.all([
          fetch("/template/package.json"),
          fetch("/template/env"),
          fetch("/template/gitignore.text"),
          fetch("/template/LICENSE"),
          fetch("/template/README.md"),
          fetch("/template/vite.config.js"),
          fetch("/template/eslintrc.cjs"),
          fetch("/template/index.html")
        ]);
  
        const data = await Promise.all(responses.map(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.text();
        }));
  
        setInit({
          packageJson: JSON.parse(data[0]),
          env: data[1].replace("VITE_PORT=", ""),
          gitignore: data[2],
          license: data[3],
          readme: data[4],
          viteConfig: data[5],
          eslintConfig: data[6],
          htmlIndex: data[7]
        });
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };
  
    fetchFiles();
  }, []);

  return (<FrontendContext.Provider value={{
    histories, setHistories,
    init, setInit,
    items, extraKeys
  }}>
    <Form.Provider onFormFinish={(name, {values}) => {
      if (name === "frontend") {
        console.log(values)
      }
    }}>
      <Outlet/>
      <FloatThemeBtn/>
    </Form.Provider>
  </FrontendContext.Provider>);
};

export default FrontendProvider;