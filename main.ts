
let bleMsg: string;
let bleReceive: string;
let reply_flag: boolean;
let ble_reply: string;
/**
 * Custom blocks
 */
//% weight=50 color=#16aeac icon="\u0041"
namespace Andee {
    export class Widget {

        private widgetId: number;
        private widgetType: number;
        private widgetCoordX: number;
        private widgetCoordY: number;
        private widgetWidth: number;
        private widgetHeight: number;
        private widgetColour: number;
        private widgetTitle: string;
        private widgetData: string;
        private widgetUnit: string;

        private widgetInputMode: string;
        private widgetMaxValue: string;
        private widgetMinValue: string;
        private widgetSliderSteps: number;

        private widgetUpdate: number;

        public setId(ID: WidgetId): void {
            this.widgetId = ID;
        }
        public setType(typeW: number): void {
            this.widgetType = typeW;
        }

        public setMinMax(minW: string, maxW: string): void {
            this.widgetMinValue = minW;
            this.widgetMaxValue = maxW;
        }
        public setSliderSteps(sliderSteps: number): void {
            this.widgetSliderSteps = sliderSteps;
        }
        /**
         * Force Widget to update
         */
        //% weight=5
        //% blockId=force_update
        //% block="Force %widget| to update"
        //% advanced=true
        public forceUpdate(): void {
            this.widgetUpdate = 0;
        }
        /**
         * The X coordinate of the top left hand corner of the widget
         * @param x Coordinate X of widget, eg: 5
         */
        //% weight=75
        //% blockId=set_widget_coordX
        //% block="Set Coordinate X of %widget| to %x"
        //% x.min=0 x.max=100
        //% advanced=true
        public setCoordX(x: number): void {
            this.widgetCoordX = x;
        }
        /**
         * The Y coordinate of the top left hand corner of the widget
         * @param y Coordinate Y of widget, eg: 5
         */
        //% weight=70
        //% blockId=set_widget_coordY
        //% block="Set Coordinate Y of %widget| to %y"
        //% y.min=0 y.max=100
        //% advanced=true
        public setCoordY(y: number): void {
            this.widgetCoordY = y;
        }
        /**
         * A width should be specified for each widget
         * @param w Set Widget Width, eg: 50
         */
        //% weight=65
        //% blockId=set_widget_width
        //% block="Set Width of %widget| to %w"
        //% w.min=0 w.max=100
        //% advanced=true
        public setWidth(w: number): void {
            this.widgetWidth = w;
        }
        /**
         * A height should be specified for each widget
         * @param h Set Widget Height, eg: 25
         */
        //% weight=60
        //% blockId=set_widget_height
        //% block="Set Height of %widget| to %h"
        //% h.min=0 h.max=100
        //% advanced=true
        public setHeight(h: number): void {
            this.widgetHeight = h;
        }
        /**
         * Each widget should have a colour
         * @param colour Set Widget Colour, eg: WidgetColour.Red
         */
        //% weight=55
        //% blockId=set_widget_colour
        //% block="Set Colour of %widget| to %colour"
        //% advanced=true
        public setColour(colour: WidgetColour): void {
            this.widgetColour = colour;
        }
        /**
         * Each widget should have a title
         * @param title Set Widget Title, eg: "Title"
         */
        //% weight=100
        //% blockId=set_widget_title
        //% block="Set Title of %widget| to %title"
        //% advanced=true
        public setTitle(title: string): void {
            this.widgetTitle = title;
        }
        /**
         * Units are optional
         * @param units Set Widget Units, eg: "Units"
         */
        //% weight=85
        //% blockId=set_widget_units
        //% block="Set Units of %widget| to %units"
        //% advanced=true
        public setUnit(units: string): void {
            this.widgetUnit = units;
        }
        /**
         * This can display data
         * @param data Set Widget Data, eg: "Data"
         */
        //% weight=90
        //% blockId=set_widget_data
        //% block="Set Data of %widget| to %data"
        //% advanced=true
        public setData(data: string): void {
            this.widgetData = data;
        }
        /**
         * Button widget has more than 1 input modes
         * @param mode Set Button Mode, eg: ButtonMode.Acknowledge
         */
        //% weight=80
        //% blockId=set_button_mode
        //% block="Set Button Mode of %widget| to %mode"
        //% advanced=true
        public setButtonInputMode(mode: ButtonMode): void {
            this.widgetInputMode = String.fromCharCode(mode);
        }
        /**
         * Keyboard widget has more than 1 input modes
         * @param mode Set Button Mode, eg: KeyboardMode.AlphaNumeric
         */
        //% weight=80
        //% blockId=set_keyboard_mode
        //% block="Set Keyboard Mode of %widget| to %mode"
        //% advanced=true
        public setKeyboardInputMode(mode: KeyboardMode): void {
            this.widgetInputMode = String.fromCharCode(mode);
        }
        /**
         * Slider widget has more than 1 input modes
         * @param mode Set Slider Mode, eg: SliderMode.ON_FINGER_RELEASE
         */
        //% weight=80
        //% blockId=set_slider_mode
        //% block="Set Slider Mode of %widget| to %mode"
        //% advanced=true
        public setSliderInputMode(mode: SliderMode): void {
            this.widgetInputMode = String.fromCharCode(mode);
        }
        /**
         * Block to remove widgets individually
         * @param widget widget to be removed
         */
        //% blockId=Andee_remove
        //% block="Remove Widget%widget"
        public remove(): void {
            bleMsg = String.fromCharCode(UISTART) + REMOVE + String.fromCharCode(SEP) +
                String.fromCharCode(this.widgetId + 32) + String.fromCharCode(UIEND);
            bluetooth.uartWriteString(bleMsg);
        }
        /**
         * Update Block to update widget properties   
         * @param widget Widget Data to send to app 
         */
        //% weight=85
        //% blockId=Andee_widget_update
        //% block="Update Widget%widget"
        public update(): void {
            this.updateLoop(100);
        }
        /**
         * Block to send acknowledgement back to app
         */
        //% weight=10
        //% blockId=Andee_ack
        //% block="Send Ack%widget"
        //% advanced=true
        public ack(): void {
            bleMsg = "";
            bleMsg = String.fromCharCode(UISTART) + ACKN + String.fromCharCode(SEP) + String.fromCharCode(this.widgetId + 32) + String.fromCharCode(UIEND);
            bluetooth.uartWriteString(bleMsg);
        }
        /**
         * Update Block to update widget properties   
         * @param widget Widget Data to send to app 
         * @param loop Number of loops before updating widget, eg: 100
         */
        //% weight=20
        //% blockId=Andee_widget_update_loop
        //% block="Update Widget%widget| every %loop|loops"
        //% advanced=true
        public updateLoop(loop: number): void {
            let packetBreak: number;
            let tempString: string;

            if (reply_flag == true) {
                reply_flag = false;
                ble_reply = bleReceive.substr(4);
                control.raiseEvent((bleReceive.charCodeAt(2) - 32) + EVENT_ID_OFFSET, ANDEE_EVENT_VALUE);
                bleReceive = "";
            }

            if (this.widgetUpdate == loop || this.widgetUpdate == (0)) {
                switch (this.widgetType) {
                    case WidgetType.Databox:
                        bleMsg = String.fromCharCode(UISTART) + DATA_OUT + String.fromCharCode(this.widgetId + 32) +
                            String.fromCharCode(this.widgetCoordX + 32) + String.fromCharCode(this.widgetCoordY + 32) +
                            String.fromCharCode(this.widgetWidth + 32) + String.fromCharCode(this.widgetHeight + 32) +
                            this.widgetInputMode +
                            String.fromCharCode(SEP) + String.fromCharCode(this.widgetColour + 32) +
                            String.fromCharCode(SEP) + this.widgetTitle +
                            String.fromCharCode(SEP) + this.widgetUnit +
                            String.fromCharCode(SEP) + this.widgetData + String.fromCharCode(UIEND);
                        break;
                    case WidgetType.Databox_Circle:
                        bleMsg = String.fromCharCode(UISTART) + DATA_OUT_CIRCLE + String.fromCharCode(this.widgetId + 32) +
                            String.fromCharCode(this.widgetCoordX + 32) + String.fromCharCode(this.widgetCoordY + 32) +
                            String.fromCharCode(this.widgetWidth + 32) + String.fromCharCode(this.widgetHeight + 32) +
                            this.widgetInputMode +//inputType
                            String.fromCharCode(SEP) + String.fromCharCode(this.widgetColour + 32) +
                            String.fromCharCode(SEP) + this.widgetTitle +
                            String.fromCharCode(SEP) + this.widgetUnit +
                            String.fromCharCode(SEP) + this.widgetData + String.fromCharCode(UIEND);
                        break;
                    case WidgetType.Databox_Header:
                        bleMsg = String.fromCharCode(UISTART) + DATA_OUT_HEADER + String.fromCharCode(this.widgetId + 32) +
                            String.fromCharCode(this.widgetCoordX + 32) + String.fromCharCode(this.widgetCoordY + 32) +
                            String.fromCharCode(this.widgetWidth + 32) + String.fromCharCode(this.widgetHeight + 32) +
                            this.widgetInputMode +//inputType
                            String.fromCharCode(SEP) + String.fromCharCode(this.widgetColour + 32) +
                            String.fromCharCode(SEP) + this.widgetTitle + String.fromCharCode(UIEND);
                        break;

                    case WidgetType.Button:
                        bleMsg = String.fromCharCode(UISTART) + BUTTON_IN + String.fromCharCode(this.widgetId + 32) +
                            String.fromCharCode(this.widgetCoordX + 32) + String.fromCharCode(this.widgetCoordY + 32) +
                            String.fromCharCode(this.widgetWidth + 32) + String.fromCharCode(this.widgetHeight + 32) +
                            this.widgetInputMode +//inputType
                            String.fromCharCode(SEP) + String.fromCharCode(this.widgetColour + 32) +
                            String.fromCharCode(SEP) + this.widgetTitle + String.fromCharCode(UIEND);
                        break;
                    case WidgetType.Button_Circle:
                        bleMsg = String.fromCharCode(UISTART) + CIRCLE_BUTTON + String.fromCharCode(this.widgetId + 32) +
                            String.fromCharCode(this.widgetCoordX + 32) + String.fromCharCode(this.widgetCoordY + 32) +
                            String.fromCharCode(this.widgetWidth + 32) + String.fromCharCode(this.widgetHeight + 32) +
                            this.widgetInputMode +//inputType
                            String.fromCharCode(SEP) + String.fromCharCode(this.widgetColour + 32) +
                            String.fromCharCode(SEP) + this.widgetTitle + String.fromCharCode(UIEND);
                        break;
                    case WidgetType.Keyboard_In:
                        bleMsg = String.fromCharCode(UISTART) + KEYBOARD_IN + String.fromCharCode(this.widgetId + 32) +
                            String.fromCharCode(this.widgetCoordX + 32) + String.fromCharCode(this.widgetCoordY + 32) +
                            String.fromCharCode(this.widgetWidth + 32) + String.fromCharCode(this.widgetHeight + 32) +
                            this.widgetInputMode +//inputType
                            String.fromCharCode(SEP) + String.fromCharCode(this.widgetColour + 32) +
                            String.fromCharCode(SEP) + this.widgetTitle +
                            String.fromCharCode(SEP) + this.widgetData + String.fromCharCode(UIEND);
                        break;
                    case WidgetTypeInput.Slider:
                        bleMsg = String.fromCharCode(UISTART) + SLIDER_IN + String.fromCharCode(this.widgetId + 32) +
                            String.fromCharCode(this.widgetCoordX + 32) + String.fromCharCode(this.widgetCoordY + 32) +
                            String.fromCharCode(this.widgetWidth + 32) + String.fromCharCode(this.widgetHeight + 32) +
                            this.widgetInputMode +//inputType
                            String.fromCharCode(SEP) + String.fromCharCode(this.widgetColour + 32) +
                            String.fromCharCode(SEP) + this.widgetTitle +
                            String.fromCharCode(SEP) + this.widgetData +
                            String.fromCharCode(SEP) + this.widgetMaxValue +
                            String.fromCharCode(SEP) + this.widgetMinValue +
                            String.fromCharCode(SEP) + String.fromCharCode(this.widgetSliderSteps + 32) +
                            String.fromCharCode(SEP) + "0" + String.fromCharCode(UIEND);
                        break;
                    case WidgetTypeInput.Analog_Dial:
                        bleMsg = String.fromCharCode(UISTART) + ANALOG_DIAL_OUT + String.fromCharCode(this.widgetId + 32) +
                            String.fromCharCode(this.widgetCoordX + 32) + String.fromCharCode(this.widgetCoordY + 32) +
                            String.fromCharCode(this.widgetWidth + 32) + String.fromCharCode(this.widgetHeight + 32) +
                            this.widgetInputMode +//inputType
                            String.fromCharCode(SEP) + String.fromCharCode(this.widgetColour + 32) +
                            String.fromCharCode(SEP) + this.widgetTitle +
                            String.fromCharCode(SEP) + this.widgetUnit +
                            String.fromCharCode(SEP) + this.widgetData +
                            String.fromCharCode(SEP) + this.widgetMaxValue +
                            String.fromCharCode(SEP) + this.widgetMinValue + String.fromCharCode(UIEND);
                        break;

                    default:
                        serial.writeString("update error");
                        break;
                }
                /////////////////////////////////Sending data to BLE////////////////////////////////////            
                packetBreak = (bleMsg.length / 20) + 1;
                for (let i = 0; i < packetBreak; i++) {
                    tempString = bleMsg.substr((i * 20), 20);
                    bluetooth.uartWriteString(tempString);
                    //serial.writeLine(tempString);
                }
                this.widgetUpdate = 1;
            }
            else {
                this.widgetUpdate += 1;
            }
        }


    }
    /**
     * Block to begin Andee Services
     */
    //% weight=100
    //% blockId=Andee_begin
    //% block="Andee Begin"
    export function begin(): void {
        reply_flag = false;
        ble_reply = "";
        bluetooth.startUartService();
        bluetooth.onUartDataReceived("]", () => {
            bleReceive = bluetooth.uartReadUntil("]");
            reply_flag = true;
        });
    }
    /**
     * Raises an Andee event in the event bus using PXT Control functions
     * @param id ID of the Widget, eg: WidgetId.Widget_1
     */
    //% weight=20 blockGap=8 blockId="Andee_event" block="Widget Event|%id"
    //% blockExternalInputs=1
    export function WidgetEvent(id: WidgetId, action: Action): void {
        control.onEvent(id + EVENT_ID_OFFSET, ANDEE_EVENT_VALUE, action);
    }

