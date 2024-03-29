import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TopScrollGradient} from './TopScrollGradient';
import {STRING} from '../../forkApps/forkApps';

const {height} = Dimensions.get('window');

export const AboutApp = () => {
  return (
    <>
      <TopScrollGradient title="Quiénes somos">
        <View style={{padding: 10}}>
          <Text style={{...styles.text, fontSize: 26, marginTop: 70}}>
            Bienvenido a {STRING.app}
          </Text>

          <Text style={{...styles.text18}}>
            En {STRING.app}, nos complace darte la bienvenida a un mundo de
            innovación, estilo y comodidad para los cubanos. Somos más que una
            tienda en línea; somos tu destino para descubrir productos
            excepcionales y vivir una experiencia de compra y ayuda familiar
            enriquecedora desde la comodidad de tu hogar.
          </Text>
          <Text style={{...styles.text18}}>
            Nuestra misión es simple: ser el puente que une a las familias
            cubanas a través de distancias geográficas, brindando un apoyo
            esencial y reconfortante mediante envíos a Cuba. Nos esforzamos por
            ser el vínculo que mantiene a las familias conectadas, facilitando
            la entrega de amor, cuidado y productos vitales de una manera
            eficiente y afectuosa. Nuestra misión es ser reconocidos como un
            socio confiable y compasivo que contribuye a fortalecer los lazos
            familiares, incluso cuando la distancia física separa a seres
            queridos. Resaltamos la importancia de mantener conexiones
            familiares a través de envíos de ayuda. Ponemos énfasis en el papel
            de nuestro equipo en proporcionar apoyo emocional y práctico a las
            familias que están separadas geográficamente. Además, enfatiza el
            deseo de ser un socio confiable y compasivo que impacta
            positivamente en la vida de los cubanos al brindarles la oportunidad
            de estar presentes en la vida de sus seres queridos a pesar de la
            distancia.
          </Text>
          <Text style={{...styles.text18}}>
            En {STRING.app}, aspiramos a ser líderes en la industria de
            logística y envíos hacia Cuba, impulsando la innovación y la
            excelencia en cada paso del camino. Nuestra visión es crear
            comodidades para que los cubanos estén más conectados y el mundo les
            sea accesible, donde las distancias no sean una barrera y donde las
            soluciones logísticas sean sinónimo de eficiencia y confiabilidad.
            Buscamos transformar la forma en que los cubanos y las pequeñas y
            medianas empresas cubanas experimentan la importación de mercancías,
            brindando soluciones personalizadas, tecnología avanzada y un
            servicio al cliente excepcional. Alcanzaremos nuestra visión a
            través de un compromiso constante con la mejora continua, la
            sostenibilidad y la creación de valor duradero para nuestros
            clientes, colaboradores y comunidades en todo el mundo.
          </Text>
          <Text style={{...styles.text18}}>
            Lo que nos distingue es nuestra dedicación a la calidad, la
            autenticidad y la satisfacción del cliente. Cada producto que
            encontrarás aquí ha sido seleccionado por su excelencia y
            originalidad. Valoramos tu tiempo y confianza, por lo que hemos
            diseñado una plataforma de compra intuitiva y segura para que puedas
            explorar, seleccionar y comprar con total tranquilidad.
          </Text>
          <Text style={{...styles.text18}}>
            Nuestro equipo está comprometido en tu satisfacción. Desde el
            momento en que navegues por nuestras categorías hasta el momento en
            que tu familia reciba tu pedido, estamos aquí para brindarte
            asistencia y apoyo en cada paso del camino. Queremos que tu
            experiencia de compra sea fluida, emocionante y memorable.
          </Text>
          <Text style={{...styles.text18}}>
            Además, {STRING.app} está en constante evolución. Estamos atentos a
            las últimas tendencias y novedades del mercado para asegurarnos de
            ofrecerte productos que enriquezcan la vida de tus seres queridos.
            Siempre estamos abiertos a tus comentarios y sugerencias, ya que
            creemos que nuestros clientes, son la fuerza impulsora detrás de
            nuestro crecimiento y mejora continua.
          </Text>
          <Text style={{...styles.text18}}>
            Te invitamos a explorar nuestra amplia gama de productos y
            sumergirte en una experiencia de compra en línea que supera tus
            expectativas. Desde electrodomésticos hasta alimentos y
            medicamentos; {STRING.app} es tu ventana de acercamiento a tu
            familia.
          </Text>
          <Text style={{...styles.text18}}>
            ¡Gracias por visitar {STRING.app}! Esperamos que disfrutes de tu
            experiencia de compra y que encuentres productos que mejoren tu
            felicidad y la de los tuyos. ¡Bienvenido a nuestra familia en línea!
          </Text>
          <Text style={{...styles.text18}}>Con gratitud y entusiasmo,</Text>
          <Text style={{...styles.text18}}>{STRING.app}</Text>
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
  text18: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'left',
    marginVertical: 20,
    color: '#000',
  },
});
