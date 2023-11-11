from django.contrib import admin
from .models import *

admin.site.register(Cuisine)
admin.site.register(Location)
admin.site.register(Restaurant)
admin.site.register(DeliveryPicker)
admin.site.register(Promotion)

