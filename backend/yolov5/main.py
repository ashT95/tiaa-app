from depthai_sdk import OakCamera, ArgsParser
import argparse
from depthai_sdk.classes import DetectionPacket
from depthai_sdk.visualize.visualizer_helper import FramePosition, VisualizerHelper
import cv2
import depthai as dai


# parse arguments
parser = argparse.ArgumentParser()
parser.add_argument("-conf", "--config", help="Trained YOLO json config path", default='yolov5trainedweight.json', type=str)
args = ArgsParser.parseArgs(parser)

def callback(packet: DetectionPacket):
    visualizer = packet.visualizer
    # for detection in packet.img_detections.detections:
    #     print(detection.spatialCoordinates.x)
    VisualizerHelper.print(packet.frame, 'BottomRight!', FramePosition.BottomRight)
    frame = visualizer.draw(packet.frame)
    cv2.imshow('Visualizer', frame)

with OakCamera(args=args) as oak:
    color = oak.create_camera('color')
    nn = oak.create_nn(args['config'], color, nn_type='yolo', spatial=True)

    nn.config_spatial(
        lower_threshold=300, # Discard depth points below 30cm
        upper_threshold=3500, # Discard depth pints above 10m
        # Average depth points before calculating X and Y spatial coordinates:
        # calc_algo=dai.SpatialLocationCalculatorAlgorithm.AVERAGE

    )



    oak.visualize(nn, fps=True, scale=2/3, callback=callback)
    # oak.visualize(nn.out.passthrough, fps=True)
    oak.start(blocking=True)
