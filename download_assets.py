import os
import requests

def download_assets(file_list_path, base_dir):
    with open(file_list_path, 'r') as f:
        paths = [line.strip() for line in f if line.strip()]

    for path in paths:
        # Remove leading slash for local path construction
        local_path = os.path.join(base_dir, path.lstrip('/'))
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        
        # Construct remote URL
        remote_url = "https:/" + path
        
        if os.path.exists(local_path):
            print(f"Skipping (already exists): {local_path}")
            continue
            
        print(f"Downloading: {remote_url} -> {local_path}")
        try:
            response = requests.get(remote_url, timeout=10)
            if response.status_code == 200:
                with open(local_path, 'wb') as f:
                    f.write(response.content)
            else:
                print(f"Failed to download {remote_url}: Status {response.status_code}")
        except Exception as e:
            print(f"Error downloading {remote_url}: {e}")

if __name__ == "__main__":
    base_directory = "/Users/torunkaratas/Downloads/tranquil_495tmg.peachworlds.com"
    missing_assets_file = os.path.join(base_directory, "missing_assets.txt")
    download_assets(missing_assets_file, base_directory)
