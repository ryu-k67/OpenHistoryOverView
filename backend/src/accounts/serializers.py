from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fileds = ('id', 'name', 'email')


# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# #トークンを発行するためのクラス
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

#     @classmethod
#     def get_token(cls, user):
#         token = super(MyTokenObtainPairSerializer, cls).get_token(user)

#         # Add custom claims
#         return token