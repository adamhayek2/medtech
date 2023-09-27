#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>
#include <ArduinoJson.h>

const char* ssid = "";
const char* password = "";

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  AsyncCallbackJsonWebHandler* jsonHandler = new AsyncCallbackJsonWebHandler("/goto_room", [](AsyncWebServerRequest *request, JsonVariant &json) {
  
  server.begin();
}
}