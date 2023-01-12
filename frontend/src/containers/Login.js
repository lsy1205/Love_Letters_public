import React, { useEffect } from "react";
import { Button, Form, Input, Typography, message, Space } from "antd";
import styled from "styled-components";
import { useGame } from "../hooks/useGame";
import { useNavigate, Link } from "react-router-dom";

const { Text } = Typography;

const Wrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Dancing+Script&family=Noto+Sans+TC:wght@500&family=Qwitcher+Grypen:wght@700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Kalam&display=swap");
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
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 35vw;
  height: 80vh;
  border: 1px solid;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
`;

const Title = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Dancing+Script&family=Noto+Sans+TC:wght@500&family=Qwitcher+Grypen:wght@700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Kalam&display=swap");
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

const Login = () => {
  const { login, setLogin, loginUser, setMe } = useGame();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    const { data, loading } = await loginUser({
      variables: { name: values.username, password: values.password },
    });
    // // console.log(data);
    if (data.signIn === "invalid account") {
      localStorage.setItem("save-me", values.username);
      InvalidAccount();
      // // console.log("Invalid account");
    } else if (data.signIn === "invalid password") {
      localStorage.setItem("save-me", values.username);
      WrongPassword();
      // // console.log("Wrong password");
    } else {
      // // console.log("Success:", values);
      setMe(values.username);
      localStorage.setItem("save-me", values.username);
      LoginSuccess();
      setLogin(true);
      // console.log(data);
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (login) {
      navigate("/lobby");
    }
  }, [login, navigate]);

  ////////////////////////////////////////////////////////////////
  const LoginSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Log In Successfully",
    });
  };

  const WrongPassword = () => {
    messageApi.open({
      type: "error",
      content: "Wrong Password",
    });
  };

  const InvalidAccount = () => {
    messageApi.open({
      type: "warning",
      content: "Account is Invalid. Please Sign Up First",
    });
  };

  ////////////////////////////////////////////////////////////////

  return (
    <Wrapper>
      {contextHolder}
      <LoginWrapper>
        <Title>
          <h1>Love Letters</h1>
          <h2>My Heart is All Yours and Yours Only</h2>
        </Title>
        <Form
          name="basic"
          labelCol={{
            span: 8,
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

          <FootWrapper>
            <Text type="secondary">Don't Have an Account ?</Text>
            <span>
              <Link to="/signup">Sign up</Link>
              <Text type="secondary"> to Meet Your Love</Text>
            </span>
          </FootWrapper>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </LoginWrapper>
    </Wrapper>
  );
};
export default Login;
