import requests
import datetime

def get_flights():
    try:
        url = 'https://flight.pequla.com/api/flight/list?type=departure'
        response = requests.get(url)
        response.raise_for_status()

        data = response.json()
        if (isinstance(data, list)):
            print(f"There is a total of {len(data)} flights")
            for flight in data[:5]:
                t = datetime.datetime.fromisoformat(flight['scheduledAt'])
                print(f"Flight to {flight['destination']} scheduled for {t.strftime('%c')}")
            return

        print("Data is not an array!")
    except requests.exceptions.RequestException as ex:
        print(ex)

    return []