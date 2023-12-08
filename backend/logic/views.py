from .filters import RestaurantFilter, RestaurantLocationFilter, DeliveryPickerFilter
from rest_framework import viewsets
from .models import *
from .serializers.serializers import *


class RestaurantListRetrieveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    filterset_class = RestaurantFilter


class RestaurantNamesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantsNameSerializer
    filterset_class = RestaurantLocationFilter


class DeliveryPickerListRetrieveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DeliveryPicker.objects.all()
    serializer_class = DeliveryPickerSerializer
    filterset_class = DeliveryPickerFilter
    

    