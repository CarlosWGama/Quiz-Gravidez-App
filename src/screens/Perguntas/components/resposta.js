import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, Image, Button, Animated, TouchableOpacity } from "react-native"
import { styles } from "../styles";

function RespostaComponent({pergunta, alternativaSelecionada, doAvancar}) {

    const anim = useRef(new Animated.Value(0));

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

    useEffect(() => {
        shake()
    }, [alternativaSelecionada])
 
    return (
      <>
        <View style={styles.viewPergunta}>  
            <Animated.View style={{ transform: [{ translateX: anim.current }] }}>
                {alternativaSelecionada == pergunta.alternativaCorreta && <>
                    <Image source={require('./../../../assets/quiz-correto.png')} style={{width: 100, height: 100}}/>
                    {/* <Text style={{ color: "green", fontSize: 18, fontWeight: 'bold'  }}>  ACERTOU! </Text> */}
                </>}
                {alternativaSelecionada != pergunta.alternativaCorreta && <>
                    <Image source={require('./../../../assets/quiz-errado.png')}  style={{width: 100, height: 100}}/>
                    {/* <Text style={{ color: "tomato", fontSize: 18, fontWeight: 'bold' }}>  ERROU! </Text> */}
                </>}
            </Animated.View>
          
            {/* TITULO */}
            <Text style={{fontWeight: 'bold', marginTop: 10, marginBottom: -15, color: '#655e69'}}>PERGUNTA</Text>
            <Text style={styles.textoBase}> {pergunta.titulo} </Text>

            {/* IMAGEM */}
            {pergunta.perguntaImage && <Image source={{uri: pergunta.respostaImagem}} style={{ width: 150, height: 150, resizeMode: "contain" }} ></Image>}

            {/* RESPOTA */}
            <Text style={{fontWeight: 'bold', marginTop: 10, marginBottom: -15, color: '#655e69'}}>EXPLICAÇÃO</Text>
            <Text style={styles.textoBase}> {pergunta.resposta} </Text>
        </View>

        <TouchableOpacity onPress={doAvancar} >
          <View style={styles.button}>
            <Text style={{fontWeight:'bold'}}>PRÓXIMO</Text>
          </View>
        </TouchableOpacity>

        {/* <Button title="Proximo >>>" color='#faf6f8' ></Button> */}
    </>
    )
}
const Resposta = React.memo(RespostaComponent)
export default Resposta;