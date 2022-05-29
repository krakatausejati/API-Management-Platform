import { Line } from "@ant-design/charts";
import { Card, Statistic } from "antd";

export const Statistics = (props) => {
	const { totalSuccess, totalFail, data } = props;

	const config = {
		data,
		width: 300,
		height: 200,
		autoFit: false,
		xField: "day",
		yField: "value",
		point: {
			size: 5,
			shape: "diamond",
		},
		label: {
			style: {
				fill: "#aaa",
			},
		},
	};

	let chart;
	return (
		<div className='summary-total'>
			<div className='sum-request'>
				<Card>
					<Line
						{...config}
						onReady={(chartInstance) => (chart = chartInstance)}
					/>
				</Card>
			</div>
			<div className='sum-success'>
				<Card>
					<Statistic
						title='Total of Success'
						value={totalSuccess}
						valueStyle={{ color: "#3f8600" }}
					/>
					<p>requests</p>
				</Card>
			</div>
			<div className='sum-fail'>
				<Card>
					<Statistic
						title='Total of Fail'
						value={totalFail}
						valueStyle={{ color: "#cf1322" }}
					/>
					<p>requests</p>
				</Card>
			</div>
		</div>
	);
};
