import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useAppStore } from '@/stores/app'

interface ChartsProps {
  options?: EChartsOption
}

const Charts = ({ options }: ChartsProps) => {
  const dark = useAppStore((state) => state.dark)
  return (
    <ReactECharts
      option={options}
      theme={dark ? 'dark' : 'light'}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  )
}
export default Charts
