import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';

const DATA = [
  {
    x: 'Rio De Janeiro',
    y: 6000000,
    color: 'green',
  },
  {
    x: 'São Paulo',
    y: 12000000,
    color: 'blue',
  },
  {
    x: 'Brasília',
    y: 3000000,
    color: 'purple',
  },
];

export default function App() {
  const [selected, setSelected] = useState<string>('');

  return (
    <TouchableWithoutFeedback onPress={() => setSelected('')}>
      <View style={styles.container}>
        <Text style={styles.title}>Gráfico de população</Text>
        <StatusBar style='light' backgroundColor='transparent' translucent />
        <View style={styles.chart}>
          <VictoryPie
            data={DATA}
            colorScale={DATA.map((value) => value.color)}
            style={{
              labels: {
                display: 'none',
              },
              data: {
                fillOpacity: ({ datum }) => (datum.x === selected ? 1 : 0.3),
              },
            }}
            innerRadius={80}
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                style={{
                  color: 'black',
                }}
                orientation={'top'}
              />
            }
          />
        </View>
        <View style={{ marginTop: 20, marginLeft: 10 }}>
          {DATA.map((value, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: value.color,
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                }}
              />
              <Text
                onPress={() => setSelected(value.x)}
                style={{ color: 'white', marginLeft: 5 }}
              >
                {value.x}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
    paddingVertical: 40,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
  },
  chart: {
    width: '100%',
    alignItems: 'center',
  },
});
