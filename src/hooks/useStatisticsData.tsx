import { useState, useEffect } from "react";
import { getAllProperties } from "../services/properties.service";

export const useStatisticsData = () => {
  const [statusChartData, setStatusChartData] = useState<any>(null);
  const [typeChartData, setTypeChartData] = useState<any>(null);
  const [priceChartData, setPriceChartData] = useState<any>(null);
  const [activeChartData, setActiveChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllProperties();
        const properties = response.properties;

        const statusCounts = properties.reduce((acc: any, property: any) => {
          acc[property.status] = (acc[property.status] || 0) + 1;
          return acc;
        }, {});

        const typeCounts = properties.reduce((acc: any, property: any) => {
          acc[property.type] = (acc[property.type] || 0) + 1;
          return acc;
        }, {});

        const activeCounts = properties.reduce(
          (acc: any, property: any) => {
            if (property.isActive) {
              acc.active += 1;
            } else {
              acc.inactive += 1;
            }
            return acc;
          },
          { active: 0, inactive: 0 }
        );

        const priceData = properties.map((property: any) => property.price);
        const priceLabels = properties.map((property: any) => property.type);

        setStatusChartData({
          labels: Object.keys(statusCounts),
          datasets: [
            {
              label: "Properties by Status",
              data: Object.values(statusCounts),
              backgroundColor: ["#4caf50", "#ff5722", "#2196f3", "#f44336"],
            },
          ],
        });

        setTypeChartData({
          labels: Object.keys(typeCounts),
          datasets: [
            {
              label: "Properties by Type",
              data: Object.values(typeCounts),
              backgroundColor: ["#3f51b5", "#00bcd4", "#8bc34a", "#ffc107"],
            },
          ],
        });

        setActiveChartData({
          labels: ["Active", "Inactive"],
          datasets: [
            {
              label: "Properties by Activity Status",
              data: [activeCounts.active, activeCounts.inactive],
              backgroundColor: ["#4caf50", "#f44336"],
            },
          ],
        });

        setPriceChartData({
          labels: priceLabels,
          datasets: [
            {
              label: "Property Prices",
              data: priceData,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { statusChartData, typeChartData, priceChartData, activeChartData, loading };
};
