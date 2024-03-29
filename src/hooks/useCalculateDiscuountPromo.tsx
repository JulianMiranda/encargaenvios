import {useContext, useEffect, useState} from 'react';
import {CarItemProps} from '../interfaces/Shop.Interface';
import {AuthContext} from '../context/auth/AuthContext';
import {ShopContext} from '../context/shop/ShopContext';
import {calcularCombo} from '../utils/calculateCost';

export const useCalculateDiscountPromo = () => {
  const {car, combo, pesoTotal, discountPromo, costoTotal, priceTotal} =
    useContext(ShopContext);
  const {prices} = useContext(AuthContext);

  const [articulosInPromo, setArticulosInPromo] = useState<CarItemProps[]>([]);
  const [discountTotalPromo, setDiscountTotalPromo] = useState<number>(0);
  const [discountComboPromo, setDiscountComboPromo] = useState<number>(0);
  const [calculationsDiscountComplete, setCalculationsDiscountComplete] =
    useState<boolean>(false);
  const [calculationsComplete, setCalculationsComplete] =
    useState<boolean>(false);
  const [totalDescuentos, setTotalDescuentos] = useState<number>(0);
  const [totalFinal, setTotalFinal] = useState<number>(0);

  useEffect(() => {
    if (calculationsDiscountComplete) {
      const sumaDescuentos = discountTotalPromo + discountComboPromo;
      const totalFinalCalculado =
        priceTotal +
        calcularCombo({costoTotal, pesoTotal, prices}) -
        sumaDescuentos;
      if (totalFinalCalculado < discountPromo.minDiscount) {
        setTotalDescuentos(0);
        setTotalFinal(totalFinalCalculado + sumaDescuentos);
      } else if (sumaDescuentos > discountPromo.maxDiscount) {
        setTotalDescuentos(discountPromo.maxDiscount);
        setTotalFinal(totalFinalCalculado);
      } else {
        setTotalDescuentos(sumaDescuentos);
        setTotalFinal(totalFinalCalculado);
      }
      setCalculationsComplete(true);
    }
  }, [
    calculationsDiscountComplete,
    priceTotal,
    costoTotal,
    pesoTotal,
    prices,
    discountTotalPromo,
    discountComboPromo,
    discountPromo,
  ]);

  useEffect(() => {
    const nodosPromocion = new Set(discountPromo.nodes);
    const CategInDiscount = car.filter(item =>
      item.category.nodes.some(node => {
        if (node && typeof node.id === 'string') {
          return nodosPromocion.has(node.id);
        }
        return false;
      }),
    );

    const totalDiscounCateg = CategInDiscount.reduce((total, articulo) => {
      const precioUnitario =
        articulo.category.priceDiscount !== 0
          ? articulo.category.priceDiscount
          : articulo.category.price;
      return total + precioUnitario * articulo.cantidad;
    }, 0);
    setArticulosInPromo(CategInDiscount);
    setDiscountTotalPromo(totalDiscounCateg * discountPromo.discount);

    const subcategoriasConDescuento = combo.filter(
      item =>
        item.subcategory.nodes &&
        item.subcategory.nodes.some(node => discountPromo.nodes.includes(node)),
    );
    const totalSubcategInDiscount = subcategoriasConDescuento.reduce(
      (total, item) => {
        if (item.subcategory.nodes) {
          return total + item.subcategory.cost * item.cantidad;
        } else {
          return total;
        }
      },
      0,
    );
    if (totalSubcategInDiscount !== 0) {
      const totalSubcatDiscount = calcularCombo({
        costoTotal: totalSubcategInDiscount,
        pesoTotal,
        prices,
      });
      setDiscountComboPromo(totalSubcatDiscount * discountPromo.discount);
    }
    setCalculationsDiscountComplete(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car, combo, pesoTotal]);

  useEffect(() => {
    if (calculationsDiscountComplete) {
    }
  }, [calculationsDiscountComplete, discountTotalPromo, discountComboPromo]);

  return {
    articulosInPromo,
    discountTotalPromo,
    discountComboPromo,
    calculationsComplete,
    totalDescuentos,
    totalFinal,
  };
};
