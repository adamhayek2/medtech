#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

const char* ssid = "SE Factory";
const char* password = "SE-F@tory1243%";
const char* serverUrl = "http://192.168.44.130:8000/api/reports/create";
const char* authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xLjEwMTo4MDAwL2FwaS9ndWVzdC9sb2dpbiIsImlhdCI6MTY5NTgzMTI3MCwiZXhwIjoxNjk1ODM0ODcwLCJuYmYiOjE2OTU4MzEyNzAsImp0aSI6Ik5HblVLYm5nUTRtak95NE4iLCJzdWIiOiIyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.enzatCNJ33XzKRFFFmGbIo-snDvJn4IgJgvFunNgniE";

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
    // String imageData = Serial.readStringUntil('\n');
     
  }
  sendToServer();
  delay(60000);
  
}

void sendToServer() {
  HTTPClient http;

  String jsonPayload = "";

  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");  
  // Add the authentication token to the headers
  http.addHeader("Authorization", "Bearer " + String(authToken));

  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("HTTP Response Code: ");
    Serial.println(httpResponseCode);
    Serial.println(response);
  } else {
    Serial.print("HTTP Error Code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
