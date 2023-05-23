import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject } from 'UnityEngine';
import SpawnPoint from '../Platforms/SpawnPoint';

export default class LevelScript extends ZepetoScriptBehaviour 
{

    @SerializeField() spawnGameObject: GameObject; // The spawn gameobject
    public spawnPoint: SpawnPoint; // The spawn gameobject

    public Spawn(): SpawnPoint {
        return this.spawnGameObject.GetComponent<SpawnPoint>();
    }
}