import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  CaretDownOutlined,
  SortAscendingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Space, Table, Dropdown, Menu, Input } from "antd";
import { Link } from "react-router-dom";

function Api() {
  const dataSource = [
    {
      key: "1",
      no: "1",
      endpoints:
        "https://api.management.nbi.com/{user}/{project_name}/{group_name}/(free}",
      project: "Project A",
      group: "Neural BI",
      description: "Get Data",
    },
    {
      key: "2",
      no: "2",
      endpoints:
        "https://api.management.nbi.com/{user}/{project_name}/{group_name}/(free}",
      project: "Project A",
      group: "Neural BI",
      description: "Get User",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Endpoints",
      dataIndex: "endpoints",
      key: "endpoints",
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Group Name",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      render: (text, record) => (
        <Space>
          <Link to={"/detail"}>
            <Button icon={<EyeOutlined />} type='primary' />
          </Link>
          <Link to={"/delete"}>
            <Button icon={<DeleteOutlined />} danger />
          </Link>
        </Space>
      ),
    },
  ];

  const { Search } = Input;

  const onSearch = (value) => console.log(value);

  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<SortAscendingOutlined />}>
        Ascending
      </Menu.Item>
      <Menu.Item key='2' icon={<CalendarOutlined />}>
        Created at
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className='breadcrumb'>
        <Breadcrumb>
          <Breadcrumb.Item>API</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='header-datatable'>
        <h1>Your API's</h1>
        <div className='right'>
          <div className='search-field'>
            <Search placeholder="search API's" onSearch={onSearch} />
          </div>
          <div className='sort-field'>
            <Dropdown overlay={menu}>
              <Button block>
                sort by <CaretDownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className='add-field'>
            <Link
              to={{
                pathname: "/create-api",
                state: { breadcrumb: "API" },
              }}
            >
              <Button icon={<PlusOutlined />} type='primary' block>
                Create API
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className='datatable datatable-api'>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default Api;
