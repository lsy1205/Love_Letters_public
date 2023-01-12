import React, { useEffect } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import styled from "styled-components";
import { useGame } from "../hooks/useGame";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../graphql";

const { Text } = Typography;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: url("https://i.imgur.com/urnv0Dq.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`;
const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 80vh;
  border: 1px solid;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;

  & h1 {
    font-size: 3vw;
    font-family: "Dancing Script", fantasy, sans-serif;
  }
  & h2 {
    font-size: 1.8vw;
    font-family: "Kalam", Helvetica, sans-serif;
  }
`;
const FootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const Signup = () => {
  const navigate = useNavigate();
  const [signUp] = useMutation(SIGNUP_MUTATION);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    if (values.password === values.confirm) {
      const { data } = await signUp({
        variables: { name: values.username, password: values.password },
      });
      // console.log(data);
      if (data.signUp === "name already in use") {
        messageApi.open({
          type: "error",
          content: "Name Taken",
        });
        // console.log("Name Taken");
      } else if (data.signUp === "account created") {
        messageApi.open({
          type: "success",
          content: "Account Created, Please Log In",
        });
        // console.log("Success:", values);
        // navigate("/login");
      }
    } else {
      // console.log("Not confirmed:", values);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  return (
    <Wrapper>
      {contextHolder}
      <SignupWrapper>
        <Title>
          <h1>Love Letters</h1>
          <h2>Love Makes Two Hearts One</h2>
        </Title>
        <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirm"
            labelCol={{ offset: 0 }}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <FootWrapper>
            <Text type="secondary">Already Have an Account ?</Text>
            <span>
              <Link to="/login">Log in</Link>
              <Text type="secondary"> to Show Your Love</Text>
            </span>
          </FootWrapper>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </SignupWrapper>
    </Wrapper>
  );
};
export default Signup;
