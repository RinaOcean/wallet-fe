import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { globalOperations } from '../../redux/global';
import { userOperations } from '../../redux/user';
import styles from './LogoutModal.module.css';

const modalRootRef = document.getElementById('modal-root');

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onConfirm = () => {
    dispatch(userOperations.logout());
    dispatch(globalOperations.closeLogoutModal());
  };

  const onClose = () => {
    dispatch(globalOperations.closeLogoutModal());
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      dispatch(globalOperations.closeLogoutModal());
    }
  };

  return createPortal(
    <div className={styles.Modal__backdrop} onClick={e => handleBackdropClick(e)}>
      <div className={styles.Modal__content}>
        <h2>Вы действительно хотите выйти?</h2>
        <div className={styles.buttonsGroup}>
          <button className={styles.buttonConfirm} onClick={onConfirm}>
            Да
          </button>
          <button className={styles.buttonConfirm} onClick={onClose}>
            Нет
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRootRef,
  );
};

export default Modal;
