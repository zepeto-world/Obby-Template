import { GameObject, Time } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import ObbyGameManager from './ObbyGameManager';
import LevelScript from './LevelScript';
import { SceneManager } from 'UnityEngine.SceneManagement';
import UIManager from './UIManager';
import { WorldService } from 'ZEPETO.World';

// This class set up the game levels and controls if the player wins or loses
export default class GameState extends ZepetoScriptBehaviour 
{
    public static Instance: GameState; // Singleton instance variable

    @HideInInspector() public canWin: bool; // Set if the collision with the goal will trigger the win
    @HideInInspector() public zepetoCharacter: ZepetoCharacter; // Reference of Zepeto Character

    public levels: GameObject[]; // Array of level prefabs that will be spawn on the game
    
    private _levelSpawned: GameObject; // The actual level
    private _actualLevel: int = 0; // The counter of the actual level
    private _playerSpawned: bool; // Controls if the player is already on world

    // Awake is called when the script instance is being loaded
    Awake () 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if ( GameState.Instance == null ) GameState.Instance = this;
        else GameObject.Destroy( this );
    }

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start () 
    {
        // Call to the start UI 
        UIManager.Instance.OnStart();

        // Call to the internal method that instantiates the level
        this.InstanceActualLevel();
    }

    // This method is responsible for spawning the player
    SpawnPlayer () 
    {
        // Set the internal player spawn flag to true
        this._playerSpawned = true;

        // Instance of the player zepeto
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);

        // The instantiation can take a few seconds, the following lines are executed once this happens
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener( () => {
            // We save the reference of the ZepetoCharacter
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character; 

            // When the game starts, we turn off the mainCamera/lobbyCamera
            ObbyGameManager.instance.lobbyCamera.SetActive(false);
        } );
    }

    // This method is responsible for instantiating the level
    InstanceActualLevel () 
    {
        // We choose the level to instantiate using this "_actualLevel" as an index of the levels array ("levels")
        // and we save its reference in the internal variable "_levelSpawned"
        this._levelSpawned = GameObject.Instantiate( this.levels[ this._actualLevel ] ) as GameObject;
    }

    
    // This method resets the game state
    ResetGameVariables (): void 
    {
        // Set to false the internal flag "canWin"
        this.canWin = false;
        
        // Set the timeScale to 0
        Time.timeScale = 0;
    }
    
    // This method is responsible for resetting the level
    ResetMap () 
    {
        // We reload the scene
        // https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.LoadScene.html
        SceneManager.LoadScene( SceneManager.GetActiveScene().name ); 
    }
    
    // This method is responsible for destroying and creating the next level
    NextLevel () 
    {
        // Destroy the actual level, 
        // https://docs.unity3d.com/ScriptReference/Object.Destroy.html
        GameObject.Destroy( this._levelSpawned );
        
        // Increase the counter of the actual level
        this._actualLevel++;
        
        // Check if the player has ended the last level and restart the game
        // We verify that the current level is not above the number of levels available
        if ( this._actualLevel >= this.levels.length )
        {
            // If there are no more levels
            // We call the method that resets the map
            this.ResetMap();
            return;
        }
        
        // Instance the new level, and get the spawnpoint of him, then teleport the player to spawn and call the start UI
        this.InstanceActualLevel();
        
        // We need to get the "LevelScript" that contains the first Spawn of the next level
        var levelScript = this._levelSpawned.GetComponent<LevelScript>();
        
        // Set the spawn to the new spawn level via the ObbytGameManager
        ObbyGameManager.instance.UpdateCheckpoint( levelScript.Spawn() );
        
        // We call the "TeleportCharacter" method of the ObbyGameManager that teleports the player to their respective spawn
        ObbyGameManager.instance.TeleportCharacter();
        
        // We call the method of the UIManager that updates the interface at start
        UIManager.Instance.OnStart();
    }
    
    // This method is called when player start the game
    OnStartGame (): void 
    {
        // Set the timescale in 1 if you have passed another level
        Time.timeScale = 1;
        
        // Calling the same event in the UIManagers
        UIManager.Instance.OnStartGame();
    
        // If this player is not generated, we call the respective method
        if ( !this._playerSpawned ) this.SpawnPlayer();
    
        // Finally we set the internal flag that it is possible to win
        this.canWin = true;
    }
    
    // This method is called when the player wins
    OnVictory (): void 
    {
        // Calling the same event in the UIManagers
        UIManager.Instance.OnVictory();
    
        // We call the internal method that resets the game variables
        this.ResetGameVariables();
    }
    
    // This method is called when the player loses
    OnGameOver (): void 
    {
        // Calling the same event in the UIManagers
        UIManager.Instance.OnGameOver();
        
        // We call the internal method that resets the game variables
        this.ResetGameVariables();
    }
}