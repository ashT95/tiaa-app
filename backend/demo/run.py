from depthai_demo import Demo
from depthai_sdk.managers import ArgsManager
from depthai_helpers.config_manager import ConfigManager

args = ArgsManager.parseArgs()
conf = ConfigManager(args)
demo = Demo() # all params are optional
demo.run_all(conf)
