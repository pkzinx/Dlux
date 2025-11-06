from rest_framework import viewsets
from .models import Sale
from .serializers import SaleSerializer
from users.models import User


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all().order_by('-created_at')
    serializer_class = SaleSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if user.role == User.BARBER:
            qs = qs.filter(barber=user)
        return qs

# Create your views here.
