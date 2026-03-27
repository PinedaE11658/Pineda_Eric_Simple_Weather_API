import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Home() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          "https://api.weather.gov/gridpoints/GID/40,99/forecast?units=us",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setForecast(data.properties.periods);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold text-blue-500">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold text-blue-500">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <View className="p-5 bg-blue-200 rounded-lg mb-5 items-center">
        <Text className="text-lg font-bold text-blue-500">
          Kearney Nebraska's Weather Forecast
        </Text>

        {forecast
          .filter((period) => period.name === "Tonight")
          .map((period) => (
            <View key={period.number} className=" items-center">
              <Text className="text-base text-gray-700">
                {period.detailedForecast}
              </Text>
            </View>
          ))}

        {forecast.map((period, index) => (
          <Text key={index} className="text-base text-gray-700">
            {period.name}: {period.temperature}°F
          </Text>
        ))}
      </View>
    </View>
  );
}
