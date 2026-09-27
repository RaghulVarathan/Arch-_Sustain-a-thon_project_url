import os
import urllib.request
import zipfile
import shutil

MAVEN_VERSION = "3.9.9"
MAVEN_URL = f"https://archive.apache.org/dist/maven/maven-3/{MAVEN_VERSION}/binaries/apache-maven-{MAVEN_VERSION}-bin.zip"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MVN_DIR = os.path.join(BASE_DIR, ".mvn")
ZIP_PATH = os.path.join(MVN_DIR, "maven.zip")
TARGET_DIR = os.path.join(MVN_DIR, f"apache-maven-{MAVEN_VERSION}")

os.makedirs(MVN_DIR, exist_ok=True)

if not os.path.exists(TARGET_DIR):
    print(f"Downloading Apache Maven {MAVEN_VERSION}...")
    urllib.request.urlretrieve(MAVEN_URL, ZIP_PATH)
    print("Extracting Maven...")
    with zipfile.ZipFile(ZIP_PATH, 'r') as zip_ref:
        zip_ref.extractall(MVN_DIR)
    if os.path.exists(ZIP_PATH):
        os.remove(ZIP_PATH)
    print("Maven extracted successfully!")
else:
    print("Maven already extracted.")

# Create mvnw.cmd
mvnw_cmd_path = os.path.join(BASE_DIR, "mvnw.cmd")
mvn_bin = os.path.join(TARGET_DIR, "bin", "mvn.cmd")
with open(mvnw_cmd_path, "w") as f:
    f.write(f'@echo off\n"{mvn_bin}" %*\n')

print(f"Created mvnw.cmd pointing to {mvn_bin}")
