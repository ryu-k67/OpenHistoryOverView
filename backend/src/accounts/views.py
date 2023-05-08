from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer

import jwt
from django.conf import settings

User = get_user_model()

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
        
class UserView(APIView):
    def get_object(self, jwt):

        try:
            payload = jwt.decode(
                jwt=jwt, key=settings.SECRET_KEY, algorithms=["HS256"]
            )
	    # DBにアクセスせずuser_idだけの方がjwtの強みが生きるかも
	    # その場合 return payload["user_id"]
            return User.objects.get(id=payload["user_id"])

        except jwt.ExpiredSignatureError:
	    # access tokenの期限切れ
            return "Activations link expired"
        except jwt.exceptions.DecodeError:
            return "Invalid Token"
        except User.DoesNotExist:
            return "user does not exists"
        
    def get(self, request):
        try:
            # user=request.user
            # user=UserSerializer(user)

            # return Response(
            #     {'user':user.data},
            #     status=status.HTTP_200_OK
            # )
            jwt=request.data['token']
            if not jwt:
                return Response(
                    {"error": "No token"}, status=status.HTTP_400_BAD_REQUEST
                )
            user=self.get_object(jwt)
            # serializer=UserSerializer(user)
            return Response(
                {
                    'user':user#serializer
                },
                status=status.HTTP_200_OK
            )
        
        except:
            return Response(
                {
                    'error':'ユーザー取得に問題発生88'#request.user
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )