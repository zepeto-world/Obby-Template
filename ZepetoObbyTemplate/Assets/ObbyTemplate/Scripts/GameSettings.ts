import { GameObject, Input, KeyCode, Time, Transform, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { LoadingStatus } from 'ZEPETO.Character.Controller.ZepetoCharacter';
import TimerManager from './TimerManager';
import { InputAction, InputActionAsset } from 'UnityEngine.InputSystem';
import StartScreen from './StartScreen';
import CharacterController from './CharacterController';
import ObbyGameManager from './ObbyGameManager';
import SpawnPoint from './SpawnPoint';
import LevelScript from './LevelScript';

export default class GameSettings extends ZepetoScriptBehaviour {
    public static instance: GameSettings;

    @HideInInspector() public zepetoCharacter: ZepetoCharacter; //Reference of Zepeto Character
    public characterController: GameObject; //Reference of Character spawner
    public canvasTransform: Transform; //Reference of canvas

    @Header("Timer Settings")
    @SerializeField() private _useTimer: boolean = false; //If this value is true, an object will be created with the timer.
    public gameDuration: number; // Duration in seconds
    private _timerManager: TimerManager; //Timer Manager reference

    @Header("Prefabs")
    @SerializeField() private _timerScreenPrefab: GameObject; //Timer prefab reference
    @SerializeField() private _victoryScreenPrefab: GameObject; //Victory screen prefab reference
    @SerializeField() private _gameOverScreenPrefab: GameObject; //GameOver screen prefab reference
    @SerializeField() private _startScreenPrefab: GameObject; //Start screen prefab reference
    public levels: GameObject[];


    // @Header("Actual Level")
    private _level: GameObject;
    private _actualLevel: int = 0;

    Awake() {
        //Singleton
        if (GameSettings.instance == null) GameSettings.instance = this;
        else
            GameObject.Destroy(this);
    }

    Start() {
        this._level = GameObject.Instantiate(this.levels[this._actualLevel]) as GameObject;
        let startScreenObj = GameObject.Instantiate(this._startScreenPrefab, this.canvasTransform) as StartScreen; //Load start screen in game
    }

    CloseStartAlert() {
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

    OnVictory(): void {
        this._timerManager.StopTimer();
        let victoryScreenObj = GameObject.Instantiate(this._victoryScreenPrefab, this.canvasTransform) as GameObject; //Load Win Screen in game
    }

    OnGameOver(): void {
        let gameOverScreenObj = GameObject.Instantiate(this._gameOverScreenPrefab, this.canvasTransform) as GameObject; //Load GameOver screen in game
    }

    public NextLevel() {
        GameObject.Destroy(this._level);
        this._actualLevel++;
        this._level = GameObject.Instantiate(this.levels[this._actualLevel]) as GameObject;
        ObbyGameManager.instance.UpdateCheckpoint(this._level.GetComponent<LevelScript>().Spawn());
    }
}