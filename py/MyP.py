import pandas as pd

# Leer el archivo Excel
df = pd.read_excel('py/Direcc.xlsx', sheet_name='tareas')

# Eliminar filas que contienen el promedio y la media
df = df[~df['Direcciones'].isin(['Promedio de Trabajos', 'Media de Trabajos'])]

# Obtener las mejores y peores direcciones
mejores = df.sort_values(by=['Porcentaje', 'Resueltos'], ascending=[False, False]).head(3)
peores = df.sort_values(by=['Porcentaje', 'Pendientes'], ascending=[True, False]).head(3)

# Imprimir las mejores y peores direcciones
print("Las 3 direcciones con mejor rendimiento son:")
print(mejores[['Direcciones', 'Resueltos', 'Pendientes', 'Porcentaje']])
print("\nLas 3 direcciones con peor rendimiento son:")
print(peores[['Direcciones', 'Resueltos', 'Pendientes', 'Porcentaje']])
