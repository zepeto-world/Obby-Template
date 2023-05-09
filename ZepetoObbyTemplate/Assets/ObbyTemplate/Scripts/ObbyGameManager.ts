import { GameObject, ParticleSystem } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import SpawnPoint from './SpawnPoint';
import GameSettings from './GameSettings';

export default class ObbyGameManager extends ZepetoScriptBehaviour 
{
    public static instance: ObbyGameManager;

    private _currentCheckpoint: SpawnPoint; //Last saved checkpoint

    Awake() {
        if (ObbyGameManager.instance == null) ObbyGameManager.instance = this;
        else
            GameObject.Destroy(this);
    }

    Update() {
        if (GameSettings.Instance.zepetoCharacter != null) {
            if (GameSettings.Instance.zepetoCharacter.transform.position.y < -20) {
                GameSettings.Instance.zepetoCharacter.transform.position = this._currentCheckpoint.transform.position;
                this.TeleportCharacter();
                return;
            }
        }
    }

    /// <summary>
    /// Save new checkpoint
    /// </summary>
    UpdateCheckpoint(newCheckpoint: SpawnPoint) {
        this._currentCheckpoint = newCheckpoint;
    }

    /// <summary>
    /// Teleport the character to last checkpoint pos
    /// </summary>
    TeleportCharacter() {
        GameSettings.Instance.zepetoCharacter.Teleport(this._currentCheckpoint.transform.position, GameSettings.Instance.zepetoCharacter.transform.rotation);
        this._currentCheckpoint.particleSystem.GetComponent<ParticleSystem>().Emit(10);
    }
}