# Generated by Django 4.1.7 on 2023-04-09 13:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_alter_recipe_cuisine_alter_recipe_picture'),
        ('accounts', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interactedwith',
            name='recipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='recipes.recipe'),
        ),
    ]