// components/ui/badge.js
import { View, Text, StyleSheet } from "react-native";

export function Badge({ label, style, textStyle }) {
  return (
    <View style={[styles.badge, style]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#facc15", // Yellow-400 like tailwind
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },
});
