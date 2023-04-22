# define FLOW_SENSOR_PIN 2
# define INTERUPT_PIN 0

# define SERIAL_BEGIN 9600
# define START_COUNT_ZERO 0

# define FLOW_PER_PULSE 2.25
# define SECONDS_PER_MINUTE 60
# define MILILITER_PER_LITER 1000

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "WIFI_NAME_HERE";
const char* password = "WIFI_PASSWORD_HERE";
const char* mqtt_server = "MQTT_SERVER_HERE";
const char* mqtt_username = "MQTT_USERNAME";
const char* mqtt_password = "MQTT_PASSWORD";
const int* mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

double flowRate;
volatile int count;

void setup() {
  pinMode(FLOW_SENSOR_PIN, INPUT);
  attachInterrupt(INTERUPT_PIN, getFlow, RISING);
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
  calculateFlow();
  sendDataToMQTT();
}

void getFlow()
{
  count++;
}

void calculateFlow() {
  count = START_COUNT_ZERO;
  interrupts();
  delay (1000);
  noInterrupts();

  flowRate = (count * FLOW_PER_PULSE);
  flowRate = flowRate * SECONDS_PER_MINUTE;
  flowRate = flowRate / MILILITER_PER_LITER;

  Serial.println(flowRate);
}

void sendDataToMQTT() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  char msg[10];
  sprintf(msg, "%.2f", flowRate);
  client.publish("createConsumptionMarking", msg);
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
