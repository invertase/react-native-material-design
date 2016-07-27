import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

let _iconComponent = MaterialIcons;

export default {
  set(component) {
    _iconComponent = component;
  },

  get() {
    return _iconComponent;
  }
}
