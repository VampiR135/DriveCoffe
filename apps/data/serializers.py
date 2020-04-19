from rest_framework import serializers

from apps.data.models import FeedbackModel, ResponseVacancyModel


class FeedbackMS(serializers.ModelSerializer):

    class Meta:
        model = FeedbackModel
        fields = ('id', 'name', 'email', 'text')


class ResponseVacancyMS(serializers.ModelSerializer):

    class Meta:
        model = ResponseVacancyModel
        fields = ('id', 'name', 'email', 'text', 'phone_number', 'age', 'education', 'salary', 'experience', 'found_out')


