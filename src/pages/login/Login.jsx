import { ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import { get } from "../../utils/request";
import { useAuth } from "../../contexts/AuthContext";
import { useAppContext } from "../../contexts/AppContext";

const { Link } = Typography;

const Login = ({intl}) => {
  const [isCaptchaVisible, setIsCaptchaVisible] = useState(false);
  const [captchaImg, setCaptchaImg] = useState("");
  const { login } = useAuth();
  const { messageApi } = useAppContext();
  const [form] = Form.useForm();
  const onFinish = async (principals) => {
    if(isCaptchaVisible) {
      login(principals).catch((error) => {
        if (error?.status === 422) {
          form.setFields([
            {
              name: "captcha",
              errors: [intl.formatMessage({ id: "message.captcha.missmatch" })],
            },
          ]);
        } else {
          messageApi.error(error?.message);
        }
      });
    }
    else {
      await get("/public/captcha/img").then((response) => {
        setCaptchaImg(response.data);
        setIsCaptchaVisible(true);
      }).catch((error)  => {
        console.log(error?.status === 422)
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    messageApi.error(intl.formatMessage({id: "message.incomplete"}))
  };
  return (<Form
      form={form}
      scrollToFirstError
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        minWidth: 400
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      >
    <Form.Item
      label={intl.formatMessage({id:"form.username"})}
      name={"username"}
      rules={[
        {
          required: true,
          message: intl.formatMessage({id:"message.username"}),
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      extra={<Link underline>{intl.formatMessage({id:"form.forget"})}</Link>}
      label={intl.formatMessage({id:"form.password"})}
      name={"password"}
      rules={[
        {
          required: true,
          message: intl.formatMessage({id:"message.password"}),
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Form.Item
        name={"rememberMe"}
        valuePropName={"checked"}
        noStyle
      >
        <Checkbox>{intl.formatMessage({id:"form.remember"})}</Checkbox>
      </Form.Item>
    </Form.Item>
    {isCaptchaVisible && <Captcha intl={intl} captchaImg={captchaImg}/>}
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
    <Button style={{width: "60%"}} type="primary" htmlType="submit">
      {intl.formatMessage({id:"login"})}
    </Button>
    </Form.Item>
  </Form>);
};

const Captcha = ({captchaImg, intl}) => {
  const [captcha, setCaptcha] = useState(captchaImg);
  return (
    <Form.Item
      required
      label={intl.formatMessage({id:"form.captcha"})}
      >
      <Row gutter={8}>
        <Col span={12}>
          <img src={captcha} style={{ width: 120, height: 30}} alt={intl.formatMessage({id: "form.captcha"})}/>
        </Col>
        <Col  span={12}>
          <Button type={"dashed"} icon={<ReloadOutlined/>} onClick={async () => {
            const result = await get("/public/captcha/img");
            setCaptcha(result.data);
          }}>{intl.formatMessage({id:"form.reload"})}</Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item 
            name={"captcha"} 
            noStyle 
            rules={[
            {
              required: true,
              message: intl.formatMessage({id: "message.captcha"}),
            },
          ]}>
            <Input autoComplete="off" spellCheck="false" autoCapitalize="off"/>
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
};

export default Login;