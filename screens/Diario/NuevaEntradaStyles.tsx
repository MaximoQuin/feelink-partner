import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F5FF",
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#4338CA",
    borderTopLeftRadius: 20,
    paddingTop: 60,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  label: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#4338CA",
    marginBottom: 10,
    marginTop: 20,
  },
  emojiRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  emojiButton: {
    padding: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "transparent",
  },
  emojiSelected: {
    borderColor: "black",
  },
  actividadesBox: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  actividadChip: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginVertical: 4,
    marginRight: 6,
    alignSelf: "flex-start",
  },
  actividadChipSelected: {
    backgroundColor: "#4338CA",
  },
  actividadText: {
    color: "#111827",
  },
  link: {
    color: "#4338CA",
    fontSize: 14,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  textarea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    height: 120,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  botonGuardar: {
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 50,
    width: "60%",
    alignSelf: "center",
  },
  botonText: {
    color: "#4338CA",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
  },
  containerBox: {
    paddingHorizontal: 20,
    marginBottom: 2,
  },
});

export default styles;
