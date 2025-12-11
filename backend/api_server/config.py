import os
import yaml
from pathlib import Path

def load_config():
    """
    Reads a YAML configuration file and returns a Python dict
    """

    current_file_path = Path(__file__).resolve()
    config_file_path = current_file_path.parent.parent / 'config.yaml'

    try:
        _ = os.environ["GEMINI_API_KEY"]
    except KeyError:
        print("Error fetching GEMINI_API_KEY environment variable.")
        raise ValueError("Required environment variable 'GEMINI_API_KEY' is missing")
    # -----------------------------------------------------------------------------

    if not config_file_path.exists():
        raise FileNotFoundError(f"Configuration file not found at: {config_file_path}")

    with open(config_file_path, 'r') as f:
        config_data = yaml.safe_load(f)

    return config_data
