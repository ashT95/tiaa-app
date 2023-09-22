#!/usr/bin/env python3
"""
The code is edited from docs (https://docs.luxonis.com/projects/api/en/latest/samples/Yolo/tiny_yolo/)
We add parsing from JSON files that contain configuration
"""

from pathlib import Path
import sys
import cv2
import depthai as dai
import time
import math 
import threading 
import contextlib

# Define blob path/file location
nnPath = str(
    (
        Path(__file__).parent
        / Path("./model/yolov5trainedweight_openvino_2022.1_6shave.blob")
    )
    .resolve()
    .absolute()
)

if len(sys.argv) > 1:
    nnPath = sys.argv[1]

labels = ["hand", "person"]

syncNN = True

def getPipeline():
    # Create pipeline
    pipeline = dai.Pipeline()

    # Define sources and outputs
    camRgb = pipeline.create(dai.node.ColorCamera)
    detectionNetwork = pipeline.create(dai.node.YoloSpatialDetectionNetwork)
    monoLeft = pipeline.create(dai.node.MonoCamera)
    monoRight = pipeline.create(dai.node.MonoCamera)
    stereo = pipeline.create(dai.node.StereoDepth)
    nnNetworkOut = pipeline.create(dai.node.XLinkOut)

    xoutRgb = pipeline.create(dai.node.XLinkOut)
    nnOut = pipeline.create(dai.node.XLinkOut)
    xoutDepth = pipeline.create(dai.node.XLinkOut)

    xoutRgb.setStreamName("rgb")
    nnOut.setStreamName("nn")
    xoutDepth.setStreamName("depth")
    nnNetworkOut.setStreamName("nnNetwork")

    # Options: MEDIAN_OFF, KERNEL_3x3, KERNEL_5x5, KERNEL_7x7 (default)
    stereo.initialConfig.setMedianFilter(dai.MedianFilter.KERNEL_7x7)
    stereo.setLeftRightCheck(True)
    stereo.setSubpixel(True)

    config = stereo.initialConfig.get()
    config.postProcessing.speckleFilter.enable = False
    config.postProcessing.speckleFilter.speckleRange = 50
    config.postProcessing.temporalFilter.enable = True
    config.postProcessing.spatialFilter.enable = True
    config.postProcessing.spatialFilter.holeFillingRadius = 2
    config.postProcessing.spatialFilter.numIterations = 1
    config.postProcessing.decimationFilter.decimationFactor = 1
    stereo.initialConfig.set(config)

    # Network specific settings
    detectionNetwork.setConfidenceThreshold(0.5)
    detectionNetwork.setNumClasses(2)
    detectionNetwork.setCoordinateSize(4)
    detectionNetwork.setAnchors(
        [
            10.0,
            13.0,
            16.0,
            30.0,
            33.0,
            23.0,
            30.0,
            61.0,
            62.0,
            45.0,
            59.0,
            119.0,
            116.0,
            90.0,
            156.0,
            198.0,
            373.0,
            326.0,
        ]
    )
    detectionNetwork.setAnchorMasks(
        {"side80": [0, 1, 2], "side40": [3, 4, 5], "side20": [6, 7, 8]}
    )
    detectionNetwork.setIouThreshold(0.5)
    detectionNetwork.setBlobPath(nnPath)
    detectionNetwork.setNumInferenceThreads(2)
    detectionNetwork.input.setBlocking(False)

    detectionNetwork.setDepthLowerThreshold(200)
    detectionNetwork.setDepthUpperThreshold(30000)

    # Properties
    camRgb.setPreviewSize(640, 352)
    camRgb.setResolution(dai.ColorCameraProperties.SensorResolution.THE_1080_P)
    camRgb.setInterleaved(False)
    camRgb.setColorOrder(dai.ColorCameraProperties.ColorOrder.BGR)
    # camRgb.setImageOrientation(dai.CameraImageOrientation.ROTATE_180_DEG) 
    camRgb.setFps(6)

    monoLeft.setResolution(dai.MonoCameraProperties.SensorResolution.THE_400_P)
    monoLeft.setBoardSocket(dai.CameraBoardSocket.LEFT)
    monoRight.setResolution(dai.MonoCameraProperties.SensorResolution.THE_400_P)
    monoRight.setBoardSocket(dai.CameraBoardSocket.RIGHT)

    # Linking
    monoLeft.out.link(stereo.left)
    monoRight.out.link(stereo.right)

    camRgb.preview.link(detectionNetwork.input)
    if syncNN:
        detectionNetwork.passthrough.link(xoutRgb.input)
    else:
        camRgb.preview.link(xoutRgb.input)

    detectionNetwork.out.link(nnOut.input)

    stereo.depth.link(detectionNetwork.inputDepth)
    detectionNetwork.passthroughDepth.link(xoutDepth.input)
    detectionNetwork.outNetwork.link(nnNetworkOut.input)

    # setting node configs
    # stereo.setDefaultProfilePreset(dai.node.StereoDepth.PresetMode.HIGH_DENSITY)
    # Align depth map to the perspective of RGB camera, on which inference is done
    stereo.initialConfig.setConfidenceThreshold(255)
    stereo.setDepthAlign(dai.CameraBoardSocket.RGB)
    stereo.setOutputSize(monoLeft.getResolutionWidth(), monoLeft.getResolutionHeight())

    return pipeline

