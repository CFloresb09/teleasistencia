# Generated by Django 3.2.3 on 2021-06-09 11:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teleasistenciaApp', '0006_rename_historico_terminal_tipo_alarma_dispositivos_auxiliares_en_terminal'),
    ]

    operations = [
        migrations.RenameField(
            model_name='persona',
            old_name='importancia',
            new_name='sexo',
        ),
    ]