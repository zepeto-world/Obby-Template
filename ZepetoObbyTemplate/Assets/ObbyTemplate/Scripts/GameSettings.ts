import { GameObject, Input, KeyCode, Time, Transform} from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { LoadingStatus } from 'ZEPETO.Character.Controller.ZepetoCharacter';
import TimerManager from './TimerManager';
import { InputAction, InputActionAsset } from 'UnityEngine.InputSystem';
import StartScreen from './StartScreen';
import CharacterController from './CharacterController';

export default class GameSettings extends ZepetoScriptBehaviour
{
    public static instance: GameSettings;

    @HideInInspector() public zepetoCharacter: ZepetoCharacter; //Reference of Zepeto Character
    public characterController: GameObject; //Reference of Character spawner
    public canvasTransform: Transform; //Reference of canvas

    @Header("Timer Settings")
    public gameDuration: number; // Duration in seconds
    @SerializeField() private _useTimer: boolean = false; //If this value is true, an object will be created with the timer.

    @SerializeField() private _timerScreenPrefab: GameObject; //Timer prefab reference
    @SerializeField() private _victoryScreenPrefab: GameObject; //Victory screen prefab reference
    @SerializeField() private _gameOverScreenPrefab: GameObject; //GameOver screen prefab reference
    @SerializeField() private _startScreenPrefab: GameObject; //Start screen prefab reference

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
        let startScreenObj = GameObject.Instantiate(this._startScreenPrefab, this.canvasTransform) as StartScreen; //Load start screen in game
    } 

    CloseStartAlert()
    {
        this.characterController.GetComponent<CharacterController>().SpawnCharacter();

        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character; //Save Zepeto's character reference

            if (this._useTimer) {
                let timerScreenObj = GameObject.Instantiate(this._timerScreenPrefab, this.canvasTransform) as GameObject; //Load timer screen in game
                this._timerManager = timerScreenObj.GetComponent<TimerManager>();
                this._timerManager.SetTimer(this.gameDuration); //Set timer settings
            }
        });
    }

    OnVictory(): void
    {
        this._timerManager.StopTimer();
        let victoryScreenObj = GameObject.Instantiate(this._victoryScreenPrefab, this.canvasTransform) as GameObject; //Load Win Screen in game
    }

    OnGameOver(): void
    {
        let gameOverScreenObj = GameObject.Instantiate(this._gameOverScreenPrefab, this.canvasTransform) as GameObject; //Load GameOver screen in game
    }
}