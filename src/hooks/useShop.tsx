import {useState, useEffect, useContext} from 'react';
import {ShopContext} from '../context/shop/ShopContext';

export const useShop = () => {
  const {car, emptyCar, makeShop} = useContext(ShopContext);

  const [total, setTotal] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [handleOpt, setHandleOpt] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const confirmModal = () => {
    switch (handleOpt) {
      case 0:
        emptyCarConfirmed();
        break;

      default:
        break;
    }
  };
  const emptyCarConfirmed = () => {
    emptyCar();
    setOpenModal(false);
  };

  const makeShopFunction = () => {
    setHandleOpt(1);
    setTitle('¡¡¡Gracias por su compra!!!');
    setBody('Para confirmar contactaremos con un administrador');
    setOpenModal(true);
  };

  const emptyCarConfirm = () => {
    setHandleOpt(0);
    setTitle('Vaciar carrito');
    setBody('¿Está seguro que desea vaciar el carrito?');
    setOpenModal(true);
  };

  return {
    isLoading,
    total,
    openModal,
    title,
    body,
    handleOpt,
    description,
    confirmModal,
    emptyCarConfirm,
    makeShopFunction,
    setOpenModal,
  };
};
