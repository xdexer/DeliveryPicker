from logic.views import RestaurantListRetrieveViewSet, RestaurantNamesViewSet, DeliveryPickerListRetrieveViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path


router = DefaultRouter()
router.register(r'restaurants', RestaurantListRetrieveViewSet)
router.register(r'restaurantnames', RestaurantNamesViewSet)
router.register(r'deliverypicker', DeliveryPickerListRetrieveViewSet)

urlpatterns = router.urls