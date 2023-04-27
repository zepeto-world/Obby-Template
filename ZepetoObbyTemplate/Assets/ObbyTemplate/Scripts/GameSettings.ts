import { GameObject, Input, KeyCode, Time, Transform} from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { LoadingStatus } from 'ZEPETO.Character.Controller.ZepetoCharacter';
import TimerManager from './TimerManager';
import { InputAction, InputActionAsset } from 'UnityEngine.InputSystem';

export default class GameSettings extends ZepetoScriptBehaviour
{
    public static instance: GameSettings;

    @HideInInspector() public zepetoCharacter: ZepetoCharacter; //Reference of Zepeto Character

    @Header("Timer Settings")
    public gameDuration: number; // Duration in seconds
    @SerializeField() private _useTimer: boolean = false; //If this value is true, an object will be created with the timer.

    @SerializeField() private _timerScreenPrefab: GameObject; //Timer prefab reference
    @SerializeField() private _victoryScreenPrefab: GameObject; //Victory screen prefab reference
    @SerializeField() private _gameOverScreenPrefab: GameObject; //GameOver screen prefab reference

    private _timerManager: TimerManager; //Timer Manager reference
    Awake()
    {
        //Singleton
        if (GameSettings.instance == null) GameSettings.instance = this;
        else
            GameObject.Destroy(this);
    }

    Start()
    {
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() =>
        {
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character; //Save Zepeto's character reference

            if (this._useTimer)
            {
                let timerScreenObj = GameObject.Instantiate(this._timerScreenPrefab) as GameObject; //Load timer screen in game
                this._timerManager = timerScreenObj.GetComponent<TimerManager>();
                this._timerManager.SetTimer(this.gameDuration); //Set timer settings
            }
        });
    }

    OnVictory(): void
    {
        this._timerManager.StopTimer();
        let victoryScreenObj = GameObject.Instantiate(this._victoryScreenPrefab, this._timerManager.transform) as GameObject; //Load Win Screen in game
    }

    OnGameOver(): void
    {
        let gameOverScreenObj = GameObject.Instantiate(this._gameOverScreenPrefab, this._timerManager.transform) as GameObject; //Load GameOver screen in game
    }
}