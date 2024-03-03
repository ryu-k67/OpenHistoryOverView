import json
from django.shortcuts import render

# Create your views here.
from .serializers import NoteSerializer
from .models import Note

from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from rest_framework import viewsets
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Graph, GraphImage
from accounts.models import UserAccount
from accounts.serializers import UserSerializer
from .serializers import GraphSerializer, GraphImageSerializer
from rest_framework.generics import ListAPIView
from rest_framework import status

@api_view(['GET'])
def getNotes(request):
    user=request.user
    notes=user.note_set.all()
    serializer=NoteSerializer(notes,many=True)
    return Response(serializer.data)


# class GraphViewSet(viewsets.ModelViewSet):
#     queryset = Graph.objects.all()
#     serializer_class = GraphSerializer

@csrf_exempt 
def createGraph(request):
    print(request)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # user_serializer = UserSerializer(data=data['user_id'])

        # if user_serializer.is_valid():
        #     user_instance = user_serializer.save()
        #     data['user_id'] = user_instance.id
        graph_serializer = GraphSerializer(data=data)

        if graph_serializer.is_valid():
            graph_serializer.save()
            return JsonResponse(graph_serializer.data, status=200)

        return JsonResponse(graph_serializer.errors, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
    
def getGraph(request, user_id):
    try:
        # user = UserAccount.objects.get(id=user_id)
        graph_points = Graph.objects.filter(user_id=user_id)
        serializer = GraphSerializer(graph_points, many=True)
        return JsonResponse(serializer.data, safe=False)
        # return JsonResponse(3, safe=False)

    except UserAccount.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    
@csrf_exempt
def updateGraph(request):
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        graph = Graph.objects.get(user_id=data['user_id'])
        graph_serializer = GraphSerializer(graph, data=data)

        if graph_serializer.is_valid():
            graph_serializer.save()
            return JsonResponse(graph_serializer.data, status=200)

        return JsonResponse(graph_serializer.errors, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


from django.views.decorators.csrf import get_token

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf_token': csrf_token})


@csrf_exempt 
# @api_view(['POST'])
# @authentication_classes([])  # 認証を無効にする
# @permission_classes([])      # パーミッションを無効にする
def createGraphImage(request):
    print(request)
    if request.method == 'POST':
        # data = JSONParser().parse(request)
        user_id = request.POST.get('user_id')
        image_file = request.FILES.get('image')
        # graph_image = GraphImage.objects.get(user_id=user_id)
        GraphImage.objects.filter(user_id=user_id).delete()
        data = {'user_id': user_id,
                'image': image_file,
                }
        print('user_id:'+str(user_id))
        print('image:'+str(image_file))
        graph_image_serializer = GraphImageSerializer(data=data)

        if graph_image_serializer.is_valid():
            graph_image_serializer.save()
            return JsonResponse(graph_image_serializer.data, status=200)

        return JsonResponse(graph_image_serializer.errors, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def updateGraphImage(request):
    if request.method == 'PUT':
    # if request.method == 'POST':
        # data = JSONParser().parse(request)
        # user_id = request.POST.get('user_id')
        # image_file = request.FILES.get('image')
        data = json.loads(request.body)
        user_id = data['user_id']
        image_file = request.FILES['image']
        data = {'user_id': user_id,
                'image': image_file,
                }
        
        try:
            graph_image = GraphImage.objects.get(user_id=user_id)
        except GraphImage.DoesNotExist:
            return JsonResponse(data, status=404)
        
        graph_image_serializer = GraphImageSerializer(graph_image, data=data)

        if graph_image_serializer.is_valid():
            graph_image_serializer.save()
            return JsonResponse(graph_image_serializer.data, status=200)

        return JsonResponse(graph_image_serializer.errors, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=404)

# @csrf_exempt
class GraphImageListView(ListAPIView):
    # queryset = GraphImage.objects.all()
    # serializer_class = GraphImageSerializer

    def get(self,request):
        queryset = GraphImage.objects.all()
        print(queryset)
        serializer_class = GraphImageSerializer(queryset, many=True)
        print(serializer_class.data)
        return Response(serializer_class.data, status=status.HTTP_200_OK)
    

# class RegisterView(APIView):
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request):
#         try:
#             data = request.data
#             name = data['name']
#             email = data['email'].lower()
#             password = data['password']

#             if not User.objects.filter(email=email).exists():
#                 User.objects.create_user(name=name, email=email, password=password)

#                 return Response(
#                     {'success': 'ユーザー登録成功'},
#                     status=status.HTTP_201_CREATED
#                 )
#             else:
#                 return Response(
#                     {'error': '既に登録されているメールアドレス'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
            
#         except:
#             return Response(
#                 {'error': 'ユーザー登録時に問題発生'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

# class Image_DL():
#     def save_and_rename(self, url, name=None):
#         res = requests.get(url)
#         if res.status_code != 200:
#             return "No Image"
#         path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+"/media/image/"
#         if name==None:
#             path += url.split("/")[-1]
#         else:
#             path += name
#         with open(path, 'wb') as file:
#             file.write(res.content)
#         return path