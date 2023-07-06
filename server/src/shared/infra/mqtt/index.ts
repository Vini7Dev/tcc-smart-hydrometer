import 'reflect-metadata'
import mqtt from 'mqtt'

import '@shared/containers'
import { CreateConsumptionMarkingTopic } from './topics/CreateConsumptionMarkingTopic'

const MQTT_BROKER_BASE_URL = process.env.MQTT_BROKER_BASE_URL ?? 'mqtt://localhost:3333'
const MQTT_BROKER_USERNAME = process.env.MQTT_BROKER_USERNAME
const MQTT_BROKER_PASSWORD = process.env.MQTT_BROKER_PASSWORD

const MQTT_CREATE_CONSUMPTION_MARKING_TOPIC = 'createConsumptionMarking'

const mqttClient = mqtt.connect(
  MQTT_BROKER_BASE_URL,
  {
    username: MQTT_BROKER_USERNAME,
    password: MQTT_BROKER_PASSWORD,
  }
)

mqttClient.on('connect', async () => {
  console.log('[Connnected on MQTT]')
  mqttClient.subscribe(MQTT_CREATE_CONSUMPTION_MARKING_TOPIC)
})

mqttClient.on('error', async (error) => {
  console.log('[MQTT Error]: ' + error)
})

mqttClient.on('message', async (topic, message) => {
  console.log('[Message received in the topic ' + topic + ']: ' + message.toString())

  if (topic === MQTT_CREATE_CONSUMPTION_MARKING_TOPIC) {
    const messageString = message.toString()

    const createConsumptionMarkingTopic = new CreateConsumptionMarkingTopic()

    await createConsumptionMarkingTopic.receiveMessage(messageString)
  }
})
