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

configList = [] * 4

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

spatialLocationCalculator.initialConfig.setROIs(configList)
spatialLocationCalculator.inputConfig.setWaitForMessage(False)
# Linking
monoLeft.out.link(stereo.left)
monoRight.out.link(stereo.right)

spatialLocationCalculator.passthroughDepth.link(xoutDepth.input)
stereo.depth.link(spatialLocationCalculator.inputDepth)

spatialLocationCalculator.out.link(xoutSpatialData.input)
xinSpatialCalcConfig.out.link(spatialLocationCalculator.inputConfig)

zListProximity = [] * 4

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
            
            if (i == 0 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("play1")
            if (i == 1 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 3000):
                print("play2")

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
        
        # print("{:.2f}".format(topLeft.x), "{:.2f}".format(topLeft.y), "{:.2f}".format(bottomRight.x), "{:.2f}".format(bottomRight.y))
        # zCoords = int(depthData.spatialCoordinates.z)
        # if ((zCoords >= 1000) and (zCoords < 2500)):
        #     print("first")

        sys.stdout.flush()