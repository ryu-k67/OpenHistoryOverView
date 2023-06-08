from django.shortcuts import render

# Create your views here.
from .serializers import NoteSerializer
from .models import Note

from rest_framework.response import Response
from rest_framework.decorators import api_view



@api_view(['GET'])
def getNotes(request):
    user=request.user
    notes=user.note_set.all()
    serializer=NoteSerializer(notes,many=True)
    return Response(serializer.data)