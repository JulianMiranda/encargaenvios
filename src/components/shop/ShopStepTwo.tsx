import React from 'react';
import {GetInputCarnet} from './GetInputCarnet';
import {Carnet} from '../../interfaces/CarnetResponse.interface';

interface Props {
  carnets: Carnet[];
  isLoading: boolean;
  selectedCarnet: string[];
  setSelectedCarnet: (selectedCarnet: string[]) => void;
}

export const ShopStepTwo = ({
  carnets,
  isLoading,
  selectedCarnet,
  setSelectedCarnet,
}: Props) => {
  return (
    <>
      <GetInputCarnet
        carnets={carnets}
        isLoading={isLoading}
        selectedCarnet={selectedCarnet}
        setSelectedCarnet={setSelectedCarnet}
      />
    </>
  );
};
