# -*- coding:utf-8 -*-
import logging

from threading import Thread
from rest_framework import status, mixins
from rest_framework.permissions import AllowAny

from rest_framework.viewsets import GenericViewSet

from apps.data.models import FeedbackModel, ResponseVacancyModel
from apps.data.serializers import FeedbackMS, ResponseVacancyMS
from apps.data.utils import send_email_feedback, send_email_response

logger = logging.getLogger(__name__)


class FeedbackVS(mixins.CreateModelMixin, GenericViewSet):
    queryset = FeedbackModel.objects.all()
    serializer_class = FeedbackMS
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        obj = serializer.save()
        email = Thread(target=send_email_feedback, args=(obj.name, obj.text, obj.email))
        email.start()


class ResponseVacancyVS(mixins.CreateModelMixin, GenericViewSet):
    queryset = ResponseVacancyModel.objects.all()
    serializer_class = ResponseVacancyMS
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        obj = serializer.save()
        email = Thread(target=send_email_feedback, args=(obj.name, obj.text, obj.email, obj.phone_number,
                                                         obj.age, obj.education, obj.salary, obj.experience,
                                                         obj.found_out))
        email.start()
