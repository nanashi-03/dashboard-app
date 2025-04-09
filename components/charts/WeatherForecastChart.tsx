// components/WeatherForecastChart.tsx

'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type ForecastPoint = {
    time: string; // formatted date string
    temp: string; // temperature as a formatted string (e.g., "22.3")
};

export default function WeatherForecastChart({ data }: { data: ForecastPoint[] }) {
    return (
        <div>
            <h2 className="mb-2 text-xl font-semibold">5-Day Forecast</h2>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data}>
                    <XAxis dataKey="time" stroke="#aaa" />
                    <YAxis stroke="#aaa" domain={['auto', 'auto']} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }}
                        labelStyle={{ color: '#93c5fd' }}
                        formatter={(value: number) => [
                            `${value.toLocaleString()}°C`,
                            'Temperature',
                        ]}
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
