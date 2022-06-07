import { Input } from "antd";
import React from "react";
import AddField from "../atoms/AddField";

export default function HeaderDataTable(props) {
	const { onSearch, title, titleButton, pathname, breadcrumb, onClick } =
		props;

	const { Search } = Input;

	return (
		<div className='header-datatable'>
			<h1>{title}</h1>
			<div className='right'>
				<div className='search-field'>
					<Search placeholder="search API's" onSearch={onSearch} />
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
