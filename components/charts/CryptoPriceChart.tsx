'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
    data: { time: string; price: number }[];
}

export const CryptoPriceChart = ({ data }: Props) => {
    return (
        <div className="h-72 w-full rounded-xl bg-gray-900 p-4 shadow">
            <h2 className="mb-2 text-lg font-semibold text-white">30-Day Price History</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    {/* <CartesianGrid strokeDasharray="3 3" stroke="#444" /> */}
                    <XAxis dataKey="time" stroke="#aaa" />
                    <YAxis stroke="#aaa" domain={['auto', 'auto']} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }}
                        labelStyle={{ color: '#93c5fd' }}
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Price']}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#4ade80"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
