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

stereo.setDefaultProfilePreset(dai.node.StereoDepth.PresetMode.HIGH_DENSITY)
stereo.setLeftRightCheck(lrcheck)

stereoConfig = stereo.initialConfig.get()
stereoConfig.postProcessing.speckleFilter.enable = True
stereoConfig.postProcessing.speckleFilter.speckleRange = 50
stereoConfig.postProcessing.temporalFilter.enable = True
stereoConfig.postProcessing.spatialFilter.enable = True
stereoConfig.postProcessing.spatialFilter.holeFillingRadius = 2
stereoConfig.postProcessing.spatialFilter.numIterations = 1
stereoConfig.postProcessing.decimationFilter.decimationFactor = 1

configList = [] * 10

# Config
topLeft = dai.Point2f(0.67, 0.12)
bottomRight = dai.Point2f(0.77, 0.32)

config = dai.SpatialLocationCalculatorConfigData()
config.depthThresholds.lowerThreshold = 1000
config.depthThresholds.upperThreshold = 3500
config.roi = dai.Rect(topLeft, bottomRight)

configList.append(config)

topLeft1 = dai.Point2f(0.43, 0.12)
bottomRight1 = dai.Point2f(0.53, 0.32)

config1 = dai.SpatialLocationCalculatorConfigData()
config1.depthThresholds.lowerThreshold = 1000
config1.depthThresholds.upperThreshold = 3500
config1.roi = dai.Rect(topLeft1, bottomRight1)

configList.append(config1)

topLeft2 = dai.Point2f(0.42, 0.12)
bottomRight2 = dai.Point2f(0.52, 0.32)

config2 = dai.SpatialLocationCalculatorConfigData()
config2.depthThresholds.lowerThreshold = 1000
config2.depthThresholds.upperThreshold = 3500
config2.roi = dai.Rect(topLeft2, bottomRight2)

configList.append(config2)

topLeft3 = dai.Point2f(0.22, 0.12)
bottomRight3 = dai.Point2f(0.32, 0.32)

config3 = dai.SpatialLocationCalculatorConfigData()
config3.depthThresholds.lowerThreshold = 1000
config3.depthThresholds.upperThreshold = 3500
config3.roi = dai.Rect(topLeft3, bottomRight3)

configList.append(config3)

topLeft4 = dai.Point2f(0.19, 0.12)
bottomRight4 = dai.Point2f(0.29, 0.32)

config4 = dai.SpatialLocationCalculatorConfigData()
config4.depthThresholds.lowerThreshold = 1000
config4.depthThresholds.upperThreshold = 3500
config4.roi = dai.Rect(topLeft4, bottomRight4)

configList.append(config4)

topLeft5 = dai.Point2f(0.69, 0.49)
bottomRight5 = dai.Point2f(0.85, 0.56)

config5 = dai.SpatialLocationCalculatorConfigData()
config5.depthThresholds.lowerThreshold = 1000
config5.depthThresholds.upperThreshold = 3500
config5.roi = dai.Rect(topLeft5, bottomRight5)

configList.append(config5)

topLeft6 = dai.Point2f(0.42, 0.49)
bottomRight6 = dai.Point2f(0.58, 0.56)

config6 = dai.SpatialLocationCalculatorConfigData()
config6.depthThresholds.lowerThreshold = 1000
config6.depthThresholds.upperThreshold = 3500
config6.roi = dai.Rect(topLeft6, bottomRight6)

configList.append(config6)

topLeft7 = dai.Point2f(0.42, 0.48)
bottomRight7 = dai.Point2f(0.58, 0.55)

config7 = dai.SpatialLocationCalculatorConfigData()
config7.depthThresholds.lowerThreshold = 1000
config7.depthThresholds.upperThreshold = 3500
config7.roi = dai.Rect(topLeft7, bottomRight7)

configList.append(config7)

topLeft8 = dai.Point2f(0.19, 0.49)
bottomRight8 = dai.Point2f(0.35, 0.56)

config8 = dai.SpatialLocationCalculatorConfigData()
config8.depthThresholds.lowerThreshold = 1000
config8.depthThresholds.upperThreshold = 3500
config8.roi = dai.Rect(topLeft8, bottomRight8)

configList.append(config8)

topLeft9 = dai.Point2f(0.17, 0.49)
bottomRight9 = dai.Point2f(0.33, 0.56)

config9 = dai.SpatialLocationCalculatorConfigData()
config9.depthThresholds.lowerThreshold = 1000
config9.depthThresholds.upperThreshold = 3500
config9.roi = dai.Rect(topLeft9, bottomRight9)

configList.append(config9)

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
    device.setIrLaserDotProjectorBrightness(765)
    device.setIrFloodLightBrightness(300)
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
            
            # proximity 
            if (i == 0 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 2700):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 1500 and avg < 2700):
                    print("prox1")
                        
            if (i == 1 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 2700):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 1500 and avg < 2700):
                    print("prox2")
                    
            if (i == 2 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 2700):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 1500 and avg < 2700):
                    print("prox3")
                        
            if (i == 3 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 2700):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 1500 and avg < 2700):
                    print("prox4")
                    
            if (i == 4 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 2700):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 1500 and avg < 2700):
                    print("prox5")
                    
                    
                    #interaction
            if (i == 5 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2500):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 2000 and avg < 2500):
                    print("play1")
                        
            if (i == 6 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 2100):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 1500 and avg < 2100):
                    print("play2")
                        
            if (i == 7 and int(spatialData[i].spatialCoordinates.z) >= 2500 and int(spatialData[i].spatialCoordinates.z) < 2900):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 2100 and avg < 2700):
                    print("play3")
                    
            if (i == 8 and int(spatialData[i].spatialCoordinates.z) >= 1500 and int(spatialData[i].spatialCoordinates.z) < 2000):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 1500 and avg < 2000):
                    print("play4")
                    
            if (i == 9 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2700):
                total = 0
                temp = int(spatialData[i].spatialCoordinates.z)
                for i in range(10):
                    total += temp 
                avg = total / 10
                if (avg >= 2300 and avg < 2700):
                    print("play5")



            sys.stdout.flush()
            
            
        # Show the frame
        cv2.imshow("depth", depthFrameColor)
    

        key = cv2.waitKey(1)
        if key == ord('q'):
            break
        # elif key == ord('w'):
        #     if topLeft.y - stepSize >= 0:
        #         topLeft.y -= stepSize
        #         bottomRight.y -= stepSize
        #         newConfig = True
        # elif key == ord('a'):
        #     if topLeft.x - stepSize >= 0:
        #         topLeft.x -= stepSize
        #         bottomRight.x -= stepSize
        #         newConfig = True
        # elif key == ord('s'):
        #     if bottomRight.y + stepSize <= 1:
        #         topLeft.y += stepSize
        #         bottomRight.y += stepSize
        #         newConfig = True
        # elif key == ord('d'):
        #     if bottomRight.x + stepSize <= 1:
        #         topLeft.x += stepSize
        #         bottomRight.x += stepSize
        #         newConfig = True

        # if newConfig:
        #     config.roi = dai.Rect(topLeft, bottomRight)
        #     config.calculationAlgorithm = dai.SpatialLocationCalculatorAlgorithm.AVERAGE
        #     cfg = dai.SpatialLocationCalculatorConfig()
        #     cfg.addROI(config)
        #     spatialCalcConfigInQueue.send(cfg)
        #     newConfig = False
    

        # print("{:.2f}".format(topLeft.x), "{:.2f}".format(topLeft.y), "{:.2f}".format(bottomRight.x), "{:.2f}".format(bottomRight.y))
        # sys.stdout.flush()