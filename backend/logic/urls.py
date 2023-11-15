from logic.views import RestaurantListRetrieveViewSet, RestaurantNamesViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path


router = DefaultRouter()
router.register(r'restaurants', RestaurantListRetrieveViewSet)
router.register(r'restaurantnames', RestaurantNamesViewSet)

urlpatterns = router.urls