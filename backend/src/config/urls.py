"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path, include
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

# urlpatterns = [
#     path('api/login/', TokenObtainPairView.as_view()),
#     path('api/refresh/', TokenRefreshView.as_view()),
#     path('api/verify/', TokenVerifyView.as_view()),
#     path('api/auth/', include('accounts.urls')),
#     path('admin/', admin.site.urls),
# ]


# from django.contrib import admin
# # from django.db import router
# from django.urls import path, include
# from rest_framework_simplejwt import views

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/v1/', include('accounts.urls')),
#     # jwt-tokenを取得
#     path('api-auth/jwt/', views.TokenObtainPairView.as_view()),
#     # jwt-tokenを再取得
#     path('api-auth/jwt/refresh', views.TokenRefreshView.as_view()),
# ]

from django.contrib import admin
from django.urls import path,include

urlpatterns=[
    path('admin/',admin.site.urls),
    path('api/',include('accounts.urls'))
]