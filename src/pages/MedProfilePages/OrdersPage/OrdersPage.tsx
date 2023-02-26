import { FC } from 'react'

import { Tabs } from 'features'
import { Heading } from 'components'
import { DoctorsTab } from './Tabs/DoctorsTab'
import { HomeTab } from './Tabs/HomeTab'
import { AnalysesTab } from './Tabs/AnalysesTab'

import { MED_PROFILE_TABS } from 'shared/constants/medProfileTabs'

import s from './ordersPage.module.scss'

export const OrdersPage: FC = () => (
  <div className={s.container}>
    <Heading className={s.heading}>Мед.книжка</Heading>

    <Tabs tabLinks={MED_PROFILE_TABS}>
      <DoctorsTab />
      <HomeTab />
      <AnalysesTab />
    </Tabs>
  </div>
)
