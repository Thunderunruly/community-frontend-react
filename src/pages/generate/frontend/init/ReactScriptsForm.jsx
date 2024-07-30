import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

const ReactScriptsForm = ({name="scripts", label="Project Scripts", addText="Add"}) => {
  const parent = Form.useFormInstance();
  const values = Form.useWatch(name, {form: parent, preserve: true});
  const [inputValue, setInputValue] = useState(null);
  const [items, setItems] = useState({});
  useEffect(()=> {
    if(values) {
      const length1 = Object.keys(values).length;
      const length2 = Object.keys(items).length;
      if(length1 > length2) {
        setItems(values);
      } else if (length1 < length2) {
        parent.setFieldValue({[name]: items});
      }
    }
  }, [values, items, name, parent]);

  const handleAdd = () => {
    setItems(preItems => ({...preItems, [inputValue]: ""}));
    setInputValue(null);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (<Form.Item label={label}>
    <Row gutter={[16, 16]}>
      {items && Object.entries(items).map(([key, _], index) => (<Col key={index} span={24} style={{display: "flex", alignItems: "center", gap: 16, paddingRight: 64}}>
        <Title level={5} style={{margin: 0, width: 100, textAlign: "right"}}>{key}<span style={{marginLeft: 16}}>:</span></Title>
        <Form.Item name={[name, key]} noStyle>
          <Input.TextArea autoSize={{minRows: 1, maxRows: 5}}/>
        </Form.Item>
      </Col>))}
      <Col span={24} style={{display: "flex", gap: 16}}>
        <Input value={inputValue} onChange={handleInputChange}/>
        <Button type={"dashed"} icon={<PlusOutlined/>} onClick={handleAdd}>{addText}</Button>
      </Col>
    </Row>
  </Form.Item>);
};

export default ReactScriptsForm;