    /**
     * Create Widget
     * @param id ID of Widget, eg: WidgetId.Widget_1
     * @param widgetType Type of Widget, eg: WidgetType.Databox
     * @param position Position of Widget, eg: WidgetPosition.Row0_Column0
     * @param length Length of Widget, eg: WidgetLength.Half
     * @param colour Colour of Widget, eg: WidgetColour.Red
     * @param title Title of Widget, eg: "Title"
     * @param data Widget Data Display, eg: "Data"
     * @param unit Widget Units Display, eg: "Units"
     */
    //% weight=90
    //% blockId=create_widget icon="\u0041
    //% block="Create Widget: %id|Widget Type%widgetType|Position%position|Widget Length%WidgetLength|Widget Colour%WidgetColour|Widget Title%title|Widget Data%data|Widget Units%unit"
    //% widgetType.fieldEditor="gridpicker" widgetType.fieldOptions.columns=3
    //% position.fieldEditor="gridpicker" position.fieldOptions.columns=4
    //% WidgetColour.fieldEditor="gridpicker" WidgetColour.fieldOptions.columns=2
    export function createWidget(id: WidgetId, widgetType: WidgetType, position: WidgetPosition, length: WidgetLength,
        colour: WidgetColour, title: string, data: string, unit: string): Widget {
        let widget = new Widget();
        let imd: number;

        widget.setId(id);
        widget.setType(widgetType);
        widget.setColour(colour);

        widget.setHeight(20);
        imd = position / 4;
        widget.setCoordY((imd * 20) + ((imd + 1) * 4));//calculating y coordinate
        imd = position - ((position / 4) * 4);
        widget.setCoordX((imd * 20) + ((imd + 1) * 4));//calculating x coordinate

        switch (length) {
            case WidgetLength.One_Quarter: //one_quarter
                widget.setWidth(20);
                break;
            case WidgetLength.Half: //half
                widget.setWidth(44);
                break;
            case WidgetLength.Full: //full
                widget.setWidth(92);
                break;
            default:
                serial.writeString("length error");
                break;
        }

        widget.setTitle(title);
        widget.setData(data);
        widget.setUnit(unit);

        widget.setButtonInputMode(ButtonMode.MultiPress);
        widget.forceUpdate();
        return widget;
    }
    /**
     * Create Slider/Analog Circle Widget
     * @param id ID of Widget, eg: WidgetId.Widget_1
     * @param widgetType Type of Widget, eg: WidgetTypeInput.Slider
     * @param position Position of Widget,eg: WidgetPosition.Row0_Column0
     * @param length Length of Widget, eg: WidgetLength.Full
     * @param colour Colour of Widget, eg: WidgetColour.Red
     * @param title Title of Widget, eg: "Title"     
     * @param unit Widget Units Display,eg: "Units"
     * @param currentValue Widget Current Value for Display, eg: "0"
     * @param maxValue Max Value for Display, eg: "100"
     * @param minValue Min Value for Display, eg: "0"
     * @param sliderSteps Number of steps for slider, eg: 100
     */
    //% weight=88
    //% blockId=create_slider_widget icon="\u0041
    //% block="Create Slider/|AnalogCircle Widget: %id|Widget Type%widgetType|Position%position|Widget Length%WidgetLength|Widget Colour%WidgetColour|Widget Title%title|Widget Units%unit|Current Value%currentValue|Max Value%maxValue|Min Value%minValue|No. of Steps%sliderSteps"
    //% position.fieldEditor="gridpicker" position.fieldOptions.columns=4
    //% WidgetColour.fieldEditor="gridpicker" WidgetColour.fieldOptions.columns=2
    export function createSliderWidget(id: WidgetId, widgetType: WidgetTypeInput, position: WidgetPosition, length: WidgetLength,
        colour: WidgetColour, title: string, unit: string, currentValue: string, maxValue: string, minValue: string, sliderSteps: number): Widget {
        let widget = new Widget();
        let imd: number;

        widget.setId(id);
        widget.setType(widgetType);
        widget.setColour(colour);

        widget.setHeight(20);
        imd = position / 4;
        widget.setCoordY((imd * 20) + ((imd + 1) * 4));//calculating y coordinate
        imd = position - ((position / 4) * 4);
        widget.setCoordX((imd * 20) + ((imd + 1) * 4));//calculating x coordinate

        switch (length) {
            case WidgetLength.One_Quarter: //one_quarter
                widget.setWidth(20);
                break;
            case WidgetLength.Half: //half
                widget.setWidth(44);
                break;
            case WidgetLength.Full: //full
                widget.setWidth(92);
                break;
            default:
                serial.writeString("length error");
                break;
        }
        widget.setTitle(title);
        widget.setData(currentValue);
        widget.setUnit(unit);
        widget.setSliderInputMode(SliderMode.On_Finger_Release);
        widget.setMinMax(minValue, maxValue);
        widget.setSliderSteps(sliderSteps);
        widget.forceUpdate();
        return widget;
    }
    /**
     * Block to clear all Widgets
     */
    //% blockId=Andee_clear
    //% block="Clear All Widgets"
    export function clear(): void {
        bleMsg = String.fromCharCode(COMMANDSTART) + CLEAR + String.fromCharCode(COMMANDEND);
        bluetooth.uartWriteString(bleMsg);
    }

