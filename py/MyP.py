import pandas as pd

# Leer el archivo Excel
df = pd.read_excel('py/Direcc.xlsx', sheet_name='Sheet1')

# Eliminar filas que contienen el promedio y la media
df = df[~df['Direcciones'].isin(['Promedio de Trabajos', 'Media de Trabajos'])]

# Excluir las filas correspondientes a "asuntos_religiosos" y "Asesores"
df = df[~df['Direcciones'].isin(['asuntos_religiosos', 'asesores','Defensoria_Municipal_de_los_Derechos_Humanos' ,'Gobierno_Digital_y_Electronico','Desarrollo_Social'])]

# Obtener las mejores y peores direcciones
mejores = df.sort_values(by=['Porcentaje', 'Resueltos'], ascending=[False, False]).head(3)
#peores = df.sort_values(by=['Porcentaje', 'Pendientes'], ascending=[True, False]).head(3)
peores = df[df['Resueltos'] != df['Tareas totales']].sort_values(by=['Porcentaje', 'Pendientes'], ascending=[True, False]).head(3)

# Imprimir las mejores y peores direcciones
print("Las 3 direcciones con mejor rendimiento son:")
print(mejores[['Direcciones', 'Resueltos', 'Pendientes', 'Porcentaje']])
print("\nLas 3 direcciones con peor rendimiento son:")
print(peores[['Direcciones', 'Resueltos', 'Pendientes', 'Porcentaje']])
