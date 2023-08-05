import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import {CategoryCard} from './CategoryCard';
import {useNodePaginated} from '../../hooks/useNodePaginated';
import {Node} from '../../interfaces/Node.interface';
import {ModalizeContent} from './ModalizeContent';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/HomeStack';

interface Props {
  node: Node;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategoryScreen'> {}
const {height} = Dimensions.get('window');
export const NodeCarousel = ({node}: Props) => {
  const {categoryList, loadCategories} = useNodePaginated(node.id);

  const modalizeRef = useRef<Modalize>(null);
  const [indexCat, setIndexCat] = useState(0);

  const navigation = useNavigation<PropsNavigation>();
  return (
    <>
      {categoryList.length !== 0 && (
        <Text
          style={{
            fontSize: 22,
            marginBottom: 10,
            marginLeft: 15,
            fontWeight: 'bold',
            color: '#000',
          }}>
          {node.name}
        </Text>
      )}
      <FlatList
        /*     ListHeaderComponent={<Text>Categorías</Text>} */
        data={categoryList}
        keyExtractor={(category, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadCategories}
        onEndReachedThreshold={0.4}
        horizontal
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{}}
            onPress={() =>
              navigation.navigate('CategoryScreen', {
                category: item,
              })
            }>
            <CategoryCard category={item} />
          </TouchableOpacity>
        )}
        /* renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{}}
            onPress={() => {
              setIndexCat(index);
              modalizeRef.current?.open();
            }}>
            <CategoryCard category={item} />
          </TouchableOpacity>
        )} */
      />
      <Modalize
        /*  snapPoint={height * 0.8} */
        modalTopOffset={height * 0.01}
        ref={modalizeRef}
        HeaderComponent={
          <View>
            <Text>Header2</Text>
          </View>
        }>
        <ModalizeContent category={categoryList[indexCat]} />
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,

            alignSelf: 'center',
            borderRadius: 50,
            padding: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            width: 170,
            backgroundColor: colors.card,
          }}
          activeOpacity={0.8}
          onPress={() => {}}>
          <Text style={{}}>Añadir</Text>
        </TouchableOpacity> */}
      </Modalize>
    </>
  );
};
