import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import TimerManager from '../UI/TimerManager';

// This class controls all the UI process of the game
export default class UIManager extends ZepetoScriptBehaviour {
    public static Instance: UIManager; // Singleton instance variable

    @SerializeField() _gameOverPanel: GameObject; // Gameover panel 
    @SerializeField() _victoryPanel: GameObject; // Victory panel
    @SerializeField() _startPanel: GameObject; // Start panel
    @SerializeField() _timerPanel: GameObject; // Timer panel

    @Header( "Timer Settings" )
    @SerializeField() private enableTimer: boolean = false; //If this value is true, an object will be created with the timer.
    public gameDuration: number; // Duration in seconds
    public timerManager: TimerManager; //Timer Manager reference

    Awake () {
        // Singleton
        if ( UIManager.Instance != null ) GameObject.Destroy( this.gameObject );
        UIManager.Instance = this;
        // ---------
        this.timerManager = this._timerPanel.GetComponent<TimerManager>();
    }

    // On start active the start panel and deactive each other
    OnStart () {
        this._startPanel.SetActive( true );
        this._victoryPanel.SetActive( false );
        this._gameOverPanel.SetActive( false );
        this._timerPanel.SetActive( false );
    }

    // On start active the timer ONLY IF is setted up on true the _useTimer variable
    OnStartGame () {
        if ( !this.enableTimer ) return;
        this._timerPanel.SetActive( true );
        this.timerManager.SetTimer( this.gameDuration );
    }

    // On victory stops the timer and shows the victory panel
    OnVictory (): void {
        this.timerManager.StopTimer();
        this._victoryPanel.SetActive( true );
    }

    // On GameOver stops the timer and shows the victory panel
    OnGameOver (): void {
        this.timerManager.StopTimer();
        this._gameOverPanel.SetActive( true );
    }
}