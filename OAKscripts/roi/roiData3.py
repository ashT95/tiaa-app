#!/usr/bin/env python3

import cv2
import sys
import depthai as dai
import contextlib
import time
import threading

stepSize = 0.01

newConfig = False



# def getPipeline():
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

camConfig = dai.Device.Config()
camConfig.board.network.mtu = 9000 # Jumbo frames. Default 1500
camConfig.board.network.xlinkTcpNoDelay = False # Default True
camConfig.board.sysctl.append("net.inet.tcp.delayed_ack=1") # configure sysctl settings. 0 by default.


stereoConfig = stereo.initialConfig.get()
stereoConfig.postProcessing.speckleFilter.enable = True
stereoConfig.postProcessing.speckleFilter.speckleRange = 50
stereoConfig.postProcessing.temporalFilter.enable = True
stereoConfig.postProcessing.spatialFilter.enable = True
stereoConfig.postProcessing.spatialFilter.holeFillingRadius = 2
stereoConfig.postProcessing.spatialFilter.numIterations = 1
stereoConfig.postProcessing.decimationFilter.decimationFactor = 1

topLeft = dai.Point2f(0.67, 0.49)
bottomRight = dai.Point2f(0.77, 0.56)

config = dai.SpatialLocationCalculatorConfigData()
config.depthThresholds.lowerThreshold = 1000
config.depthThresholds.upperThreshold = 3500
config.roi = dai.Rect(topLeft, bottomRight)

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


devices = {}
device_infos = []

# device_infos.append(dai.DeviceInfo("1844301081158F0F00"))
device_infos.append(dai.DeviceInfo("18443010C10C580F00"))
# device_infos.append(dai.DeviceInfo("18443010010F8F0F00"))
# device_infos=dai.Device.getAllAvailableDevices()

# 1844301081158F0F00
# 18443010C10C580F00
# 18443010010F8F0F00



with dai.Device(dai.OpenVINO.Version.VERSION_2021_4, dai.DeviceInfo("18443010C10C580F00"), False).startPipeline(pipeline) as device:
    device.setIrLaserDotProjectorBrightness(765)
    device.setIrFloodLightBrightness(300)

    # device.setLogLevel(dai.LogLevel.DEBUG)
    # device.setLogOutputLevel(dai.LogLevel.DEBUG)


    # Output queue will be used to get the depth frames from the outputs defined above
    depthQueue = device.getOutputQueue(name="depth", maxSize=4, blocking=False)
    spatialCalcQueue = device.getOutputQueue(name="spatialData", maxSize=4, blocking=False)
    spatialCalcConfigInQueue = device.getInputQueue("spatialCalcConfig")
    

    while True:
        for mxid, q in devices.items():
            depth = q['depth'].get()
            depthFrame = depth.getFrame()
            depthFrameColor = cv2.normalize(depthFrame, None, 255, 0, cv2.NORM_INF, cv2.CV_8UC1)
            depthFrameColor = cv2.equalizeHist(depthFrameColor) 
            depthFrameColor = cv2.applyColorMap(depthFrameColor, cv2.COLORMAP_HOT)

            spatialData = q['spatialData'].get().getSpatialLocations()
                
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
                        
            cv2.imshow("depth" + mxid, depthFrameColor)
        # if cv2.waitKey(1) == ord('q'):
        #     break

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

