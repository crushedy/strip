pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    RobotRight(100)
    basic.pause(100)
    if (state == 0) {
        RobotStop()
    }
    if (state == 1) {
        RobotForward(100)
    }
    if (state == 2) {
        RobotBack(100)
    }
    if (state == 3) {
        RobotLeft(100)
    }
    if (state == 4) {
        RobotRight(100)
    }
})
function RobotStop () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 0, 67)
}
function FrontLedsWhite () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 0, 67)
}
function FrontLedsRed () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 0, 67)
}
// LED1 and LED3 are controlling the direction the rest are controlling the speed
function RobotForward (speed: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, speed, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, speed, 67)
}
function RobotBack (speed: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, speed, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, speed, 67)
}
pins.onPulsed(DigitalPin.P11, PulseValue.High, function () {
    RobotLeft(100)
    basic.pause(100)
    if (state == 0) {
        RobotStop()
    }
    if (state == 1) {
        RobotForward(100)
    }
    if (state == 2) {
        RobotBack(100)
    }
    if (state == 3) {
        RobotLeft(100)
    }
    if (state == 4) {
        RobotRight(100)
    }
})
function ReadSonarDistance () {
    let distance = 0
    serial.writeString("Ditance is ")
    serial.writeNumber(distance)
    serial.writeString("cm")
    serial.writeLine("")
}
function FrontLedsBlue () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 100, 67)
}
function FrontLedsOff () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 100, 67)
}
function FrontLedsGreen () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 100, 67)
}
function RobotLeft (speed: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, speed, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, speed, 67)
}
maqueen.IR_callbackUser(function ({ myparam: message }) {
    IR_Value = message
    if (IR_Value == 70) {
        state = 1
        serial.writeLine("Forward Button Pressed")
        RobotForward(100)
    } else if (IR_Value == 21) {
        state = 2
        serial.writeLine("Back Button Pressed")
        RobotBack(100)
    } else if (IR_Value == 67) {
        state = 3
        serial.writeLine("Right Button Pressed")
        RobotRight(100)
    } else if (IR_Value == 68) {
        state = 4
        serial.writeLine("Left Button Pressed")
        RobotLeft(100)
    } else if (IR_Value == 64) {
        state = 0
        serial.writeLine("Stop Button Pressed")
        RobotStop()
    }
})
function RobotRight (speed: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, speed, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, speed, 67)
}
let R_Sensor = 0
let L_Sensor = 0
let IR_Value = 0
let state = 0
let previous_state = 0
let strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
strip.clear()
music.setBuiltInSpeakerEnabled(false)
PCA9685.reset(67)
RobotStop()
serial.redirectToUSB()
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
// FrontLedsRed()
// ReadSonarDistance()
// // RobotForward(100)
// 
// basic.pause(500)
// strip.showColor(neopixel.colors(NeoPixelColors.Orange))
// basic.pause(500)
// strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
// basic.pause(500)
// strip.showColor(neopixel.colors(NeoPixelColors.Green))
// FrontLedsGreen()
// // RobotBack(100)
// basic.pause(500)
// strip.showColor(neopixel.colors(NeoPixelColors.Blue))
// basic.pause(500)
// strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
// FrontLedsBlue()
// // RobotLeft(100)
// basic.pause(500)
// strip.showColor(neopixel.colors(NeoPixelColors.Violet))
// basic.pause(500)
// strip.showColor(neopixel.colors(NeoPixelColors.Purple))
// // RobotRight(100)
// basic.pause(500)
// strip.showColor(neopixel.colors(NeoPixelColors.White))
// FrontLedsWhite()
// // RobotStop()
// basic.pause(500)
// strip.showColor(neopixel.colors(NeoPixelColors.White))
basic.forever(function () {
    L_Sensor = pins.digitalReadPin(DigitalPin.P2)
    R_Sensor = pins.digitalReadPin(DigitalPin.P11)
    if (L_Sensor == 1 && R_Sensor == 1) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    }
})
