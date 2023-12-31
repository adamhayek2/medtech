#include <camera_functions.h>

#define enA 10   // PWM pin for Motor 1
#define enB 11   // PWM pin for Motor 2
#define in1 9    // Motor 1 control input 1
#define in2 8    // Motor 1 control input 2
#define in3 7    // Motor 2 control input 1
#define in4 6    // Motor 2 control input 2

void setup() {
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  Serial.begin(9600);
  initializeCamera();

}

void loop() {
  if (Serial.available()) {
    int targetRoom = Serial.parseInt();
    
  

    if(targetRoom == 1){
      Serial.print("the robot is going to room");
      Serial.println(targetRoom);
      room0to1();
      Serial.println("iam in room 1");
      delay(1000);
      captureImage();
      delay(1000);
      room1to0();
      Serial.println("iam in room 0");
      stop();
    }else if(targetRoom == 2){
      Serial.print("the robot is going to room");
      Serial.println(targetRoom);
      room0to2();
      Serial.println("iam in room 2");
      delay(1000);
      captureImage();
      delay(1000);
      room2to0();
      Serial.println("iam in room 0");
      stop();

    };
  };

}

void motorControl(int speedA, int speedB, int dirA, int dirB, int dirC, int dirD) {
  analogWrite(enA, speedA); // Motor 1 speed control
  analogWrite(enB, speedB); // Motor 2 speed control
  digitalWrite(in1, dirA);  // Motor 1 direction control
  digitalWrite(in2, dirB);  // Motor 1 direction control
  digitalWrite(in3, dirC);  // Motor 2 direction control
  digitalWrite(in4, dirD);  // Motor 2 direction control
}

void forward() {
  motorControl(200, 200, HIGH, LOW, HIGH, LOW);
  delay(2000); // Run forward for 2 seconds
}

void backward() {
  motorControl(200, 200, LOW, HIGH, LOW, HIGH);
  delay(2000); // Run Backward for 2 seconds
}

void leftTurning() {
  motorControl(200, 200, LOW, HIGH, HIGH, LOW);
  delay(480); // turn left 90 degrees
}

void rightTurning() {
  motorControl(200, 200, HIGH, LOW, LOW, HIGH);
  delay(480); // turn right 90 degrees
}

void fullTurning() {
  motorControl(200, 200, HIGH, LOW, LOW, HIGH);
  delay(960); // turn left 180 degrees
}
void stop() {
  motorControl(200, 200, LOW, LOW, LOW, LOW);
}

void room0to1() {
  forward();
  leftTurning();
  forward();
  rightTurning();
  forward();
  forward();
}

void room1to0() {
  fullTurning();
  forward();
  forward();
  leftTurning();
  forward();
  rightTurning();
  forward();
  fullTurning();
}

void room0to2() {
  forward();
  rightTurning();
  forward();
  leftTurning();
  forward();
  forward();
}

void room2to0() {
  fullTurning();
  forward();
  forward();
  rightTurning();
  forward();
  leftTurning();
  forward();
  fullTurning();
}

void room1to2() {
  fullTurning();
  forward();
  forward();
  leftTurning();
  forward();
  forward();
  leftTurning();
  forward();
  forward();
}

void room2to1() {
  fullTurning();
  forward();
  forward();
  rightTurning();
  forward();
  forward();
  rightTurning();
  forward();
  forward();
}