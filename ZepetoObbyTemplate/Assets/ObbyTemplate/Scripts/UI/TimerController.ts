import { Time, Mathf } from 'UnityEngine';
import { Slider, Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameState from '../Managers/GameState';

// Class that controls the interactions with the timer screen
export default class TimerController extends ZepetoScriptBehaviour 
{
    public timeSlider: Slider; // Silder reference
    public remainingTxt: Text; // remaining text reference

    private _duration: number; // Duration in seconds
    private _timeRemaining: number = 0; // Time remaining in seconds
    private _isRunning: boolean = false; // If timer is running
    private _counter: number = 0; // Counter for update the visuals

    // This method sets the duration variable and setups the timer
    public SetTimer ( duration: number ) 
    {
        // Get the duration and set it on "_duration"
        this._duration = duration;

        // Call to the internal function "ResetTimer"
        this.ResetTimer();

        // Call to the internal function "UpdateVisual"
        this.UpdateVisual();

        // Call to the internal function "StartTimer"
        this.StartTimer();
    }

    // Update is called every frame, if the MonoBehaviour is enabled
    Update () 
    {
        // Controls the time if the flag is true
        // Check if the flag "_isRunning" is true
        if ( this._isRunning )
        {
            // We subtract the elapsed time from the variable "_timeRemaining"
            this._timeRemaining -= Time.deltaTime;

            // We add the elapsed time to the variable
            this._counter += Time.deltaTime;

            // Check if the counter is more or equal to 1
            if ( this._counter >= 1 )
            {
                // Set the "_counter" on 0
                this._counter = 0;

                // Call to the internal function "UpdateVisual"
                this.UpdateVisual();
            }

            // Check if the variable "_timeRemaining" is less or equal to 0
            if ( this._timeRemaining <= 0 )
            {
                // Call to the internal function "UpdateVisual"
                this.UpdateVisual();

                // Call to the internal function "StopTimer"
                this.StopTimer();

                // Call to the internal function "OnGameOver"
                this.OnGameOver();
            }
        }
    }

    // This method controls the visual of the timer, normalizing the time to mins and secs
    UpdateVisual () 
    {
        // Get the normalized value for the slider dividing the vairable "_timeRemainin" by "_duration"
        let valueNormalized = this._timeRemaining / this._duration;

        // We update the value of the slider
        this.timeSlider.value = valueNormalized;

        // Format the text to show it on the slider timer text
        // We round the value of the minutes
        let tempMin: number = Mathf.FloorToInt( this._timeRemaining / 60 );

        // We round the value of the seconds
        let tempSeg: number = Mathf.RoundToInt( this._timeRemaining % 60 );

        // We create a text variable for the minutes
        let tempMinString: string = tempMin <= 0 ? " " : tempMin.toString() + " : ";

        // We create a text variable for the seconds
        let tempSegString: string = tempSeg < 10 ? "0" + tempSeg : tempSeg.toString();

        // We update the "remaininTxt" text to a text string consisting of "tempMinString" and "tempSegString"
        this.remainingTxt.text = tempMinString + tempSegString;
    }

    // This method change the flag "isRunning" to true
    public StartTimer () 
    {
        this._isRunning = true;
    }

    // This method change the flag "isRunning" to false
    public StopTimer () 
    {
        this._isRunning = false;
    }

    // This method reset the timer to the duration and the flag
    private ResetTimer () 
    {
        // We set the _timeRemaining to the "_duration" variable
        this._timeRemaining = this._duration;

        // We set the "_isRunning" flag on false
        this._isRunning = false;
    }

    // This method Set the timer on 0 for the visuals
    private OnGameOver (): void 
    {
        // Set the text of "remainingTxt" on 00
        this.remainingTxt.text = "00";

        // Call to the OnGameOver function of the "GameState" instance
        GameState.Instance.OnGameOver();
    }

    // This method get Time Remaining
    public GetTimeRemaining (): number 
    {
        return this._timeRemaining;
    }

    // This method get if time is running
    public GetIsRunning (): boolean 
    {
        return this._isRunning;
    }
}