from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """"""
    is_patient = models.BooleanField(default=False)
    is_therapist = models.BooleanField(default=False)


class Patient(models.Model):
    """"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    patient_name = models.TextField()
    patient_preference = models.TextField()
    age = models.IntegerField()


class Therapist(models.Model):
    """"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    therapist_name = models.TextField()
    patients = models.ManyToManyField(Patient)


class GlobalGoal(models.Model):
    """"""
    global_goal_id = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    content = models.TextField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)


class FitbitData(models.Model):
    """"""
    fitbit_data_id = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    goal_step = models.IntegerField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)


class FitbitGoal(models.Model):
    """"""
    fitbit_goal_id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    step = models.IntegerField()
    goal_step = models.IntegerField()


class AmountData(models.Model):
    """"""
    amount_data_id = models.AutoField(primary_key=True)
    exercise_title = models.TextField()
    date = models.DateField()
    completed = models.IntegerField()
    sets = models.IntegerField()
    sets_left = models.IntegerField()
    sets_right = models.IntegerField()
    repetitions = models.IntegerField()
    repetitions_left = models.IntegerField()
    repetitions_right = models.IntegerField()
    duration = models.DurationField()
    duration_left = models.DurationField()
    duration_right = models.DurationField()


class Feedback(models.Model):
    """"""
    amount_data_id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE)
    content = models.TextField()


class WalkforwordData(models.Model):
    """"""
    walkforward_data_id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    distance = models.FloatField()
    goal_distance = models.FloatField()


class WalkforwordGoal(models.Model):
    """"""
    walkforward_goal_id = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    goal_step = models.IntegerField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
