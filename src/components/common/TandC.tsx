import React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {TopScrollGradient} from './TopScrollGradient';
import {STRING} from '../../forkApps/forkApps';

const {height} = Dimensions.get('window');

export const TandC = () => {
  return (
    <>
      <TopScrollGradient title={`Información\nal comprar`}>
        <View style={{padding: 10}}>
          <Text style={{...styles.text, fontSize: 26, marginTop: 70}}>
            Estimado Cliente
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Algunos artículos pagan servicios de entrega y/o arancel de
            Aduanas en la moneda del país (CUP Cuba), sugerimos consultar la ley
            de Aduanas de Cuba antes de comprar,
            {STRING.app} NO se hace responsable de estos pagos.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Para consultar los valores de Aduanas de Cuba recomendamos
            descargar la aplicación móvil (Normas Aduaneras de Cuba).
          </Text>

          <Text style={{...styles.text, fontSize: 18}}>
            • Cada paquete tiene su código, es independiente a otro y así son
            tratados, por lo que pueden llegarle al destinatario en fechas
            diferentes.
          </Text>

          <Text style={{...styles.text, fontSize: 18}}>
            • Nuestros servicios de entrega son hasta el domicilio o hasta la
            oficina de Correos de Cuba más cercana a la dirección proporcionada,
            dicha entrega corre a cargos de Correos de Cuba.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Una vez la carga haya salido de nuestra agencia no hay devolución
            posible.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • {STRING.app} se hace responsable de sus envíos, una vez entregados
            a Aduanas de Cuba y sigan su curso de destino hasta su domicilio.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • {STRING.app} no se hace responsable de la manipulación sobre la
            fragilidad de la mercancía, de igual manera no brindamos garantía
            sobre el mal uso de ninguno de nuestros artículos.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Al recibir el paquete o bulto debe estar debidamente sellado, en
            caso de estar defectuoso, abierto, precintado, o presentar cualquier
            daño, es MUY IMPORTANTE no recibir el paquete o bulto, solicitar la
            comprobación del peso del mismo y comunicarse con nosotros para
            comenzar las reclamaciones pertinentes.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Si usted recibe y realiza el pago del arancel y/o servicio de
            entrega de su bulto o paquete da por aceptado su totalidad, una vez
            realizado esto no hay reclamación posible.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Informamos que nuestros servicios de envíos son de manera regular,
            lo que no nos permite indicar una fecha de entrega, nuestra
            paquetería llega a territorio nacional aproximadamente una semana
            después de despacho, no podemos influir en el curso de movilidad de
            las autoridades cubanas, ni de las empresas encargadas de la
            entrega.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Debe conservar la factura que se le envía a su correo para
            respaldar cualquier solicitud de información o reclamos.
          </Text>
          <Text style={{...styles.text, fontSize: 18}}>
            • Ante cualquier inconformidad o que detecte cobro doble o no
            autorizado en su tarjeta puede contactarnos y se le dará una
            respuesta sin necesidad de tramitar a través del banco los reclamos
            que son procesos demorados.
          </Text>

          <Text style={{...styles.text, fontSize: 18}}>
            • Los reclamos deben estar respaldados con los justificantes que se
            indican en los Términos y Condiciones del Servicios.
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
