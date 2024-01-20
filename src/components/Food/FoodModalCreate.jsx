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
  Upload,
  Image,
} from "antd";
import { Checkbox, Form, Input } from "antd";
import { createAFood } from "../../services/api";

const FoodModalCreate = (props) => {
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();

  // const handleCancel = () => setPreviewOpen(false);
  const onFinish = async (values) => {
    const { name, price, status } = values;
    let a;
    if (status === "Còn hàng") {
      a = 1;
    } else a = 0;
    setIsSubmit(true);
    const data = {
      name,
      price,
      status: a,
      image: imageUrl,
    };
    const res = await createAFood(data);
    setIsSubmit(false);
    console.log(">>>check res: ", res);
    if (res && res.data) {
      message.success("Tạo mới food thành công");
      form.resetFields();
      setOpenModalCreate(false);
      await props.fetchFoods();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setImageUrl("");
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
              name="name"
              label="Tên món ăn"
              rules={[
                { required: true, message: "Tên món ăn không được để trống" },
              ]}
            >
              <Input style={{ width: "90%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Giá tiền"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                addonAfter="VND"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Trạng thái"
              name="status"
              rules={[{ required: true, message: "Vui lòng nhập status" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item labelCol={{ span: 24 }} label="Ảnh món ăn" name="image">
              <Input
                style={{ width: "90%" }}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Item>
            <Image style={{ textAlign: "center" }} width={200} src={imageUrl} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FoodModalCreate;
