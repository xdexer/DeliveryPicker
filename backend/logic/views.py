from .filters import RestaurantFilter, RestaurantLocationFilter
from rest_framework import viewsets
from .models import *
from .serializers.serializers import *
from .paginations import *


class RestaurantListRetrieveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    filterset_class = RestaurantFilter


class RestaurantNamesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantsNameSerializer
    filterset_class = RestaurantLocationFilter
    pagination_class = StandardResultsSetPagination


class CuisineListRetrieveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = CuisineSerializer


class PromotionListRetrieveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = PromotionSerializer


class LocationListRetrieveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = LocationSerializer


class DeliveryPickerListRetrieveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = DeliveryPickerSerializer
    
