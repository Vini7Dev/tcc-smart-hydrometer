import mqtt from 'mqtt'

const MQTT_BROKER_BASE_URL = process.env.MQTT_BROKER_BASE_URL ?? 'mqtt://localhost:3333'
const MQTT_BROKER_USERNAME = process.env.MQTT_BROKER_USERNAME
const MQTT_BROKER_PASSWORD = process.env.MQTT_BROKER_PASSWORD

const MQTT_CREATE_CONSUMPTION_MARKING_TOPC = 'createConsumptionMarking'

const mqttClient = mqtt.connect(
  MQTT_BROKER_BASE_URL,
  {
    username: MQTT_BROKER_USERNAME,
    password: MQTT_BROKER_PASSWORD,
  }
)

mqttClient.on('connect', async () => {
  console.log('Connnected on MQTT')
  mqttClient.subscribe(MQTT_CREATE_CONSUMPTION_MARKING_TOPC)
})

mqttClient.on('message', async (topic, message) => {
  console.log('Message received [' + topic + ']: ' + message.toString());
});

mqttClient.on('error', async (error) => {
  console.log('Error: ' + error);
})
