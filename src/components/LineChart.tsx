import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	Title,
	Tooltip,
	LineElement,
	Legend,
} from 'chart.js'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	LineElement,
	Legend,
	PointElement
)

const LineChart = ({ userData1, userData2 }) => {
	const data = {
		labels: [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		],
		datasets: [
			{
				label: 'Check-ins',
				data: userData1,
				borderColor: '#046BA6',
				backgroundColor: '#f7f9ff',
				borderWidth: 1,
			},
			{
				label: 'Check-outs',
				data: userData2,
				borderColor: '#0A9A50',
				backgroundColor: '#f7f9ff',
				borderWidth: 1,
			},
		],
	}

	const options = {
		responsive: true,
		scales: {
			y: {
				ticks: { font: { size: 13 } },
				grid: { color: '#eee' },
				gridLines: { display: true },
			},
			x: {
				ticks: { font: { size: 14 } },
				grid: { display: false },
			},
		},
	}

	return <Line data={data} options={options} />
}

export default LineChart
