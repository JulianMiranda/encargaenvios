import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BackButton} from '../../components/common/BackButton';
import {NoPropsInvited} from '../../components/common/NoPropsInvited';
import {AuthContext} from '../../context/auth/AuthContext';
import {RootStackParams} from '../../navigator/AccountStack';
import {useOrders} from '../../hooks/useOrders';
import {OrderCard} from '../../components/account/OrderCard';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useOrdersPaginated} from '../../hooks/useOrdersPaginated';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'AccountScreen'> {}

export const TrackScreen = () => {
  const navigation = useNavigation<PropsNavigation>();
  const {orders, loadOrders, isLoading} = useOrdersPaginated();

  const {status} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  if (status !== 'authenticated') {
    return (
      <>
        <BackButton navigation={navigation} />
        <NoPropsInvited />
      </>
    );
  }

  return (
    <>
      <BackButton navigation={navigation} />
      <FlatList
        data={orders}
        keyExtractor={(order, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadOrders}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => <OrderCard order={item} />}
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={<View style={styles.listHeader} />}
        ListFooterComponentStyle={styles.listFooter}
        ListFooterComponent={() => (
          <>
            {isLoading && (
              <View
                style={{
                  flex: 1,
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={colors.card} />
              </View>
            )}
          </>
        )}
      />

      {/* <ScrollView style={{paddingTop: 150}}>
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
        {isLoading && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}>
            <ActivityIndicator size={32} color={colors.card} />
          </View>
        )}
        <View
          style={{
            height: 300,
          }}
        />
      </ScrollView> */}
    </>
  );
};
const styles = StyleSheet.create({
  listFooter: {
    width: 100,
    marginBottom: 150,
  },
  listHeader: {
    height: 120,
  },
});
