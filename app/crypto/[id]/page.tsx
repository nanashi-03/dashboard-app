export const dynamic = 'force-dynamic';

import { CryptoDetailsCard } from '@/components/cards/CryptoDetailsCard';

interface Props {
    params: { id: string };
}

export default async function WeatherDetailPage({ params }: Props) {
    const param = await params;
    const id = param.id;
    return <CryptoDetailsCard id={id} />;
}
