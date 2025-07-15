import { StyleSheet } from 'react-native';

const graficaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userTextContainer: {
    marginLeft: 12,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
  },
  userStatus: {
    fontSize: 12,
    color: "green",
  },

  heartCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
  },
  heartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  heartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badgeContainer: {
    alignItems: "center",
  },
  badgeText: {
    backgroundColor: "#0ea5e9",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    borderRadius: 20,
    marginBottom: 4,
  },
  bpmText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rangeText: {
    fontSize: 16,
  },
  healthyText: {
    marginTop: 8,
    color: "green",
    fontSize: 14,
  },

  chartCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
  },
  chartHeader: {
    fontSize: 14,
    marginBottom: 8,
  }
});

export default graficaStyles;
