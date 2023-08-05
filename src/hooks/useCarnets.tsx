import {useState, useEffect, useContext} from 'react';
import api from '../api/api';
import {AuthContext} from '../context/auth/AuthContext';
import {ShopContext} from '../context/shop/ShopContext';
import {Carnet, CarnetResponse} from '../interfaces/CarnetResponse.interface';

export const useCarnets = () => {
  const {user} = useContext(AuthContext);
  const {car} = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);
  const [carnets, setCarnets] = useState<Carnet[]>([]);

  const cantCarnets = (): number => {
    let puntos = 0;
    car.map(carItem => {
      puntos += carItem.category.point * carItem.cantidad;
    });
    return Math.ceil(puntos / 10);
  };

  const loadCarnets = async () => {
    const body = {
      filter: {user: ['=', user?.id], status: ['=', true]},
    };
    try {
      const resp = await api.post<CarnetResponse>('/carnets/getList', body);
      setCarnets(resp.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const deleteCarnet = async (id: string) => {
    setIsLoading(true);
    try {
      const resp = await api.put<boolean>(`/carnets/update/${id}`, {
        status: false,
      });
      loadCarnets();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCarnets();
  }, []);

  return {
    isLoading,
    carnets,
    loadCarnets,
    deleteCarnet,
    cantCarnets,
  };
};