    /**
     * Block to return keyboard widget string
     */
    //% weight=50
    //% blockId=get_keyboard_reply
    //% block="Get Keyboard Reply"
    export function getKeyboard(): string {
        return ble_reply;
    }
    /**
     * Block to return value of slider widget as a number
     */
    //% weight=50
    //% blockId=get_slider_value
    //% block="Get Slider Value"
    export function getSlider(): number {
        return parseInt(ble_reply);
    }
    /**
     * Block to return a boolean if button is pressed once or more than once
     * Returns true if button is pressed more than once
     * Returns false if button is pressed once
     */
    //% weight=50
    //% blockId=get_button_press
    //% block="Button is pressed more than once"
    //% advanced=true
    export function getButtonPress(): boolean {
        let buttonPress = ble_reply.charCodeAt(0) - 32
        if (buttonPress > 1) {
            return true
        }
        else {
            return false
        }
    }

    /**
     * Function to convert numbers to string
     * @param num Number to be converted to string
     */
    //% weight=20
    //% blockId=convert_number
    //% block="Convert %num| to String"
    export function convertNumberToString(num: number): string {
        let numString = num.toString();
        return numString;
    }

    export function printToDEC(buffer: string): void {
        let replyDecimal: string;
        let decimal: number;
        for (let i = 0; i < buffer.length; i++) {
            decimal = buffer.charCodeAt(i);
            replyDecimal = replyDecimal + " " + decimal + " ";
        }
        serial.writeLine(replyDecimal);
    }

}

