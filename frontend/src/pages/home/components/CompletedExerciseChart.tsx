import { useMemo } from "react";
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
import { Line } from "react-chartjs-2";
import type { CompletedExerciseHistoryType } from "../../../types/completed-exercise.types";
import { useCompletedExerciseHistory } from "../../../hooks/useCompletedExerciseHistory";
import type { CompletedExerciseSetHistoryType } from "../../../types/completed-exercise-set.types";

import styles from "./CompletedExerciseChart.module.css";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

const options = {
   responsive: true,
   plugins: {
      legend: {
         position: "right" as const,
      },
      title: {
         display: true,
         text: "Chart.js Line Chart",
      },
   },
};

export default function CompletedExerciseChart({
   completedExerciseHistory,
}: {
   completedExerciseHistory: CompletedExerciseHistoryType[];
}) {
   // memoized values
   const chartData = useMemo(() => {
      if (!completedExerciseHistory?.length) {
         return null;
      }

      const exerciseDataMap = new Map<
         string,
         Map<string, { weights: number[]; date: Date }>
      >();
      const allDatesSet = new Set<string>();

      completedExerciseHistory.forEach(
         (exercise: CompletedExerciseHistoryType) => {
            const exerciseName = exercise.completedExerciseName;

            if (!exerciseDataMap.has(exerciseName)) {
               exerciseDataMap.set(exerciseName, new Map());
            }

            const exerciseMap = exerciseDataMap.get(exerciseName)!;

            exercise.completedExerciseSets.forEach(
               (set: CompletedExerciseSetHistoryType) => {
                  const date = new Date(set.completedDate);
                  const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format

                  allDatesSet.add(dateKey);

                  const weight = parseFloat(set.completedWeight);

                  if (!exerciseMap.has(dateKey)) {
                     exerciseMap.set(dateKey, { weights: [weight], date });
                  } else {
                     const existingEntry = exerciseMap.get(dateKey)!;
                     existingEntry.weights.push(weight);
                  }
               }
            );
         }
      );

      // Step 2: Sort dates
      const sortedDates = Array.from(allDatesSet).sort();

      // Step 3: Create datasets for each exercise
      const datasets = Array.from(exerciseDataMap.entries()).map(
         ([exerciseName, dateMap]) => {
            const data = sortedDates.map((date) => {
               const entry = dateMap.get(date);
               if (!entry) return null;
               const avgWeight =
                  entry.weights.reduce((sum, w) => sum + w, 0) /
                  entry.weights.length;
               return avgWeight;
            });

            // Generate a random color for each exercise
            const hue = Math.random() * 360;
            const color = `hsl(${hue}, 70%, 50%)`;

            return {
               label: exerciseName,
               data,
               borderColor: color,
               backgroundColor: color,
               tension: 0.1,
               spanGaps: true, // Connect points even if there are nulls
            };
         }
      );

      return {
         labels: sortedDates.map((date) => {
            const d = new Date(date);
            return d.toLocaleDateString("en-US");
         }),
         datasets,
      };
   }, [completedExerciseHistory]);

   if (!chartData) {
      return <h4 className={styles.noData}>No exercise data to display</h4>;
   }

   return (
      <div className={styles.container}>
         <Line
            options={{
               ...options,
               plugins: {
                  ...options.plugins,
                  title: {
                     display: false,
                  },
               },
               scales: {
                  y: {
                     beginAtZero: false,
                     title: {
                        display: true,
                        text: "Avg. Weight (lbs)",
                     },
                  },
                  x: {
                     title: {
                        display: true,
                        text: "Date",
                     },
                  },
               },
            }}
            data={chartData}
         />
      </div>
   );
}
