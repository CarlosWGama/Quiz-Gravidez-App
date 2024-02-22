import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    height: '100%',
    backgroundColor: "#f0d5e0",
    paddingTop: 80,
  },

  viewPergunta: {
    minHeight: 220,
    padding: 5,
    // backgroundColor: "#ee91d3",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderColor: "#e0c9d3",
    borderWidth: 4,
  },

  viewAlternativa: {
    minHeight: 44,
    width: "100%",
    borderRadius: 5,
    // backgroundColor: "#ee91d3",
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "#e0c9d3",
    borderWidth: 2,
  },

  viewAlternativaText: {
    color: "#655e69",
    textAlign: 'justify',
    fontSize: 16,
  },

  buttonContent: {
    marginTop: 15,
  },

  buttonContainer: {
    borderRadius: 30,
    marginVertical: 20,
    justifyContent: "center",
    marginBottom: 10,
    width: 300,
    fontSize: 10
  },

  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    marginBottom: 10
  },  

  textoBase: {
    color: "#655e69", 
    fontSize: 16, 
    marginTop: 10, 
    textAlign: "center", 
    paddingHorizontal: 5 
  },

});
