import { FC, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { ClinicCard, Heading, Input, Map } from 'components'

// TODO нет часов работы на бэкэнде
import { ClinicFull } from 'shared/types/clinic'
import { getClinicsList } from 'shared/api/routes/clinics'
import { handleError } from 'shared/utils/handleError'
import { mock_clinics } from 'shared/mocks/mock_clinics'

import s from './clinicsPage.module.scss'

const ClinicsPage: FC = () => {
  const { push } = useRouter()
  const handleClick = (id: number) => push(`/clinics/${id}`)

  const [clinics, setClinics] = useState<ClinicFull[]>([])

  const [searchValue, setSearchValue] = useState<string>('')
  const handleSearch = (value: string) => setSearchValue(value)

  const [address, setAddress] = useState<string>('')
  const handleAddress = (value: string) =>
    setAddress(`г. Самара ${value}`)

  const getClinics = async () => {
    try {
      const { data } = await getClinicsList()
      setClinics(data.result.data)
      // setClinics(mock_clinics)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    getClinics()
  }, [])

  const filterClinics = useMemo(() => {
    return clinics.filter(
      cl =>
        cl.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        cl.address.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [clinics, searchValue])

  return (
    <div className={s.container}>
      <Heading As='h1' className={s.title}>
        Клиники
      </Heading>

      <div className={s.content}>
        <div className={s.clinicsBlock}>
          <Input
            isSearch
            placeholder='Название клиники'
            value={searchValue}
            className={s.inputWrapper}
            inputClassName={s.input}
            onChange={handleSearch}
          />
          <div className={s.clinics}>
            {filterClinics.length ? (
              filterClinics.map(clinic => (
                <ClinicCard
                  key={clinic.id}
                  onClick={handleClick}
                  onMarkerClick={handleAddress}
                  clinic={clinic}
                />
              ))
            ) : (
              <Heading As='h3'>Ничего не найдено</Heading>
            )}
          </div>
        </div>
        <Map address={address} />
      </div>
    </div>
  )
}

export default ClinicsPage
