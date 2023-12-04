// BarChart.jsx

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ exerciseMetrics }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: exerciseMetrics.map((_, index) => `Week ${index + 1}`),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Metric',
          type: 'bar',
          barWidth: '60%',
          data: exerciseMetrics,
        },
      ],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [exerciseMetrics]);

  return <div style={{ width: '100%', height: '400px' }} ref={chartRef}></div>;
};

export default BarChart;
