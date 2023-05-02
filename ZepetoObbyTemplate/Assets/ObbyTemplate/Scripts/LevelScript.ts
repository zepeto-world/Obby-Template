import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import SpawnPoint from './SpawnPoint'
import { GameObject, RectInt } from 'UnityEngine';

export default class LevelScript extends ZepetoScriptBehaviour {
    @SerializeField() spawnGameObject: GameObject;
    public Spawn(): SpawnPoint {
        return this.spawnGameObject.GetComponent<SpawnPoint>();
    }

}