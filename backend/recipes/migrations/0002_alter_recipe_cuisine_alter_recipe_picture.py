# Generated by Django 4.1.7 on 2023-04-03 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='cuisine',
            field=models.CharField(choices=[('NONE', 'None'), ('CN', 'Chinese'), ('CR', 'Creole'), ('FR', 'French'), ('IN', 'Indian'), ('IT', 'Italian'), ('JP', 'Japanese'), ('KO', 'Korean'), ('ME', 'Middle East'), ('WE', 'Western')], default='NONE', max_length=4),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='picture',
            field=models.FileField(blank=True, null=True, upload_to='recipe_pictures/'),
        ),
    ]
