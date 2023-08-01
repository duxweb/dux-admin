import * as echarts from 'echarts'

const light = {
  color: ['#0052d9', '#0594fa', '#00a870', '#ebb105', '#ed7b2f', '#e34d59', '#ed49b4', '#834ec2'],
  textColor: 'rgba(0, 0, 0, 0.9)',
  placeholderColor: 'rgba(0, 0, 0, 0.35)',
  borderColor: '#dcdcdc',
  containerColor: '#fff',
}
const dark = {
  color: ['#4582e6', '#29a4fb', '#03a56f', '#ca8d03', '#ed7b2f', '#ea7b84', '#f172c5', '#ab87d5'],
  textColor: 'rgba(255, 255, 255, 0.9)',
  placeholderColor: 'rgba(255, 255, 255, 0.35)',
  borderColor: '#5e5e5e',
  containerColor: '#242424',
  tooltip: {
    textColor: '#dddddd',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderColor: 'rgba(0,0,0,0.8)',
    textStyle: {
      color: '#dddddd',
    },
  },
  categoryAxis: {
    splitLine: {
      lineStyle: {
        color: ['var(--td-font-gray-5)'],
      },
    },
  },
  valueAxis: {
    splitLine: {
      lineStyle: {
        color: ['#777777'],
      },
    },
  },
  logAxis: {
    splitLine: {
      lineStyle: {
        color: ['var(--td-font-gray-5)'],
      },
    },
  },
  timeAxis: {
    splitLine: {
      lineStyle: {
        color: ['var(--td-font-gray-5)'],
      },
    },
  },
}

export const registerCharts = () => {
  echarts.registerTheme('light', light)
  echarts.registerTheme('dark', dark)
}
