import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Radio, Row, theme, Typography, Button, Flex, Select, InputNumber } from "antd";
import { useIntl } from "react-intl";
import Preview from './Preview';
import { useFrontInitial } from '../../../../contexts/FrontendContext';
import ReactScriptsForm from './ReactScriptsForm';

const { Title, Text } = Typography;

const options = ["react"];

function formatHTML(html) {
  const reg = /(>)\s*(<)(\/*)/g;
  const formattedHtml = html.replace(reg, '$1\r\n$2$3');
  let pad = 0;
  const lines = formattedHtml.split('\r\n');

  return lines.map(line => {
      let indent = 0;

      if (line.match(/<\w+([^>]*\/)>$/)) {
          indent = 0;
      } else if (line.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
      } else if (line.match(/^<\/\w/)) {
          if (pad !== 0) {
              pad -= 1;
          }
      } else if (line.match(/^<\w([^>]*[^])?>.*$/)) {
          indent = 1;
      } else {
          indent = 0;
      }

      let padding = '';
      for (let i = 0; i < pad; i++) {
          padding += '  ';
      }

      pad += indent;
      return padding + line;
  }).join('\r\n');
}

const keywordsOptions = [
  {value:"React.js"},
];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const ProjectSettingPage = () => {
  const { token } = theme.useToken();
  const { extraKeys, init, setInit } = useFrontInitial();
  const intl = useIntl();
  const [selectedFramework, setSelectedFramework] = useState("react");
  const [FPKG, setFPKG] = useState({});
  const [form] = Form.useForm();
  const version = Form.useWatch("version", form);
  const name = Form.useWatch("name", form);

  useEffect(() => {
    if(init && Object.keys(init?.packageJson).length !== 0 && init?.env) {
      form.setFieldsValue(({"framework": "react", "PORT": init?.env, ...init?.packageJson}));
    }
  }, [init, form]);

  

  useEffect(() => {
    const modifyHeader = (html) => {
      let title = "My React App";
      if (name) {
        title = name.split("-").map(item => capitalize(item)).join(" ");
      }
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const titleElement = doc.querySelector('title');
      if (titleElement) {
        titleElement.textContent = title;
      }
  
      const formattedHtml = new XMLSerializer().serializeToString(doc);
      return formatHTML(formattedHtml);
    };


    if (Object.keys(FPKG).length > 0) {
      setInit(preVal => ({...preVal, env:FPKG.PORT, 
        htmlIndex: modifyHeader(preVal?.htmlIndex),
        packageJson: Object.fromEntries(Object.entries(FPKG).filter(([key,_]) => !extraKeys.includes(key)))}));
    }
  }, [FPKG, setInit, extraKeys, name]);

  const handleVersionChange = (type) => {
    const versionParts = version.split('.').map(Number);
    switch (type) {
      case 'major':
        versionParts[0] += 1;
        versionParts[1] = 0;
        versionParts[2] = 0;
        break;
      case 'minor':
        versionParts[1] += 1;
        versionParts[2] = 0;
        break;
      case 'patch':
        versionParts[2] += 1;
        break;
      default:
        break;
    }
    form.setFieldValue("version", versionParts.join("."));
    setFPKG(form.getFieldsValue());
  };

  const handleValuesChange = (changedValues, allValues) => {
    if(Object.keys(changedValues).every(key => key === "framework")) {
      setSelectedFramework(changedValues.framework)
    }
    setFPKG(allValues);
  }

  const handleFinish = (values) => {
    const result = Object.fromEntries(
      Object.entries(values).filter(([key, _]) => !extraKeys.includes(key))
    );
    console.log(result)
  };

  const getFrameworkSpecificFormItems = () => {
    switch (selectedFramework) {
      case "react":
        return (
          <ReactScriptsForm/>
        );
      default:
        return <div style={{textAlign: "center"}}>
          <Text ellipsis>{intl.formatMessage({id: "init.still.develop"})}</Text>
        </div>;
    }
  };

  const handleInputChange = (e) => {
    let modifiedValue = e.target.value.toLowerCase();

    modifiedValue = modifiedValue.replace(/\s+/g, '-');

    modifiedValue = modifiedValue.replace(/[^a-z0-9-]/g, '');

    form.setFieldsValue({ name: modifiedValue });
};


  return (
    <Row
      gutter={[16, 32]}
      style={{
        width: "100%",
        background: token.colorBgContainer,
        borderRadius: 8,
        padding: 16,
      }}
    >
      <Col xs={{flex: "100%"}} md={{flex: "50%"}} lg={{flex: "30%"}}>
        {init && <Form
          name={"frontend"}
          initialValues={FPKG}
          onValuesChange={handleValuesChange}
          form={form}
          layout={"vertical"}
          style={{ width: "100%" }}
          onFinish={handleFinish}
        >
          <Form.Item name={"framework"} label={intl.formatMessage({ id: "init.framework" })}>
            <Radio.Group>
              {options.map(option => (
                <Radio value={option} key={option}>
                  {intl.formatMessage({ id: `init.${option}` })}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name={"name"} label={intl.formatMessage({ id: "init.project.name" })}>
            <Input placeholder={intl.formatMessage({ id: "init.project.placeholder" }, {label: intl.formatMessage({id: "init.project.name"})})} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item name={"private"} noStyle/>
          <Form.Item name={"PORT"} label={intl.formatMessage({ id: "init.project.port" })}>
            <InputNumber/>
          </Form.Item>
          <Form.Item name={"version"} label={intl.formatMessage({ id: "init.project.version" })}>
            <Input readOnly variant={"filled"}/>
          </Form.Item>
          <Form.Item>
            <Flex gap={16} wrap>
              <Button onClick={() => handleVersionChange('major')}>{intl.formatMessage({ id: "init.version.update" }, {version: intl.formatMessage({id: 'init.major'})})}</Button>
              <Button onClick={() => handleVersionChange('minor')}>{intl.formatMessage({ id: "init.version.update" }, {version: intl.formatMessage({id: 'init.minor'})})}</Button>
              <Button onClick={() => handleVersionChange('patch')}>{intl.formatMessage({ id: "init.version.update" }, {version: intl.formatMessage({id: 'init.patch'})})}</Button>
            </Flex>
          </Form.Item>
          <Form.Item name={"type"} noStyle/>
          <Form.Item name={"description"} label={intl.formatMessage({ id: "init.project.description" })}>
            <Input.TextArea autoSize={{minRows: 1, maxRows: 3}} placeholder={intl.formatMessage({ id: "init.project.placeholder" }, {label: intl.formatMessage({id: "init.project.description"})})} />
          </Form.Item>
          <Form.Item name={"author"} noStyle/>
          <Form.Item name={"license"} noStyle/>
          <Form.Item name={"keywords"} label={intl.formatMessage({ id: "init.project.keywords" })}>
            <Select tokenSeparators={[',']} options={keywordsOptions} mode={"tags"} placeholder={intl.formatMessage({ id: "init.project.placeholder" }, {label: intl.formatMessage({id: "init.project.keywords"})})} />
          </Form.Item>
          <Form.Item name={"dependencies"} noStyle/>
          <Form.Item name={"devDependencies"} noStyle/>
          {getFrameworkSpecificFormItems()}
        </Form>}
      </Col>
      <Col xs={{flex: "100%"}} md={{flex: "50%"}} lg={{flex: "70%"}} style={{ height: "auto", display: 'flex', flexDirection: 'column', paddingBottom: 24, overflow: 'hidden'}}>
        <Title level={4} style={{margin: 0}}>{intl.formatMessage({ id: "init.preview" })}</Title>
        <Preview/>
      </Col>
    </Row>
  );
};

export default ProjectSettingPage;
