#!/usr/bin/env python3

import cv2
import sys
import depthai as dai
import contextlib

stepSize = 0.01

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

    camConfig = dai.Device.Config()
    camConfig.board.network.mtu = 9000 # Jumbo frames. Default 1500
    camConfig.board.network.xlinkTcpNoDelay = False # Default True
    camConfig.board.sysctl.append("net.inet.tcp.delayed_ack=1") # configure sysctl settings. 0 by default.

    monoLeft.setIsp3aFps(5)
    monoRight.setIsp3aFps(5)

    monoLeft.setFps(10)
    monoRight.setFps(10)

    # f1 = monoLeft.getFps()
    # f2 = monoRight.getFps()
    # print(f"{f1} {f2}")

    stereoConfig = stereo.initialConfig.get()
    stereoConfig.postProcessing.speckleFilter.enable = True
    stereoConfig.postProcessing.speckleFilter.speckleRange = 50
    stereoConfig.postProcessing.temporalFilter.enable = True
    stereoConfig.postProcessing.spatialFilter.enable = True
    stereoConfig.postProcessing.spatialFilter.holeFillingRadius = 2
    stereoConfig.postProcessing.spatialFilter.numIterations = 1
    stereoConfig.postProcessing.decimationFilter.decimationFactor = 1

    configList = [] * 28

    # Config
    # WALL 1
    # PROXIMITY WALL 1
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

    # ANIMATIONS WALL 1
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

    # WALL 2
    # PROXIMITY WALL 2
    #conserving
    topLeft10 = dai.Point2f(0.62, 0.12)
    bottomRight10 = dai.Point2f(0.72, 0.32)

    config10 = dai.SpatialLocationCalculatorConfigData()
    config10.depthThresholds.lowerThreshold = 1000
    config10.depthThresholds.upperThreshold = 3500
    config10.roi = dai.Rect(topLeft10, bottomRight10)

    configList.append(config10)

    # friendship
    topLeft11 = dai.Point2f(0.47, 0.12)
    bottomRight11 = dai.Point2f(0.57, 0.32)

    config11 = dai.SpatialLocationCalculatorConfigData()
    config11.depthThresholds.lowerThreshold = 1000
    config11.depthThresholds.upperThreshold = 3500
    config11.roi = dai.Rect(topLeft11, bottomRight11)

    configList.append(config11)

    # real estate
    topLeft12 = dai.Point2f(0.32, 0.12)
    bottomRight12 = dai.Point2f(0.42, 0.32)

    config12 = dai.SpatialLocationCalculatorConfigData()
    config12.depthThresholds.lowerThreshold = 1000
    config12.depthThresholds.upperThreshold = 3500
    config12.roi = dai.Rect(topLeft12, bottomRight12)

    configList.append(config12)

    # grape investments
    topLeft13 = dai.Point2f(0.22, 0.12)
    bottomRight13 = dai.Point2f(0.32, 0.32)

    config13 = dai.SpatialLocationCalculatorConfigData()
    config13.depthThresholds.lowerThreshold = 1000
    config13.depthThresholds.upperThreshold = 3500
    config13.roi = dai.Rect(topLeft13, bottomRight13)

    configList.append(config13)

    # ANIMATIONS WALL 2
    #conserving 
    topLeft14 = dai.Point2f(0.61, 0.49)
    bottomRight14 = dai.Point2f(0.77, 0.56)

    config14 = dai.SpatialLocationCalculatorConfigData()
    config14.depthThresholds.lowerThreshold = 1000
    config14.depthThresholds.upperThreshold = 3500
    config14.roi = dai.Rect(topLeft14, bottomRight14)

    configList.append(config14)

    #friendship
    topLeft15 = dai.Point2f(0.47, 0.49)
    bottomRight15 = dai.Point2f(0.63, 0.56)

    config15 = dai.SpatialLocationCalculatorConfigData()
    config15.depthThresholds.lowerThreshold = 1000
    config15.depthThresholds.upperThreshold = 3500
    config15.roi = dai.Rect(topLeft15, bottomRight15)

    configList.append(config15)

    #real estate
    topLeft16 = dai.Point2f(0.26, 0.49)
    bottomRight16 = dai.Point2f(0.42, 0.56)

    config16 = dai.SpatialLocationCalculatorConfigData()
    config16.depthThresholds.lowerThreshold = 1000
    config16.depthThresholds.upperThreshold = 3500
    config16.roi = dai.Rect(topLeft16, bottomRight16)

    configList.append(config16)

    # grape investments
    topLeft17 = dai.Point2f(0.16, 0.49)
    bottomRight17 = dai.Point2f(0.32, 0.56)

    config17 = dai.SpatialLocationCalculatorConfigData()
    config17.depthThresholds.lowerThreshold = 1000
    config17.depthThresholds.upperThreshold = 3500
    config17.roi = dai.Rect(topLeft17, bottomRight17)

    configList.append(config17)

    # WALL 3
    # PROXIMITY WALL 3
    # ceos
    topLeft18 = dai.Point2f(0.70, 0.12)
    bottomRight18 = dai.Point2f(0.80, 0.32)

    config18 = dai.SpatialLocationCalculatorConfigData()
    config18.depthThresholds.lowerThreshold = 1000
    config18.depthThresholds.upperThreshold = 3500
    config18.roi = dai.Rect(topLeft18, bottomRight18)

    configList.append(config18)

    # girls in tech
    topLeft19 = dai.Point2f(0.53, 0.12)
    bottomRight19 = dai.Point2f(0.63, 0.32)

    config19 = dai.SpatialLocationCalculatorConfigData()
    config19.depthThresholds.lowerThreshold = 1000
    config19.depthThresholds.upperThreshold = 3500
    config19.roi = dai.Rect(topLeft19, bottomRight19)

    configList.append(config19)

    # empowering abilities
    topLeft20 = dai.Point2f(0.48, 0.12)
    bottomRight20 = dai.Point2f(0.58, 0.32)

    config20 = dai.SpatialLocationCalculatorConfigData()
    config20.depthThresholds.lowerThreshold = 1000
    config20.depthThresholds.upperThreshold = 3500
    config20.roi = dai.Rect(topLeft20, bottomRight20)

    configList.append(config20)

    # financial literacy
    topLeft21 = dai.Point2f(0.29, 0.12)
    bottomRight21 = dai.Point2f(0.39, 0.32)

    config21 = dai.SpatialLocationCalculatorConfigData()
    config21.depthThresholds.lowerThreshold = 1000
    config21.depthThresholds.upperThreshold = 3500
    config21.roi = dai.Rect(topLeft21, bottomRight21)

    configList.append(config21)

    # retiring inequality
    topLeft22 = dai.Point2f(0.21, 0.12)
    bottomRight22 = dai.Point2f(0.31, 0.32)

    config22 = dai.SpatialLocationCalculatorConfigData()
    config22.depthThresholds.lowerThreshold = 1000
    config22.depthThresholds.upperThreshold = 3500
    config22.roi = dai.Rect(topLeft22, bottomRight22)

    configList.append(config22)

    # ANIMATIONS WALL 3
    #ceos
    topLeft23 = dai.Point2f(0.72, 0.49)
    bottomRight23 = dai.Point2f(0.88, 0.56)

    config23 = dai.SpatialLocationCalculatorConfigData()
    config23.depthThresholds.lowerThreshold = 1000
    config23.depthThresholds.upperThreshold = 3500
    config23.roi = dai.Rect(topLeft23, bottomRight23)

    configList.append(config23)

    # girls in tech
    topLeft24 = dai.Point2f(0.47, 0.49)
    bottomRight24 = dai.Point2f(0.63, 0.56)

    config24 = dai.SpatialLocationCalculatorConfigData()
    config24.depthThresholds.lowerThreshold = 1000
    config24.depthThresholds.upperThreshold = 3500
    config24.roi = dai.Rect(topLeft24, bottomRight24)

    configList.append(config24)

    # empowering abilities
    topLeft25 = dai.Point2f(0.44, 0.49)
    bottomRight25 = dai.Point2f(0.60, 0.56)

    config25 = dai.SpatialLocationCalculatorConfigData()
    config25.depthThresholds.lowerThreshold = 1000
    config25.depthThresholds.upperThreshold = 3500
    config25.roi = dai.Rect(topLeft25, bottomRight25)

    configList.append(config25)

    # financial literacy
    topLeft26 = dai.Point2f(0.14, 0.49)
    bottomRight26 = dai.Point2f(0.30, 0.56)

    config26 = dai.SpatialLocationCalculatorConfigData()
    config26.depthThresholds.lowerThreshold = 1000
    config26.depthThresholds.upperThreshold = 3500
    config26.roi = dai.Rect(topLeft26, bottomRight26)

    configList.append(config26)

    # retiring inequality 
    topLeft27 = dai.Point2f(0.15, 0.49)
    bottomRight27 = dai.Point2f(0.31, 0.56)

    config27 = dai.SpatialLocationCalculatorConfigData()
    config27.depthThresholds.lowerThreshold = 1000
    config27.depthThresholds.upperThreshold = 3500
    config27.roi = dai.Rect(topLeft27, bottomRight27)

    configList.append(config27)

    spatialLocationCalculator.initialConfig.setROIs(configList)
    spatialLocationCalculator.inputConfig.setWaitForMessage(False)
    # Linking
    monoLeft.out.link(stereo.left)
    monoRight.out.link(stereo.right)

    spatialLocationCalculator.passthroughDepth.link(xoutDepth.input)
    stereo.depth.link(spatialLocationCalculator.inputDepth)

    spatialLocationCalculator.out.link(xoutSpatialData.input)
    xinSpatialCalcConfig.out.link(spatialLocationCalculator.inputConfig)

    return pipeline

