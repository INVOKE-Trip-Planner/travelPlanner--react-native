import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScanner(props) {

  // console.log(props.route.params.tripData.users)
  // console.log(props.route.params.tripData.id)

  let users = props.route.params.tripData.users;
  console.log('ori', users);

  const id = props.route.params.tripData.id;

  const handleScan = (selectedUser) => {
    console.log('pre', users);

    const alreadyIn = users.some((user) => user.id === selectedUser.id)

    if (alreadyIn) {
      // alert(values.users.findIndex(user => user.id === selectedUser.id))
      // remove(users.findIndex(user => user.id === selectedUser.id))
      users = users.filter(user => user.id !== selectedUser.id);
    } else {
      // push(users)
      users = users.push(selectedUser);
    }

    // setShowSearchUser(false);
    console.log('post', users);
    // if (users) {
    //   alert(JSON.stringify('users', users));
    // } else {
    //   console.log(users);
    // }
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    try {
      const selectedUser = JSON.parse(data),
        keys = Object.keys(selectedUser)

      if (keys.length !== 3 || !keys.includes('id') || !keys.includes('name') || !keys.includes('avatar')) {
        alert('This is not a valid user code.');
      } else {
        handleScan(selectedUser);
        // console.log(selectedUser);
      }
      // setScanned(false);
    } catch(e) {
      alert('This is not a valid user code.');
      console.log(e);
      // setScanned(true);
    }
    // console.log(selectedUser)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // borderColor: 'black',
        // borderRadius: 1,
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    </View>
  );
}