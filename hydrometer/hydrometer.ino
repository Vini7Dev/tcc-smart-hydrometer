# define FLOW_SENSOR_PIN 16
# define INTERUPT_PIN 16

# define SERIAL_BEGIN 9600
# define START_COUNT_ZERO 0

# define FLOW_PER_PULSE 2.25
# define SECONDS_PER_MINUTE 60
# define MINUTES_PER_HOUR 60
# define MILILITER_PER_LITER 1000
# define METERS_PER_LITER 0.001

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

unsigned long lastSentTime;
unsigned long elapsedTime;
const unsigned long hourInterval = 3600000;

const char* ssid = "WIFI_NAME_HERE";
const char* password = "WIFI_PASSWORD_HERE";
const char* mqtt_server = "MQTT_SERVER_HERE";
const char* mqtt_username = "MQTT_USERNAME";
const char* mqtt_password = "MQTT_PASSWORD";
const int mqtt_port = 1883;

const int HYROMETER_ID = 1;
const char* HYDROMETER_PASSWORD = "example";

WiFiClient espClient;
PubSubClient client(espClient);

double flowRate;
volatile int count;

void setup() {
  pinMode(FLOW_SENSOR_PIN, INPUT);
  attachInterrupt(INTERUPT_PIN, getFlow, RISING);
  lastSentTime = millis();
  Serial.begin(SERIAL_BEGIN);
  
  delay(10);

  Serial.println();
  Serial.print("Connection to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected!");
  Serial.println("IP Address: ");
  Serial.println(WiFi.localIP());

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callbackMQTT);
}

void loop() {
  elapsedTime = millis() - lastSentTime;
  if (elapsedTime >= hourInterval) {
    calculateFlow();
    sendDataToMQTT();
    lastSentTime = millis();
  }
}

void getFlow()
{
  count++;
}

void calculateFlow() {
  double totalFlow = (count * FLOW_PER_PULSE);
  totalFlow = totalFlow * SECONDS_PER_MINUTE;
  totalFlow = totalFlow * MINUTES_PER_HOUR;
  totalFlow = totalFlow / MILILITER_PER_LITER;
  totalFlow = totalFlow * METERS_PER_LITER;
  
  flowRate = totalFlow / (elapsedTime / 3600000.0);
  
  Serial.println(flowRate);
}

void sendDataToMQTT() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  String message = String(HYROMETER_ID) + "|" + HYDROMETER_PASSWORD + "|" + String(flowRate);
  client.publish("createConsumptionMarking", message.c_str());

  delay(5000);
}

void callbackMQTT(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message received [");
  Serial.print(topic);
  Serial.print("]: ");

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting on MQTT...");
    if (client.connect("ESP8266Client", mqtt_username, mqtt_password)) {
      Serial.println("Connected!");
      client.subscribe("createConsumptionMarking");
    } else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
