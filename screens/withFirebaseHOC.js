export default Profile = withFirebaseHOC(
  withStyles(_Profile, (theme) => ({
    root: {
      backgroundColor: theme["color-basic-100"],
      marginTop: 60,
    },
    header: {
      alignItems: "center",
      paddingTop: 25,
      paddingBottom: 17,
    },
    userInfo: {
      flexDirection: "row",
      paddingVertical: 18,
    },
    bordered: {
      borderBottomWidth: 1,
      borderColor: theme["color-basic-400"],
    },
    section: {
      flex: 1,
      alignItems: "center",
    },
    space: {
      marginBottom: 3,
      color: theme["color-basic-1000"],
    },
    separator: {
      backgroundColor: theme["color-basic-400"],
      alignSelf: "center",
      flexDirection: "row",
      flex: 0,
      width: 1,
      height: 42,
    },
    buttons: {
      flexDirection: "row",
      paddingVertical: 8,
    },
    button: {
      flex: 1,
      alignSelf: "center",
    },
    text: {
      color: theme["color-basic-1000"],
    },
  }))
);
