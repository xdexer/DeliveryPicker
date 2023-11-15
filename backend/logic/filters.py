import django_filters
from .models import Restaurant

class RestaurantFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')
    longtitudegt = django_filters.NumberFilter(field_name='location_id__longtitude', lookup_expr='gt')
    longtitudelt = django_filters.NumberFilter(field_name='location_id__longtitude', lookup_expr='lt')
    latitudegt = django_filters.NumberFilter(field_name='location_id__latitude', lookup_expr='gt')
    latitudelt = django_filters.NumberFilter(field_name='location_id__latitude', lookup_expr='lt')

    class Meta:
        model = Restaurant
        fields = ['name']
