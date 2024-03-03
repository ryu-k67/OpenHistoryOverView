from rest_framework.serializers import ModelSerializer
from .models import Note,Graph,GraphImage
from accounts.serializers import UserSerializer

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class GraphSerializer(ModelSerializer):

    class Meta:
        model=Graph
        fields=['id',
                'user_id',
                # 'image',
                'graph_point_0',
                'graph_point_1',
                'graph_point_2',
                'graph_point_3',
                'graph_point_4',
                'graph_point_5',
                'graph_point_6',
                # 'graph_point_7',
                # 'graph_point_8',
                # 'graph_point_9',
                'graph_point_num','updated_at','created_at']

class GraphImageSerializer(ModelSerializer):

    class Meta:
        model=GraphImage
        fields=['id',
                'user_id',
                'image',
                'updated_at','created_at']
