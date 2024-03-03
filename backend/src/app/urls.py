from django.urls import path
from . import views

from .views import NoteSerializer

from rest_framework import routers
from django.conf.urls import include

router=routers.DefaultRouter()
# router.register('graphs',views.GraphViewSet)
# router.register(r'graph-points', views.GraphViewSet, basename='graph-point')

urlpatterns=[
    # path('',views.getRoutes),
    path('notes/',views.getNotes),
    # path('graph_list/',views.GraphListView.as_view()),
    # path('graph_list/<str:pk>',views.GraphDetailView.as_view()),
    # path('graph-points/',views.GraphListView.as_view()),
    path('graph/get/<int:user_id>',views.getGraph),
    path('graph/update/',views.updateGraph),
    path('graph/create/',views.createGraph),
    path('graph/image/update/',views.updateGraphImage),
    path('graph/image/create/',views.createGraphImage),
    path('getAllUserGraph/',views.getAllUserGraph),
    path('getToken/',views.get_csrf_token),
    path('',include(router.urls))
]