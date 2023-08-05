import React, {useContext, useState} from 'react';
import {Platform, Switch} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props {
  isOn: boolean;
  onChange: (value: boolean) => void;
}

export const CustomSwitch = ({isOn, onChange}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(isOn);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onChange(!isEnabled);
  };

  return (
    <Switch
      trackColor={{false: '#D9D9DB', true: colors.card}}
      thumbColor={Platform.OS === 'android' ? '#f1f1f1' : ''}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};