def worker(device_info, stack, devices):
    # openvino_version = dai.OpenVINO.Version.VERSION_2021_4
    openvino_version = dai.OpenVINO.Version.VERSION_2022_1

    usb2_mode = False
    device = stack.enter_context(dai.Device(openvino_version, device_info, usb2_mode))

    # Note: currently on POE, DeviceInfo.getMxId() and Device.getMxId() are different!
    print("=== Connected to " + device_info.getMxId())
    device.startPipeline(getPipeline())

    # Output queue will be used to get the rgb frames from the output defined above
    devices[device.getMxId()] = {
        'rgb': device.getOutputQueue(name="rgb"),
        'nn': device.getOutputQueue(name="nn"),
        'depth': device.getOutputQueue(name="depth"),
        'network': device.getOutputQueue(name="nnNetwork"),
    }

with contextlib.ExitStack() as stack:
    device_infos = dai.Device.getAllAvailableDevices()
    if len(device_infos) == 0:
        raise RuntimeError("No devices found!")
    else:
        print("Found", len(device_infos), "devices")
    devices = {}
    threads = []

    for device_info in device_infos:
        time.sleep(1) # Currently required due to XLink race issues
        thread = threading.Thread(target=worker, args=(device_info, stack, devices))
        thread.start()
        threads.append(thread)

    for t in threads:
        t.join() # Wait for all threads to finish (to connect to devices)

    while True:
        for mxid, q in devices.items():
            if q['nn'].has():
                inDet = q['nn'].get()
                inPreview = q['rgb'].get()

                color = (255, 255, 255)
                frame = inPreview.getCvFrame()
                detections = inDet.detections
                
                height = frame.shape[0]
                width = frame.shape[1]
                
                for detection in detections:
                    try:
                        label = labels[detection.label]
                    except:
                        label = detection.label
                    

                    if (label == "hand") :

                        # Denormalize bounding box
                        x1 = int(detection.xmin * width)
                        x2 = int(detection.xmax * width)
                        y1 = int(detection.ymin * height)
                        y2 = int(detection.ymax * height)

                        cv2.putText(frame, str(label), (x1 + 10, y1 + 20), cv2.FONT_HERSHEY_TRIPLEX, 0.5, 255)
                        cv2.putText(frame, "{:.2f}".format(detection.confidence*100), (x1 + 10, y1 + 35), cv2.FONT_HERSHEY_TRIPLEX, 0.5, 255)
                        cv2.putText(frame, f"X: {int(detection.spatialCoordinates.x)}", (x1 + 10, y1 + 50), cv2.FONT_HERSHEY_TRIPLEX, 0.5, 255)
                        cv2.putText(frame, f"Y: {int(detection.spatialCoordinates.y)}" , (x1 + 10, y1 + 65), cv2.FONT_HERSHEY_TRIPLEX, 0.5, 255)
                        cv2.putText(frame, f"Z: {int(detection.spatialCoordinates.z)}" , (x1 + 10, y1 + 80), cv2.FONT_HERSHEY_TRIPLEX, 0.5, 255)
                        cv2.rectangle(frame, (x1, y1), (x2, y2), color, cv2.FONT_HERSHEY_SIMPLEX)


                    # --------------------------------------SENDING COORDINATES TO ELECTRON MAIN---------------------------------------------------- #
                        print(f"HAND:X:{int(detection.spatialCoordinates.x)},Y:{int(detection.spatialCoordinates.y)},Z:{int(detection.spatialCoordinates.z)}")
                        sys.stdout.flush()

                    # ------------------------------------------------------------------------------------------------------------------------------- #

                cv2.imshow("rgb", frame)

        if cv2.waitKey(1) == ord('q'):
            break

