import { Text, View, Image, Button, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import { getFirestore, getDoc, doc, getDocs, collection, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import Pergunta from "./components/pergunta";
import Resultado from "./components/resultado";

export default function TelaPerguntas() {
  const navigation = useNavigation();
  const [ perguntaNumero, setPerguntaNumero ] = useState(1);
  const [ tela, setTela ] = useState('pergunta'); //pergunta | resultado
  const [ pontos, setPontos ] = useState(0);
  const [ totalPerguntas, setTotalPerguntas ] = useState(0);
  const [ alternativaSelecionada, setAlternativaSelecionada ] = useState(null);
  const [ pergunta, setPergunta ] = useState(null);
  const [ perguntas, setPerguntas ] = useState([]);
  const db = getFirestore();
  // ===============================================================================
  const buscarProximaPerguntas = async () => {
    await getDocs(query(collection(db, 'perguntas'), orderBy('data-cadastro')))
    .then(async snapshots => {
        let dados = []  
        for(let i = 0; i < snapshots.docs.length; i++) {
          const doc = snapshots.docs[i];
          dados.push(doc.data())
        }
        setPerguntas(dados);  
        //Existe perguntas?
        if (dados.length > 0) {
          setPergunta(dados[0]);
          setPerguntaNumero(1);
          setTotalPerguntas(dados.length);
        } else {
          navigation.navigate('telaPrincipal');
        }
    })
  }
  // ============= 
  const buscarProximaPergunta = async (perguntaNumero) => {
    try {
      if (perguntas[perguntaNumero-1]) {
        setPergunta(perguntas[perguntaNumero-1]);
      } else {
        navigation.navigate('telaPrincipal');
      }
    } catch (e) {
      console.log(e);
    }
  };
  // =============
  const handleSelecionarAlternativa = (opc) => {
    setAlternativaSelecionada(opc);
    if (opc == pergunta.alternativaCorreta) {
      setPontos(pontos+1);
    }
    setTela('resultado');
  }
  // ==============
  const handleAvancar = () => {
    console.log('aaaaaaaaaaaaaaaaaaaaaa')
    buscarProximaPergunta(perguntaNumero+1)
    setTela('false')
  }
  // ==============
  useEffect(() => {
    setPontos(0);
    (async () => await buscarProximaPerguntas())()
  }, []);
  // ==============================================
  return (
    <View style={styles.viewPrincipal}>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'stretch', paddingHorizontal: 40}}>
          { tela == 'pergunta' && pergunta && <Pergunta pergunta={pergunta} perguntaNumero={perguntaNumero} selecionarAlternativa={handleSelecionarAlternativa}/>}
          { tela == 'resultado' && pergunta && <Resultado pergunta={pergunta} alternativaSelecionada={alternativaSelecionada} doAvancar={handleAvancar}/>}
        </View>
      </ScrollView>
    </View>
  );
}
