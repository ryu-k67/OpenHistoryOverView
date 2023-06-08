# from django.shortcuts import render

# # Create your views here.
# from django.contrib.auth import get_user_model
# from rest_framework import permissions, status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.viewsets import ModelViewSet
# from .serializers import UserSerializer

# User = get_user_model()

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
        
# class UserView(APIView):
#     def get(self, request):
#         try:
#             user=request.user
#             user=UserSerializer(user)

#             return Response(
#                 {'user':user.data},
#                 status=status.HTTP_200_OK
#             )
        
#         except:
#             return Response(
#                 {'error':'ユーザー取得に問題発生'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
        


# # from .serializers import MyTokenObtainPairSerializer #追加

# # #追加
# # class ObtainTokenPairWithColorView(TokenObtainPairView):
# #     serializer_class = MyTokenObtainPairSerializer

# # from rest_framework.permissions import IsAuthenticated

# # class MemberViewSet(APIView):
# #     queryset = User.objects.all()
# #     serializer_class = UserSerializer
# #     # 今回の追加部分
# #     permission_classes = (IsAuthenticated,)

from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.views import APIView

User=get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token=super().get_token(user)
        token['email']=user.email
        token['name']=user.name
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            data = request.data
            name = data['name']
            email = data['email'].lower()
            password = data['password']

            if not User.objects.filter(email=email).exists():
                User.objects.create_user(name=name, email=email, password=password)

                return Response(
                    {'success': 'ユーザー登録成功'},
                    status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    {'error': '既に登録されているメールアドレス'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
        except:
            return Response(
                {'error': 'ユーザー登録時に問題発生'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )