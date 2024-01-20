import { useState } from "react";
import {
  Button,
  Col,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
  notification,
} from "antd";
import { Checkbox, Form, Input } from "antd";
import { createANewUser, register } from "../../services/api";

const UserModelCreate = (props) => {
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { username, password, fullname, studentcode, address } = values;
    const data = { username, password, fullname, studentcode, address };
    setIsSubmit(true);
    const res = await register(data);
    setIsSubmit(false);
    console.log(">>>check res: ", res);
    if (res && res.data) {
      message.success("Tạo mới user thành công");
      form.resetFields();
      setOpenModalCreate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  return (
    <Modal
      title="Thêm mới người dùng"
      open={openModalCreate}
      onCancel={() => setOpenModalCreate(false)}
      onOk={() => {
        form.submit();
      }}
      okText={"Tạo mới"}
      cancelText={"Hủy"}
      confirmLoading={isSubmit}
    >
      <Form
        form={form}
        name="basic"
        style={{ maxWidth: 900 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={20 - 24}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Username không được để trống" },
              ]}
            >
              <Input style={{ width: "90%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Mật khẩu không được để trống" },
              ]}
            >
              <Input.Password style={{ width: "90%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20 - 24}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="name"
              label="Họ và tên"
              rules={[
                { required: true, message: "Họ và tên không được để trống" },
              ]}
            >
              <Input style={{ width: "90%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống",
                  // pattern: new RegExp(/^[0-9]+$/)
                },
              ]}
            >
              <InputNumber style={{ width: "90%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Địa chỉ"
          labelCol={{ span: 24 }}
          name="address"
          rules={[{ required: true, message: "Địa chỉ không được để trống" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModelCreate;
