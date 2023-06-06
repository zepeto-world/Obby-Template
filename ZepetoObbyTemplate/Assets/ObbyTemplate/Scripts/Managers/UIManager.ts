import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import TimerController from '../UI/TimerController';

// This class controls all the UI process of the game
export default class UIManager extends ZepetoScriptBehaviour 
{
    public static Instance: UIManager; // Singleton instance variable

    @SerializeField() _gameOverPanel: GameObject; // GameOver panel reference 
    @SerializeField() _victoryPanel: GameObject; // Victory panel reference
    @SerializeField() _startPanel: GameObject; // Start panel reference
    @SerializeField() _timerPanel: GameObject; // Timer panel reference

    @Header( "Timer Settings" )
    public gameDuration: number; // Duration in seconds
    public timerController: TimerController; // Timer Manager reference
    
    @SerializeField() private enableTimer: boolean = false; // If this value is true, an object will be created with the timer

    // Awake is called when the script instance is being loaded
    Awake () 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // Singleton https://en.wikipedia.org/wiki/Singleton_pattern
        if ( UIManager.Instance != null ) GameObject.Destroy( this.gameObject );
        UIManager.Instance = this;

        // Here we set the "timerController" reference 
        this.timerController = this._timerPanel.GetComponent<TimerController>();
    }

    // This method is called when start
    OnStart () 
    {
        // We activate the gameobject "_startPanel"
        this._startPanel.SetActive( true );

        // We deactivate  the gameobject "_victoryPanel"
        this._victoryPanel.SetActive( false );

        // We deactivate  the gameobject "_gameOverPanel"
        this._gameOverPanel.SetActive( false );

        // We deactivate  the gameobject "_timerPanel"
        this._timerPanel.SetActive( false );
    }

    // This method is called when the game start
    OnStartGame () 
    {
        // Check if the "enableTimer" is not false
        if ( !this.enableTimer ) return;

        // We activate the gameobject "_timerPanel"
        this._timerPanel.SetActive( true );

        // We call the "TimerController" method that sets the timer
        this.timerController.SetTimer( this.gameDuration );
    }

    // This method is called when the player wins
    OnVictory (): void 
    {
        // we call the "StopTimer" method from "TimerController"
        this.timerController.StopTimer();

        // We activate the gameobject "_victoryPanel"
        this._victoryPanel.SetActive( true );
    }

    // This method is called when the player loses
    OnGameOver (): void 
    {
        // we call the "StopTimer" method from "TimerController"
        this.timerController.StopTimer();

        // We activate the gameobject "_gameOverPanel"
        this._gameOverPanel.SetActive( true );
    }
}