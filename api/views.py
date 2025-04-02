import os.path

from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.core.files.images import ImageFile
from django.conf import settings
from .pathfinder import open_mask, find_path, grid_width, grid_height
import os
# Create your views here.


class ImageView(generics.ListAPIView):
    def get(self, request):
        code = request.GET.get(self.lookup_url_kwarg)
        img = ImageFile(open(f"{settings.MEDIA_ROOT}/map.png", 'rb'))

        return HttpResponse(img, content_type="image/png")


class RouteView(generics.ListAPIView):
    def get(self, request):
        start_point = [int(request.GET.get("x1")), int(request.GET.get("y1"))]
        end_point = [int(request.GET.get("x2")), int(request.GET.get("y2"))]
        if (start_point[0] < 1 or start_point[0] > grid_width or end_point[0] > grid_width or end_point[0] < 1):
            return JsonResponse({"1": "error"})
        elif (start_point[1] < 1 or start_point[1] > grid_height or end_point[1] > grid_height or end_point[1] < 1):
            return JsonResponse({"1": "error"})
        print(os.path.dirname(os.path.realpath(__file__)))
        mask = open_mask(os.path.dirname(os.path.realpath(__file__)) + "\maskw.txt")
        path = find_path(start_point, end_point, mask)
        response = {}
        for point_number in range(path.__len__()):
            response[point_number] = path[point_number]
        return JsonResponse(response)
