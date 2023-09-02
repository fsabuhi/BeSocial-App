import { StyleSheet,Dimensions, Platform, PixelRatio } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


export default StyleSheet.create({
  placeholder: {
    //alignItems: "center",
    borderRadius: 20,
    borderColor: "#fad745",
    borderWidth: 2,
    color: "#fad745",
    padding: "3%",
    margin: "1%",
    width: "70%"
  },
  buttons: {
    flexDirection: "row"
  },
  loginbutton: {
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#fad745",
    borderWidth: 2,
    backgroundColor: "#fad745",
    margin: "2%",
    padding: "2%"
  },
  tgloginbutton: {
    flexDirection: "row",
    borderRadius: 50,
    borderColor: "#0088CC",
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: "#0088CC",
    margin: "2%",
    padding: "2%"
  },
  login: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  dictionary: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  home: {
    backgroundColor: "#fad745"
  },
  icon: {
    width: "30%",
    height: undefined,
    aspectRatio: 1 / 1,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: "2%"
  },
  post: {
    width: "80%",
    height: undefined,
    aspectRatio: 1 / 1,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: "2%"
  },
  background: {
    flex: 1
  },
  text: {
    color: "#fad745",
    fontSize: responsiveFontSize(2),
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    flex: 1
    // alignItems:'center',
    //justifyContent: "space-around",
    //paddingTop: Platform.OS === 'android' ? 25 : 0,
    // alignItems: "center"
    // borderWidth:1,
    // borderColor:'white'
  },
  flex_center_spaced: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  flashCard: {
    borderColor: "#fbfbf9",
    shadowColor: "#fad745",
    borderWidth: 3,
    borderRadius: 20,
    width: "80%",
    height: undefined,
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  flashCardContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  flashCardbuttons: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  flashCardbutton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderColor: "#fad745",
    borderWidth: 2,
    backgroundColor: "transparent",
    margin: "2%",
    padding: "2%"
  },
  blockContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "#fbfbf9",
    borderWidth: responsiveWidth(0.3),
    borderRadius: 15,
    width: "90%",
    alignSelf: "center"
  },
  scrollContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    borderColor: "#fbfbf9",
    borderRadius: 15,
    width: "100%",
    alignSelf: "center",
    margin:'2%'
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 50,
    borderColor: "#fad745",
    borderWidth: 2,
    backgroundColor: "transparent",
    margin: "2%",
    paddingHorizontal: "5%",
    paddingVertical: "2%"
  },
  buttonWord: {
    color: "#fbfbf9"
  },

  mainWord: {
    color: "#fbfbf9",
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    textAlign: "center"
  },
  word: {
    color: "#fbfbf9",
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    padding: "3%"
  },
  boldWord: {
    color: "#fbfbf9",
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    padding: "3%",
    fontWeight:'bold'
  },
  profile: {
    alignSelf: "center",
    width: "25%",
    margin: "5%",
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    borderWidth: responsiveWidth(0.5),
    borderColor: "#fad745"
  },
  widePlaceholder:{
    //alignItems: "center",
    borderRadius: 20,
    borderColor: "#fad745",
    borderWidth: 2,
    color: "#fad745",
    padding: "5%",
    margin: "2%",
    width: "90%"
  },
  centeralize:{
    justifyContent:'center',
    alignItems:"center"
  },
  modalView: {
    height:responsiveHeight(80),
    width:responsiveWidth(90),
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    borderColor:'#fad745',
    borderWidth:responsiveWidth(1),
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }}
});
