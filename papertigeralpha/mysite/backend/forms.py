from django import forms 

class ProfileForm(forms.Form):
   # name = forms.CharField(max_length = 100)
   file = forms.FileField()
   