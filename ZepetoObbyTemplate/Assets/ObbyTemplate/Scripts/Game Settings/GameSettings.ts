import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import CharacterController from '../CharacterController';
import ObbyGameManager from './ObbyGameManager';
import LevelScript from './LevelScript';
import { SceneManager } from 'UnityEngine.SceneManagement';
import UIManager from './UIManager';

export default class GameSettings extends ZepetoScriptBehaviour {
    public static Instance: GameSettings;

    public characterController: GameObject; //Reference of Character spawner

    @HideInInspector() public canWin: bool; // Set if the collision with the goal will trigger the win
    @HideInInspector() public zepetoCharacter: ZepetoCharacter; //Reference of Zepeto Character

    public levels: GameObject[]; // Array of level prefabs that will be spawn on the game
    private _levelSpawned: GameObject; // The actual level
    private _actualLevel: int = 0; // The counter of the actual level

    private _playerSpawned: bool; // Controls if the player is already on world

    Awake () {
        //Singleton
        if ( GameSettings.Instance == null ) GameSettings.Instance = this;
        else GameObject.Destroy( this );
    }

    Start () {
        UIManager.Instance.OnStart();
        this.InstanceActualLevel();
    }

    SpawnPlayer () {
        this._playerSpawned = true;
        this.characterController.GetComponent<CharacterController>().SpawnCharacter();

        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener( () => {
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character; //Save Zepeto's character reference
        } );
    }

    InstanceActualLevel () {
        this._levelSpawned = GameObject.Instantiate( this.levels[ this._actualLevel ] ) as GameObject;
    }

    OnStartGame (): void {
        UIManager.Instance.OnStartGame();

        if ( !this._playerSpawned ) this.SpawnPlayer();
        else this.zepetoCharacter.characterController.enabled = true;

        this.canWin = true;
    }

    OnVictory (): void {
        UIManager.Instance.OnVictory();
        this.ResetGameVariables();
    }

    OnGameOver (): void {
        UIManager.Instance.OnGameOver();
        this.ResetGameVariables();
    }
    ResetGameVariables (): void {
        this.canWin = false;
        this.zepetoCharacter.characterController.enabled = false;
    }

    ResetMap () {
        SceneManager.LoadScene( SceneManager.GetActiveScene().name );
    }

    NextLevel () {
        GameObject.Destroy( this._levelSpawned );
        this._actualLevel++;

        if ( this._actualLevel >= this.levels.Length )
        {
            // If there are no more levels
            this.ResetMap();
            return;
        }

        this.InstanceActualLevel(); // Spawn the new level
        var levelScript = this._levelSpawned.GetComponent<LevelScript>(); // Get the level script

        ObbyGameManager.instance.UpdateCheckpoint( levelScript.Spawn() ); // Set the spawn to the new level spawn
        ObbyGameManager.instance.TeleportCharacter(); // TP the player to the spawn

        UIManager.Instance.OnStart();
    }
}