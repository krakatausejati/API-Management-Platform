import { Table, Breadcrumb, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Project() {
  const dataSource = [
    {
      key: "1",
      no: "1",
      name: "Project A",
      created_at: "12-02-2022 21:04:25",
      created_by: "syihab",
      detail: "...",
    },
    {
      key: "2",
      no: "2",
      name: "Project B",
      created_at: "12-02-2022 21:04:25",
      created_by: "atauu",
      detail: "...",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Created by",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
    },
  ];

  const { Search } = Input;

  const onSearch = (value) => console.log(value);

  return (
    <>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Project</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="header-datatable">
        <h1>Your Project's</h1>
        <div className="right">
          <div className="search-field">
            <Search placeholder="search Project's" onSearch={onSearch} />
          </div>
          <div className="add-field">
            <Link to={"/create-project"}>
              <Button icon={<PlusOutlined />} type="primary" block>
                Create Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="datatable datatable-api">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default Project;
