import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useStatisticsData } from "../../hooks/useStatisticsData";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import "./statistics-layout.css";
import { CircularProgress } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function StatisticLayout() {
  const { statusChartData, typeChartData, priceChartData, activeChartData, loading } =
    useStatisticsData();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="statistics-layout">
      {loading ? (
        <div className="loading-overlay">
          <CircularProgress />
          <p>Loading statistics...</p>
        </div>
      ) : !statusChartData || !typeChartData || !priceChartData || !activeChartData ? (
        <div className="no-data-container">
          <p>No data available</p>
        </div>
      ) : (
        <>
          <h2>Statistics Overview</h2>
          <div className="chart-container">
            <div className="chart">
              <h3>Properties by Status</h3>
              <Bar data={statusChartData} options={{ responsive: true }} />
            </div>

            <div className="chart">
              <h3>Properties by Type</h3>
              <Pie data={typeChartData} options={{ responsive: true }} />
            </div>

            <div className="chart">
              <h3>Active vs Inactive Properties</h3>
              <Pie data={activeChartData} options={{ responsive: true }} />
            </div>

            <div className="chart">
              <h3>Property Prices</h3>
              <Line data={priceChartData} options={{ responsive: true }} />
            </div>
          </div>
        </>
      )}

      {/* Botón de regreso */}
      <button className="fixed-button-statistics" onClick={goToHome}>
        <HomeIcon className="icon" />
        <span className="button-text">Back to Home</span>
      </button>
    </div>
  );
}

export default StatisticLayout;
