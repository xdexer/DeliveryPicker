import json
from pathlib import Path
from typing import Dict
from logic.models import Cuisine, Restaurant, Location



def get_cuisines(data: dict) -> Dict:
    cuisines = {}
    for key, value in data.items():
        cuisine = key.split('_')[0]
        if cuisine.isalpha():
            cuisines.setdefault(cuisine, value) 

    return cuisines 


def get_restaurant_data(data: dict) -> Dict:
    locations = {}
    restaurants = {}

    for key, restaurant_info in data.items():
        restaurants.setdefault(key, {'name': restaurant_info['brand']['name']})

        location = restaurant_info['location']
        location_data = {
            'street': location['streetAddress'],
            'city': location['city'],
            'latitude': location['lat'],
            'longtitude': location['lng'],
        }
        locations.setdefault(key, location_data)

    return locations, restaurants



def load_to_django(cuisines, locations, restaurants):
    for cuisine in cuisines:
        if not Cuisine.objects.filter(name = cuisine).exists():
            new_cuisine = Cuisine(name=cuisine)
            new_cuisine.save()

    for location in locations.values():
        if not Location.objects.filter(latitude = location['latitude']).filter(longtitude = location['longtitude']).exists():
            new_location = Location(
                street = location['street'],
                city = location['city'],
                latitude = location['latitude'],
                longtitude = location['longtitude']
            )
            new_location.save()
        
    for key, restaurant in restaurants.items():
        linked_cuisines = {k for k, v in cuisines.items() if key in v}

        restaurant_location = Location.objects.get(latitude = locations[key]['latitude'], longtitude = locations[key]['longtitude'])
        if not Restaurant.objects.filter(location_id=restaurant_location):
            new_restaurant = Restaurant(name=restaurant['name'], location_id = restaurant_location)
            
            new_restaurant.save()
            for cuisine in linked_cuisines:
                new_restaurant.cuisine_id.add(Cuisine.objects.get(name=cuisine))
            new_restaurant.save()


        


def run():
    data = Path('/home/kamalino/Documents/DeliveryPicker/backend/dupa.json').read_text()
    data = json.loads(data)
    
    cuisines = get_cuisines(data['aggregates']['cuisines'])
    locations, restaurants = get_restaurant_data(data['restaurants'])

    load_to_django(cuisines, locations, restaurants)


if __name__ in ('__main__', 'django.core.management.commands.shell'):
    run()