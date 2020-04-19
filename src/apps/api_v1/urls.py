from django.conf.urls import url, include
from rest_framework import routers

from apps.data.rest_views import ResponseVacancyVS, FeedbackVS

router = routers.DefaultRouter()

router.register(r'vacancy', ResponseVacancyVS, 'vacancy')
router.register(r'feedback', FeedbackVS, 'feedback')

urlpatterns = [
    url(r'^', include(router.urls)),
]
