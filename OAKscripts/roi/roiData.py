#!/usr/bin/env python3

import cv2
import sys
import depthai as dai
import json
import re

stepSize = 0.05

newConfig = False

def getPipeline():
    # Create pipeline
    pipeline = dai.Pipeline()

    # Define sources and outputs
    monoLeft = pipeline.create(dai.node.MonoCamera)
    monoRight = pipeline.create(dai.node.MonoCamera)
    stereo = pipeline.create(dai.node.StereoDepth)
    spatialLocationCalculator = pipeline.create(dai.node.SpatialLocationCalculator)

    xoutDepth = pipeline.create(dai.node.XLinkOut)
    xoutSpatialData = pipeline.create(dai.node.XLinkOut)
    xinSpatialCalcConfig = pipeline.create(dai.node.XLinkIn)

    xoutDepth.setStreamName("depth")
    xoutSpatialData.setStreamName("spatialData")
    xinSpatialCalcConfig.setStreamName("spatialCalcConfig")

    # Properties
    monoLeft.setResolution(dai.MonoCameraProperties.SensorResolution.THE_400_P)
    monoLeft.setBoardSocket(dai.CameraBoardSocket.LEFT)
    monoRight.setResolution(dai.MonoCameraProperties.SensorResolution.THE_400_P)
    monoRight.setBoardSocket(dai.CameraBoardSocket.RIGHT)

    lrcheck = True
    subpixel = False

    stereo.setDefaultProfilePreset(dai.node.StereoDepth.PresetMode.HIGH_DENSITY)
    stereo.setLeftRightCheck(lrcheck)

    # DEBUGGING 
    camConfig = dai.Device.Config()
    camConfig.board.network.mtu = 9000 # Jumbo frames. Default 1500
    camConfig.board.network.xlinkTcpNoDelay = False # Default True
    camConfig.board.sysctl.append("net.inet.tcp.delayed_ack=1") # configure sysctl settings. 0 by default.

    monoLeft.setIsp3aFps(5)
    monoRight.setIsp3aFps(5)

    monoLeft.setFps(10)
    monoRight.setFps(10)


    stereoConfig = stereo.initialConfig.get()
    stereoConfig.postProcessing.speckleFilter.enable = True
    stereoConfig.postProcessing.speckleFilter.speckleRange = 50
    stereoConfig.postProcessing.temporalFilter.enable = True
    stereoConfig.postProcessing.spatialFilter.enable = True
    stereoConfig.postProcessing.spatialFilter.holeFillingRadius = 2
    stereoConfig.postProcessing.spatialFilter.numIterations = 1
    stereoConfig.postProcessing.decimationFilter.decimationFactor = 1


    prox_topLeft1_y = proxTL1y[0]
    prox_bottomRight1_y = proxBR1y[0]

    prox_topLeft2_y = proxTL2y[0]
    prox_bottomRight2_y = proxBR2y[0]

    prox_topLeft3_y = proxTL3y[0]
    prox_bottomRight3_y = proxBR3y[0]

    
    anim_topLeft1_y = animTL1y[0]
    anim_bottomRight1_y = animBR1y[0]

    anim_topLeft2_y = animTL2y[0]
    anim_bottomRight2_y = animBR2y[0]

    anim_topLeft3_y = animTL3y[0]
    anim_bottomRight3_y = animBR3y[0]
    

    # Config
    # WALL 1
    # PROXIMITY WALL 1
    configList = [] * 28

    # Config
    # WALL 1
    # PROXIMITY WALL 1
    topLeft = dai.Point2f(0.67, prox_topLeft1_y)
    bottomRight = dai.Point2f(0.77, prox_bottomRight1_y)

    config = dai.SpatialLocationCalculatorConfigData()
    config.depthThresholds.lowerThreshold = 1000
    config.depthThresholds.upperThreshold = 3500
    config.roi = dai.Rect(topLeft, bottomRight)

    # configList.append(config)

    # topLeft1 = dai.Point2f(0.43, prox_topLeft1_y)
    # bottomRight1 = dai.Point2f(0.53, prox_bottomRight1_y)

    # config1 = dai.SpatialLocationCalculatorConfigData()
    # config1.depthThresholds.lowerThreshold = 1000
    # config1.depthThresholds.upperThreshold = 3500
    # config1.roi = dai.Rect(topLeft1, bottomRight1)

    # configList.append(config1)

    # topLeft2 = dai.Point2f(0.42, prox_topLeft1_y)
    # bottomRight2 = dai.Point2f(0.52, prox_bottomRight1_y)

    # config2 = dai.SpatialLocationCalculatorConfigData()
    # config2.depthThresholds.lowerThreshold = 1000
    # config2.depthThresholds.upperThreshold = 3500
    # config2.roi = dai.Rect(topLeft2, bottomRight2)

    # configList.append(config2)

    # topLeft3 = dai.Point2f(0.22, prox_topLeft1_y)
    # bottomRight3 = dai.Point2f(0.32, prox_bottomRight1_y)

    # config3 = dai.SpatialLocationCalculatorConfigData()
    # config3.depthThresholds.lowerThreshold = 1000
    # config3.depthThresholds.upperThreshold = 3500
    # config3.roi = dai.Rect(topLeft3, bottomRight3)

    # configList.append(config3)

    # topLeft4 = dai.Point2f(0.19, prox_topLeft1_y)
    # bottomRight4 = dai.Point2f(0.29, prox_bottomRight1_y)

    # config4 = dai.SpatialLocationCalculatorConfigData()
    # config4.depthThresholds.lowerThreshold = 1000
    # config4.depthThresholds.upperThreshold = 3500
    # config4.roi = dai.Rect(topLeft4, bottomRight4)

    # configList.append(config4)

    # # # ANIMATIONS WALL 1
    # topLeft5 = dai.Point2f(0.69, anim_topLeft1_y)
    # bottomRight5 = dai.Point2f(0.85, anim_bottomRight1_y)

    # config5 = dai.SpatialLocationCalculatorConfigData()
    # config5.depthThresholds.lowerThreshold = 1000
    # config5.depthThresholds.upperThreshold = 3500
    # config5.roi = dai.Rect(topLeft5, bottomRight5)

    # configList.append(config5)

    # topLeft6 = dai.Point2f(0.42, anim_topLeft1_y)
    # bottomRight6 = dai.Point2f(0.58, anim_bottomRight1_y)

    # config6 = dai.SpatialLocationCalculatorConfigData()
    # config6.depthThresholds.lowerThreshold = 1000
    # config6.depthThresholds.upperThreshold = 3500
    # config6.roi = dai.Rect(topLeft6, bottomRight6)

    # configList.append(config6)

    # topLeft7 = dai.Point2f(0.42, anim_topLeft1_y)
    # bottomRight7 = dai.Point2f(0.58, anim_bottomRight1_y)

    # config7 = dai.SpatialLocationCalculatorConfigData()
    # config7.depthThresholds.lowerThreshold = 1000
    # config7.depthThresholds.upperThreshold = 3500
    # config7.roi = dai.Rect(topLeft7, bottomRight7)

    # configList.append(config7)

    # topLeft8 = dai.Point2f(0.19, anim_topLeft1_y)
    # bottomRight8 = dai.Point2f(0.35, anim_bottomRight1_y)

    # config8 = dai.SpatialLocationCalculatorConfigData()
    # config8.depthThresholds.lowerThreshold = 1000
    # config8.depthThresholds.upperThreshold = 3500
    # config8.roi = dai.Rect(topLeft8, bottomRight8)

    # configList.append(config8)

    # topLeft9 = dai.Point2f(0.17, anim_topLeft1_y)
    # bottomRight9 = dai.Point2f(0.33, anim_bottomRight1_y)

    # config9 = dai.SpatialLocationCalculatorConfigData()
    # config9.depthThresholds.lowerThreshold = 1000
    # config9.depthThresholds.upperThreshold = 3500
    # config9.roi = dai.Rect(topLeft9, bottomRight9)

    # configList.append(config9)

    # # WALL 2
    # # PROXIMITY WALL 2
    # #conserving
    # topLeft10 = dai.Point2f(0.62, prox_topLeft2_y)
    # bottomRight10 = dai.Point2f(0.72, prox_bottomRight2_y)

    # config10 = dai.SpatialLocationCalculatorConfigData()
    # config10.depthThresholds.lowerThreshold = 1000
    # config10.depthThresholds.upperThreshold = 3500
    # config10.roi = dai.Rect(topLeft10, bottomRight10)

    # configList.append(config10)

    # # friendship
    # topLeft11 = dai.Point2f(0.47, prox_topLeft2_y)
    # bottomRight11 = dai.Point2f(0.57, prox_bottomRight2_y)

    # config11 = dai.SpatialLocationCalculatorConfigData()
    # config11.depthThresholds.lowerThreshold = 1000
    # config11.depthThresholds.upperThreshold = 3500
    # config11.roi = dai.Rect(topLeft11, bottomRight11)

    # configList.append(config11)

    # # real estate
    # topLeft12 = dai.Point2f(0.32, prox_topLeft2_y)
    # bottomRight12 = dai.Point2f(0.42, prox_bottomRight2_y)

    # config12 = dai.SpatialLocationCalculatorConfigData()
    # config12.depthThresholds.lowerThreshold = 1000
    # config12.depthThresholds.upperThreshold = 3500
    # config12.roi = dai.Rect(topLeft12, bottomRight12)

    # configList.append(config12)

    # # grape investments
    # topLeft13 = dai.Point2f(0.22, prox_topLeft2_y)
    # bottomRight13 = dai.Point2f(0.32, prox_bottomRight2_y)

    # config13 = dai.SpatialLocationCalculatorConfigData()
    # config13.depthThresholds.lowerThreshold = 1000
    # config13.depthThresholds.upperThreshold = 3500
    # config13.roi = dai.Rect(topLeft13, bottomRight13)

    # configList.append(config13)

    # # ANIMATIONS WALL 2
    # #conserving 
    # topLeft14 = dai.Point2f(0.61, anim_topLeft2_y)
    # bottomRight14 = dai.Point2f(0.77, anim_bottomRight2_y)

    # config14 = dai.SpatialLocationCalculatorConfigData()
    # config14.depthThresholds.lowerThreshold = 1000
    # config14.depthThresholds.upperThreshold = 3500
    # config14.roi = dai.Rect(topLeft14, bottomRight14)

    # configList.append(config14)

    # #friendship
    # topLeft15 = dai.Point2f(0.47, anim_topLeft2_y)
    # bottomRight15 = dai.Point2f(0.63, anim_bottomRight2_y)

    # config15 = dai.SpatialLocationCalculatorConfigData()
    # config15.depthThresholds.lowerThreshold = 1000
    # config15.depthThresholds.upperThreshold = 3500
    # config15.roi = dai.Rect(topLeft15, bottomRight15)

    # configList.append(config15)

    # #real estate
    # topLeft16 = dai.Point2f(0.26, anim_topLeft2_y)
    # bottomRight16 = dai.Point2f(0.42, anim_bottomRight2_y)

    # config16 = dai.SpatialLocationCalculatorConfigData()
    # config16.depthThresholds.lowerThreshold = 1000
    # config16.depthThresholds.upperThreshold = 3500
    # config16.roi = dai.Rect(topLeft16, bottomRight16)

    # configList.append(config16)

    # # grape investments
    # topLeft17 = dai.Point2f(0.16, anim_topLeft2_y)
    # bottomRight17 = dai.Point2f(0.32, anim_bottomRight2_y)

    # config17 = dai.SpatialLocationCalculatorConfigData()
    # config17.depthThresholds.lowerThreshold = 1000
    # config17.depthThresholds.upperThreshold = 3500
    # config17.roi = dai.Rect(topLeft17, bottomRight17)

    # configList.append(config17)

    # # WALL 3
    # # PROXIMITY WALL 3
    # # ceos
    # topLeft18 = dai.Point2f(0.70, prox_topLeft3_y)
    # bottomRight18 = dai.Point2f(0.80, prox_bottomRight3_y)

    # config18 = dai.SpatialLocationCalculatorConfigData()
    # config18.depthThresholds.lowerThreshold = 1000
    # config18.depthThresholds.upperThreshold = 3500
    # config18.roi = dai.Rect(topLeft18, bottomRight18)

    # configList.append(config18)

    # # girls in tech
    # topLeft19 = dai.Point2f(0.53, prox_topLeft3_y)
    # bottomRight19 = dai.Point2f(0.63, prox_bottomRight3_y)

    # config19 = dai.SpatialLocationCalculatorConfigData()
    # config19.depthThresholds.lowerThreshold = 1000
    # config19.depthThresholds.upperThreshold = 3500
    # config19.roi = dai.Rect(topLeft19, bottomRight19)

    # configList.append(config19)

    # # empowering abilities
    # topLeft20 = dai.Point2f(0.48, prox_topLeft3_y)
    # bottomRight20 = dai.Point2f(0.58, prox_bottomRight3_y)

    # config20 = dai.SpatialLocationCalculatorConfigData()
    # config20.depthThresholds.lowerThreshold = 1000
    # config20.depthThresholds.upperThreshold = 3500
    # config20.roi = dai.Rect(topLeft20, bottomRight20)

    # configList.append(config20)

    # # financial literacy
    # topLeft21 = dai.Point2f(0.29, prox_topLeft3_y)
    # bottomRight21 = dai.Point2f(0.39, prox_bottomRight3_y)

    # config21 = dai.SpatialLocationCalculatorConfigData()
    # config21.depthThresholds.lowerThreshold = 1000
    # config21.depthThresholds.upperThreshold = 3500
    # config21.roi = dai.Rect(topLeft21, bottomRight21)

    # configList.append(config21)

    # # retiring inequality
    # topLeft22 = dai.Point2f(0.21, prox_topLeft3_y)
    # bottomRight22 = dai.Point2f(0.31, prox_bottomRight3_y)

    # config22 = dai.SpatialLocationCalculatorConfigData()
    # config22.depthThresholds.lowerThreshold = 1000
    # config22.depthThresholds.upperThreshold = 3500
    # config22.roi = dai.Rect(topLeft22, bottomRight22)

    # configList.append(config22)

    # # ANIMATIONS WALL 3
    # #ceos
    # topLeft23 = dai.Point2f(0.72, anim_topLeft3_y)
    # bottomRight23 = dai.Point2f(0.88, anim_bottomRight3_y)

    # config23 = dai.SpatialLocationCalculatorConfigData()
    # config23.depthThresholds.lowerThreshold = 1000
    # config23.depthThresholds.upperThreshold = 3500
    # config23.roi = dai.Rect(topLeft23, bottomRight23)

    # configList.append(config23)

    # # girls in tech
    # topLeft24 = dai.Point2f(0.47, anim_topLeft3_y)
    # bottomRight24 = dai.Point2f(0.63, anim_bottomRight3_y)

    # config24 = dai.SpatialLocationCalculatorConfigData()
    # config24.depthThresholds.lowerThreshold = 1000
    # config24.depthThresholds.upperThreshold = 3500
    # config24.roi = dai.Rect(topLeft24, bottomRight24)

    # configList.append(config24)

    # # empowering abilities
    # topLeft25 = dai.Point2f(0.44, anim_topLeft3_y)
    # bottomRight25 = dai.Point2f(0.60, anim_bottomRight3_y)

    # config25 = dai.SpatialLocationCalculatorConfigData()
    # config25.depthThresholds.lowerThreshold = 1000
    # config25.depthThresholds.upperThreshold = 3500
    # config25.roi = dai.Rect(topLeft25, bottomRight25)

    # configList.append(config25)

    # # financial literacy
    # topLeft26 = dai.Point2f(0.14, anim_topLeft3_y)
    # bottomRight26 = dai.Point2f(0.30, anim_bottomRight3_y)

    # config26 = dai.SpatialLocationCalculatorConfigData()
    # config26.depthThresholds.lowerThreshold = 1000
    # config26.depthThresholds.upperThreshold = 3500
    # config26.roi = dai.Rect(topLeft26, bottomRight26)

    # configList.append(config26)

    # # retiring inequality 
    # topLeft27 = dai.Point2f(0.15, anim_topLeft3_y)
    # bottomRight27 = dai.Point2f(0.31, anim_bottomRight3_y)

    # config27 = dai.SpatialLocationCalculatorConfigData()
    # config27.depthThresholds.lowerThreshold = 1000
    # config27.depthThresholds.upperThreshold = 3500
    # config27.roi = dai.Rect(topLeft27, bottomRight27)

    # configList.append(config27)

    # spatialLocationCalculator.initialConfig.setROIs(configList)
    spatialLocationCalculator.initialConfig.addROI(config)
    spatialLocationCalculator.inputConfig.setWaitForMessage(False)
    # Linking
    monoLeft.out.link(stereo.left)
    monoRight.out.link(stereo.right)

    spatialLocationCalculator.passthroughDepth.link(xoutDepth.input)
    stereo.depth.link(spatialLocationCalculator.inputDepth)

    spatialLocationCalculator.out.link(xoutSpatialData.input)
    xinSpatialCalcConfig.out.link(spatialLocationCalculator.inputConfig)

    return pipeline

