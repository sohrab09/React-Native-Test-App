import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, ScrollView, TextInput, Button, Image } from 'react-native';

export default function App() {

  const [id, setId] = useState('');
  const [employeeInfo, setEmployeeInfo] = useState([]);


  const getInfo = async () => {
    if (id === '') {
      alert('Please enter Employee ID');
    } else {
      const response = await fetch(`http://lucid.nassa.com.bd/api/Employee/GetEmployees?employeeIds=${id}`);
      const data = await response.json();
      setEmployeeInfo(data[0]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getInfo();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View>
          <Text style={styles.header}>Nassa Test App</Text>
          <StatusBar style="auto" />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Employee ID"
            value={id}
            onChangeText={newId => setId(newId)}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Submit"
            onPress={handleSubmit}
          />
        </View>

        {
          employeeInfo.length === 0 ? null : (
            <View>
              <Text style={styles.footer}>Name: {employeeInfo.FullName}</Text>
              <Text style={styles.footer}>Mobile No: {employeeInfo.MobileNo}</Text>
              <Text style={styles.footer}>EmployeeId: {employeeInfo.EmployeeId}</Text>
              <Image style={{
                border: '1px solid black',
                width: 100,
                height: 150,
                marginLeft: 150,
                borderRadius: 10
              }} source={{uri:`http://lucid.nassa.com.bd/EmployeeImage/${employeeInfo.EmployeeId}.jpg`}}/>
            </View>
          )
        }

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: '#fff',
  },

  header: {
    textAlign: 'center',
    fontSize: 30,
    margin: 10,
    fontWeight: 'bold',
    color: 'green',
  },

  input: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
  },

  button: {
    marginHorizontal: 100,
    marginVertical: 30,
  },

  footer: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    color: '#000',
  },

});
