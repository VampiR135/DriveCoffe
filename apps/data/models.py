# -*- coding:utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _


class FeedbackModel(models.Model):
    name = models.TextField(verbose_name=_(u'Имя'), max_length=1024)
    email = models.EmailField(verbose_name=_(u'Почта'))
    text = models.TextField(verbose_name=_(u'Отзыв'), max_length=1024)

    def __str__(self):
        return u'{name}'.format(name=self.text)

    def __unicode__(self):
        return u'{name}'.format(name=self.text)

    class Meta:
        verbose_name = _(u'Форма')
        verbose_name_plural = _(u'Формы')


class ResponseVacancyModel(models.Model):
    name = models.TextField(verbose_name=_(u'Имя'), max_length=1024)
    email = models.EmailField(verbose_name=_(u'Почта'))
    phone_number = models.TextField(verbose_name=_(u'Ваш телефон'), max_length=1024)
    age = models.TextField(verbose_name=_(u'Возраст'), max_length=1024)
    education = models.TextField(verbose_name=_(u'Образование'), max_length=1024)
    salary = models.TextField(verbose_name=_(u'ЗП'), max_length=1024)
    experience = models.TextField(verbose_name=_(u'Опыт'), max_length=1024)
    found_out = models.TextField(verbose_name=_(u'Как нашел'), max_length=1024)

    def __str__(self):
        return u'{name}'.format(name=self.name)

    def __unicode__(self):
        return u'{name}'.format(name=self.name)

    class Meta:
        verbose_name = _(u'Вакансия')
        verbose_name_plural = _(u'Вакансии')

