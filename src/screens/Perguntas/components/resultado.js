import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, Image, Button, Animated, TouchableOpacity } from "react-native"
import { styles } from "../styles";
import { Linking } from 'react-native';

function ResultadoComponent({totalPerguntas, pontos, formularios, doFinalizar}) {

    const anim = useRef(new Animated.Value(0));
    // =================================================
    const shake = useCallback(() => {
      // makes the sequence loop
      Animated.loop(
        // runs the animation array in sequence
        Animated.sequence([
          // shift element to the left by 2 units
          Animated.timing(anim.current, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
          }),
          // shift element to the right by 2 units
          Animated.timing(anim.current, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
          }),
          // bring the element back to its original position
          Animated.timing(anim.current, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        // loops the above animation config 2 times
        { iterations: 4 }
      ).start();
    }, []);
    // =================
    const abrirQuestionario = (url) => {
      Linking.openURL(url)      
    }
    // =================
    useEffect(() => {
        shake()
    }, [pontos])
    // =================================================
    return (
      <>
        <View style={styles.viewPergunta}>  
            <Animated.View style={{ transform: [{ translateX: anim.current }] }}>
              { pontos < (totalPerguntas/2) && 
                <Text style={{ color: "#bc0b27", fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>  Você atingiu {pontos} de {totalPerguntas}.{"\n"} Apesar de uma pontuação mais baixa, acreditamos que você aprendeu bastante sobre a sua saúde bucal! </Text>
              }
              { pontos >= (totalPerguntas/2) && 
                <Text style={{ color: "#3218e9", fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}> PARABENS! {"\n"} Você atingiu {pontos} de {totalPerguntas}.{"\n"}  Você aprendeu bastante sobre a sua saúde bucal! </Text>
              }

            </Animated.View>

            {formularios && <View style={{marginTop: 30}}>
              <Text style={[styles.textoBase, {marginBottom: 20}]}> Agora é sua vez. Nos ajude avaliando nosso aplicativo! </Text>
              <TouchableOpacity onPress={() => abrirQuestionario(formularios.usuario)}>
                <Text style={{fontSize: 12, margin: 5, textAlign: 'center', borderWidth: 1, padding: 10, borderRadius: 10}}>Clique aqui para abrir o questionário de usuário Comum</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => abrirQuestionario(formularios.tecnico)}>
                <Text style={{fontSize: 12, margin: 5, textAlign: 'center', borderWidth: 1, padding: 10, borderRadius: 10}}>Clique aqui para abrir o questionário de usuário TI</Text>
              </TouchableOpacity>
            </View>}
        </View>

        {/* BOTÃO */}
        <TouchableOpacity onPress={doFinalizar} >
          <View style={styles.button}>
            <Text style={{fontWeight:'bold'}}>FINALIZAR</Text>
          </View>
        </TouchableOpacity>

        
    </>
    )
}
const Resultado = React.memo(ResultadoComponent)
export default Resultado;