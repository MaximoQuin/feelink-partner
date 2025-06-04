import { Image, Text, View } from 'react-native';
import styles from './GraficaStyle';

export default function HeaderCard() {
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://img.freepik.com/vector-premium/avatar-nino-riendo-foto-perfil-nino-divertido_176411-3537.jpg' }}
          style={styles.avatar}
        />
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>Daniel</Text>
          <Text style={styles.userStatus}>😊 Buen estado</Text>
        </View>
      </View>
    </View>
  );
}
