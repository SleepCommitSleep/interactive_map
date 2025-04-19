from rest_framework import serializers
from .models import Terminal

#class ImgSerializer():


class TerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terminal
        fields = ['id', 'map_id', 'user', 'name', 'coord_x', 'coord_y', 'info']