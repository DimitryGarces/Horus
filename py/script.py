import pandas as pd
import json

# Leer el archivo Excel
df = pd.read_excel('py\Direcc.xlsx', sheet_name='Sheet1')

# Definir los conjuntos y las direcciones correspondientes
conjuntos = {
    'Ciudad': ['Obras_Publicas', 'Servicios_Publicos', 'OPDAPAS', 'Gerencia_de_la_Ciudad', 'Medio_Ambiente', 'Desarrollo_Urbano_y_Metropolitano'],
    'Social_y_de_Resultados': ['Desarrollo_Social', 'Seguridad_Publica', 'Proteccion_Civil_y_Bomberos', 'Cultura', 'Desarrollo_Economico_Turistico_y_Artesanal', 'IMCUFIDEM', 'Comunicacion_Social','Secretaria_Tecnica'],
    'Legal_y_Planeacion': ['Consejeria_Juridica', 'Contraloria_Municipal', 'Gobernacion', 'Gobierno_por_Resultados', 'Transparencia','Defensoria_Municipal_de_los_Derechos_Humanos'],
    'Administrativo_Financiero': ['Administracion', 'Tesoreria'],
    'Atencion_a_grupos_especiales': ['Educacion', 'Igualdad_de_Genero', 'SMDIF'],
    'Atencion_Ciudadana':['Atencion_Ciudadana']
}

# Inicializar diccionario para almacenar los datos
datos_json = {}

# Agregar todas las direcciones a los conjuntos con valores iniciales de 0 si no existen en el archivo Excel
for conjunto, direcciones in conjuntos.items():
    datos_json[conjunto] = {'Direcciones': []}
    for direccion in direcciones:
        datos_json[conjunto]['Direcciones'].append({
            'Direccion': direccion,
            'Resueltos': 0,
            'Pendientes': 0,
            'Rendimiento': 0
        })

# Iterar sobre las filas del DataFrame y actualizar los datos de rendimiento por categoría y dirección
for index, row in df.iterrows():
    direccion = row['Direcciones']
    resueltos = row['Resueltos']
    pendientes = row['Pendientes']
    for conjunto, data in datos_json.items():
        for d in data['Direcciones']:
            if d['Direccion'] == direccion:
                total = resueltos + pendientes
                rendimiento = (resueltos / total) * 100 if total != 0 else 0
                d['Resueltos'] = resueltos
                d['Pendientes'] = pendientes
                d['Rendimiento'] = round(rendimiento, 0)  # Truncar a dos decimales
                break

# Calcular el rendimiento general para cada categoría
for conjunto, data in datos_json.items():
    resueltos_totales = sum(d['Resueltos'] for d in data['Direcciones'])
    pendientes_totales = sum(d['Pendientes'] for d in data['Direcciones'])
    total = resueltos_totales + pendientes_totales
    rendimiento_general = (resueltos_totales / total) * 100 if total != 0 else 0
    datos_json[conjunto]['Resumen'] = {
        'Resueltos_totales': resueltos_totales,
        'Pendientes_totales': pendientes_totales,
        'Rendimiento_general': round(rendimiento_general, 0)  # Truncar a dos decimales
    }

# Escribir el JSON en un archivo
with open('president/datos.json', 'w') as file:
    json.dump(datos_json, file, indent=4)

print("Archivo 'datos.json' generado correctamente.")
