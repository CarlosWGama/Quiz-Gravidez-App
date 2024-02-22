import React from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native"
import { styles } from "./../styles";


function PerguntaComponent({pergunta, perguntaNumero, selecionarAlternativa}) {
    
    return (
      <>
     
      <View style={styles.viewPergunta}>  
        {/* NUMERO QUESTÃO */}
        <Text style={{ color: "#655e69", fontSize: 20 }}>  QUESTÃO {perguntaNumero} </Text>
        
        {/* TITULO */}
        <Text style={{ color: "#655e69", fontSize: 14, marginTop: 20, textAlign: "center" }}> {pergunta.titulo} </Text>

        {/* IMAGEM */}
        {pergunta.perguntaImage && <Image
          source={{uri: pergunta.perguntaImage}}
          style={{ width: "80%", height: 100, resizeMode: "contain" }}
        ></Image>}
      </View>

      <View style={{ justifyContent: "space-between" }}>
        {/* ALTERNATIVA 1 */}
        {pergunta.alternativa1 && <TouchableOpacity onPress={() => selecionarAlternativa(1)}>
          <View style={styles.viewAlternativa}>
            <Text style={styles.viewAlternativaText}>{pergunta.alternativa1}</Text>
          </View>
        </TouchableOpacity>}
        
        {/* ALTERNATIVA 2 */}
        {pergunta.alternativa2 && <TouchableOpacity onPress={() => selecionarAlternativa(2)}>
          <View style={styles.viewAlternativa}>
            <Text style={styles.viewAlternativaText}>{pergunta.alternativa2}</Text>
          </View>
        </TouchableOpacity>}
        
        {/* ALTERNATIVA 3 */}
        {pergunta.alternativa3 && <TouchableOpacity onPress={() => selecionarAlternativa(3)}>
          <View style={styles.viewAlternativa}>
            <Text style={styles.viewAlternativaText}>{pergunta.alternativa3}</Text>
          </View>
        </TouchableOpacity>}
        
        {/* ALTERNATIVA 4 */}
        {pergunta.alternativa4 && <TouchableOpacity onPress={() => selecionarAlternativa(4)}>
          <View style={styles.viewAlternativa}>
            <Text style={styles.viewAlternativaText}>{pergunta.alternativa4}</Text>
          </View>
        </TouchableOpacity>}

      </View>

    </>
    )
}
const Pergunta = React.memo(PerguntaComponent)
export default Pergunta;