//////////////////////////////////////////////CONSTANTS//////////////////////////////////////////////

enum WidgetColour {
    //% block="Red"
    Red,
    //% block="Dark Red"
    Dark_Red,
    //% block="Orange"
    Orange,
    //% block="Dark Orange"
    Dark_Orange,
    //% block="Yellow"
    Yellow,
    //% block="Dark Yellow"
    Dark_Yellow,
    //% block="Green"
    Green,
    //% block="Dark Green"
    Dark_Green,
    //% block="Blue"
    Blue,
    //% block="Dark Blue"
    Dark_Blue,
    //% block="Indigo"
    Indigo,
    //% block="Dark Magenta"
    Dark_Magenta,
    //% block="Magenta"
    Magenta,
    //% block="Violet"
    Violet,
}

enum WidgetType {
    //% block="Data"
    Databox = 67,
    //% block="Data Circle"
    Databox_Circle = 71,
    //% block="Data Header"
    Databox_Header = 72,
    //% block="Button"
    Button = 66,
    //% block="Circle Button"
    Button_Circle = 74,
    //% block="Keyboard"
    Keyboard_In = 75,
}

enum WidgetTypeInput {
    //% block="Slider"
    Slider = 81,
    //% block="Analog Dial"
    Analog_Dial = 82,
}

