#!/usr/bin/env python3

import cv2
import sys
import depthai as dai

stepSize = 0.05

newConfig = False

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

stereo.setDefaultProfilePreset(dai.node.StereoDepth.PresetMode.HIGH_ACCURACY)
stereo.setLeftRightCheck(lrcheck)

configList = [] * 10

# Config
topLeft = dai.Point2f(0.79, 0.39)
bottomRight = dai.Point2f(0.81, 0.41)

config = dai.SpatialLocationCalculatorConfigData()
config.depthThresholds.lowerThreshold = 1000
config.depthThresholds.upperThreshold = 3500
config.roi = dai.Rect(topLeft, bottomRight)

configList.append(config)

topLeft2 = dai.Point2f(0.54, 0.34)
bottomRight2 = dai.Point2f(0.56, 0.36)

config2 = dai.SpatialLocationCalculatorConfigData()
config2.depthThresholds.lowerThreshold = 1000
config2.depthThresholds.upperThreshold = 3500
config2.roi = dai.Rect(topLeft2, bottomRight2)

configList.append(config2)

topLeft3 = dai.Point2f(0.54, 0.34)
bottomRight3 = dai.Point2f(0.56, 0.36)

config3 = dai.SpatialLocationCalculatorConfigData()
config3.depthThresholds.lowerThreshold = 1000
config3.depthThresholds.upperThreshold = 3500
config3.roi = dai.Rect(topLeft3, bottomRight3)

configList.append(config3)

topLeft4 = dai.Point2f(0.29, 0.34)
bottomRight4 = dai.Point2f(0.31, 0.36)

config4 = dai.SpatialLocationCalculatorConfigData()
config4.depthThresholds.lowerThreshold = 1000
config4.depthThresholds.upperThreshold = 3500
config4.roi = dai.Rect(topLeft4, bottomRight4)

configList.append(config4)

topLeft5 = dai.Point2f(0.19, 0.34)
bottomRight5 = dai.Point2f(0.21, 0.36)

config5 = dai.SpatialLocationCalculatorConfigData()
config5.depthThresholds.lowerThreshold = 1000
config5.depthThresholds.upperThreshold = 3500
config5.roi = dai.Rect(topLeft5, bottomRight5)

configList.append(config5)

topLeft6 = dai.Point2f(0.84, 0.54)
bottomRight6 = dai.Point2f(0.86, 0.56)

config6 = dai.SpatialLocationCalculatorConfigData()
config6.depthThresholds.lowerThreshold = 1000
config6.depthThresholds.upperThreshold = 3500
config6.roi = dai.Rect(topLeft6, bottomRight6)

configList.append(config6)

topLeft7 = dai.Point2f(0.49, 0.54)
bottomRight7 = dai.Point2f(0.51, 0.56)

config7 = dai.SpatialLocationCalculatorConfigData()
config7.depthThresholds.lowerThreshold = 1000
config7.depthThresholds.upperThreshold = 3500
config7.roi = dai.Rect(topLeft7, bottomRight7)

configList.append(config7)

topLeft8 = dai.Point2f(0.49, 0.54)
bottomRight8 = dai.Point2f(0.51, 0.56)

config8 = dai.SpatialLocationCalculatorConfigData()
config8.depthThresholds.lowerThreshold = 1000
config8.depthThresholds.upperThreshold = 3500
config8.roi = dai.Rect(topLeft8, bottomRight8)

configList.append(config8)

topLeft9 = dai.Point2f(0.24, 0.54)
bottomRight9 = dai.Point2f(0.26, 0.56)

config9 = dai.SpatialLocationCalculatorConfigData()
config9.depthThresholds.lowerThreshold = 1000
config9.depthThresholds.upperThreshold = 3500
config9.roi = dai.Rect(topLeft9, bottomRight9)

configList.append(config9)

topLeft10 = dai.Point2f(0.24, 0.54)
bottomRight10 = dai.Point2f(0.26, 0.56)

config10 = dai.SpatialLocationCalculatorConfigData()
config10.depthThresholds.lowerThreshold = 1000
config10.depthThresholds.upperThreshold = 3500
config10.roi = dai.Rect(topLeft10, bottomRight10)

configList.append(config10)

spatialLocationCalculator.initialConfig.setROIs(configList)
spatialLocationCalculator.inputConfig.setWaitForMessage(False)
# Linking
monoLeft.out.link(stereo.left)
monoRight.out.link(stereo.right)

spatialLocationCalculator.passthroughDepth.link(xoutDepth.input)
stereo.depth.link(spatialLocationCalculator.inputDepth)

spatialLocationCalculator.out.link(xoutSpatialData.input)
xinSpatialCalcConfig.out.link(spatialLocationCalculator.inputConfig)


# Connect to device and start pipeline
with dai.Device(pipeline) as device:

    # Output queue will be used to get the depth frames from the outputs defined above
    depthQueue = device.getOutputQueue(name="depth", maxSize=4, blocking=False)
    spatialCalcQueue = device.getOutputQueue(name="spatialData", maxSize=4, blocking=False)
    spatialCalcConfigInQueue = device.getInputQueue("spatialCalcConfig")

    color = (255, 255, 255)

    print("Use WASD keys to move ROI!")

    while True:
        inDepth = depthQueue.get() # Blocking call, will wait until a new data has arrived

        depthFrame = inDepth.getFrame() # depthFrame values are in millimeters

        depthFrameColor = cv2.normalize(depthFrame, None, 255, 0, cv2.NORM_INF, cv2.CV_8UC1)
        depthFrameColor = cv2.equalizeHist(depthFrameColor)
        depthFrameColor = cv2.applyColorMap(depthFrameColor, cv2.COLORMAP_JET)

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
            
            # proximity 
            if (i == 0 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("prox1")
                sys.stdout.flush()
            if (i == 1 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("prox2")
                sys.stdout.flush()
            if (i == 2 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("prox3")
                sys.stdout.flush()
            if (i == 3 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("prox4")
                sys.stdout.flush()
            if (i == 4 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("prox5")
                sys.stdout.flush()
            
            #interaction
            if (i == 5 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("play1")
                sys.stdout.flush()
            if (i == 6 and int(spatialData[i].spatialCoordinates.z) >= 1000 and int(spatialData[i].spatialCoordinates.z) < 2000):
                print("play2")
                sys.stdout.flush()
            if (i == 7 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("play3")
                sys.stdout.flush()
            if (i == 8 and int(spatialData[i].spatialCoordinates.z) >= 1000 and int(spatialData[i].spatialCoordinates.z) < 2000):
                print("play4")
                sys.stdout.flush()
            if (i == 9 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("play5")
                sys.stdout.flush()

        # Show the frame
        cv2.imshow("depth", depthFrameColor)
    

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
    

        