import { FC, KeyboardEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Heading, Input, Map } from 'components'

import s from './addressForm.module.scss'

type AddressFormState = {
  address: string
  apartment: string
  floor: string
  intercom: string
  entrance: string
}

const addressFormLabels: AddressFormState = {
  address: 'Адрес проживания',
  apartment: 'Квартира',
  floor: 'Этаж',
  intercom: 'Домофон',
  entrance: 'Подъезд',
}

const addressFormValues: AddressFormState = {
  address: '',
  apartment: '',
  floor: '',
  intercom: '',
  entrance: '',
}

interface AddressFormProps {
  onConfirm: () => void
}

const AddressForm: FC<AddressFormProps> = ({ onConfirm }) => {
  const [isEdit, setIsEdit] = useState<boolean>(true)
  const [currentAddress, setCurrentAddress] =
    useState<AddressFormState>(addressFormValues)

  const { control, handleSubmit } = useForm<AddressFormState>({
    defaultValues: addressFormValues,
  })

  const onSubmit = (data: AddressFormState) => {
    console.log(data)
    setCurrentAddress(data)
    setIsEdit(prev => !prev)
  }

  const checkKeyDown = (e: KeyboardEvent) =>
    e.code === 'Enter' && e.preventDefault()

  const FillAddress = () => (
    <form className={s.formInnerWrap} onKeyDown={checkKeyDown}>
      {Object.entries(addressFormLabels).map(([name, label]) => (
        <Controller
          key={name}
          name={name as keyof AddressFormState}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label={label}
              value={value}
              onChange={onChange}
              className={name === 'address' ? s.long : ''}
              inputClassName={s.input}
            />
          )}
        />
      ))}
      <Button onClick={handleSubmit(onSubmit)}>
        Сохранить адрес
      </Button>
    </form>
  )

  const ConfirmAddress = () => (
    <>
      <div className={s.addressWrapper}>
        <p className={s.addressLabel}>Текущий адрес</p>
        <p className={s.addressContent}>
          г. {currentAddress.address}, кв.
          {currentAddress.apartment}
        </p>
      </div>
      <Button onClick={onConfirm} className={s.addressButton}>
        ВЫБРАТЬ ТЕКУЩИЙ АДРЕС
      </Button>
      <Button onClick={handleSubmit(onSubmit)} variant='outline'>
        УКАЗАТЬ НОВЫЙ АДРЕС
      </Button>
    </>
  )

  return (
    <section className={s.container}>
      <div className={s.formWrapper}>
        <Heading As='h3' className={s.heading}>
          Адрес
        </Heading>
        {isEdit ? <FillAddress /> : <ConfirmAddress />}
      </div>

      <Map address={currentAddress.address || 'Самара'} hideMarker />
    </section>
  )
}

export default AddressForm
