import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/home/home.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diario</Text>

            <ImageBackground
              source={require("../assets/images/home/back-diario.png")}
              style={styles.diaryBox}
              imageStyle={{ borderRadius: 12 }}
            >
              <Text style={styles.diaryText}>
                Apoya a su hijo a expresar cómo fue su día
              </Text>
              <Ionicons name="arrow-forward" size={40} color="white" />
            </ImageBackground>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Próximos Hábitos</Text>
              <TouchableOpacity>
                <Ionicons name="arrow-forward" size={20} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.habitItem}>
              <Text style={styles.habitTime}>22:00</Text>
              <View style={styles.habitCard}>
                <Text style={styles.habitText}>Hacer la tarea</Text>
                <TouchableOpacity style={styles.habitOptions}>
                  <Ionicons name="ellipsis-vertical" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.habitItem}>
              <Text style={styles.habitTime}>22:00</Text>
              <View style={styles.habitCard}>
                <Text style={styles.habitText}>Hacer la tarea</Text>
                <TouchableOpacity style={styles.habitOptions}>
                  <Ionicons name="ellipsis-vertical" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Promedio de bpm</Text>
              <TouchableOpacity>
                <Ionicons name="arrow-forward" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Image
              source={require("../assets/images/home/promedio.png")}
              style={styles.promedioImage}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3730a3",
  },
  header: {
    height: "24%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  headerImage: {
    height: "100%",
    width: "60%",
  },
  content: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  diaryBox: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    overflow: "hidden",
  },
  diaryText: {
    maxWidth: "75%",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  promedioImage: {
    width: "100%",
    height: 180,
    marginTop: 10,
  },
  habitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  habitTime: {
    width: 50,
    fontSize: 14,
    color: "#333",
  },
  habitCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#6366f1",
    borderRadius: 12,
    overflow: "hidden",
  },
  habitText: {
    flex: 1,
    padding: 12,
    color: "white",
    fontWeight: "500",
  },
  habitOptions: {
    width: 50,
    backgroundColor: "#1e1b4b",
    justifyContent: "center",
    alignItems: "center",
  },
});
