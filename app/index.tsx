import * as Notifications from "expo-notifications";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

// Set notification handler to display notifications while app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Index() {
  let router = useRouter();
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>();
  const now = new Date();
  const threeDaysFromNow = new Date(now);
  threeDaysFromNow.setDate(now.getDate() + 3);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Request notification permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Notification permission not granted");
      }
    })();
  }, []);

  const handlePress = () => {
    router.navigate("./(tabs)/new-tracks");
  };

  const handlePriceListPress = () => {
    router.navigate("./price-list");
  };
  const handleOpenModal = () => {
    setModalVisible((v) => !v);
  };

  const handleOpenCalendar = () => {
    setShowDateTimePicker((t) => !t);
  };

  const handleNotification = async () => {
    // Create notification channel for Android
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Stream Note",
        body: "This is an in-app notification!",
        sound: "default",
      },
      trigger: null,
    });
  };

  const removeDatePickOnSelected = (date: DateType) => {
    setSelected(date);
    setShowDateTimePicker((v) => !v);
  };

  // const darkStyles = {
  //   ...defaultStyles,

  //   header: {
  //     ...defaultStyles.header,
  //     backgroundColor: "#000",
  //   },

  //   day: {
  //     ...defaultStyles.day,
  //     backgroundColor: "#000",
  //   },

  //   selected: {
  //     ...defaultStyles.selected,
  //     backgroundColor: "#110ec2ff",
  //   },

  //   day_label: {
  //     ...defaultStyles.day_label,
  //     color: "#fff",
  //   },

  //   selected_label: {
  //     ...defaultStyles.selected_label,
  //     color: "#fff",
  //   },
  //   disabled_label: {
  //     ...defaultStyles.disabled_label,
  //     color: "#555", // grey
  //   },
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.textDateStyle}>{selected?.toLocaleString()}</Text>
      <Button
        color={styles.btnStyle.backgroundColor}
        title="To Tab Layout"
        onPress={handlePress}
      />
      <Button
        color={styles.priceListBtn.backgroundColor}
        title="Price List"
        onPress={handlePriceListPress}
      />
      <Button
        color={styles.calendarBtn.backgroundColor}
        title="Open Modal"
        onPress={handleOpenModal}
      />
      <Button title="Open Calendar" onPress={handleOpenCalendar} />
      <Button title="Send Notification" onPress={handleNotification} />
      <Link href="./calendar">Go to Calendar</Link>
      {showDateTimePicker && (
        <DateTimePicker
          mode="single"
          date={selected}
          onChange={({ date }) => removeDatePickOnSelected(date)}
          styles={defaultStyles}
          minDate={threeDaysFromNow}
        />
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Hello World</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  priceListBtn: {
    backgroundColor: "green",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  calendarBtn: {
    backgroundColor: "red",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textDateStyle: {
    fontSize: 15,
    marginBottom: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
