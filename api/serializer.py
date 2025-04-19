from rest_framework import serializers
from .models import Terminal

#class ImgSerializer():


"""class TerminalSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    map_id = serializers.IntegerField()
    user = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    coord_x = serializers.IntegerField()
    coord_y = serializers.IntegerField()
    info = serializers.CharField(max_length=300)

    def create(self, validated_data):
        return Terminal.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.map_id = validated_data.get('map_id', instance.map_id)
        instance.user = validated_data.get('user', instance.user)
        instance.name = validated_data.get('name', instance.name)
        instance.coord_x = validated_data.get('coord_x', instance.coord_x)
        instance.coord_y = validated_data.get('coord_y', instance.coord_y)
        instance.info = validated_data.get('info', instance.info)
        return instance
"""


class TerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terminal
        fields = ['id', 'map_id', 'user', 'name', 'coord_x', 'coord_y', 'info']