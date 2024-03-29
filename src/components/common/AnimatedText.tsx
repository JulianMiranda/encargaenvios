import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface AnimatedTextProps {
  text: string;
  time?: number;
}

export const AnimatedText = ({text, time = 50}: AnimatedTextProps) => {
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLetters(prev => (prev < text.length ? prev + 1 : prev));
    }, time); // ajusta la velocidad de aparición de las letras según tus preferencias

    return () => clearInterval(timer);
  }, [text, time]);

  const visibleText = text.slice(0, visibleLetters);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{visibleText}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginHorizontal: 10, marginVertical: 10},
  text: {fontSize: 16, color: '#5f5f5f'},
});
