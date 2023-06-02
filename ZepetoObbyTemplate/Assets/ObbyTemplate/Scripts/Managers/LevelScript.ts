import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject } from 'UnityEngine';
import SpawnPoint from '../Platforms/SpawnPoint';

// This class contains the spawnpoint of the level prefab to get it when the player starts a new level
export default class LevelScript extends ZepetoScriptBehaviour 
{
    @SerializeField() spawnGameObject: GameObject; // The spawn gameobject
    public spawnPoint: SpawnPoint; // The spawn gameobject

    public Spawn(): SpawnPoint { // It returns the SpawnPoint script from the gameobject
        return this.spawnGameObject.GetComponent<SpawnPoint>();
    }
}