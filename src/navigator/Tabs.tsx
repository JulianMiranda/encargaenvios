import React, {useContext, useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import FontAws from 'react-native-vector-icons/FontAwesome5';
import {SettingsStack} from './SettingsStack';
import {ShopStack} from './ShopStack';
import {HomeStack} from './HomeStack';
import {AccountStack} from './AccountStack';
import {SearchStack} from './SearchStack';
import {ChatContext} from '../context/chat/ChatContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LabelPosition} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {ShopContext} from '../context/shop/ShopContext';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="home"
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => (
        <>
          <MyTabBar {...props} />
          {bottom !== 0 && <View style={styles.xFillLine} />}
        </>
      )}>
      <Tab.Screen
        name="Tienda"
        component={HomeStack}
        options={{
          title: 'Tienda',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: {
            activeIcon: 'store',
            inActiveIcon: 'store',
            type: 'FontAws',
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          title: 'Buscar',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: {
            activeIcon: 'search',
            inActiveIcon: 'search',
            type: 'FontAws',
          },
        }}
      />

      <Tab.Screen
        name="Shop"
        options={{
          title: 'Carrito',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: {
            activeIcon: 'shopping-cart',
            inActiveIcon: 'shopping-cart',
            type: 'FontAws',
          },
        }}
        component={ShopStack}
      />

      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          title: 'Pedidos',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: {
            activeIcon: 'paper-plane',
            inActiveIcon: 'paper-plane',
            type: 'FontAws',
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: 'Ajustes',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: {
            activeIcon: 'bars',
            inActiveIcon: 'bars',
            type: 'FontAws',
          },
        }}
      />
    </Tab.Navigator>
  );
};
type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
  activeIcon: string;
  inActiveIcon: string;
  type: string;
};
type TabIconProps = {
  isFocused: boolean;
  tabIcon: TabBarIconProps;
  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
        children: string;
      }) => React.ReactNode);
};
const {width} = Dimensions.get('window');
const MARGIN = 16;
const TAB_BAR_WIDTH = width;
const TAB_WIDTH = TAB_BAR_WIDTH / 5;

function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const [translateX] = useState(new Animated.Value(0));

  const translateTab = (index: number) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  useEffect(() => {
    translateTab(state.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index]);

  const {bottom} = useSafeAreaInsets();

  return (
    <View
      style={{...styles.tabBarContainer, bottom: bottom !== 0 ? MARGIN : 0}}>
      <Animated.View style={[styles.slidingTabContainer, {}]}>
        <Animated.View
          style={[styles.slidingTab, {transform: [{translateX}]}]}
        />
      </Animated.View>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const tabBarIcon: TabBarIconProps = options.tabBarIcon;

        return (
          <React.Fragment key={tabBarIcon?.inActiveIcon}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, alignItems: 'center'}}>
              <TabIcon
                isFocused={isFocused}
                tabIcon={tabBarIcon}
                label={label}
              />
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );
}
const TabIcon = ({isFocused, tabIcon, label}: TabIconProps) => {
  const [translateY] = useState(new Animated.Value(0));
  const {car, combo} = useContext(ShopContext);

  const {newMessages, setNewMessages} = useContext(ChatContext);
  useEffect(() => {
    setNewMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const translateIcon = (val: number) => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (isFocused) {
      translateIcon(-14);
    } else {
      translateIcon(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <>
      {/* <>
        {(car.length > 0 || combo.length > 0) &&
          tabIcon.activeIcon === 'shopping-cart' && (
            <Animated.View
              style={[styles.container, {transform: [{translateY}]}]}>
              <View
                style={{
                  ...styles.number,
                  backgroundColor: colors.card,
                }}>
                <Text style={{color: 'white'}}>
                  {car.length + (combo.length > 0 ? 1 : 0) < 10
                    ? car.length + (combo.length > 0 ? 1 : 0)
                    : '+9'}
                </Text>
              </View>
            </Animated.View>
          )}
      </> */}
      <>
        {(car.length > 0 || combo.length > 0) &&
          tabIcon.activeIcon === 'shopping-cart' && (
            <Animated.View
              style={[
                {
                  transform: [{translateY}],
                  ...styles.pointNewMessage,
                  right: '30%',
                },
              ]}
            />
          )}
      </>

      <>
        {newMessages !== 0 && tabIcon.activeIcon === 'bars' && (
          <Animated.View
            style={[
              {
                transform: [{translateY}],
                ...styles.pointNewMessage,
              },
            ]}
          />
        )}
      </>

      <Animated.View style={[{transform: [{translateY}]}]}>
        <FontAws
          name={isFocused ? tabIcon.activeIcon : tabIcon.inActiveIcon}
          size={24}
          color={isFocused ? '#fff' : '#fff'}
        />
      </Animated.View>

      <Text
        style={{
          color: isFocused ? '#2684FD' : '#fff',
          marginTop: 6,
          fontSize: isFocused ? 12 : 10,
        }}>
        {label}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    height: 60,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
    backgroundColor: '#bdecb6',
  },
  tabBarContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: TAB_BAR_WIDTH,
    height: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 51, 102, 0.92)',
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: 'rgba(0, 51, 102, 0.92)',
    overflow: 'hidden',
    zIndex: 1,
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  slidingTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2684FD',
    bottom: 25,
    borderWidth: 4,
    borderColor: '#fff',
  },
  pointNewMessage: {
    position: 'absolute',
    top: 0,
    right: '35%',
    backgroundColor: '#bdecb6',
    borderRadius: 100,
    height: 7,
    width: 7,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: 1,
  },
  number: {
    position: 'relative',
    top: -2,
    right: -12,
    borderRadius: 100,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: 2,
  },
  containerDot: {
    position: 'relative',
    height: 40,
    flexDirection: 'row',
  },
  indicatorBefore: {
    backgroundColor: '#000',

    height: 20,
    borderTopRightRadius: 20,
    marginLeft: 0,
    shadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 0,
    zIndex: 1,
  },
  indicatorAfter: {
    backgroundColor: '#000',
    borderTopLeftRadius: 10,
    marginRight: 0,
    shadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  tabItemHighlightLeft: {
    position: 'absolute',
    left: 6,
    top: -10,
    width: 5,
    height: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#FFFFFF', // Color de la ceja izquierda
    marginRight: 5, // Espacio entre la ceja y el ícono
  },
  tabItemHighlightRight: {
    width: 5,
    height: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#FFFFFF', // Color de la ceja derecha
    marginLeft: 5, // Espacio entre el ícono y la ceja
  },
});

{
  /*  {isFocused && (
              <Animated.View
                style={[
                  {
                   
                    position: 'absolute',
                    backgroundColor: 'black',
                    top: 0,
                    left: -10,
                    width: 20,
                    height: 20,

                    borderTopRightRadius: 20,
                    marginLeft: 0,
                    shadowColor: '#fff',
                    shadowOpacity: 1,
                    shadowRadius: 0,
                  },
                  {transform: [{translateX}]},
                ]}></Animated.View>
            )} */
}

{
  /* {isFocused && (
              <Animated.View
                style={[
                  {
                    ...styles.indicatorAfter,
                    position: 'absolute',
                    left: TAB_WIDTH * 0.89,
                    top: 0,
                    width:
                      state.index === 4
                        ? TAB_BAR_WIDTH * 0.022
                        : TAB_WIDTH * 0.3,

                    height: TAB_WIDTH * 0.28,
                    shadowOffset: {width: -4, height: -11},
                  },
                  {transform: [{translateX}]},
                ]}></Animated.View>
            )} */
}
