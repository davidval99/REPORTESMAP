<View style={styles.card} key={index}>
  <Image
    source={{
      uri:
        "https://image.shutterstock.com/image-photo/deep-forest-river-wild-waterfall-600w-1585363855.jpg",
    }}
    style={styles.cardImage}
    resizeMode="cover"
  />
  <View style={styles.textContent}>
    <Text numberOfLines={5} style={styles.cardDescription}>
      {"Observación reportadaT : " + marker.OBSERVACION}
    </Text>
    <Text numberOfLines={5} style={styles.cardDescription}>
      {"Descripción: " + marker.OBSERVACION}
    </Text>
    <View style={styles.button}>
      <TouchableOpacity
        onPress={() => {}}
        style={[
          styles.signIn,
          {
            borderColor: "#FF6347",
            borderWidth: 1,
          },
        ]}
      >
        <Text
          style={[
            styles.textSign,
            {
              color: "#FF6347",
            },
          ]}
        >
          Order Now
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</View>;
