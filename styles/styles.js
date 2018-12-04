import {StyleSheet, Dimensions} from 'react-native';


export default StyleSheet.create({
  scrollContainer: {
    flex : 1,

  },
  machinesContainer : {
    flex : 1,
    flexDirection : 'row',
    flexWrap:'wrap',
    padding : 2,
    margin : 5,
    justifyContent : 'space-evenly',
  },
  machine : {
    height : 200,
    width : Dimensions.get('window').width/2 -18,
    borderRadius: 10,
    padding : 10,
    margin : 5,
    backgroundColor : 'red'
  },
  name: {
    flex: 1,
    fontSize: 15,
    color : 'black',
    justifyContent: 'center',
    textAlign:'center',
    alignItems :'center',
    paddingTop : 10
  },
  status: {
    flex: 5,
    textAlignVertical:'center',
    textAlign:'center',
    fontSize : 20
  }
});