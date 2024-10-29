import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [nutritionalValues, setNutritionalValues] = useState({
    kcal: '',
    fat: '',
    saturatedFat: '',
    carbs: '',
    sugars: '',
    proteins: '',
    salt: '',
  });
  const [portion, setPortion] = useState('');
  const [calculatedValues, setCalculatedValues] = useState({});
  const [unit, setUnit] = useState('g'); // Initialiser l'unité sur 'g'

  const calculateValues = () => {
    const factor = parseFloat(portion) / 100;
    const results = {
      kcal: parseFloat(nutritionalValues.kcal) * factor,
      fat: parseFloat(nutritionalValues.fat) * factor,
      saturatedFat: parseFloat(nutritionalValues.saturatedFat) * factor,
      carbs: parseFloat(nutritionalValues.carbs) * factor,
      sugars: parseFloat(nutritionalValues.sugars) * factor,
      proteins: parseFloat(nutritionalValues.proteins) * factor,
      salt: parseFloat(nutritionalValues.salt) * factor,
    };
    setCalculatedValues(results);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'g' ? 'ml' : 'g'));
    // Réinitialiser les valeurs nutritionnelles et la portion lors du changement d'unité
    setNutritionalValues({
      kcal: '',
      fat: '',
      saturatedFat: '',
      carbs: '',
      sugars: '',
      proteins: '',
      salt: '',
    });
    setPortion('');
    setCalculatedValues({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Nutritional Values per 100{unit === 'g' ? 'g' : 'ml'}</Text>
      {Object.keys(nutritionalValues).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          keyboardType="numeric"
          value={nutritionalValues[key]}
          onChangeText={(text) => setNutritionalValues({ ...nutritionalValues, [key]: text })}
        />
      ))}
      <TextInput
        style={styles.input}
        placeholder={`Portion in ${unit === 'g' ? 'grams' : 'milliliters'}`}
        keyboardType="numeric"
        value={portion}
        onChangeText={setPortion}
      />
      <Button title="Calculate" onPress={calculateValues} />

      {calculatedValues.kcal && (
        <View style={styles.results}>
          {Object.keys(calculatedValues).map((key) => (
            <Text key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {calculatedValues[key].toFixed(2)}
            </Text>
          ))}
        </View>
      )}
      
      <TouchableOpacity style={styles.toggleButton} onPress={toggleUnit}>
        <Text style={styles.toggleButtonText}>
          Switch to {unit === 'g' ? 'Milliliters' : 'Grams'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  results: {
    marginTop: 20,
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});