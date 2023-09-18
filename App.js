import { View } from 'react-native';
import { initializeApp } from "@firebase/app";
import firebaseConfig from './src/config/firebase';
import { getFirestore } from "@firebase/firestore";
import { NavegacaoPrinciapl } from './src/navigations';

export default function App() {

  const app = initializeApp(firebaseConfig);

  return (
    <View style={{flex:1}}>
      <NavegacaoPrinciapl/>
    </View>
  )
}
