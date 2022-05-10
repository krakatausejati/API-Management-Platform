import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import React from "react";
import AddField from "../atoms/AddField";

export default function HeaderDataTable(props) {
	const {
		menu,
		onSearch,
		title,
		titleButton,
		pathname,
		breadcrumb,
		onClick,
	} = props;

	const { Search } = Input;

	return (
		<div className='header-datatable'>
			<h1>{title}</h1>
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
				<AddField
					title={titleButton}
					breadcrumb={breadcrumb}
					pathname={pathname}
					onClick={onClick}
				/>
			</div>
		</div>
	);
}
