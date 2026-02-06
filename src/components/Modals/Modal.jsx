import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children ,modalClass}) => {
	const dialogRef = useRef(null);

	useEffect(() => {
		if (dialogRef.current) {
			if (isOpen) {
				dialogRef.current.showModal();
			} else {
				dialogRef.current.close();
			}
		}
	}, [isOpen]);
	return (
		<dialog ref={dialogRef} onCancel={onClose} className={modalClass}>
			<div>{children}</div>
		</dialog>
	);
};

export default Modal;
