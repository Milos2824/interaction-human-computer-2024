# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests
import datetime


class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_hello_world"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Hello World!")

        return []
    
class ActionFlightList(Action):

    def name(self) -> Text:
        return "action_flight_list"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        
        url = 'https://flight.pequla.com/api/flight/list?type=departure'
        generate_attachment(url, dispatcher, "Here are some flights")
        return []

def generate_attachment(url: str, dispatcher: CollectingDispatcher, msg: str):
    try:
        response = requests.get(url)
        response.raise_for_status()

        data = response.json()
        if (isinstance(data, list)):
            dispatcher.utter_message(text=msg, attachment=data[:5])
            return []

        dispatcher.utter_message(text="Data is not an array!")
    except requests.exceptions.RequestException as ex:
        dispatcher.utter_message(text="An error occured")