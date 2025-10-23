import { Modal, Text, View, StyleSheet, Pressable } from "react-native";

function ConfirmationPopup({ isVisible, onClickYes, onClickNo, message }) {

  const yesClicked = () => {
    console.log("Yes");
    onClickYes();
  };

  const noClicked = () => {
    console.log("No");
    onClickNo();
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.containerMain}>
        <View style={styles.containerModal}>
          <Text style={styles.headerText}>{message}</Text>
          <View style={styles.btnView}>
            <Pressable style={styles.pressable} onPress={yesClicked}>
              <Text style={{fontWeight: '500', fontSize: 18}}>Yes</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={noClicked}>
              <Text style={{fontWeight: '500', fontSize: 18}}>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ConfirmationPopup;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  containerModal: {
    paddingHorizontal: 20,
    paddingVertical: 80,
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600'
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  pressable: {
    height: 50,
    width: 100,
    backgroundColor: '#8ecae6',
    marginTop: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
