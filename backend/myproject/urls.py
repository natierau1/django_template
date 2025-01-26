from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse


def home_view(request):
    return HttpResponse("Hello from Django!")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view),
    # Authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/info/', user_info, name='user_info'),
] 