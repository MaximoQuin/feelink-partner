import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 100,
    backgroundColor: "#4338CA",
  },
  monthText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginHorizontal: 20,
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  estadoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  fechaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  fechaText: {
    fontSize: 14,
    color: "#6B7280",
  },
  horaText: {
    fontSize: 14,
    color: "#6B7280",
  },
  notaText: {
    fontSize: 16,
    color: "#111827",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4338CA",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1F2937",
  },
  actividadItem: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
    marginBottom: 2,
  },
  addButton: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  modalFechaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalFecha: {
    fontSize: 16,
    color: "#6B7280",
  },
  modalHora: {
    fontSize: 16,
    color: "#6B7280",
  },
  modalScroll: {
    maxHeight: "70%",
    backgroundColor: "#F3F4F6",
  },
  modalNota: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 20,
    margin: 15,
  },
});

export default styles;
