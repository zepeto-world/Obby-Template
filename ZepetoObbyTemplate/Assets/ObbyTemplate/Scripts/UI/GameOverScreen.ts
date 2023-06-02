import { TextMeshProUGUI } from 'TMPro';
import { SceneManager } from 'UnityEngine.SceneManagement';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

// Class that controls the interactions with the gameover screen
export default class GameOverScreen extends ZepetoScriptBehaviour 
{
    public retryButton: Button; //Get retry button reference

    // Set the action for the button
    Start() {
        this.retryButton.onClick.AddListener(this.RetryBtnAction);
    }

    // Reload the scene
    RetryBtnAction(): void {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}