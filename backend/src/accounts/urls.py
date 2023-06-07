# from django.urls import path
# from .views import RegisterView, UserView, MemberViewSet

# urlpatterns = [
#     path('register/', RegisterView.as_view()),
#     path('user/', UserView.as_view()),
#     path('member/', MemberViewSet.as_view()),
# ]


from django.urls import path
from . import views

from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import(
    TokenRefreshView,
    TokenVerifyView,
)



urlpatterns=[
    path('',views.getRoutes),

    path('token/',MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('token/verify/',TokenVerifyView.as_view(),name='token_verify'),
]