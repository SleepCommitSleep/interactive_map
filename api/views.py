import os.path

from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse, Http404
from django.core.files.images import ImageFile
from django.conf import settings
from .pathfinder import open_mask, find_path, grid_width, grid_height, grid_size
from .models import Map, Terminal
from django.shortcuts import get_object_or_404
from .serializer import TerminalSerializer
import os
# Create your views here.


class ImageView(generics.ListAPIView):
    def get(self, request):
        code = request.GET.get(self.lookup_url_kwarg)
        map_id = request.GET.get("map_id")
        map_img = get_object_or_404(Map, id=int(map_id)).map_img
        return HttpResponse(map_img, content_type="image/png")


class RouteView(generics.ListAPIView):
    def get(self, request):
        start_point = [int(request.GET.get("x1")), int(request.GET.get("y1"))]
        end_point = [int(request.GET.get("x2")), int(request.GET.get("y2"))]
        map_id = request.GET.get("map_id")
        print(grid_height, grid_width)
        if (start_point[0] < 1 or start_point[0] > grid_width or end_point[0] > grid_width or end_point[0] < 1):
            return JsonResponse({"1": "error"})
        elif (start_point[1] < 1 or start_point[1] > grid_height or end_point[1] > grid_height or end_point[1] < 1):
            return JsonResponse({"1": "error"})
        print(os.path.dirname(os.path.realpath(__file__)))
        map_mask = get_object_or_404(Map, id=int(map_id)).map_mask
        with map_mask.open('r') as f:
            path = find_path(start_point, end_point, open_mask(f))
        response = {}
        for point_number in range(path.__len__()):
            response[point_number] = path[point_number]
        return JsonResponse(response)


class TerminalListView(generics.ListAPIView):
    def get(self, request):
        map_id = request.GET.get("map_id")
        if map_id == None:
            return Http404
        terminal_list = Terminal.objects.filter(map_id=int(map_id))
        return JsonResponse(TerminalSerializer(terminal_list, many=True).data, safe=False)


class AddTerminalView(generics.ListAPIView):
    def post(self, request):
        point_x = request.GET.get("x")
        point_y = request.GET.get("y")
        return JsonResponse({"status": "error"})
