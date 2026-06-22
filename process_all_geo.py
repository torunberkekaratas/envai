import re
import json
import os

def parse_sql(filename, table_name, columns):
    data = []
    if not os.path.exists(filename):
        print(f"File {filename} not found.")
        return data
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Match the start of the VALUES section
    pattern = rf"INSERT INTO `{table_name}` \s*\((.*?)\)\s*VALUES\s*(.*?);"
    # Some SQL files might have column names in different order or missing
    # For these files, we'll assume the order provided in the columns list if `(columns)` is present
    
    matches = re.finditer(r"INSERT INTO `{}` .*? VALUES\s*(.*?);".format(table_name), content, re.DOTALL | re.IGNORECASE)
    
    for match in matches:
        values_str = match.group(1).strip()
        # Find all (val1, val2, ...) patterns
        # Using a regex that handles escaped quotes
        rows = re.findall(r"\((.*?)\)(?:,|$)", values_str, re.DOTALL)
        for row in rows:
            # Tokenize CSV row properly handling strings with commas
            parts = []
            buffer = ""
            in_string = False
            for char in row:
                if char == "'" and (not buffer or buffer[-1] != "\\"):
                    in_string = not in_string
                    buffer += char
                elif char == "," and not in_string:
                    parts.append(buffer.strip())
                    buffer = ""
                else:
                    buffer += char
            parts.append(buffer.strip())
            
            # Clean and map parts
            clean_parts = []
            for p in parts:
                p = p.strip()
                if p.startswith("'") and p.endswith("'"):
                    p = p[1:-1]
                p = p.replace("\\'", "'")
                clean_parts.append(p)
            
            if len(clean_parts) >= len(columns):
                data.append(dict(zip(columns, clean_parts[:len(columns)])))
                
    return data

print("Parsing countries...")
countries_raw = parse_sql('ulkeler.sql', 'ulkeler', ['id', 'rewrite', 'baslik', 'alankodu'])
print(f"Found {len(countries_raw)} countries.")

print("Parsing cities...")
cities_raw = parse_sql('sehirler.sql', 'sehirler', ['id', 'baslik', 'ulke_id'])
print(f"Found {len(cities_raw)} cities.")

print("Parsing districts...")
districts_raw = parse_sql('ilceler.sql', 'ilceler', ['id', 'baslik', 'sehir_id'])
print(f"Found {len(districts_raw)} districts.")

# Hierarchical structure
# countries -> { id: { name, cities: { id: { name, districts: [] } } } }
geo_data = {}

for country in countries_raw:
    geo_data[country['id']] = {
        'name': country['baslik'],
        'cities': {}
    }

for city in cities_raw:
    c_id = city['ulke_id']
    if c_id in geo_data:
        geo_data[c_id]['cities'][city['id']] = {
            'name': city['baslik'],
            'districts': []
        }

for district in districts_raw:
    s_id = district['sehir_id']
    # We need to find which country this city belongs to.
    # To speed up, let's create a map city_id -> country_id
    pass

# Optimization: Create map from city_id to country_id
city_to_country = {city['id']: city['ulke_id'] for city in cities_raw}

for district in districts_raw:
    s_id = district['sehir_id']
    if s_id in city_to_country:
        c_id = city_to_country[s_id]
        if c_id in geo_data and s_id in geo_data[c_id]['cities']:
            geo_data[c_id]['cities'][s_id]['districts'].append(district['baslik'])

# Convert to a list-based structure for easier JS iteration and smaller size
final_data = []
for c_id, c_info in geo_data.items():
    country_obj = {
        'n': c_info['name'],
        'c': []
    }
    for s_id, s_info in c_info['cities'].items():
        city_obj = {
            'n': s_info['name'],
            'd': sorted(s_info['districts'])
        }
        country_obj['c'].append(city_obj)
    
    # Sort cities by name
    country_obj['c'].sort(key=lambda x: x['n'])
    final_data.append(country_obj)

# Sort countries by name
final_data.sort(key=lambda x: x['n'])

with open('all_geo.json', 'w', encoding='utf-8') as f:
    json.dump(final_data, f, ensure_ascii=False)

print(f"Processed everything into all_geo.json. File size: {os.path.getsize('all_geo.json') / 1024 / 1024:.2f} MB")
