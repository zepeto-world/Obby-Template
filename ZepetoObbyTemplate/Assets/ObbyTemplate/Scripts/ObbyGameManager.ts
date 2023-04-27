import { Debug, GameObject, ParticleSystem, Transform } from 'UnityEngine';
import { UnityEvent } from 'UnityEngine.Events'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import SpawnPoint from './SpawnPoint';
import { LoadingStatus } from 'ZEPETO.Character.Controller.ZepetoCharacter';
import EventsManager from './EventsManager';
import GameSettings from './GameSettings';

export default class ObbyGameManager extends ZepetoScriptBehaviour {
    public static instance: ObbyGameManager;

    private currentCheckpoint: SpawnPoint; //Last saved checkpoint

    Awake()
    {
        if (ObbyGameManager.instance == null) ObbyGameManager.instance = this;
        else
            GameObject.Destroy(this);
    }

    Start()
    {
        Debug.Log(GameSettings.instance.gameDuration);
    }

    Update()
    {
        if (GameSettings.instance.zepetoCharacter != null)
        {
            if (GameSettings.instance.zepetoCharacter.transform.position.y < -20)
            {
                GameSettings.instance.zepetoCharacter.transform.position = this.currentCheckpoint.transform.position;
                this.TeleportCharacter();
                return;
            }
        }
    }

    /// <summary>
    /// Save new checkpoint
    /// </summary>
    UpdateCheckpoint(newCheckpoint: SpawnPoint)
    {
        this.currentCheckpoint = newCheckpoint;
    }

    /// <summary>
    /// Teleport the character to last checkpoint pos
    /// </summary>
    TeleportCharacter()
    {
        GameSettings.instance.zepetoCharacter.Teleport(this.currentCheckpoint.transform.position, GameSettings.instance.zepetoCharacter.transform.rotation);
        this.currentCheckpoint.particleSystem.GetComponent<ParticleSystem>().Emit(10);
    }
}