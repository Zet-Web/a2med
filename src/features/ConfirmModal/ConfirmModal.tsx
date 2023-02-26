import { FC, useState } from 'react'

import { Button, Heading, Modal } from 'components'

import s from './confirmModal.module.scss'

interface ConfirmModalProps {
  label: string
  title: string
  description: string
  confirmButtonLabel: string
  onConfirm: () => void
  cancelButtonLabel?: string
  onCancel?: () => void
  disabled?: boolean
  className?: string
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  label,
  title,
  description,
  confirmButtonLabel,
  onConfirm,
  cancelButtonLabel,
  onCancel,
  disabled,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  const handleConfirm = () => {
    onConfirm()
    handleClose()
  }
  const handleCancel = () => {
    onCancel?.()
    handleClose()
  }

  return (
    <>
      <Button
        className={className}
        disabled={disabled}
        onClick={handleOpen}
      >
        {label}
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCancel}>
        <div className={s.content}>
          <Heading As={'h4'} className={s.caption}>
            {title}
          </Heading>
          <p className={s.description}>{description}</p>

          <div className={s.buttonsWrapper}>
            <Button
              className={s.confirmButton}
              onClick={handleConfirm}
            >
              {confirmButtonLabel}
            </Button>
            {cancelButtonLabel ? (
              <Button
                className={s.confirmButton}
                variant='outline'
                onClick={handleCancel}
              >
                {cancelButtonLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ConfirmModal
