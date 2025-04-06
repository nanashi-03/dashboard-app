import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { WeatherCard } from "./cards/WeatherCard";

export default function WeatherSection() {
    const favoriteCities = useSelector((state: RootState) => state.userPref.favoriteCities);
    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">🌤 Weather</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteCities.map((city) => (
                    <WeatherCard key={city} city={city} />
                ))}
            </div>
        </section>
    );
}