with contextlib.ExitStack() as stack:

    devices = {}
    device_infos = [] 
    
    device_infos.append(dai.DeviceInfo("192.168.1.112"))
    device_infos.append(dai.DeviceInfo("192.168.1.113"))
    device_infos.append(dai.DeviceInfo("192.168.1.114"))

    # device_infos.append(dai.DeviceInfo("18443010010F8F0F00"))
    # device_infos.append(dai.DeviceInfo("18443010C10C580F00"))
    # device_infos.append(dai.DeviceInfo("1844301081158F0F00"))

    # print(device_infos[0])

    for device_info in device_infos:
       
        # Note: the pipeline isn't set here, as we don't know yet what device it is.
        # The extra arguments passed are required by the existing overload variants
        openvino_version = dai.OpenVINO.Version.VERSION_2021_4
        usb2_mode = False
        device = stack.enter_context(dai.Device(openvino_version, device_info, False))

        # Note: currently on POE, DeviceInfo.getMxId() and Device.getMxId() are different!
        # print("=== Connected to " + device_info.getMxId())
        print("=== Connected to " + device_info.name)
        mxid = device_info.name
        name = device_info.name
        cameras = device.getConnectedCameras()
        usb_speed = device.getUsbSpeed()

        # Get a customized pipeline based on identified device type
        pipeline = getPipeline()
        device.startPipeline(pipeline)

        device.setIrLaserDotProjectorBrightness(765)
        device.setIrFloodLightBrightness(300)

        # Output queue will be used to get the rgb frames from the output defined above
        devices[mxid] = {
            'depth': device.getOutputQueue(name="depth", maxSize=4, blocking=False),
            'spatialData': device.getOutputQueue(name="spatialData", maxSize=4, blocking=False),
            'spatialCalcConfig': device.getInputQueue("spatialCalcConfig")
            }

        color = (255, 255, 255)

    while True:
        for mxid, q in devices.items():
            # if (mxid == "1844301081158F0F00"):
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
                
            # WALL1
            # proximity 
            if (mxid == '192.168.1.112'):
                if (int(spatialData[0].spatialCoordinates.z) >= 1500 and int(spatialData[0].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[0].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 1500 and avg < 2800):
                        print("prox1")

                                
                if (int(spatialData[1].spatialCoordinates.z) >= 1500 and int(spatialData[1].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[1].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 1500 and avg < 2800):
                        print("prox2")
                            
                if (int(spatialData[2].spatialCoordinates.z) >= 1500 and int(spatialData[2].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[2].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 1500 and avg < 2800):
                        print("prox3")
                                
                if (int(spatialData[3].spatialCoordinates.z) >= 1500 and int(spatialData[3].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[3].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 1500 and avg < 2800):
                        print("prox4")
                            
                if (int(spatialData[4].spatialCoordinates.z) >= 1500 and int(spatialData[4].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[4].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 1500 and avg < 2800):
                        print("prox5")
                            
                            
                #interaction
                if (int(spatialData[5].spatialCoordinates.z) >= 2000 and int(spatialData[5].spatialCoordinates.z) < 2600):
                    total = 0
                    temp = int(spatialData[5].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 2000 and avg < 2600):
                        print("play1")
                                
                if (int(spatialData[6].spatialCoordinates.z) >= 1500 and int(spatialData[6].spatialCoordinates.z) < 2100):
                    total = 0
                    temp = int(spatialData[6].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 1500 and avg < 2100):
                        print("play2")
                                
                if (int(spatialData[7].spatialCoordinates.z) >= 2500 and int(spatialData[7].spatialCoordinates.z) < 2900):
                    total = 0
                    temp = int(spatialData[7].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 2100 and avg < 2800):
                        print("play3")
                            
                if (int(spatialData[8].spatialCoordinates.z) >= 1500 and int(spatialData[8].spatialCoordinates.z) < 2000):
                    total = 0
                    temp = int(spatialData[8].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 1500 and avg < 2000):
                        print("play4")
                            
                if (int(spatialData[9].spatialCoordinates.z) >= 2000 and int(spatialData[9].spatialCoordinates.z) < 2550):
                    total = 0
                    temp = int(spatialData[9].spatialCoordinates.z)
                    for i in range(30):
                        total += temp 
                    avg = total / 30
                    if (avg >= 2300 and avg < 2600):
                        print("play5")

        
            # WALL 2
            # PROXIMITY
            #conserving
            if (mxid == '192.168.1.113'):
                if (i == 10 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("prox6")

                # friendship
                if (i == 11 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("prox7")

                # real estate
                if (i == 12 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("prox8")
                
                # grape investments
                if (i == 13 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("prox9")
                
                # ANIMATIONS
                # conserving
                if (i == 14 and int(spatialData[i].spatialCoordinates.z) >= 1900 and int(spatialData[i].spatialCoordinates.z) < 2400):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 1900 and avg < 2400):
                        print("play6")

                # friendship
                if (i == 15 and int(spatialData[i].spatialCoordinates.z) >= 2400 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2400 and avg < 2800):
                        print("play7")

                # real estate
                if (i == 16 and int(spatialData[i].spatialCoordinates.z) >= 1900 and int(spatialData[i].spatialCoordinates.z) < 2500):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 1900 and avg < 2500):
                        print("play8")
                
                # grape investments
                if (i == 17 and int(spatialData[i].spatialCoordinates.z) >= 2500 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2500 and avg < 2800):
                        print("play9")

            if (mxid == '192.168.1.114'):
                # WALL 3
                # PROXIMITY
                # ceos
                if (i == 18 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("prox10")
                
                # girls in tech
                if (i == 19 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("prox11")

                # empowering abilities
                if (i == 20 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("prox12")
                
                # financial literacy
                if (i == 21 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("prox13")
                
                # retiring inequality
                if (i == 22 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("prox14")

                # ANIMATIONS
                # ceos 
                if (i == 23 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2800):
                        print("play10")
                        print(f"{int(spatialData[i].spatialCoordinates.z)}")
                
                # girls in tech
                if (i == 24 and int(spatialData[i].spatialCoordinates.z) >= 1900 and int(spatialData[i].spatialCoordinates.z) < 2400):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 1900 and avg < 2400):
                        print("play11")
                
                # empoweing abilities
                if (i == 25 and int(spatialData[i].spatialCoordinates.z) >= 2400 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2400 and avg < 2800):
                        print("play12")
                
                # financial literacy
                if (i == 26 and int(spatialData[i].spatialCoordinates.z) >= 2000 and int(spatialData[i].spatialCoordinates.z) < 2500):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2000 and avg < 2500):
                        print("play13")
                
                # retiring inequality
                if (i == 27 and int(spatialData[i].spatialCoordinates.z) >= 2500 and int(spatialData[i].spatialCoordinates.z) < 2800):
                    total = 0
                    temp = int(spatialData[i].spatialCoordinates.z)
                    for i in range(10):
                        total += temp 
                    avg = total / 10
                    if (avg >= 2500 and avg < 2800):
                        print("play14")

            sys.stdout.flush()
        
            # Show the frame
            cv2.imshow("depth-" + mxid, depthFrameColor)
    

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