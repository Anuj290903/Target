# Generated by Django 4.2.4 on 2024-05-27 17:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0005_alter_upload_prob_set_alter_upload_vid_file'),
    ]

    operations = [
        migrations.RenameField(
            model_name='upload',
            old_name='prob_set',
            new_name='probSet',
        ),
        migrations.RenameField(
            model_name='upload',
            old_name='vid_file',
            new_name='vidFile',
        ),
    ]
