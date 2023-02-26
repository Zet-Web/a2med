import { FC } from 'react'
import { useRouter } from 'next/router'

import {
  CertificateForm,
  Bonuses,
  DeleteAccount,
  FaqList,
  Family,
  MyCreditCards,
  PaymentStory,
  ProfileForm,
  ProfileMenu,
  SettingsScreen,
  ChangePassword,
} from 'features'
import { UnavailableService } from 'components'

import s from './profilePage.module.scss'

export const ProfilePage: FC = () => {
  const initialTab = Number(useRouter().query.tab) || 0

  return (
    <div className={s.container}>
      <ProfileMenu initialTab={initialTab}>
        <ProfileForm />
        <Family />
        <PaymentStory />
        {/*<MyCreditCards />*/}
        {/* <Bonuses /> */}
        <UnavailableService
          text={''}
          title={'Услуга появится позже'}
        />
        <CertificateForm />
        <SettingsScreen>
          <FaqList />
          <ChangePassword />
          <DeleteAccount id={2} />
        </SettingsScreen>
      </ProfileMenu>
    </div>
  )
}
