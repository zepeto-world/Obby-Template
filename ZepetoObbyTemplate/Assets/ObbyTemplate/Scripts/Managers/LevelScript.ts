import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject } from 'UnityEngine';
import SpawnPoint from '../Platforms/SpawnPoint';

// This class contains the spawnpoint of the level prefab to get it when the player starts a new level
export default class LevelScript extends ZepetoScriptBehaviour 
{
    @SerializeField() spawnGameObject: GameObject; // Reference to the first spawn of the level

     // This method gets the "SpawnPoint" component of the first spawnPoint object of a level
    public Spawn(): SpawnPoint 
    {
        // Here returns the component "SpawnPoint" of the gameObject
        return this.spawnGameObject.GetComponent<SpawnPoint>(); 
    }
}