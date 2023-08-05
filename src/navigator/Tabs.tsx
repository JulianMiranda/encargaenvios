import React, {useContext, useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAws from 'react-native-vector-icons/FontAwesome5';
import {ThemeContext} from '../context/theme/ThemeContext';
import {TabBarAdvancedButton} from '../components/common/TabBarAdvancedButton';
import {SettingsStack} from './SettingsStack';
import {ShopStack} from './ShopStack';
import {HomeStack} from './HomeStack';
import {AccountStack} from './AccountStack';
import {SearchStack} from './SearchStack';
import {isIphoneXorAbove} from '../utils/isIphone';
import {ChatContext} from '../context/chat/ChatContext';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {newMessages, setNewMessages} = useContext(ChatContext);
  useEffect(() => {
    setNewMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={props => (
        <View style={styles.navigatorContainer}>
          <BottomTabBar {...props} />
          {isIphoneXorAbove && (
            <View
              style={[
                styles.xFillLine,
                {
                  backgroundColor:
                    Platform.OS === 'ios'
                      ? 'rgba(255,255,255,0.92)'
                      : 'rgba(255,255,255,0.92)',
                  overflow: 'hidden',
                  zIndex: 1,
                },
              ]}
            />
          )}
        </View>
      )}
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: colors.card,

        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 3,
          fontSize: 11,
        },

        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 30,
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        tabBarActiveBackgroundColor: 'rgba(255,255,255,0.92)',
        tabBarInactiveBackgroundColor: 'rgba(255,255,255,0.92)',
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Tienda"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => (
            <FontAws name="store" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          title: 'Buscar',

          tabBarIcon: ({color}) => (
            <FontAws name="search" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Shop"
        options={{
          tabBarButton: props => (
            <TabBarAdvancedButton bgColor={'#F6F7EB'} {...props} />
          ),
        }}
        component={ShopStack}
      />

      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          title: 'Pedidos',

          tabBarIcon: ({color}) => (
            <FontAws name="paper-plane" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: 'Ajustes',
          tabBarIcon: ({color}) => (
            <>
              {newMessages !== 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 3,
                    right: '35%',
                    backgroundColor: colors.card,
                    borderRadius: 100,
                    height: 7,
                    width: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                />
              )}

              <Icon name="bars" size={24} color={color} />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    /* height: 50, */
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'transparent',
    elevation: 30,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
  },
});
