import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {request, PERMISSIONS} from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';

//const [durum, setdurum] = React.useState(0);

const AsyncAlert = () => {
  return new Promise((resolve, reject) => {
      Alert.alert(
          'Title',
          'Message',
          [
              {text: 'YES', onPress: () => resolve(0) },
              {text: 'NO', onPress: () => resolve(0) }
          ],
          { cancelable: false }
      )
  })
} 

export default function CameraPermissionScreen() {
  const [permissionResult, setPermissionResult] = React.useState('Not asked');
  const [durum, setdurum] = React.useState(0);
  React.useEffect(() => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ).then((result) => {
      setPermissionResult(result);
      console.log(result);
    });
  }, []);


  const barcodeReadHandler = ({ data }) => {
    i++;
    if(i === 1){
      console.log(data);
    }
  }

  let userResponse;


  onBarCodeRead = async (e) => {
    //const userResponse =  AsyncAlert();
    //await getAPI();
    
    if(durum === 0){
      setdurum(1);
      userResponse = await AsyncAlert();
      setdurum(userResponse);
      
    }
    
    //Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
  }
  

  return (

    <>

      
        
    
      <RNCamera 
      ref={ref => {
        this.camera = ref;
      }}
      captureAudio={false}
      style={{flex: 1}}
      type={RNCamera.Constants.Type.back}
      onBarCodeRead={this.onBarCodeRead}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }} />
    

      </>
      

  );
}
const styles = StyleSheet.create({
  root: {backgroundColor: '#4A266A', flex: 1},
  container: {
    alignContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 16,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    alignSelf: 'center',
    color: '#FFD9E8',
  },
  description: {
    fontSize: 16,
    marginHorizontal: 16,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 16,
    color: '#FFD9E8',
  },
  row: {flexDirection: 'row'},
  results: {marginHorizontal: 16},
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD9E8',
    marginVertical: 8,
  },
  resultInfo: {fontSize: 18, fontWeight: '600', color: '#DE95BA'},
});
