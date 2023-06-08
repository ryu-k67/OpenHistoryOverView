from django.urls import path
from . import views

from .views import NoteSerializer


urlpatterns=[
    # path('',views.getRoutes),
    path('notes/',views.getNotes),
]