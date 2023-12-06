import django_filters
from .models import Restaurant
from geopy import distance


class RestaurantLocationFilter(django_filters.FilterSet):

    def get_distance(self, queryset, name, value):
        radius = float(self.request.GET.get('radius'))
        user_lat = self.request.GET.get('user_lat')
        user_lon = self.request.GET.get('user_lon')

        to_be_excluded = []
        if user_lat and user_lon:
            for restaurant in queryset:
                restaurant_id = restaurant.id
                restaurant_lat = restaurant.location_id.latitude
                restaurant_lon = restaurant.location_id.longtitude

                distance_between_user_and_restaurant = distance.distance(
                    (user_lat, user_lon),
                    (restaurant_lat, restaurant_lon)
                ).km

                if distance_between_user_and_restaurant > radius:
                    to_be_excluded.append(restaurant_id)

        return queryset.exclude(id__in=to_be_excluded)

    name = django_filters.CharFilter(lookup_expr='icontains')
    radius = django_filters.NumberFilter(method='get_distance')


    class Meta:
        model = Restaurant
        fields = ['name']


class RestaurantFilter(django_filters.FilterSet):
    id = django_filters.NumberFilter(lookup_expr='iexact')

    class Meta:
        model = Restaurant
        fields = ['name']