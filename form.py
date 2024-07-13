
from django import forms
from.models import *

class Employeeform(forms.ModelForm):
    class Meta:
        model = Employee
        fields='__all__'

        widgets={
            'first_name':forms.TextInput(attrs={'class':'form-control'}),
            'last_name':forms.TextInput(attrs={'class':'form-control'}),
            'salary':forms.NumberInput(attrs={'class':'form-control'}),
            'bonus':forms.NumberInput(attrs={'class':'form-control'}),
            'phone':forms.NumberInput(attrs={'class':'form-control'}),
            'hire_date':forms.DateInput(attrs={'class':'form-control'}),
            
        }