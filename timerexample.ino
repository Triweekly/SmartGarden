boolean toggle1 = false;

volatile int seconds = 1;

const int TIME_BETWEEN = 15; //The number of seconds between triggers of the timer interupt
const LEDPIN = LED_BUILTIN; 
const CHANNEL1 = 4;

volatile int LEDOff = -1;
volatile int relayChannelOneOff = -1;

void setup() {

  pinMode(LED_BUILTIN, OUTPUT);

  cli();//stop interrupts

  TCCR1A = 0;// set entire TCCR1A register to 0
  TCCR1B = 0;// same for TCCR1B
  TCNT1  = 0;//initialize counter value to 0
  // set compare match register for 1hz increments
  OCR1A = 15624;// = (1610^6) / (11024) - 1 (must be <65536)
  // turn on CTC mode
  TCCR1B |= (1 << WGM12);
  // Set CS10 and CS12 bits for 1024 prescaler
  TCCR1B |= (1 << CS12) | (1 << CS10);
  // enable timer compare interrupt
  TIMSK1 |= (1 << OCIE1A);

  sei();//allow interrupts
}

void LEDTwoSeconds()
{
  
  LEDOff = 2;
  digitalWrite(LED_BUILTIN, HIGH);
  
  return;
}


ISR(TIMER1_COMPA_vect)//timer1 interrupt 1Hz
  {
      Serial.println(seconds);
      if(seconds == LEDOff) //Watches for the variable called LEDOff to turn LED back off. Could be used for a relay channel
      {
        digitalWrite(LEDPIN, LOW);
      }

      if(seconds == relayChannelOneOff) //inaccessible for now
      {
        digitalWrite(CHANNEL1, LOW);
      }
    
      if(seconds == TIME_BETWEEN)
      {
        LEDTwoSeconds();
        seconds = 1;

      }
      
      else
      {
          seconds++;
      }
  }

void loop() {

}
