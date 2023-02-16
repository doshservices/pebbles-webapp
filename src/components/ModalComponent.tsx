import React, { ReactNode } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const ModalComponent = ({
	children,
	open,
	toggle,
	title,
	className,
	size,
}: {
	children: ReactNode
	open: boolean
	toggle: () => void
	title: string
	className: string
	size: string
}) => {
	return (
		<>
			<Modal isOpen={open} size={size} toggle={toggle}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody className={className}>{children}</ModalBody>
			</Modal>
		</>
	)
}

export default ModalComponent
