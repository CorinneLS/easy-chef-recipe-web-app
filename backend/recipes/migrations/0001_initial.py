# Generated by Django 4.1.7 on 2023-03-27 20:51

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Direction',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('description', models.TextField()),
                ('file', models.FileField(blank=True, null=True, upload_to='recipe_pictures/')),
            ],
        ),
        migrations.CreateModel(
            name='RecipeIngredient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('quantity', models.FloatField(blank=True, default=0, null=True)),
                ('units', models.CharField(choices=[('NONE', 'None'), ('CUPS', 'cup(s)'), ('TSP', 'teaspoon(s)'), ('TBSP', 'tablespoon(s)'), ('POUND', 'pound(s)')], default='NONE', max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='ShoppingList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('list_ingredients', models.ManyToManyField(to='recipes.recipeingredient')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('cuisine', models.CharField(choices=[('NONE', 'None'), ('CN', 'Chinese'), ('CR', 'Creole'), ('FR', 'French'), ('GR', 'Indian'), ('IT', 'Italian'), ('JP', 'Japanese'), ('KO', 'Korean'), ('ME', 'Middle East'), ('WE', 'Western')], default='NONE', max_length=4)),
                ('diet', multiselectfield.db.fields.MultiSelectField(choices=[('NONE', 'None'), ('VEGAN', 'Vegan'), ('VEG', 'Vegeterian'), ('GLUTENF', 'Gluten free'), ('LCARB', 'Low carb'), ('KT', 'Keto'), ('LF', 'Low fat')], default='NONE', max_length=100)),
                ('cooking_time', models.PositiveIntegerField(default=0)),
                ('prep_time', models.PositiveIntegerField(default=0)),
                ('serving_size', models.PositiveIntegerField(default=1)),
                ('ingredients_list', models.TextField(default='')),
                ('num_fav', models.PositiveIntegerField(default=0)),
                ('num_likes', models.PositiveIntegerField(default=0)),
                ('ave_rating', models.PositiveIntegerField(default=0)),
                ('picture', models.ImageField(blank=True, null=True, upload_to='recipe_pictures/')),
                ('base_recipe', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='baseRecipe', to='recipes.recipe')),
                ('creator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('directions', models.ManyToManyField(to='recipes.direction')),
                ('ingredients', models.ManyToManyField(to='recipes.recipeingredient')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('heading', models.CharField(max_length=100)),
                ('content', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('recipe', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comments', to='recipes.recipe')),
            ],
        ),
    ]