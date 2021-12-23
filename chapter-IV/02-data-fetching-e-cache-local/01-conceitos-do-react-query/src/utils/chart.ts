import { theme } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';

export const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-12-02T00:00:00.000Z',
      '2021-12-03T00:00:00.000Z',
      '2021-12-04T00:00:00.000Z',
      '2021-12-05T00:00:00.000Z',
      '2021-12-06T00:00:00.000Z',
      '2021-12-07T00:00:00.000Z',
      '2021-12-08T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

export const series = [
  {
    name: 'series1',
    data: [31, 120, 10, 28, 61, 18, 109],
  },
];
