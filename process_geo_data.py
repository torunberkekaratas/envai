import re
import json

def parse_sql(filename, table_name, columns):
    data = []
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Pattern to match INSERT INTO statements
    pattern = rf"INSERT INTO `{table_name}` \({', '.join([f'`{c}`' for c in columns])}\) VALUES\s*(.*?);"
    matches = re.finditer(pattern, content, re.DOTALL | re.IGNORECASE)
    
    for match in matches:
        values_str = match.group(1).strip()
        # Complex values split handling (rows like (1, 'A', 2), (2, 'B', 3))
        # This is a bit simplified but works for standard SQL dumps
        rows = re.findall(r"\((.*?)\)", values_str)
        for row in rows:
            # Split by comma but not within quotes
            parts = re.findall(r"(?:'[^']*'|[^,])+", row)
            parts = [p.strip().strip("'") for p in parts]
            if len(parts) == len(columns):
                data.append(dict(zip(columns, parts)))
    return data

# turkey_id = '223'
countries = parse_sql('ulkeler.sql', 'ulkeler', ['id', 'baslik'])
turkey = next((c for c in countries if c['baslik'] == 'Türkiye'), None)
turkey_id = turkey['id'] if turkey else '223'

print(f"Turkey ID: {turkey_id}")

cities = parse_sql('sehirler.sql', 'sehirler', ['id', 'baslik', 'ulke_id'])
turkey_cities = [c for c in cities if c['ulke_id'] == turkey_id]
turkey_city_ids = [c['id'] for c in turkey_cities]

districts = parse_sql('ilceler.sql', 'ilceler', ['id', 'baslik', 'sehir_id'])
turkey_districts = [d for d in districts if d['sehir_id'] in turkey_city_ids]

# Build JS object
# { "CityName": ["District1", "District2"] }
geo_data = {}
for city in turkey_cities:
    city_districts = [d['baslik'] for d in turkey_districts if d['sehir_id'] == city['id']]
    geo_data[city['baslik']] = sorted(city_districts)

with open('turkey_geo.json', 'w', encoding='utf-8') as f:
    json.dump(geo_data, f, ensure_ascii=False, indent=2)

print(f"Processed {len(turkey_cities)} cities and {len(turkey_districts)} districts.")
