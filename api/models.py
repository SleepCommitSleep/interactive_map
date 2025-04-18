from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
import os


def map_mask_directory_path(instance, filename):
    return os.path.join(settings.MEDIA_ROOT, "map_masks")


class Map(models.Model):
    id = models.IntegerField(primary_key=True)
    map_mask = models.FileField(upload_to=map_mask_directory_path)
    map_img = models.FileField(upload_to=settings.MEDIA_ROOT)


class Terminal(models.Model):
    id = models.IntegerField(primary_key=True)
    map_id = models.ForeignKey(Map, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    coord_x = models.IntegerField()
    coord_y = models.IntegerField()
    info = models.TextField()
    
