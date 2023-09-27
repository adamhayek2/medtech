#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>
#include <ArduinoJson.h>

const char* ssid = "Hayek";
const char* password = "71606301";

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);
  Serial2.begin(9600);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  AsyncCallbackJsonWebHandler* jsonHandler = new AsyncCallbackJsonWebHandler("/goto_room", [](AsyncWebServerRequest *request, JsonVariant &json) {
    JsonObject jsonObj = json.as<JsonObject>();
    if (jsonObj.containsKey("room")) {
      int roomCommand = jsonObj["room"];
      Serial.println(roomCommand);
      Serial2.print(roomCommand);

    }

    request->send(200, "application/json", "{\"message\": \"Command sent to Arduino successfully\"}");
  });
  server.addHandler(jsonHandler);

  server.begin();
}

void loop() {
  if (Serial.available() > 0) {
    String imageData = Serial.readStringUntil('\n');

  }
}
