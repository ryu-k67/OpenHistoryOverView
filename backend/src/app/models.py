from django.db import models

# Create your models here.
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from accounts.models import UserAccount

class Note(models.Model):
    user=models.ForeignKey(UserAccount,on_delete=models.CASCADE,null=True)
    body=models.TextField(null=True)