import pandas as pd
# Diccionario de mapeo de nombres antiguos a nuevos
name_mapping = {
    'TESORERÍA': 'Tesoreria',
    'DIRECCIÓN DE ADMINISTRACIÓN': 'Administracion',
    'CONSEJERÍA JURÍDICO': 'Consejeria_Juridica',
    'DIRECCIÓN DE GOBERNACIÓN': 'Gobernacion',
    'DIRECCIÓN DE DESARROLLO ECONÓMICO, TURÍSTICO Y ARTESANAL': 'Desarrollo_Economico_Turistico_y_Artesanal',
    'DIRECCIÓN DE DESARROLLO SOCIAL Y ASUNTOS INDÍGENAS': 'Desarrollo_Social',
    'DIRECCIÓN DE SEGURIDAD PÚBLICA': 'Seguridad_Publica',
    'DIRECCIÓN DE DESARROLLO URBANO Y METROPOLITANO': 'Desarrollo_Urbano_y_Metropolitano',
    'DIRECCIÓN DE CULTURA': 'Cultura',
    'DIRECCIÓN DE SERVICIOS PÚBLICOS': 'Servicios_Publicos',
    'DIRECCIÓN DE MEDIO AMBIENTE': 'Medio_Ambiente',
    'DIRECCIÓN DE GOBIERNO POR RESULTADOS': 'Gobierno_por_Resultados',
    'DIRECCIÓN DE IGUALDAD DE GÉNERO': 'Igualdad_de_Genero',
    'DIRECCIÓN DE EDUCACIÓN': 'Educacion',
    'CONTRALORÍA MUNICIPAL': 'Contraloria_Municipal',
    'DIRECCIÓN DEL OPDAPAS': 'OPDAPAS',
    'DIRECCIÓN DEL IMCUFIDEM': 'IMCUFIDEM',
    'DIRECCIÓN DEL SMDIF': 'SMDIF',
    'COORDINACIÓN DE COMUNICACIÓN SOCIAL': 'Comunicacion_Social',
    'GERENCIA DE LA CIUDAD': 'Gerencia_de_la_Ciudad',
    'DIRECCIÓN DE TRANSPARENCIA Y GOBIERNO ABIERTO': 'Transparencia_y_Gobierno_Abierto',
    'COORDINACIÓN DE ASESORES': 'Asesores',
    'COORDINACIÓN DE PROTECCIÓN CIVIL Y BOMBEROS': 'Proteccion_Civil_y_Bomberos',
    'DIRECCIÓN DE GOBIERNO DIGITAL Y ELECTRÓNICO': 'Gobierno_Digital_y_Electronico',
    'COORDINACIÓN DE ASUNTOS RELIGIOSOS': 'Asuntos_Religosos',
    'DIRECCIÓN DE OBRAS PÚBLICAS': 'Obras_Publicas',
    'DEFENSORÍA MUNICIPAL DE LOS DERECHOS HUMANOS': 'Defensoria_Municipal_de_los_Derechos_Humanos'
}

# Función para dividir la cadena y convertir a números enteros
def split_and_convert(value):
    if isinstance(value, str):  # Verificar si el valor es una cadena
        # Dividir la cadena por comas, eliminar los espacios en blanco y convertir a entero
        return [int(x.strip()) for x in value.split(',') if x.strip()]
    else:
        return []

df = pd.read_excel('py\Junio.xlsx', header=3, engine='openpyxl')

df = df[['Dependencia', 'En Trámite', 'Concluido','FoliosT', 'FoliosC']]

# Remplazar los nombres en el DataFrame
df['Direcciones'] = df['Dependencia'].map(name_mapping)


df['FoliosT'] = df['FoliosT'].apply(split_and_convert)
df['FoliosC'] = df['FoliosC'].apply(split_and_convert)


df_grouped = df.groupby('Direcciones').agg({'En Trámite': 'sum', 'Concluido': 'sum', 'FoliosT': 'sum', 'FoliosC': 'sum'}).reset_index()


df_grouped['Pendientes'] = df_grouped['En Trámite']

df_grouped['Resueltos'] = df_grouped['Concluido']


df_grouped['Tareas totales'] = df_grouped['Resueltos'] + df_grouped['Pendientes']

df_grouped['Desempeño'] = ((df_grouped['Resueltos'] / (df_grouped['Pendientes'] + df_grouped['Resueltos'])) * 100).round().astype(int)

suma_total = df_grouped['Resueltos'].sum()
print("Suma Total de Tareas:", suma_total)

# Calcular el porcentaje de resueltos respecto a la suma total de tareas
df_grouped['Rendimiento'] = df_grouped['Concluido'] / suma_total
df_grouped['Porcentaje'] = df_grouped['Rendimiento'] * 100

porcentaje_total = df_grouped['Porcentaje'].sum()
print("Suma de Porcentajes:", porcentaje_total)

df_grouped = df_grouped[['Direcciones',  'Resueltos', 'Pendientes', 'Tareas totales', 'Desempeño', 'FoliosT', 'FoliosC', 'Porcentaje']]

# Guardar el resultado en un nuevo archivo Excel
df_grouped.to_excel('py/Direcc.xlsx', index=False)
