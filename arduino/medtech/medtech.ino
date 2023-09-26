#define enA 10   // PWM pin for Motor 1
#define enB 11  // PWM pin for Motor 2
#define in1 9   // Motor 1 control input 1
#define in2 8   // Motor 1 control input 2
#define in3 7  // Motor 2 control input 1
#define in4 6  // Motor 2 control input 2

void setup() {
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
}

void loop() {
  fromRoom0ToRoom1();
  fromRoom1ToRoom0();
  fromRoom0ToRoom2();
  fromRoom2ToRoom0();
  
}

void motorControl(int speedA, int speedB, int dirA, int dirB, int dirC, int dirD) {
  analogWrite(enA, speedA); // Motor 1 speed control
  analogWrite(enB, speedB); // Motor 2 speed control
  digitalWrite(in1, dirA);  // Motor 1 direction control
  digitalWrite(in2, dirB);  // Motor 1 direction control
  digitalWrite(in3, dirC);  // Motor 2 direction control
  digitalWrite(in4, dirD);  // Motor 2 direction control
}



void fromRoom0ToRoom1() {
  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  // Stop motors
  motorControl(0, 200, HIGH, LOW, HIGH, LOW);//left
  delay(600); // Pause for 1 second

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  // Stop motors
  motorControl(200, 0, HIGH, LOW, HIGH, LOW);//right
  delay(600); // Pause for 1 second

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  motorControl(0, 0, LOW, LOW, LOW, LOW);//stop
  delay(4000); // Run forward for 2 seconds
}


void fromRoom0ToRoom2() {
  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  // Stop motors
  motorControl(200, 0, HIGH, LOW, HIGH, LOW);//right
  delay(600); // Pause for 1 second

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  // Stop motors
  motorControl(0, 200, HIGH, LOW, HIGH, LOW);//left
  delay(600); // Pause for 1 second

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  motorControl(0, 0, LOW, LOW, LOW, LOW);//stop
  delay(4000); // Run forward for 2 seconds
}

void fromRoom1ToRoom0() {
  motorControl(0, 250, HIGH, LOW, HIGH, LOW);//180
  delay(1200); // Run forward for 2 seconds

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  // Stop motors
  motorControl(200, 0, HIGH, LOW, HIGH, LOW);//left
  delay(600); // Pause for 1 second

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  // Stop motors
  motorControl(0, 200, HIGH, LOW, HIGH, LOW);//right
  delay(600); // Pause for 1 second

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  motorControl(0, 200, HIGH, LOW, HIGH, LOW); //180
  delay(1200); // Run forward for 2 seconds

  motorControl(0, 0, LOW, LOW, LOW, LOW);//stop
  delay(4000); // Run forward for 2 seconds
}

void fromRoom2ToRoom0() {
  motorControl(0, 200, HIGH, LOW, HIGH, LOW);//180
  delay(1200); // Run forward for 2 seconds

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  // Stop motors
  motorControl(0, 200, HIGH, LOW, HIGH, LOW);//left
  delay(600); // Pause for 1 second

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  // Stop motors
  motorControl(200, 00, HIGH, LOW, HIGH, LOW);//right
  delay(600); // Pause for 1 second

  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds

  motorControl(200, 0, HIGH, LOW, HIGH, LOW);
  delay(1200); // Run forward for 2 seconds

  motorControl(0, 0, LOW, LOW, LOW, LOW);//stop
  delay(4000); // Run forward for 2 seconds
}



















