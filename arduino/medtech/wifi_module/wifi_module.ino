#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>
#include <ArduinoJson.h>

const char* ssid = "Hayek";
const char* password = "71606301";

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
    JsonObject jsonObj = json.as<JsonObject>();
    if (jsonObj.containsKey("room")) {
      int roomCommand = jsonObj["room"];
      Serial.print("Received room command: ");
      Serial.println(roomCommand);

    }

    request->send(200, "application/json", "{\"message\": \"Command sent to Arduino successfully\"}");
  });
  server.addHandler(jsonHandler);

  server.begin();
}

void loop() {
  if (Serial.available() > 0) {
    int roomCommand = Serial.parseInt();
    Serial.println(roomCommand);

  }
}
