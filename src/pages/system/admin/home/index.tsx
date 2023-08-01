import { ChartBar, ChartLine, ChartArea } from '@/components/charts'
import { MainHeader } from '@/components/main/header'
import { Main } from '@/components/main/main'
import { StatsCard } from '@/components/dashboard/StatsCard'

const Index = () => {
  const demoData = [100, 300, 200, 600, 200, 400, 800]
  return (
    <Main>
      <MainHeader></MainHeader>
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <div>
          <StatsCard name='销售额' icon='i-tabler:report-money' data={demoData}>
            <ChartBar
              labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
              data={[{ name: 'test', data: demoData }]}
              min
            />
          </StatsCard>
        </div>
        <div>
          <StatsCard name='用户量' icon='i-tabler:users' data={demoData}>
            <ChartArea
              labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
              data={[{ name: 'test', data: demoData }]}
              min
            />
          </StatsCard>
        </div>
        <div>
          <StatsCard name='商品量' icon='i-tabler:basket ' data={demoData}>
            <ChartLine
              labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
              data={[{ name: 'test', data: demoData }]}
              min
            />
          </StatsCard>
        </div>
        <div>
          <StatsCard name='供货量' icon='i-tabler:box-seam ' data={demoData}>
            <ChartBar
              labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
              data={[{ name: 'test', data: demoData }]}
              min
            />
          </StatsCard>
        </div>
      </div>
    </Main>
  )
}
export default Index
