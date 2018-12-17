from django import forms 

def upload_function(instance, filename):
	return os.path.join(str(settings.BASE_DIR), "media", "file_upload")

class ProfileForm(forms.Form):
# name = forms.CharField(max_length = 100)
	file = forms.FileField()