enum WidgetPosition {
    //% block="Row0 Column0"
    Row0_Column0,
    //% block="Row0 Column1"
    Row0_Column1,
    //% block="Row0 Column2"
    Row0_Column2,
    //% block="Row0 Column3"
    Row0_Column3,

    //% block="Row1 Column0"
    Row1_Column0,
    //% block="Row1 Column1"
    Row1_Column1,
    //% block="Row1 Column2"
    Row1_Column2,
    //% block="Row1 Column3"
    Row1_Column3,

    //% block="Row2 Column0"
    Row2_Column0,
    //% block="Row2 Column1"
    Row2_Column1,
    //% block="Row2 Column2"
    Row2_Column2,
    //% block="Row2 Column3"
    Row2_Column3,

    //% block="Row3 Column0"
    Row3_Column0,
    //% block="Row3 Column1"
    Row3_Column1,
    //% block="Row3 Column2"
    Row3_Column2,
    //% block="Row3 Column3"
    Row3_Column3,
}

enum WidgetLength {
    //% block="One Quarter"
    One_Quarter,
    //% block="Half"
    Half,
    //% block="Full"
    Full
}

enum ButtonMode {
    //% block="Acknowledge"
    Acknowledge = 48,
    //% block="Multi-Press"
    MultiPress = 49
}
enum KeyboardMode {
    //% block="AlphaNumeric"
    AlphaNumeric = 48,
    //% block="AlphaNumeric Password"
    AlphaNumeric_PW = 49,
    //% block="Numeric"
    Numeric = 50,
    //% block="Numeric Password"
    Numeric_PW = 51
}
enum SliderMode {
    //% block="When Finger Released"
    On_Finger_Release = 48,
    //% block="When Value Changes"
    On_Value_Change = 49,
    //% block="No Thumb"
    No_Thumb_Slider = 50
}
enum WidgetId {
    //% block="Widget 1"
    Widget_1 = 0,
    //% block="Widget 2"
    Widget_2,
    //% block="Widget 3"
    Widget_3,
    //% block="Widget 4"
    Widget_4,
    //% block="Widget 5"
    Widget_5
}

