from django.urls import path
from .views import ImageView, RouteView, TerminalListView


urlpatterns = [
    path('/image', ImageView.as_view()),
    path('/path', RouteView.as_view()),
    path('/terminals', TerminalListView().as_view())
]
