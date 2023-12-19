import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Spotz</Text>
        <Text style={styles.subtitle}>Shoot and Share a skate spot so the homies know where to roll.</Text>
      </View>

      <Pressable onPress={() => router.push("/map/Map")} style={styles.pressable}>
        <Text>
          Start
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  pressable: {
    width: '40%',
    marginTop: 10,
    padding: 15,
    backgroundColor: '#1AFFD5',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
