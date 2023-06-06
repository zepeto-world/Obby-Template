import { Button } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameState from '../Managers/GameState';

// Class that controls the interactions with the start screen
export default class StartScreen extends ZepetoScriptBehaviour 
{
    public mainButton: Button; // button reference

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start () 
    {
        // We add the callback for this button
        this.mainButton.onClick.AddListener( () => {
            this.OnClick();
        } );
    }
    
    // This method have the actions that will make the mainButton
    OnClick (): void 
    { 
        // We call the OnStartGame event in GameState
        GameState.Instance.OnStartGame();

        // We turn off this gameobject
        this.gameObject.SetActive( false );
    }

}