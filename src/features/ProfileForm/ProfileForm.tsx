import { useEffect, useState } from 'react'

import { Button, Heading, Icon } from 'components'
import PassportForm from './PassportForm/PassportForm'
import { ReadProfile } from './ReadProfile/ReadProfile'
import { EditProfile } from './EditProfile/EditProfile'

import { useGetProfile } from 'shared/hooks/useGetProfile'
import { Profile, ProfileFormState } from 'shared/types/profile'

import s from './profileForm.module.scss'
import { useAppSelector } from 'store/hooks'

const setProfile = (profile: Profile | null): ProfileFormState => ({
  surname: profile?.surname || '',
  name: profile?.name || '',
  patronymic: profile?.patronymic || '',
  passport_without_paronymic:
    profile?.passport_without_paronymic || false,
  email: profile?.email || '',
  birthday: profile?.birthday || null,
  gender: profile?.gender || 0,
  phone_number: profile?.phone_number || '',
})

const ProfileForm = () => {
  const profile = useGetProfile()

  const [currentData, setCurrentData] = useState<ProfileFormState>(
    setProfile(profile)
  )
  const { phoneNumber } = useAppSelector(state => state.profileNumber)

  useEffect(() => {
    // setCurrentData(setProfile(profile))                        //TODO
    setCurrentData({ ...currentData, phone_number: phoneNumber }) //TODO
  }, [profile])

  const [isEdited, setIsEdited] = useState<boolean>(false)
  const handleIsEdited = () => setIsEdited(prev => !prev)

  const [isPassportForm, setIsPassportForm] = useState<boolean>(false)
  const handlePassportForm = () => setIsPassportForm(prev => !prev)

  return isPassportForm ? (
    <PassportForm onClose={handlePassportForm} />
  ) : (
    <section className={s.container}>
      <Heading As='h3' className={s.heading}>
        Мой профиль
      </Heading>

      <div className={s.passport}>
        <div className={s.alert}>
          <Icon variant='warning' width={26} height={26} />
          <div>
            <p className={s.caption}>
              Сэкономьте время в регистратуре
            </p>
            <p className={s.text}>
              Заполните свои паспортные данные заранее
            </p>
          </div>
        </div>
        <Button
          variant='outline'
          className={s.button}
          onClick={handlePassportForm}
        >
          Заполнить
        </Button>
      </div>

      {isEdited ? (
        <EditProfile
          currentData={currentData}
          onEdit={handleIsEdited}
        />
      ) : (
        <ReadProfile
          currentData={currentData}
          onEdit={handleIsEdited}
        />
      )}
    </section>
  )
}

export default ProfileForm
