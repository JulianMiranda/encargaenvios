import React from 'react';
import {Dimensions} from 'react-native';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TopScrollGradient} from './TopScrollGradient';
import {STRING} from '../../forkApps/forkApps';

const {height} = Dimensions.get('window');

export const TandC = () => {
  return (
    <>
      <TopScrollGradient title="Términos">
        <View style={{padding: 10}}>
          <Text style={{...styles.text, fontSize: 26, marginTop: 70}}>
            Estimado Cliente
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Cada persona residente en Cuba puede recibir 500 puntos al año.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Correos de Cuba cobrará un una tarifa de entrega que deberá ser
            pagada a la hora de retirar el paquete en la Oficina de Correo de
            Cuba.
          </Text>

          <Text style={{...styles.text, fontSize: 18}}>
            • Para consultar los valores de Aduanas de Cuba recomendamos
            descargar la aplicación móvil NAC (Normas Aduaneras de Cuba).
          </Text>

          <Text style={{...styles.text, fontSize: 18}}>
            • Una vez enviados sus paquetes se le actualizarán los códigos de
            seguimiento de sus paquetes que se verán reflejados en la sección de
            Rastreo.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Cada paquete tiene su código, es independiente a otro y así son
            tratados, por lo que pueden llegarle al destinatario en fechas
            diferentes.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Los servicios de entrega son hasta el domicilio de la persona que
            recibe, dicha entrega corre a cargo de Correos de Cuba.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Una vez la carga haya salido de nuestra agencia no hay devolución
            posible.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • {STRING.app} Envios se hace responsable de sus envíos, una vez
            entregados a Aduanas de Cuba y sigan su curso de destino hasta su
            domicilio.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Algunos artículos pagan servicios de aduanas en la moneda del país
            (CUP Cuba) y algunos electrodomésticos además pagan aranceles, por
            lo que sugerimos consultar la ley de aduana antes de comprar,{' '}
            {STRING.app}
            Envios NO se hace responsable de estos pagos.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Al recibir el paquete o bulto debe estar debidamente sellado, debe
            pedir al agente de Correos de Cuba comprobación de peso si tiene
            alguna duda.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • En caso de estar su paquete abierto, precintado, o con algún daño
            no debe recibir el paquete; en este caso comunicarse con nosotros.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Informamos que existen atrasos con los servicios de entrega de
            paquetería, debido a las complicaciones de la pandemia del covid-19,
            por lo que no podemos indicarle una fecha exacta en la entrega de
            sus paquetes.
          </Text>

          <Text style={{...styles.text, fontSize: 18}}>
            • En su perfil de cliente ubicado en la parte inferior derecha de
            nuestra pantalla podrá encontrar:
          </Text>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.acamue.aduanadecuba',
              )
            }>
            <Text
              style={{
                ...styles.text,
                fontSize: 18,
                textAlign: 'center',
                color: '#3366BB',
              }}>
              Descargar Normas Aduaneras Cubanas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.correos.cu/rastreador-de-envios/')
            }>
            <Text
              style={{
                ...styles.text,
                fontSize: 18,
                textAlign: 'center',
                color: '#3366BB',
              }}>
              Rastreo de Correos de Cuba
            </Text>
          </TouchableOpacity>

          <Text style={{...styles.text, fontSize: 20, textAlign: 'right'}}>
            Agradecemos su confianza
          </Text>
          <Text style={{...styles.text, fontSize: 20, textAlign: 'right'}}>
            Gracias por preferir {STRING.app} Envios
          </Text>
        </View>
        <View
          style={{
            height: height * 0.2,
          }}
        />
      </TopScrollGradient>
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'left',
    marginVertical: 20,
    color: '#000',
  },
});
