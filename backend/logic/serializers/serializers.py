from rest_framework import serializers
from ..models import *


class CuisineSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cuisine
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Location
        fields = '__all__'


class PromotionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Promotion
        fields = '__all__'



class RestaurantSerializer(serializers.ModelSerializer):
    promotion_id = PromotionSerializer()
    cuisine_id = CuisineSerializer()
    location_id = LocationSerializer() 

    class Meta:
        model = Restaurant
        fields = '__all__'


class DeliveryPickerSerializer(serializers.ModelSerializer):
    promotion_id = PromotionSerializer()
    
    class Meta:
        model = DeliveryPicker
        fields = '__all__'


class RestaurantsNameSerializer(serializers.ModelSerializer):
    location_id = LocationSerializer() 

    class Meta:
        model = Restaurant
        fields = ['name', 'location_id', 'id']