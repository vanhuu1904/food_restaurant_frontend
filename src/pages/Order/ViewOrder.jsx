import { Col, Divider, InputNumber, Row } from "antd";
import "./order.scss";
import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  doDeleteItemCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice";
import { registerOrder } from "../../services/api";

const ViewOrder = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const user = useSelector((state) => state.account.user);
  console.log(">>> check user: ", user);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.map((item) => {
        sum += item?.quantity * item?.detail?.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [carts]);
  const handleOnChangeInput = (value, food) => {
    if (!value || value < 1) return;
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({
          quantity: value,
          detail: food,
          foodID: food?.foodID,
        })
      );
    }
  };
  const handleCreateOrder = async () => {
    let accountID = user?.user?.accountID;
    // console.log(">>> check carts: ", carts);

    const data = carts.map((item) => ({
      foodID: item.foodID,
      quantity: item.quantity,
    }));
    let raw = {
      OrderIN: {
        accountID: accountID,
        status: "pending",
      },
      OrderItemsIN: data,
    };

    console.log(">>> check data1: ", raw);
    message.success("thanh cong");
    let res = await registerOrder(raw);

    console.log(">>> check res:1 ", res);
  };
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="order-container"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <Row gutter={[20, 20]}>
          <Col md={18} xs={24}>
            {carts?.map((item, index) => {
              // console.log(">>> check item: ", item);
              let tong = +item?.quantity * +item?.detail?.price;
              // console.log(">>> check tong: ", tong);
              return (
                <div className="order-book">
                  <div className="book-content">
                    <img src={item?.detail?.image} />
                    <div className="title">{item?.detail?.name}</div>
                    <div className="price">{item?.detail?.price}</div>
                  </div>
                  <div className="action">
                    <div className="quantity">
                      <InputNumber
                        onChange={(value) => handleOnChangeInput(value, item)}
                        value={item?.quantity}
                      />
                    </div>
                    <div className="sum">Tổng: {tong} ₫</div>
                    <DeleteTwoTone
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch(
                          doDeleteItemCartAction({ foodID: item.foodID })
                        )
                      }
                      twoToneColor="#eb2f96"
                    />
                  </div>
                </div>
              );
            })}
          </Col>
          <Col md={6} xs={24}>
            <div className="order-sum">
              <div className="calculate">
                {/* <span> Tạm tính</span>
                <span> 1.055.400đ</span> */}
              </div>
              <Divider style={{ margin: "10px 0" }} />
              <div className="calculate">
                <span> Tổng tiền</span>
                <span className="sum-final"> {totalPrice} ₫</span>
              </div>
              <Divider style={{ margin: "10px 0" }} />
              <button onClick={handleCreateOrder}>
                Mua Hàng ({carts.length})
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewOrder;
