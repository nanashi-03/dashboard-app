import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { WeatherCard } from './cards/WeatherCard';

export default function WeatherSection() {
    const favoriteCities = useSelector((state: RootState) => state.userPref.favoriteCities);
    return (
        <section>
            <h1 className="mb-4 text-2xl font-bold">🌤 Weather</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteCities.map((city) => (
                    <WeatherCard key={city} city={city} />
                ))}
            </div>
        </section>
    );
}
