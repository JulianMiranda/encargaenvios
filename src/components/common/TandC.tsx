import React from 'react';
import {Dimensions} from 'react-native';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TopScrollGradient} from './TopScrollGradient';

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
            • Cada persona residente en Cuba puede recibir 30 paquetes al año,
            divididos en 10 cada dos meses.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • El peso máximo de cada paquete de misceláneas es de 1.50
            kilogramos, con un costo de X USD por paquete.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Los artículos que excedan los 1.50 kilogramos tienen un costo
            mayor de envío según su peso y volumen, dichos artículos no pueden
            exceder los 200 puntos en valor de Aduanas de Cuba.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Para consultar los valores de Aduanas de Cuba recomendamos
            descargar la aplicación móvil NAC (Normas Aduaneras de Cuba).
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Ofrecemos artículos para comercio y para consumo personal, el
            precio varía en dependencia de la cantidad de artículos
            seleccionados.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Consideramos una compra por mayor para comercio a partir de seis
            (6) piezas del mismo artículo, ó a partir de 5 paquetes en su
            pedido.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Al realizar compras por mayor las marcas, colores, números,
            tallas, etc, son surtidas.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Las fotos exhibidas en nuestra app de ventas son referenciales, le
            puede variar el color y la marca, nunca le variará la talla, número
            o calidad del producto.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Una vez enviados sus paquetes se le enviarán los códigos de
            seguimiento de sus paquetes de manera instantánea.
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
            • baria Envios se hace responsable de sus envíos, una vez entregados
            a Aduanas de Cuba y sigan su curso de destino hasta su domicilio.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Algunos artículos pagan servicios de aduanas en la moneda del país
            (CUP Cuba) y algunos electrodomésticos además pagan aranceles, por
            lo que sugerimos consultar la ley de aduana antes de comprar, baria
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
            • Con gusto le atenderemos por mensajes de texto al WhatsApp
            +593992918332 o +593995687985, o al correo bariaenvios@gmail.com
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
            Gracias por preferir baria Envios
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
