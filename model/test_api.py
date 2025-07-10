import requests

def test_api():
    url = "http://localhost:5001/predict"
    test_cases = [
        {"text": "Scientists confirm climate change is accelerating."},  # Likely real
        {"text": "Bill Gates implants microchips in COVID vaccines."}   # Likely fake
    ]

    for data in test_cases:
        response = requests.post(url, json=data)
        print(f"Input: {data['text']}")
        print(f"Response: {response.json()}\n")

if __name__ == "__main__":
    test_api()