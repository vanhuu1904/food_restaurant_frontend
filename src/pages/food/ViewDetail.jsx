import { Row, Col, Rate, Divider, Button } from "antd";
import "./book.scss";
import ImageGallery from "react-image-gallery";
import { useRef, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import ModalGallery from "./modalGallery";
import { useDispatch } from "react-redux";
import { doAddFoodAction } from "../../redux/order/orderSlice";

const ViewDetail = (props) => {
  const { dataFood } = props;
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const refGallery = useRef(null);
  const dispatch = useDispatch();
  const handleOnClickImage = () => {
    //get current index onClick
    // alert(refGallery?.current?.getCurrentIndex());
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    // refGallery?.current?.fullScreen()
  };

  const onChange = (value) => {
    console.log("changed", value);
  };
  const handleAddToCart = (quantity, food) => {
    dispatch(doAddFoodAction({ quantity, detail: food, foodID: food?.foodID }));
  };
  const handleChangeButton = (type) => {
    if (type === "MINUS") {
      if (currentQuantity - 1 < 0) return;
      setCurrentQuantity(currentQuantity - 1);
    }
    if (type === "PLUS") {
      if (currentQuantity > 100) return;
      setCurrentQuantity(currentQuantity + 1);
    }
  };
  const handleChangeInput = (value) => {
    if (!isNaN(value)) {
      if (+value < 0 && +value < 100) {
        setCurrentQuantity(+value);
      }
    }
  };
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="view-detail-book"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          minHeight: "calc(100vh - 150px)",
        }}
      >
        <div style={{ padding: "20px", background: "#fff", borderRadius: 5 }}>
          <Row gutter={[20, 20]}>
            <Col md={10} sm={0} xs={0}>
              <img
                src={dataFood?.image}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                alt=""
              />
              {/* <ImageGallery
                ref={refGallery}
                items={images}
                showPlayButton={false} //hide play button
                showFullscreenButton={false} //hide fullscreen button
                renderLeftNav={() => <></>} //left arrow === <> </>
                renderRightNav={() => <></>} //right arrow === <> </>
                slideOnThumbnailOver={true} //onHover => auto scroll images
                onClick={() => handleOnClickImage()}
              /> */}
            </Col>
            <Col md={14} sm={24}>
              {/* <Col md={0} sm={24} xs={24}>
                <ImageGallery
                  ref={refGallery}
                  items={images}
                  showPlayButton={false} //hide play button
                  showFullscreenButton={false} //hide fullscreen button
                  renderLeftNav={() => <></>} //left arrow === <> </>
                  renderRightNav={() => <></>} //right arrow === <> </>
                  showThumbnails={false}
                />
              </Col> */}
              <Col span={24}>
                <div className="title">{dataFood?.name}</div>
                <div className="rating">
                  <Rate
                    value={5}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 12 }}
                  />
                  <span className="sold">
                    <Divider type="vertical" />
                    Đã bán 20
                  </span>
                </div>
                <div className="price">
                  <span className="currency">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(dataFood?.price)}
                  </span>
                </div>
                <div className="delivery">
                  <div>
                    <span className="left">Vận chuyển</span>
                    <span className="right">Miễn phí vận chuyển</span>
                  </div>
                </div>
                <div className="quantity">
                  <span className="left">Số lượng</span>
                  <span className="right">
                    <button onClick={() => handleChangeButton("MINUS")}>
                      <MinusOutlined />
                    </button>
                    <input
                      onChange={(e) => handleChangeInput(e.target.value)}
                      value={currentQuantity}
                    />
                    <button onClick={() => handleChangeButton("PLUS")}>
                      <PlusOutlined />
                    </button>
                  </span>
                </div>
                <div className="buy">
                  <button
                    className="cart"
                    onClick={() => handleAddToCart(currentQuantity, dataFood)}
                  >
                    <BsCartPlus className="icon-cart" />
                    <span>Thêm vào giỏ hàng</span>
                  </button>
                  <button className="now">Mua ngay</button>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
      {/* <ModalGallery
        isOpen={isOpenModalGallery}
        setIsOpen={setIsOpenModalGallery}
        currentIndex={currentIndex}
        items={images}
        title={"hardcode"}
      /> */}
    </div>
  );
};

export default ViewDetail;
