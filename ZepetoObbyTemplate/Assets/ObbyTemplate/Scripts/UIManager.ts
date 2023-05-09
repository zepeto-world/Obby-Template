import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import TimerManager from './TimerManager';

export default class UIManager extends ZepetoScriptBehaviour 
{
    public static Instance: UIManager;

    @SerializeField() _gameOverScreen: GameObject;
    @SerializeField() _victoryScreen: GameObject;
    @SerializeField() _startScreen: GameObject;
    @SerializeField() _timer: GameObject;

    @Header("Timer Settings")
    @SerializeField() private _useTimer: boolean = false; //If this value is true, an object will be created with the timer.
    public gameDuration: number; // Duration in seconds
    public timerManager: TimerManager; //Timer Manager reference

    Awake() {
        // Singleton
        if (UIManager.Instance != null) GameObject.Destroy(this.gameObject);
        UIManager.Instance = this;
        // ---------
        this.timerManager = this._timer.GetComponent<TimerManager>();
    }

    OnStart() {
        this._startScreen.SetActive(true);
        this._victoryScreen.SetActive(false);
        this._gameOverScreen.SetActive(false);
        this._timer.SetActive(false);
    }

    OnStartGame() {
        if (!this._useTimer) return;
        this._timer.SetActive(true);
        this.timerManager.SetTimer(this.gameDuration);
    }

    OnVictory(): void {
        this.timerManager.StopTimer();
        this._victoryScreen.SetActive(true);
    }

    OnGameOver(): void {
        this._gameOverScreen.SetActive(true);
    }
}