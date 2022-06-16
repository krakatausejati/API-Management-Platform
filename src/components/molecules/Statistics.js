import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Card, Statistic } from "antd";

export const Statistics = (props) => {
	const { totalSuccess, totalFail, data, maxValue } = props;

	return (
		<div className='summary-total'>
			<div className='sum-request-statistic'>
				<Card>
					<ResponsiveContainer width='100%' height={435}>
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
			</div>
			<div className='sum-request-result'>
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
		</div>
	);
};
