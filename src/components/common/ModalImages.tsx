import React from 'react';
import {Image as Imagen} from '../../interfaces/Image.interface';
import {Modal, ActivityIndicator, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  images: Imagen[];
}
export const ModalImages = ({isVisible, setIsVisible, images}: Props) => {
  return (
    <>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        visible={isVisible}
        style={{flex: 1}}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}>
        <ImageViewer
          imageUrls={images}
          onSwipeDown={() => setIsVisible(false)}
          enableSwipeDown
          backgroundColor={'rgba(0,0,0,0.92)'}
          useNativeDriver
          enablePreload
          renderHeader={() => (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 40,
                left: 20,
                zIndex: 9999999999,
              }}
              onPress={() => setIsVisible(false)}>
              <Icon name="close-circle-outline" size={26} color="white" />
            </TouchableOpacity>
          )}
          loadingRender={() => <ActivityIndicator color="black" size={32} />}
        />
      </Modal>
    </>
  );
};
