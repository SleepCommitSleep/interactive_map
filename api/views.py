import os.path

from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.http import HttpResponse
from django.core.files.images import ImageFile
from django.conf import settings

# Create your views here.


class ImageView(generics.ListAPIView):
    def get(self, request):
        code = request.GET.get(self.lookup_url_kwarg)
        img = ImageFile(open(f"{settings.MEDIA_ROOT}/map.png", 'rb'))

        return HttpResponse(img, content_type="image/png")
