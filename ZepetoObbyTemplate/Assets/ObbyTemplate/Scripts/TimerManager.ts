import { Time, Mathf } from 'UnityEngine';
import { Slider, Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './GameSettings';


export default class TimerManager extends ZepetoScriptBehaviour 
{
    public timeSlider: Slider;
    public remainingTxt: Text;

    private _duration: number; // Duration in seconds.
    private _timeRemaining: number = 0; // Time remaining in seconds.
    private _isRunning: boolean = false; // If timer is running.
    private _counter: number = 0; // Counter for update the visuals


    public SetTimer(duration: number) {
        this._duration = duration;

        this.ResetTimer();
        this.UpdateVisual();
        this.StartTimer();
    }

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

    UpdateVisual() {
        let valueNormalized = this._timeRemaining / this._duration; // Get the normalized value for the slider

        this.timeSlider.value = valueNormalized; // Slider Update

        // Format the text to show it on the slider timer text
        let tempMin: number = Mathf.RoundToInt(this._timeRemaining / 60);
        let tempSeg: number = Mathf.RoundToInt(this._timeRemaining % 60);
        let tempMinString: string = tempMin <= 0 ? " " : tempMin.toString() + " : ";
        let tempSegString: string = tempSeg < 10 ? "0" + tempSeg : tempSeg.toString();
        // ----------------------------------------------------
        this.remainingTxt.text = tempMinString + tempSegString;
    }

    public StartTimer() {
        this._isRunning = true;
    }

    public StopTimer() {
        this._isRunning = false;
    }

    private ResetTimer() {
        this._timeRemaining = this._duration;
        this._isRunning = false;
    }

    private OnGameOver(): void {
        this.remainingTxt.text = "00";
        GameSettings.Instance.OnGameOver();
    }

    /// <summary>
    /// Get Time Remaining
    /// </summary>
    public GetTimeRemaining(): number {
        return this._timeRemaining;
    }

    /// <summary>
    /// Get if time is running
    /// </summary>
    public GetIsRunning(): boolean {
        return this._isRunning;
    }
}