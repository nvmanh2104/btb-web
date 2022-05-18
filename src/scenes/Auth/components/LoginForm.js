import React from "react";
import { Form, Button, Input, Checkbox } from "antd";

const handleSubmit = (event, form, onSubmit) => {
  event.preventDefault();
  form.validateFields((error, values) => {
    if (!error) {
      onSubmit(values);
    }
  });
};

const LoginForm = ({ onSubmit, form, error, removeError }) => {
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={(event) => handleSubmit(event, form, onSubmit)}>
      <Form.Item
        label="Mã người dùng"
        validateStatus={error ? "error" : undefined}
        help={error ? "Đăng nhập thành công." : undefined}
        name="user_name"
        rules={[
          {
            required: true,
            message: `${"Nhập tên người dùng"}!`,
          },
        ]}
      >
        <Input
          placeholder={`${"Tên người dùng"}...`}
          onChange={() => removeError()}
        />
        ,
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        validateStatus={error ? "error" : undefined}
        name="user_pass"
        rules={[
          {
            required: true,
            message: `${"Nhập mật khẩu của bạn"}!`,
          },
        ]}
      >
        <Input type="password" placeholder={`${"Mật khẩu"}...`} />,
      </Form.Item>
      <Form.Item
       name="remember"
       valuePropName="checked"
       initialValue= {true}
       
       rules={[
         {
           required: true,
           message: `${"Nhập mật khẩu của bạn"}!`,
           
         }
       ]}>
        <Checkbox>{"Lưu mật khẩu"}</Checkbox>)
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          icon="login"
        >
          {"Đăng nhập"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
