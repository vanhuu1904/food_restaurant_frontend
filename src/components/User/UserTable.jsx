import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Popover,
  Popconfirm,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch";
import { deleteAUser, fetchListUser, getAllUser } from "../../services/api";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import UserViewDetail from "./UserViewDetail";
import UserModelCreate from "./UserModalCreate";
import UserModalUpdate from "./UserModalUpdate";
import {
  CloudUploadOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UserImport from "./data/UserImport";
// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
  const [listUser, setListUser] = useState([]);
  // let listUser = [
  //   {
  //     accountID: "1",
  //     name: "Văn Hữu",
  //     phone: "0987654332",
  //     address: "Bac Ninh",
  //   },
  // ];
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  // View Detail
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState();

  // Update
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();

  // import excel
  const [openModalImport, setOpenModalImport] = useState(false);

  // useEffect(() => {
  //   fetchUsers();
  // }, [current, pageSize, filter, sortQuery]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const res = await getAllUser();
    if (res && res.data) {
      setListUser(res.data);
    }
    console.log(">>>> check res: ", res);
  };

  const handleExportData = () => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportUser.csv");
    }
  };
  // const fetchUsers = async () => {
  //   setIsLoading(true);
  //   let query = `current=${current}&pageSize=${pageSize}`;
  //   if (filter) {
  //     query += `&${filter}`;
  //   }
  //   if (sortQuery) {
  //     query += `&${sortQuery}`;
  //   }
  //   const res = await fetchListUser(query);
  //   if (res && res.data) {
  //     setListUser(res.data.result);
  //     setTotal(res.data.meta.total);
  //   }
  //   setIsLoading(false);
  // };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List User</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportData()}
          >
            Export
          </Button>
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            onClick={() => setOpenModalImport(true)}
          >
            Import
          </Button>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenModalCreate(true)}
          >
            Thêm mới
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              setFilter("");
              setSortQuery("");
            }}
          >
            <IoReloadOutline />
          </Button>
        </span>
      </div>
    );
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  // const handleDeleteUser = async (accountID) => {
  //   const res = await deleteAUser(accountID);
  //   if (res && res.data) {
  //     message.success("Xóa user thành công");
  //     fetchUsers();
  //   } else {
  //     notification.error({
  //       message: "Có lỗi xảy ra",
  //       description: res.message,
  //     });
  //   }
  // };

  const columns = [
    {
      title: "Id",
      dataIndex: "accountID",
      render: (text, record, index) => {
        return (
          <a
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record.accountID}
          </a>
        );
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title="Xác nhận xóa user"
              // onConfirm={() => handleDeleteUser(record.accountID)}
              description="Bạn có chắc chắn muốn xóa user này?"
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span>
                <MdDeleteOutline
                  style={{ cursor: "pointer" }}
                  color="red"
                  size={20}
                />
              </span>
            </Popconfirm>
            <BiEditAlt
              style={{ cursor: "pointer", marginLeft: 20 }}
              color="#f57800"
              size={20}
              onClick={() => {
                setOpenModalUpdate(true);
                setDataUpdate(record);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Table
            className="def"
            title={renderHeader}
            columns={columns}
            loading={isLoading}
            dataSource={listUser}
            // onChange={onChange}
            rowKey="accountID"
          />
        </Col>
      </Row>
      <UserViewDetail
        setDataViewDetail={setDataViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        openViewDetail={openViewDetail}
      />
      <UserModelCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchUsers={fetchUsers}
      />
      <UserModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        fetchUsers={fetchUsers}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
      <UserImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
      />
    </>
  );
};

export default UserTable;
