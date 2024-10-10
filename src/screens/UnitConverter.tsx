import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [formUnit, setFormUnit] = useState('Metre');
  const [toUnit, setToUnit] = useState('Metre');
  const [result, setResult] = useState('');

  const units = ['Metre', 'Millimetre', 'Foot', 'Mile'];

  const convertUnits = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Please enter a valid number');
      return;
    }

    let valueInMetres = 0;
    switch (formUnit) {
      case 'Metre':
        valueInMetres = value;
        break;
      case 'Millimetre':
        valueInMetres = value / 1000;
        break;
      case 'Mile':
        valueInMetres = value * 1609.34;
        break;
      case 'Foot':
        valueInMetres = value * 0.3048;
        break;
      default:
        setResult('Invalid from unit');
        return;
    }

    let convertedValue;
    switch (toUnit) {
      case 'Metre':
        convertedValue = valueInMetres;
        break;
      case 'Millimetre':
        convertedValue = valueInMetres * 1000;
        break;
      case 'Mile':
        convertedValue = valueInMetres / 1609.34;
        break;
      case 'Foot':
        convertedValue = valueInMetres / 0.3048;
        break;
      default:
        setResult('Invalid to unit');
        return;
    }

    setResult(`${value} ${formUnit} is equal to ${convertedValue} ${toUnit}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <RNPickerSelect
        onValueChange={(value) => setFormUnit(value)}
        items={units.map((unit) => ({ label: unit, value: unit }))}
      />
      <RNPickerSelect
        onValueChange={(value) => setToUnit(value)}
        items={units.map((unit) => ({ label: unit, value: unit }))}
      />
      <Button title="Convert" onPress={convertUnits} />
      {result !== '' && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default UnitConverter;