# Obby Template
## 📢 About
Nice to meet you Creators! 👋 Welcome to obby template guide!
With Obby you can create amazing parkour worlds to play with your friends!
Now, are you ready to get started?

## ❓ How to create with obby template
:wrench: Installation and settings
- Download Unity Hub and Unity 2020.3.9f1 version. ([Download](https://unity.com/releases/editor/archive))
- Pull the repository.

> 💡 Enjoy and start creating with Obby Template! :tada:

## 🔨 Tools
- **GameSettings**: General game statistics and settings
                    
Name |  Functionality
------------- | -------------
`Game Duration`  | Total time that the game lasts, after this time a game over screen appears.
`Use Timer` | If this value is true, a timer will appear on your screen 
`Is Distance Meter` | Value only available for RunnerTemplate
`Timer Screen Prefab`| Reference to the timer prefab, you can edit it from this location.
`Victory Screen Prefab`| Reference to the victory prefab, you can edit it from this location
`Game Over Screen Prefab`| Reference to the Game Over prefab, you can edit it from this location
`Start Screen Screen Prefab`| Reference to the Start Screen Prefab, you can edit it from this location
`Levels`| This is the list of level prefabs, they appears on the order of the list.
 <img width="700" alt="image" src="./Docs/Images/Cap_1.png">          
- **ObbyManager:** This script is very important for the functioning of the Obby template. Check that it is in scene.


## 🚧 Builds
- **Spawn Platform:** This is the first platform, it is used as the base of spawn.
 <img width="700" alt="image" src="./Docs/Images/Cap_2.png">  
- **Death Road:** This is a sample for the death system. 
- <img width="700" alt="image" src="./Docs/Images/Cap_3.png">
- <img width="700" alt="image" src="./Docs/Images/Cap_4.png">  
- **Teleport:** This is responsible for sending the player to the last saved position.You can edit the hitbox with the box collider
- <img width="700" alt="image" src="./Docs/Images/Cap_5.png">  
- **Fall Platform Builder:** Use the ***FallPlatformBuilder*** component to build platforms that fall. 
Add it to the scene and then add the object you want as a child of the prefab.

Make sure the object you add contains the BoxCollider component with the
corresponding dimensions of the object.

Additionally, make sure that the object does not have the Static option enabled.


#### *Fall Platform Structure:*
|||
| ------------ | ------------ |
|  `Box Collider` |  Used to detect the player |
|   `Rigidbody` |Used to realize the fall of the platform   |
|  ` FallPlatform Script` | **Fall Delay:** Time it takes to start falling.  **Respawn Delay:** Time it takes to respawn  |
                    

- **Goal Platform:** This platform is used as a goal, add it at the end of the level.
When the player passes over it a victory tab will appear.

