import {
  FC,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useRouter } from 'next/router'

import { Input } from 'components'

import s from './search.module.scss'

interface SearchProps {
  onClose: () => void
}

const Search: FC<SearchProps> = ({ onClose }) => {
  const ref = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')

  const { push } = useRouter()

  const onClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref?.current
    if (!el || el.contains(event.target as Node)) return
    onClose()
  }

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && inputValue !== '') {
      push(`/doctors?search=${inputValue}`)
      onClose()
    }
  }

  useEffect(() => {
    if (!ref) return
    ref.current?.focus()
  }, [ref])

  return (
    <div className={s.container} onClick={onClickOutside}>
      <Input
        ref={ref}
        onKeyDown={handleSubmit}
        placeholder='Поиск врача по специальности'
        inputClassName={s.input}
        isSearch
        value={inputValue}
        onChange={setInputValue}
      />
    </div>
  )
}

export default Search
