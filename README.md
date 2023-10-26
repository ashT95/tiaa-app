# TIAA-App

This repository contains the code for TIAA's Interaction wall that uses depth tracking to track a person's movement in specified ROIs and plays animated sequences based on the proximity of the person to the projection wall. 
Uses Electron-Forge with React and webpack. Uses OAK-D-Pro-PoE W camera and DepthAI library fro depth tracking.


## Instructions:
### Installation
```
npm install
```
### Running in development:
1. Open Command Prompt and navigate to the tiaa-app folder with ``` cd documents/github/tiaa-app ```
 <br>
  <img width="676" alt="1" src="https://github.com/ashT95/tiaa-app/assets/88211799/a1e4fc38-4c7d-4762-b719-b6d02ad5d4f1">
  <br> 
  <br>

  
2. Start the app by running ``` npm start ```
<br>
<img width="683" alt="2" src="https://github.com/ashT95/tiaa-app/assets/88211799/60ecfad2-a015-43f3-999e-14c76f0ac0c3">
<br>
<br>

### How to make changes during runtime: 

- Select the window including the animations you want to make changes to by clicking anywhere inside the window.
- Animations are labeled in a sequence of 1-5 (left to right, top to down- as shown in the picture).
  <br>
  
  <img width="1320" alt="3" src="https://github.com/ashT95/tiaa-app/assets/88211799/40008857-b277-4a1e-984b-1d1418d6078c">

- By default, the first animation is selected. To switch to the next animation, use ``` Tab ``` 
- To re-position the selected animation, move it around with arrow keys ``` ↑ ↓ → ← ``` until it's at the desired position.
- Once all the animations in the window are positioned correctly, press ``` Enter ``` to save your changes.
- Repeat the same with the window 2 and 3.
<br>

- If you make a mistake, you can revert to the previous/default configuration by long-pressing ** p ** on the keyboard. Note that it will make all the animations in the selected window go back to their default positions.

### Restarting the application when using ``` npm start ```
- You can close all the windows and run ``` npm start ``` again in the Command Prompt.
- You can press ```Ctrl + C``` in the Command Prompt to terminate the application and run ```npm start``` again.
<br>

## Some basic troubleshooting:
1. The depth camera feed (for all 3 cameras) is turned on for development mode. It usually takes around <10 seconds after starting the application for the feeds to show (and for the camera to start tracking). If it takes longer than usual or nothing shows up, restart the application using the aforementioned methods. <br>
2. If the camera feed still does not show up or the camera is not tracking: <br>
    - Check if the camera is connected properly. <br>
    - Try running just the camera feed by navigating to ``` cd OAKscripts/roi ``` and running ``` python roidata2.py``` 
3. If you're having trouble with re-positioning the animations, you can go to the tiaa-app folder and look for the config JSON files, namely config and camConfig. 
<br>
<img width="748" alt="4" src="https://github.com/ashT95/tiaa-app/assets/88211799/7855cf88-7b60-40ef-906d-3ae51305ebaa">

<br>
config.json contains the positions (in pixels) for all the animations. <br>
camConfig.json contains the tracking ROI box positions for the camera.
<br>

To open camConfig.json, right click on the file and select Open With -> Notepad <br>
<img width="556" alt="8" src="https://github.com/ashT95/tiaa-app/assets/88211799/48fbde79-ffd6-4daf-b7b8-be7fca79c683">


Reset camComfig to default values. Copy and paste the following in camConfig.json:
```
{
  "prox_topLeft1_y": "0.12",
  "prox_bottomRight1_y": "0.32",
  "prox_topLeft2_y": "0.12",
  "prox_bottomRight2_y": "0.32",
  "prox_topLeft3_y": "0.12",
  "prox_bottomRight3_y": "0.32",
  "anim_topLeft1_y": "0.49",
  "anim_bottomRight1_y": "0.56",
  "anim_topLeft2_y": "0.49",
  "anim_bottomRight2_y": "0.56",
  "anim_topLeft3_y": "0.49",
  "anim_bottomRight3_y": "0.56"
}
```


You can also reset config.json to default by opening config.json using the aforementioned method and copy pasting the following:
```
{
  "Wall1Animation1": {
    "left": "74",
    "top": "233"
  },
  "Wall1Animation2": {
    "left": "602",
    "top": "37"
  },
  "Wall1Animation3": {
    "left": "658",
    "top": "513"
  },
  "Wall1Animation4": {
    "left": "1066",
    "top": "86"
  },
  "Wall1Animation5": {
    "left": "1224",
    "top": "435"
  },
  "Wall2Animation1": {
    "left": "265",
    "top": "135"
  },
  "Wall2Animation2": {
    "left": "663",
    "top": "483"
  },
  "Wall2Animation3": {
    "left": "825",
    "top": "39"
  },
  "Wall2Animation4": {
    "left": "1128",
    "top": "401"
  },
  "Wall3Animation1": {
    "left": "55",
    "top": "277"
  },
  "Wall3Animation2": {
    "left": "477",
    "top": "19"
  },
  "Wall3Animation3": {
    "left": "554",
    "top": "311"
  },
  "Wall3Animation4": {
    "left": "1038",
    "top": "20"
  },
  "Wall3Animation5": {
    "left": "1116",
    "top": "336"
  }
}

```

## How to move depth ROI boxes:
Ideally, when you look at the depth feed of all the cameras, you should see two rows of white boxes meshed together like this: 
<br>

<img width="480" alt="10" src="https://github.com/ashT95/tiaa-app/assets/88211799/6b9dd2cb-4875-49ad-b9f1-ee0f05483644">






If you do not see the bottom row of the boxes, reset camComfig.json to the aforementioned default values. 


If the bottom row appears on top of a red surface or the depth values seem inconsistent, replace camConfig.json with these values instead: 
<br>
```
{
  "prox_topLeft1_y": "0.12",
  "prox_bottomRight1_y": "0.32",
  "prox_topLeft2_y": "0.12",
  "prox_bottomRight2_y": "0.32",
  "prox_topLeft3_y": "0.12",
  "prox_bottomRight3_y": "0.32",
  "anim_topLeft1_y": "0.44",
  "anim_bottomRight1_y": "0.51",
  "anim_topLeft2_y": "0.44",
  "anim_bottomRight2_y": "0.51",
  "anim_topLeft3_y": "0.44",
  "anim_bottomRight3_y": "0.51"
}
```


### Building distributables:
```
npm run make
```


