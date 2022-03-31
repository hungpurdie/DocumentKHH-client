import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background: #d9edff;
`;

const FormAuthInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  width: 95%;
  background-color: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  margin: 0 auto;
  border-radius: 12px;
`;
const WrapperHero = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 600px;
  min-height: 100%;
  background-color: #fffdf2;
  img {
    display: block;
    width: 100%;
  }
`;
const FormAnt = styled(Form)`
  flex: 1 0 100%;
  /* max-width: 480px; */
  width: 100%;
  padding: 50px;
  max-height: 800px;
  height: 100%;
`;
const Title = styled(Typography.Title)`
  margin-bottom: 30px;
  color: #333333;
  font-family: "Josefin Sans", sans-serif;
  font-size: 42px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 0;
`;
const TitleDesc = styled(Typography.Paragraph)`
  margin-bottom: 30px;
`;
const ButtonAnt = styled(Button)`
  height: 42px;
  letter-spacing: 1px;
  border-radius: 6px;
  width: 100%;
`;
const RowAnt = styled(Row)`
  width: 100%;
`;
export default function FormAuth({ active, onFinish, onFailed }) {
  const onSubmit = (values) => {
    onFinish(values);
  };

  const onSubmitFailed = (errorInfo) => {
    onFailed(errorInfo);
  };
  return (
    <Wrapper forgot={active === "forgot" ? 1 : 0}>
      <FormAuthInner forgot={active === "forgot" ? 1 : 0}>
        <RowAnt>
          {active === "login" ? (
            <>
              <Col span={12}>
                <WrapperHero>
                  <img
                    src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
                    alt="Login"
                  />
                </WrapperHero>
              </Col>
              <Col span={12}>
                <FormAnt
                  name="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onSubmitFailed}
                >
                  <Title>Chào mừng quay trở lại </Title>
                  <TitleDesc>Đăng nhập vào hệ thống</TitleDesc>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                  >
                    <Input placeholder="Username" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                  >
                    <Input.Password placeholder="Password" size="large" />
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <ButtonAnt type="primary" htmlType="submit">
                      Login
                    </ButtonAnt>
                  </Form.Item>
                </FormAnt>
              </Col>
            </>
          ) : active === "register" ? (
            <>
              <Col span={12}>
                <WrapperHero>
                  <img
                    src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
                    alt="Login"
                  />
                </WrapperHero>
              </Col>
              <Col span={12}>
                <FormAnt
                  name="register-form"
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                  onFinishFailed={onSubmitFailed}
                >
                  <Title>Chào mừng quay trở lại </Title>
                  <TitleDesc>Đăng ký vào hệ thống</TitleDesc>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                  >
                    <Input placeholder="Username" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Please input your email!" }]}
                  >
                    <Input placeholder="Email" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                  >
                    <Input.Password placeholder="Password" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    rules={[{ required: true, message: "Please input your confirm password!" }]}
                  >
                    <Input.Password placeholder="Confirm password" size="large" />
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <ButtonAnt type="primary" htmlType="submit">
                      Register
                    </ButtonAnt>
                  </Form.Item>
                </FormAnt>
              </Col>
            </>
          ) : (
            <>
              <Col span={12}>
                <WrapperHero>
                  <img
                    src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
                    alt="Login"
                  />
                </WrapperHero>
              </Col>
              <Col span={12}>
                <FormAnt
                  forgot={active === "forgot" ? 1 : 0}
                  name="forgot-form"
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                  onFinishFailed={onSubmitFailed}
                >
                  <Title>Quên mật khẩu</Title>
                  <TitleDesc>Kiểm tra hộp thư email</TitleDesc>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Please input your email!" }]}
                  >
                    <Input placeholder="Enter your email" size="large" />
                  </Form.Item>

                  <Form.Item>
                    <ButtonAnt type="primary" htmlType="submit">
                      Reset password
                    </ButtonAnt>
                  </Form.Item>
                </FormAnt>
              </Col>
            </>
          )}
        </RowAnt>
      </FormAuthInner>
    </Wrapper>
  );
}
