import { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'

import { Icon } from 'components'
import { IconType } from 'shared/types/icon'

import s from './modal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  closeVariant?: IconType
  closeClassName?: string
}

interface ReactPortal {
  children: ReactNode
  wrapperId: string
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  closeClassName,
  closeVariant = 'cross',
}) => {
  const createModalWrapper = (wrapperId: string) => {
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id', wrapperId)
    document.body.appendChild(wrapperElement)
    return wrapperElement
  }

  const ReactPortal = ({
    children,
    wrapperId = 'react-portal-wrapper',
  }: ReactPortal) => {
    const [wrapperElement, setWrapperElement] =
      useState<HTMLElement | null>(null)

    useEffect(() => {
      let element = document.getElementById(wrapperId)
      let systemCreated = false

      if (!element) {
        systemCreated = true
        element = createModalWrapper(wrapperId)
      }
      setWrapperElement(element)

      return () => {
        if (systemCreated && element?.parentNode) {
          element.parentNode.removeChild(element)
        }
      }
    }, [wrapperId])

    if (wrapperElement === null) return null

    return createPortal(children, wrapperElement)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const modalClass = cn(s.modal, { [s.active]: isOpen })

  return (
    <ReactPortal wrapperId='modal__root'>
      <div className={modalClass} onClick={onClose}>
        <div
          className={cn(s.modalContent, className)}
          onClick={event => event.stopPropagation()}
        >
          <Icon
            className={cn(s.close, closeClassName)}
            onClick={onClose}
            variant={closeVariant}
            width={16}
            height={16}
          />
          {children}
        </div>
      </div>
    </ReactPortal>
  )
}

export default Modal
