import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ trainingName, exerciseData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const uniqueExercises = [...new Set(exerciseData.map((exercise) => exercise.exerciseName))];

    const firstExerciseLength = exerciseData.find((exercise) => exercise.exerciseName === uniqueExercises[0])?.metric.length || 0;

    const option = {
      title: {
        text: '',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
      legend: {
        left: '0',
        bottom:'0',
      },
      yAxis: {
        type: 'log',
        name: '',
        minorSplitLine: {
          show: true,
        },
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '20%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        name: 'Exercise',
        data: Array.from({ length: firstExerciseLength }, (_, i) => i + 1),
      },
      series: uniqueExercises.map((exerciseName, index) => ({
        name: exerciseName,
        type: 'bar',
        data: exerciseData
          .filter((exercise) => exercise.exerciseName === exerciseName)
          .flatMap((exercise) => exercise.metric),
      })),
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [exerciseData, trainingName]);

  return <div style={{ width: '100%', height: '500px' }} ref={chartRef}></div>;
};

export default BarChart;