const VERSIONSTART = 0x7B;
const VERSIONEND = 0x7D;

const COMMANDSTART = 0x0A;
const COMMANDEND = 0x0B;

const UISTART = 0x04;
const UIEND = 0x05;

const SEP = 0xA6;

const EVENT_ID_OFFSET = 50;
const ANDEE_EVENT_VALUE = 80;

let sendVersion: string = String.fromCharCode(VERSIONSTART) + "M" + String.fromCharCode(SEP) + "0.0.1" + String.fromCharCode(VERSIONEND);

const CLEAR = 'L';//
const TIMEEPOCH = 'T';//
const VERSION = 'V';//

const CAMERA = 'M';//
const TTS = 'P';//
const VIBRATE = 'I';//

const SMS = 'Z';//
const NOTIFICATION = 'N';//

const GYRO = 'O';//
const LAC = 'F';//
const GRAV = 'Y';//
const GPS = 'S';//

const DATA_OUT = "C";//
const DATA_OUT_CIRCLE = 'G';//
const DATA_OUT_HEADER = 'H';//

const BUTTON_IN = 'B';//
const CIRCLE_BUTTON = 'J';//
const ACKN = 'A';//

const KEYBOARD_IN = 'K';//
const DATE_IN = 'D';//
const TIME_IN = 'X';//

const SLIDER_IN = 'Q';//

const ANALOG_DIAL_OUT = 'R';//

const JOYSTICK = 'U';//

const WATCH = 'W';//

const REMOVE = 'E';//
