import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useAppStore } from '@/stores/app'
import { useMemo } from 'react'
import merge from 'deepmerge'

interface ChartsProps {
  options?: EChartsOption[]
  min?: boolean
  single?: boolean
}

const Charts = ({ single, options, min }: ChartsProps) => {
  const dark = useAppStore((state) => state.dark)

  const option: EChartsOption = useMemo(() => {
    const config = options || []
    let minConfig = {}
    if (min) {
      minConfig = {
        grid: {
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
          show: false,
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
      }
    }
    console.log(config)
    return merge.all([minConfig, ...config]) as EChartsOption
  }, [min, options])

  return (
    <ReactECharts
      option={option}
      theme={dark ? (single ? 'dark-single' : 'dark') : single ? 'light-single' : 'light'}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  )
}
export default Charts

interface ChartProps {
  labels?: string[]
  data?: ChartsDataProps[]
  min?: boolean
  options?: EChartsOption
}

export interface ChartsDataProps {
  name?: string
  data?: any[]
}

export const ChartBar = ({ labels, data, min, options }: ChartProps) => {
  const config = useMemo<EChartsOption>(() => {
    return {
      xAxis: {
        type: 'category',
        data: labels,
      },
      yAxis: {
        type: 'value',
      },
      series: data?.map((item) => ({
        data: item.data,
        type: 'bar',
      })),
      tooltip: {
        trigger: 'axis',
      },
    } as EChartsOption
  }, [data, labels])
  return <Charts options={[config, options || {}]} min={min} />
}

export const ChartLine = ({ labels, data, min, options }: ChartProps) => {
  const config = useMemo<EChartsOption>(() => {
    return {
      xAxis: {
        type: 'category',
        data: labels,
      },
      yAxis: {
        type: 'value',
      },
      series: data?.map((item) => ({
        data: item.data,
        type: 'line',
      })),
      tooltip: {
        trigger: 'axis',
      },
    }
  }, [data, labels])

  return <Charts options={[config, options || {}]} min={min} />
}

export const ChartArea = ({ labels, data, min, options }: ChartProps) => {
  const config = useMemo<EChartsOption>(() => {
    return {
      xAxis: {
        type: 'category',
        data: labels,
      },
      yAxis: {
        type: 'value',
        splitArea: {
          show: true,
        },
      },
      series: data?.map((item) => ({
        data: item.data,
        type: 'line',
        symbol: 'none',
        areaStyle: {
          opacity: 0.2,
        },
      })),
      tooltip: {
        trigger: 'axis',
      },
    }
  }, [data, labels])

  return <Charts options={[config, options || {}]} min={min} />
}

interface ChartHalfPieProps {
  data?: ChartHalfPieDataProps[]
  min?: boolean
  options?: EChartsOption
}

export interface ChartHalfPieDataProps {
  name?: string
  value?: any
}
