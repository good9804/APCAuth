<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div
          class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-white-700"
        >
          <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>
        <div
          class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-white-700"
        >
          <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "LineChart",
  components: { Line },
  data() {
    return {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
