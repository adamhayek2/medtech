#define enA 10   // PWM pin for Motor 1
#define enB 11   // PWM pin for Motor 2
#define in1 9    // Motor 1 control input 1
#define in2 8    // Motor 1 control input 2
#define in3 7    // Motor 2 control input 1
#define in4 6    // Motor 2 control input 2

int currentRoom = 0;

void setup() {
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);

}

void loop() {
  // put your main code here, to run repeatedly:

}

void motorControl(int speedA, int speedB, int dirA, int dirB, int dirC, int dirD) {
  analogWrite(enA, speedA); // Motor 1 speed control
  analogWrite(enB, speedB); // Motor 2 speed control
  digitalWrite(in1, dirA);  // Motor 1 direction control
  digitalWrite(in2, dirB);  // Motor 1 direction control
  digitalWrite(in3, dirC);  // Motor 2 direction control
  digitalWrite(in4, dirD);  // Motor 2 direction control
}