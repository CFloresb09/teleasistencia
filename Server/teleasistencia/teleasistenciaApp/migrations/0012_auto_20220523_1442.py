# Generated by Django 3.2.3 on 2022-05-23 12:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('teleasistenciaApp', '0011_convocatoria_proyecto_desarrollador_desarrollador_tecnologia_tecnologia'),
    ]

    operations = [
        migrations.AlterField(
            model_name='desarrollador',
            name='id_convocatoria_proyecto',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='desarrolladores', to='teleasistenciaApp.convocatoria_proyecto'),
        ),
        migrations.AlterField(
            model_name='desarrollador_tecnologia',
            name='id_desarrollador',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='desarrollador_tecnologias', to='teleasistenciaApp.desarrollador'),
        ),
        migrations.AlterField(
            model_name='desarrollador_tecnologia',
            name='id_tecnologia',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tecnologias', to='teleasistenciaApp.tecnologia'),
        ),
    ]