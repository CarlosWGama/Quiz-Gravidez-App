import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, Image, Button, Animated } from "react-native"
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
                <Text style={{ color: "tomato", fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>  Você atingiu {pontos} de {totalPerguntas}.{"\n"} Apesar de uma pontuação mais baixa, temos certeza que você aprendeu bastante com nossas perguntas! </Text>
              }
              { pontos >= (totalPerguntas/2) && 
                <Text style={{ color: "turquoise", fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>  Você atingiu {pontos} de {totalPerguntas}.{"\n"} Parabéns! Você acertou a maioria das perguntas! </Text>
              }

            </Animated.View>

            {formularios && <>
              <Text style={styles.textoBase}> Agora é sua vez. Nos ajude avaliando nosso aplicativo! </Text>
              <Button buttonStyle={styles.buttonContainer} title="QUESTIONÁRIO USUARIO COMUM" color='#ee91d3' onPress={() => abrirQuestionario(formularios.usuario)}></Button>
              <Button buttonStyle={styles.buttonContainer} title="QUESTIONÁRIO USUARIO DE TI" color='#ee91d3' onPress={() => abrirQuestionario(formularios.tecnico)}></Button>
            </>}
        </View>

        <Button buttonStyle={styles.buttonContainer} title="FINALIZAR" color='#ee91d3' onPress={doFinalizar} ></Button>
    </>
    )
}
const Resultado = React.memo(ResultadoComponent)
export default Resultado;