line = sys.stdin.readline()
values = json.loads(line)

proxTL1y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["prox_topLeft1_y"])
proxTL1y = [float(i) for i in proxTL1y_str.split()]

proxBR1y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["prox_bottomRight1_y"])
proxBR1y = [float(i) for i in proxBR1y_str.split()]

proxTL2y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["prox_topLeft2_y"])
proxTL2y = [float(i) for i in proxTL2y_str.split()]

proxBR2y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["prox_bottomRight2_y"])
proxBR2y = [float(i) for i in proxBR2y_str.split()]

proxTL3y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["prox_topLeft3_y"])
proxTL3y = [float(i) for i in proxTL3y_str.split()]

proxBR3y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["prox_bottomRight3_y"])
proxBR3y = [float(i) for i in proxBR3y_str.split()]


animTL1y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["anim_topLeft1_y"])
animTL1y = [float(i) for i in animTL1y_str.split()]

animBR1y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["anim_bottomRight1_y"])
animBR1y = [float(i) for i in animBR1y_str.split()]

animTL2y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["anim_topLeft2_y"])
animTL2y = [float(i) for i in animTL2y_str.split()]

animBR2y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["anim_bottomRight2_y"])
animBR2y = [float(i) for i in animBR2y_str.split()]

animTL3y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["anim_topLeft3_y"])
animTL3y = [float(i) for i in animTL3y_str.split()]

