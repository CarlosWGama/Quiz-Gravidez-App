import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    height: '100%',
    backgroundColor: "#e454bc",
    paddingTop: 80,
  },

  viewPergunta: {
    minHeight: 220,
    padding: 5,
    backgroundColor: "#ee91d3",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderColor: "#f6bce4",
    borderWidth: 4,
  },

  viewAlternativa: {
    height: 44,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#ee91d3",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 15,
    borderColor: "#f6bce4",
    borderWidth: 2,
  },

  viewAlternativaText: {
    color: "white",
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
  },

  textoBase: {
    color: "white", 
    fontSize: 16, 
    marginTop: 10, 
    textAlign: "center", 
    paddingHorizontal: 5 
  },

});
