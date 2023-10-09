import { Text, View, Image, Button, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import { getFirestore, getDoc, doc, getDocs, collection, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import Pergunta from "./components/pergunta";
import Resposta from "./components/resposta";
import Resultado from "./components/resultado";

export default function TelaPerguntas() {
  const navigation = useNavigation();
  const [ perguntaNumero, setPerguntaNumero ] = useState(1);
  const [ tela, setTela ] = useState('pergunta'); //pergunta | resposta | resultado
  const [ pontos, setPontos ] = useState(0);
  const [ totalPerguntas, setTotalPerguntas ] = useState(0);
  const [ alternativaSelecionada, setAlternativaSelecionada ] = useState(null);
  const [ formularios, setFormularios ] = useState(null);
  const [ pergunta, setPergunta ] = useState(null);
  const [ perguntas, setPerguntas ] = useState([]);
  const db = getFirestore();
  // ===============================================================================
  const buscarProximaPerguntas = async () => {
    await getDocs(query(collection(db, 'perguntas'), orderBy('data-cadastro', 'asc')))
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
  const buscarFormularios = async () => {
    const dados = await getDoc(doc(db, 'formularios', 'unico'))
    if (dados.exists())
      setFormularios(dados.data())
  }
  // ============= 
  const buscarProximaPergunta = async () => {
    try {
      //Verifica se existe mais alguma pergunta
      if (perguntas[perguntaNumero]) {
        setPergunta(perguntas[perguntaNumero]);
        setPerguntaNumero(perguntaNumero+1);
        setTela('pergunta')
      } else {
        setTela('resultado')
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
    setTela('resposta');
  }
  // ============
  const finalizar = () => {
    navigation.navigate('telaPrincipal');
  }
  // ==============
  useEffect(() => {
    setPontos(0);
    (async () => await buscarProximaPerguntas())()
    buscarFormularios();
  }, []);
  // ==============================================
  return (
    <View style={styles.viewPrincipal}>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'stretch', paddingHorizontal: 40}}>
          { tela == 'pergunta' && pergunta && <Pergunta pergunta={pergunta} perguntaNumero={perguntaNumero} selecionarAlternativa={handleSelecionarAlternativa}/>}
          { tela == 'resposta' && pergunta && <Resposta pergunta={pergunta} alternativaSelecionada={alternativaSelecionada} doAvancar={buscarProximaPergunta}/>}
          { tela == 'resultado' && pergunta && <Resultado pontos={pontos} formularios={formularios} totalPerguntas={totalPerguntas} doFinalizar={finalizar}/>}
        </View>
      </ScrollView>
    </View>
  );
}
