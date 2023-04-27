import { Canvas, Debug, GameObject, Time, Mathf } from 'UnityEngine';
import { Slider, Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import EventsManager from './EventsManager';
import GameSettings from './GameSettings';

export default class TimerManager extends ZepetoScriptBehaviour
{
    public timeSlider: Slider;
    public remainingTxt: Text;

    private _duration: number; // Duration in seconds.
    private _timeRemaining: number = 0; // Time remaining in seconds.
    private _isRunning: boolean = false; // If timer is running.

    public SetTimer(duration: number)
    {
        this._duration = duration;

        this.ResetTimer();
        this.StartTimer();
    }

    Update()
    {
        if (this._isRunning)
        {
            this._timeRemaining -= Time.deltaTime;
            let tempMin: number = Mathf.FloorToInt(this._timeRemaining / 60);
            let tempSeg: number = Mathf.FloorToInt(this._timeRemaining % 60);
            let tempMinString: string = tempMin <= 0 ? " " : tempMin.toString() + " : ";
            let tempSegString: string = tempSeg < 10 ? "0" + tempSeg : tempSeg.toString();

            this.UpdateVisual(this._timeRemaining / this._duration);

            this.remainingTxt.text = tempMinString + tempSegString;

            if (this._timeRemaining <= 0) {
                this.StopTimer();
                this.OnGameOver();
            }
        }
    }

    UpdateVisual(valueNormalized:number)
    {
        this.timeSlider.value = valueNormalized;
    }

    public StartTimer()
    {
        this._isRunning = true;
    }

    public StopTimer()
    {
        this._isRunning = false;
    }

    private ResetTimer()
    {
        this._timeRemaining = this._duration;
        this._isRunning = false;
    }

    private OnGameOver(): void
    {
        Debug.Log("Game Over");
        GameSettings.instance.OnGameOver();
    }

    /// <summary>
    /// Get Time Remaining
    /// </summary>
    public GetTimeRemaining(): number
    {
        return this._timeRemaining;
    }

    /// <summary>
    /// Get if time is running
    /// </summary>
    public GetIsRunning(): boolean
    {
        return this._isRunning;
    }
}