from django.db import models

# Create your models here.

class Promotion(models.Model):
    details = models.TextField()
    valid_until = models.DateTimeField()

    def __str__(self):
        return f'{self.details}'

    class Meta:
        verbose_name = 'Promotion'
        verbose_name_plural = 'Promotions'


class Location(models.Model):
    street = models.TextField()
    city = models.TextField()
    latitude = models.TextField()
    longtitude = models.TextField()


class Cuisine(models.Model):
    name = models.TextField()

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Cuisine'
        verbose_name_plural = 'Cuisines'


class Restaurant(models.Model):
    name = models.TextField()
    promotion_id = models.ForeignKey(Promotion, on_delete=models.DO_NOTHING, blank=True, null=True)
    cuisine_id = models.ManyToManyField(Cuisine)
    location_id = models.OneToOneField(Location, on_delete=models.DO_NOTHING)
    
    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Restaurant'
        verbose_name_plural = 'Restaurants'


class DeliveryPicker(models.Model):
    restaurant_id = models.ManyToManyField(Restaurant)
    promotion_id = models.ForeignKey(Promotion, on_delete=models.DO_NOTHING)
    name = models.TextField()
    phone_number = models.TextField()
    delivery_cost = models.IntegerField()
    service_cost = models.IntegerField()
    resource_url = models.TextField()

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'DeliveryPicker'
        verbose_name_plural = 'DeliveryPickers'

