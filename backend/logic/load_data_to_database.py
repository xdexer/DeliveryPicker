import json
from pathlib import Path
from typing import Dict
from logic.models import Cuisine, Restaurant, Location, Promotion, DeliveryPicker
from random import randrange



DELIVERY_SERVICES = {'uber': 'https://ubereats.com/', 'pyszne': 'https://pyszne.pl/', 'wolt': 'https://wolt.com/', 'glovo': 'https://glovoapp.com/'}


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


def get_promotions(cuisines: list) -> Dict:
    PROMOTION_DETAILS = [
        'Get one {} get one free',
        'Save 20% on {}'
    ]
    promotions = {}

    for x in range(50):
        promotions.setdefault(
            PROMOTION_DETAILS[randrange(len(PROMOTION_DETAILS))].format(cuisines[randrange(len(cuisines))]),
            f'2023-12-{randrange(10, 31)}'
        )

    return promotions



def get_delivery_pickers(promotions) -> Dict:
    
    delivery_pickers = []

    for service in DELIVERY_SERVICES.keys():
        delivery_pickers.append(
            {
                'name': service,
                'phone_number': randrange(10000000, 999999999),
                'delivery_cost': f'{randrange(5,10)}{randrange(10, 99)}',
                'service_cost': f'{randrange(1,4)}{randrange(10, 99)}',
                'promotion_id': promotions[randrange(len(promotions))]
            }
        )

    return delivery_pickers





def load_to_django(cuisines, locations, restaurants, promotions, delivery_pickers):
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
        
    for promotion, valid_until in promotions.items():
        if not Promotion.objects.filter(details=promotion):
            new_promotion = Promotion(details=promotion, valid_until=valid_until)

            new_promotion.save()
    
    for key, restaurant in restaurants.items():
        linked_cuisines = {k for k, v in cuisines.items() if key in v}

        restaurant_location = Location.objects.get(latitude = locations[key]['latitude'], longtitude = locations[key]['longtitude'])
        if not Restaurant.objects.filter(location_id=restaurant_location):
            new_restaurant = Restaurant(name=restaurant['name'], location_id = restaurant_location)
            
            new_restaurant.save()
            for cuisine in linked_cuisines:
                new_restaurant.cuisine_id.add(Cuisine.objects.get(name=cuisine))
            new_restaurant.save()
            if randrange(5) > 3:
                new_restaurant.promotion_id=Promotion.objects.get(details=list(promotions)[randrange(len(promotions))])
            new_restaurant.save()

            
    for delivery_picker in delivery_pickers:
        if not DeliveryPicker.objects.filter(name=delivery_picker['name']):
            promotion = list(promotions)[randrange(len(promotions))]
            new_delivery_picker = DeliveryPicker(
                name=delivery_picker['name'],
                phone_number=delivery_picker['phone_number'],
                delivery_cost= delivery_picker['delivery_cost'],
                service_cost=delivery_picker['service_cost'],
                promotion_id=Promotion.objects.get(details=promotion),
                resource_url=DELIVERY_SERVICES[delivery_picker['name']]
            )

            new_delivery_picker.save()
            for restaurant in restaurants.values():
                if randrange(10) < 8:
                    for x in Restaurant.objects.filter(name=restaurant['name']):
                        new_delivery_picker.restaurant_id.add(x)
            new_delivery_picker.save()



def run():
    data = Path('/home/kamalino/Documents/DeliveryPicker/backend/dupa.json').read_text()
    data = json.loads(data)
    
    cuisines = get_cuisines(data['aggregates']['cuisines'])
    promotions = get_promotions(list(cuisines.keys()))

    locations, restaurants = get_restaurant_data(data['restaurants'])
    delivery_pickers = get_delivery_pickers(list(promotions))


    load_to_django(cuisines, locations, restaurants, promotions, delivery_pickers)


if __name__ in ('__main__', 'django.core.management.commands.shell'):
    run()