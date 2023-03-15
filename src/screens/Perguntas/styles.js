import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: "#FE5A64",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },

  viewPergunta:{
    width:310,
    height:220,
    backgroundColor:'#FF858C',
    marginTop:25,
    borderRadius:12,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'#F59696',
    marginBottom:30,
  },

  viewAlternativa:{
    height:44,
    width:300,
    borderRadius:12,
    backgroundColor:'#FF858C',
    alignItems:'center',
    justifyContent: 'center',
    flexDirection:"row",
    marginBottom:15,
  },

  viewAlternativaText:{
    color:'white',
    fontSize:16,
  },

  buttonContent:{
    marginTop:15
  }

});
