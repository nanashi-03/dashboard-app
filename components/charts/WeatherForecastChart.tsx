// components/WeatherForecastChart.tsx

'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function WeatherForecastChart({ data }: { data: any[] }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">5-Day Forecast</h2>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data}>
                    <XAxis dataKey="time" stroke="#aaa" />
                    <YAxis stroke="#aaa" domain={['auto', 'auto']} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }}
                        labelStyle={{ color: '#93c5fd' }}
                        formatter={(value: number) => [`${value.toLocaleString()}°C`, 'Temperature']}
                    />
                    <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#4ade80"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
