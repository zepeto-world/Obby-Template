import { Time, Mathf } from 'UnityEngine';
import { Slider, Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from '../Managers/GameSettings';



// Class that controls the interactions with the timer screen
export default class TimerManager extends ZepetoScriptBehaviour 
{
    public timeSlider: Slider; // Silder reference
    public remainingTxt: Text; // remaining text reference

    private _duration: number; // Duration in seconds.
    private _timeRemaining: number = 0; // Time remaining in seconds.
    private _isRunning: boolean = false; // If timer is running.
    private _counter: number = 0; // Counter for update the visuals


    // Set up the duration of the timer
    // and call the functions that shows up on the game
    public SetTimer(duration: number) {
        this._duration = duration;

        this.ResetTimer();
        this.UpdateVisual();
        this.StartTimer();
    }

    // Controls the time if the flag is true
    Update() {
        if (this._isRunning) {
            this._timeRemaining -= Time.deltaTime;

            // Every 1 sec updates the visuals
            this._counter += Time.deltaTime;
            if (this._counter >= 1) {
                this._counter = 0;
                this.UpdateVisual();
            }

            if (this._timeRemaining <= 0) {
                this.UpdateVisual();
                this.StopTimer();
                this.OnGameOver();
            }
        }
    }

    // Controls the visual of the timer, normalizing the time to mins and secs
    UpdateVisual() {
        let valueNormalized = this._timeRemaining / this._duration; // Get the normalized value for the slider

        this.timeSlider.value = valueNormalized; // Slider Update

        // Format the text to show it on the slider timer text
        let tempMin: number = Mathf.FloorToInt(this._timeRemaining / 60);
        let tempSeg: number = Mathf.RoundToInt(this._timeRemaining % 60);
        let tempMinString: string = tempMin <= 0 ? " " : tempMin.toString() + " : ";
        let tempSegString: string = tempSeg < 10 ? "0" + tempSeg : tempSeg.toString();
        // ----------------------------------------------------
        this.remainingTxt.text = tempMinString + tempSegString;
    }

    // Change the flag to true
    public StartTimer() {
        this._isRunning = true;
    }

    // Change the flag to false
    public StopTimer() {
        this._isRunning = false;
    }

    // Set the timer to the duration and the flag on false
    private ResetTimer() {
        this._timeRemaining = this._duration;
        this._isRunning = false;
    }


    // Set the timer on 0 for the visuals
    private OnGameOver(): void {
        this.remainingTxt.text = "00";
        GameSettings.Instance.OnGameOver();
    }

    /// Get Time Remaining
    public GetTimeRemaining(): number {
        return this._timeRemaining;
    }

    /// Get if time is running
    public GetIsRunning(): boolean {
        return this._isRunning;
    }
}