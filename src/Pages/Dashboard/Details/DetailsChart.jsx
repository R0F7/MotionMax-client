// import {
//     BarChart,
//     Bar,
//     Cell,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     LabelList,
//     ResponsiveContainer,
// } from 'recharts';
// import PropTypes from 'prop-types';

// const DetailsChart = ({ payments }) => {

//     return (
//         <ResponsiveContainer width="100%" height={300}>
//             <BarChart
//                 width={500}
//                 height={300}
//                 data={payments}
//                 margin={{
//                     top: 5,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis dataKey="salary"/>
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="salary" fill="#82ca9d" minPointSize={10} />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// }

// DetailsChart.propTypes = {
//     payments: PropTypes.array
// }

// export default DetailsChart;

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

const DetailsChart = ({ payments:data }) => {
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="salary" fill="#8884d8" label={{ position: 'top' }}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

DetailsChart.propTypes = {
    payments: PropTypes.array
}

export default DetailsChart;

