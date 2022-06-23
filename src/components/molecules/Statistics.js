import { Card, Statistic, Divider } from "antd";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export const Statistics = (props) => {
	const { totalSuccess, totalFail, data, maxValue, dataCreatedAPI } = props;

	return (
		<div className='summary-total'>
			<div className='sum-request-statistic'>
				<Card>
					<h1>Last Week's API Usage</h1>
					<ResponsiveContainer width='100%' height={250}>
						<LineChart
							data={data}
							margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
						>
							<Line
								type='monotone'
								dataKey='success'
								stroke='#3F8600'
							/>
							<Line
								type='monotone'
								dataKey='fail'
								stroke='#CF1322'
							/>
							<CartesianGrid
								stroke='#ccc'
								strokeDasharray='5 5'
							/>
							<XAxis dataKey='day' />
							<YAxis type='number' domain={[0, maxValue]} />
							<Legend />
							<Tooltip />
						</LineChart>
					</ResponsiveContainer>
				</Card>
				<Card>
					<h1>Most Owner Create API</h1>
					<ResponsiveContainer width='100%' height={250}>
						<BarChart
							data={dataCreatedAPI}
							margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
						>
							<CartesianGrid
								stroke='#ccc'
								strokeDasharray='5 5'
							/>
							<XAxis dataKey='apiOwner' />
							<YAxis
								type='number'
								dataKey='sumApi'
								domain={[0, Math.max(dataCreatedAPI)]}
							/>
							<Legend />
							<Bar dataKey='sumApi' fill='#8884d8' />
							<Tooltip />
						</BarChart>
					</ResponsiveContainer>
				</Card>
			</div>
			<div className='sum-request-result'>
				<Card className='card-result-summary'>
					<h1>Request Result Summary</h1>
					<Divider />
					<div className='sum-success'>
						<Statistic
							title='Total of Success'
							value={totalSuccess}
							valueStyle={{ color: "#3f8600" }}
						/>
						<p>requests</p>
					</div>
					<Divider />
					<div className='sum-fail'>
						<Statistic
							title='Total of Fail'
							value={totalFail}
							valueStyle={{ color: "#cf1322" }}
						/>
						<p>requests</p>
					</div>
				</Card>
			</div>
		</div>
	);
};
