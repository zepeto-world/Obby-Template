import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import TimerManager from '../UI/TimerManager';


export default class UIManager extends ZepetoScriptBehaviour 
{
    public static Instance: UIManager;

    @SerializeField() _gameOverPanel: GameObject;
    @SerializeField() _victoryPanel: GameObject;
    @SerializeField() _startPanel: GameObject;
    @SerializeField() _timerPanel: GameObject;

    @Header("Timer Settings")
    @SerializeField() private _useTimer: boolean = false; //If this value is true, an object will be created with the timer.
    public gameDuration: number; // Duration in seconds
    public timerManager: TimerManager; //Timer Manager reference

    Awake() {
        // Singleton
        if (UIManager.Instance != null) GameObject.Destroy(this.gameObject);
        UIManager.Instance = this;
        // ---------
        this.timerManager = this._timerPanel.GetComponent<TimerManager>();
    }

    OnStart() {
        this._startPanel.SetActive(true);
        this._victoryPanel.SetActive(false);
        this._gameOverPanel.SetActive(false);
        this._timerPanel.SetActive(false);
    }

    OnStartGame() {
        if (!this._useTimer) return;
        this._timerPanel.SetActive(true);
        this.timerManager.SetTimer(this.gameDuration);
    }

    OnVictory(): void {
        this.timerManager.StopTimer();
        this._victoryPanel.SetActive(true);
    }

    OnGameOver(): void {
        this._gameOverPanel.SetActive(true);
    }
}