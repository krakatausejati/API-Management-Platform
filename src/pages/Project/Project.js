import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import projectService from "../../services/project.service";

function Project() {
  const [project, setProject] = useState([]);

  const init = () => {
    projectService
      .getAllProject()
      .then((response) => {
        console.log("Printing project data", response.data);
        setProject(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const dataSource = project.map((projectItem, index) => ({
    key: `${index}`,
    no: `${index}`,
    name: `${projectItem.projectName}`,
    sum_group: "12",
    created_at: `${projectItem.createdAt}`,
    created_by: `${projectItem.projectOwner}`,
    detail: "...",
  }));

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
      render: (data) => (
        <>
          <Link
            to={{
              pathname: "/detail-project",
              state: { breadcrumb: "Project", name: data },
            }}
          >
            {data}
          </Link>
        </>
      ),
    },
    {
      title: "Total of Group",
      dataIndex: "sum_group",
      key: "sum_group",
    },
    {
      title: "Product Owner",
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
      <div className='breadcrumb'>
        <Breadcrumb>
          <Breadcrumb.Item>Project</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='header-datatable'>
        <h1>Your Project's</h1>
        <div className='right'>
          <div className='search-field'>
            <Search placeholder="search Project's" onSearch={onSearch} />
          </div>
          <div className='add-field'>
            <Link to={"/create-project"}>
              <Button icon={<PlusOutlined />} type='primary' block>
                Create Project
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

export default Project;
