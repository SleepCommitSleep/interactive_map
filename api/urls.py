from django.urls import path
from .views import ImageView, RouteView


urlpatterns = [
    path('/image', ImageView.as_view()),
    path('/path', RouteView.as_view())
]
