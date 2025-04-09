'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface Props {
    data: { time: string; price: number }[];
}

export const CryptoPriceChart = ({ data }: Props) => {
    return (
        <div className="w-full h-72 p-4 bg-gray-900 rounded-xl shadow">
            <h2 className="text-white text-lg font-semibold mb-2">30-Day Price History</h2>
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
                    <Line type="monotone" dataKey="price" stroke="#4ade80" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
