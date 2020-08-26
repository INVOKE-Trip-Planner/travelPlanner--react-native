import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import Actions from "actions";

function usePrevious(value) {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function QRScanner(props) {

  const prevGetGetAllData = usePrevious(props.getGetAllData);

  const id = props.route.params.tripData.id;
  // var users = props.getGetAllData.data.filter(trip => trip.id === id)[0].users
  const [users, setUsers] = useState(props.route.params.tripData.users);

  useEffect(() => {
    if (prevGetGetAllData && prevGetGetAllData.isLoading && !props.getGetAllData.isLoading) {
      props.navigation.goBack();
    }
  }, [props.getGetAllData.isLoading])

  const handleScan = (selectedUser) => {
    console.log('pre', users, selectedUser);

    const alreadyIn = users.some((user) => user.id === selectedUser.id)

    if (alreadyIn) {
      // users.splice(users.findIndex(user => user.id === selectedUser.id), 1);
      setUsers(users.filter((user) => user.id != selectedUser.id))
      console.log('alreadyIn', users);
    } else {
      setUsers(users.push(selectedUser));
      console.log('!alreadyIn', users);
    }

    // users = users.map(user => user.id);

    const data = {
      id,
      users: users.length > 0 ? users.map(user => user.id) : null,
    }
    // console.log('pre', users);

    // alert(JSON.stringify(data));
    props.onUpdateTrip(data);
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

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
      setShowRetry(false);
      // setScanned(false);
    } catch(e) {
      alert('This is not a valid user code.');
      console.log(e);
      setShowRetry(true);
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

      {showRetry && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const mapStateToProps = store => ({
  getGetAllData: Actions.getGetAllData(store),
});

const mapDispatchToProps = {
  onUpdateTrip: Actions.updateTrip,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QRScanner);