import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import SpawnPoint from './SpawnPoint'
import { GameObject } from 'UnityEngine';

export default class LevelScript extends ZepetoScriptBehaviour 
{

    @SerializeField() spawnGameObject: GameObject; // The spawn gameobject
    public spawnPoint: SpawnPoint; // The spawn gameobject

    public Spawn(): SpawnPoint {
        return this.spawnGameObject.GetComponent<SpawnPoint>();
    }
}