export const dynamic = 'force-dynamic';

import { WeatherDetailsCard } from '@/components/cards/WeatherDetailsCard';

interface Props {
    params: Promise<{ city: string }>;
}

export default async function WeatherDetailPage({ params }: Props) {
    const param = await params;
    const city = param.city;
    return <WeatherDetailsCard city={city} />;
}
