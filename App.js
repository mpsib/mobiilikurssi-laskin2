import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const calculate = (operation) => {
    let res;
    if (operation === '+'){
      res = Number(val1) + Number(val2);
    } else if (operation === '-'){
      res = Number(val1) - Number(val2);
    }
    setResult(res);
    let historyString = val1 + ' ' + operation + ' ' + val2 + ' = ' + res;
    setHistory([...history, {key: historyString}]);
  }

  return (
    <View style={styles.container}>

      <View style={{flex:1}}>
        <Text>Result: {result}</Text>
          
        <TextInput
          style={{width: 200, borderColor:'gray', borderWidth:1 }}
          onChangeText={text => setVal1(text)}
          value={val1}
          keyboardType={'decimal-pad'}
        />
        <TextInput
          style={{width: 200, borderColor:'gray', borderWidth:1 }}
          onChangeText={text => setVal2(text)}
          value={val2}
          keyboardType={'decimal-pad'}
        />
        <View style={styles.horizontal}>
          <View style={styles.button}>
            <Button onPress={() => calculate('+')} title="+"/>
          </View>
          <View style={styles.button}>
            <Button onPress={() => calculate('-')} title="-"/>
          </View>
        </View>
      </View>
      
      <View style={{flex:2}}>
        <Text>History</Text>
        <FlatList
          data={history}
          renderItem={ ({item}) => <Text>{item.key}</Text> }
          keyExtractor={ (item, index) => index.toString() }
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:100,
  },
  button: {
    width:40,
    margin:20,
  },
  horizontal: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'space-evenly',
  }
});
