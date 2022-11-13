import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Grafica({ data, posiciones, nameLegend, color }) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        layout='vertical'
        width={500}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis type='number' domain={[0, (dataMax) => posiciones]} />
        <YAxis dataKey='name' type='category' />
        <Tooltip />
        <Legend
          payload={[{ value: nameLegend, type: 'line' }]}
          verticalAlign='top'
          height={40}
          iconSize={20}
          wrapperStyle={{ color: color, fontWeight: 'bold', fontSize: 25 }}
        />
        <Line
          dataKey='element'
          dot={{ stroke: 'black', strokeWidth: 2 }}
          strokeWidth={3}
          stroke={color}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
