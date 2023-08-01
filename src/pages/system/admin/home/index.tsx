import Charts from '@/components/charts'
import { MainHeader } from '@/components/main/header'
import { Main } from '@/components/main/main'
import { EChartsOption } from 'echarts'
import { Card } from 'tdesign-react/esm'
import { useSetLocale, useTranslate, useGetLocale } from '@refinedev/core'

const Index = () => {
  const options: EChartsOption = {
    grid: {
      //top: 0, right: 0, bottom: 0, left: 0,
      show: false,
    },
    xAxis: {
      //show: false,
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
      //show: false,
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  }
  const translate = useTranslate()
  return (
    <Main>
      <MainHeader></MainHeader>
      <div className='grid grid-cols-4 gap-4'>
        <div>
          <Card bordered>
            <div className='text-sm text-placeholder'>SALES {translate('common.search')}</div>
            <div className='text-2xl font-bold'>75%</div>
            <div className='h-100'>
              <Charts options={options} />
            </div>
          </Card>
        </div>
        <div></div>
        <div>1</div>
      </div>
    </Main>
  )
}
export default Index