animBR3y_str = ''.join((ch if ch in '0123456789.-e' else ' ') for ch in values["anim_bottomRight3_y"])
animBR3y = [float(i) for i in animBR3y_str.split()]



if (values):
    pipeline = getPipeline()

# Connect to device and start pipeline
with dai.Device(pipeline) as device:
    device.setIrLaserDotProjectorBrightness(765)
    device.setIrFloodLightBrightness(300)

    # device.setLogLevel(dai.LogLevel.DEBUG)
    # device.setLogOutputLevel(dai.LogLevel.DEBUG)


    # Output queue will be used to get the depth frames from the outputs defined above
    depthQueue = device.getOutputQueue(name="depth", maxSize=4, blocking=False)
    spatialCalcQueue = device.getOutputQueue(name="spatialData", maxSize=4, blocking=False)
    spatialCalcConfigInQueue = device.getInputQueue("spatialCalcConfig")
    

    color = (255, 255, 255)
    lastResult = ""
    print("Use WASD keys to move ROI!")

    

    while True:
        inDepth = depthQueue.get() # Blocking call, will wait until a new data has arrived

        depthFrame = inDepth.getFrame() # depthFrame values are in millimeters

        depthFrameColor = cv2.normalize(depthFrame, None, 255, 0, cv2.NORM_INF, cv2.CV_8UC1)
        depthFrameColor = cv2.equalizeHist(depthFrameColor) 
        depthFrameColor = cv2.applyColorMap(depthFrameColor, cv2.COLORMAP_HOT)

        spatialData = spatialCalcQueue.get().getSpatialLocations()
        
        for i in range(len(spatialData)):
            roi = spatialData[i].config.roi
            roi = roi.denormalize(width=depthFrameColor.shape[1], height=depthFrameColor.shape[0])
            xmin = int(roi.topLeft().x)
            ymin = int(roi.topLeft().y)
            xmax = int(roi.bottomRight().x)
            ymax = int(roi.bottomRight().y)

            depthMin = spatialData[i].depthMin
            depthMax = spatialData[i].depthMax

            fontType = cv2.FONT_HERSHEY_TRIPLEX
            cv2.rectangle(depthFrameColor, (xmin, ymin), (xmax, ymax), color, cv2.FONT_HERSHEY_SCRIPT_SIMPLEX)
            cv2.putText(depthFrameColor, f"Z{i}: {int(spatialData[i].spatialCoordinates.z)} mm", (xmin + 10, ymin + 50), fontType, 0.5, 255)
            
        
        # Show the frame
        cv2.imshow("depth", depthFrameColor)

        # print (spatialData[0].config.roi.topLeft().y)

        key = cv2.waitKey(1)
        if key == ord('q'):
            break
        elif key == ord('w'):
            if topLeft.y - stepSize >= 0:
                topLeft.y -= stepSize
                bottomRight.y -= stepSize
                newConfig = True
        elif key == ord('a'):
            if topLeft.x - stepSize >= 0:
                topLeft.x -= stepSize
                bottomRight.x -= stepSize
                newConfig = True
        elif key == ord('s'):
            if bottomRight.y + stepSize <= 1:
                topLeft.y += stepSize
                bottomRight.y += stepSize
                newConfig = True
        elif key == ord('d'):
            if bottomRight.x + stepSize <= 1:
                topLeft.x += stepSize
                bottomRight.x += stepSize
                newConfig = True


        if newConfig:
            config.roi = dai.Rect(topLeft, bottomRight)
            config.calculationAlgorithm = dai.SpatialLocationCalculatorAlgorithm.AVERAGE
            cfg = dai.SpatialLocationCalculatorConfig()
            cfg.addROI(config)
            spatialCalcConfigInQueue.send(cfg)
            newConfig = False
    
        
        print("{:.2f}".format(topLeft.x), "{:.2f}".format(topLeft.y), "{:.2f}".format(bottomRight.x), "{:.2f}".format(bottomRight.y))
        sys.stdout.flush()