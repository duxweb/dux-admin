import { ChartBar, ChartLine, ChartArea, ChartRing } from '@/components/charts'
import { MainHeader } from '@/components/main/header'
import { Main } from '@/components/main/main'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { StatsChart } from '@/components/dashboard/StatsChart'
import { Card, Link, Space } from 'tdesign-react/esm'
import Descriptions from '@/components/descriptions'
import MediaText from '@/components/mediaText'
import { List } from '@/components/list'
import { useTranslate } from '@refinedev/core'

const Index = () => {
  const translate = useTranslate()

  const demoData = [100, 300, 200, 600, 200, 400, 800]

  const avatarUrl = 'https://tdesign.gtimg.com/list-icon.png'
  const listData = [
    { id: 1, content: '列表内容列表内容列表内容' },
    { id: 2, content: '列表内容列表内容列表内容' },
    { id: 3, content: '列表内容列表内容列表内容' },
    { id: 4, content: '列表内容列表内容列表内容' },
    { id: 5, content: '列表内容列表内容列表内容' },
    { id: 6, content: '列表内容列表内容列表内容' },
    { id: 7, content: '列表内容列表内容列表内容' },
    { id: 8, content: '列表内容列表内容列表内容' },
  ]

  return (
    <Main>
      <MainHeader></MainHeader>
      <div className='grid mb-4 gap-4 lg:grid-cols-2 xl:grid-cols-4'>
        <div>
          <StatsChart name={translate('system.SourceRate')} data={'1,000'}>
            <div className='h-46.5'>
              <ChartRing
                data={[
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                ]}
                single
              />
            </div>
          </StatsChart>
        </div>
        <div>
          <StatsChart name='商品数量' data={'1,000'}>
            <div className='h-46.5'>
              <ChartRing
                data={[
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                ]}
              />
            </div>
          </StatsChart>
        </div>
        <div className='grid gap-4 lg:col-span-2 lg:grid-cols-2'>
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
      </div>

      <div className='grid mb-4 gap-4 md:grid-cols-2'>
        <div>
          <Card bordered title='Overall User Acquisition'>
            <div className='h-100'>
              <ChartBar
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                data={[
                  { name: 'test', data: demoData },
                  { name: 'test2', data: demoData },
                ]}
                legend
              />
            </div>
          </Card>
        </div>
        <div>
          <Card bordered title='Overall User Acquisition'>
            <div className='h-100'>
              <ChartBar
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                data={[
                  { name: 'test', data: demoData },
                  { name: 'test2', data: demoData },
                ]}
                legend
              />
            </div>
          </Card>
        </div>
      </div>

      <div className='grid mb-4 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <div className='md:col-span-2'>
          <Card bordered title='Top Revenue Generators'>
            <List>
              <List.Item append={'$ 400.00'}>
                <MediaText>
                  <MediaText.Image src='https://i.pravatar.cc/300' />
                  <MediaText.Title>Here is the title</MediaText.Title>
                  <MediaText.Desc>This is a text description</MediaText.Desc>
                </MediaText>
              </List.Item>
              <List.Item append={'$ 400.00'}>
                <MediaText>
                  <MediaText.Image src='https://i.pravatar.cc/300' />
                  <MediaText.Title>Here is the title</MediaText.Title>
                  <MediaText.Desc>This is a text description</MediaText.Desc>
                </MediaText>
              </List.Item>
              <List.Item append={'$ 400.00'}>
                <MediaText>
                  <MediaText.Image src='https://i.pravatar.cc/300' />
                  <MediaText.Title>Here is the title</MediaText.Title>
                  <MediaText.Desc>This is a text description</MediaText.Desc>
                </MediaText>
              </List.Item>
              <List.Item append={'$ 400.00'}>
                <MediaText>
                  <MediaText.Image src='https://i.pravatar.cc/300' />
                  <MediaText.Title>Here is the title</MediaText.Title>
                  <MediaText.Desc>This is a text description</MediaText.Desc>
                </MediaText>
              </List.Item>
              <List.Item append={'$ 400.00'}>
                <MediaText>
                  <MediaText.Image src='https://i.pravatar.cc/300' />
                  <MediaText.Title>Here is the title</MediaText.Title>
                  <MediaText.Desc>This is a text description</MediaText.Desc>
                </MediaText>
              </List.Item>
            </List>
          </Card>
        </div>
        <div>
          <Card bordered title='Top Revenue Generators'>
            <List>
              {listData.map((item) => (
                <List.Item
                  key={item.id}
                  append={
                    <Space>
                      <div className='font-bold'>$400.00</div>
                      <div className='h-6'>
                        <ChartArea
                          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                          data={[{ name: 'test', data: demoData }]}
                          min
                        />
                      </div>
                    </Space>
                  }
                >
                  <div className='text-secondary'>列表内容的描述性文字</div>
                </List.Item>
              ))}
            </List>
          </Card>
        </div>
        <div>
          <Card bordered title='Top Revenue Generators'>
            <List>
              {listData.map((item) => (
                <List.Item
                  key={item.id}
                  append={
                    <Space>
                      <div className='font-bold'>$400.00</div>
                      <div className='h-6'>
                        <ChartArea
                          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                          data={[{ name: 'test', data: demoData }]}
                          min
                        />
                      </div>
                    </Space>
                  }
                >
                  <div className='text-secondary'>列表内容的描述性文字</div>
                </List.Item>
              ))}
            </List>
          </Card>
        </div>
      </div>
    </Main>
  )
}
export default Index
