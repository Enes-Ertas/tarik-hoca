import csv

INPUT_CSV = "Questions_with_filled_difficulty.csv"
OUTPUT_SQL = "update_difficulty.sql"

sql_lines = []

with open(INPUT_CSV, "r", encoding="ISO-8859-9") as f:
    reader = csv.DictReader(f, delimiter=";")
    for row in reader:
        try:
            uuid = row["id"].strip()
            difficulty = int(row["difficulty"])
            sql = f"UPDATE questions SET difficulty = {difficulty} WHERE id = '{uuid}';"
            sql_lines.append(sql)
        except Exception as e:
            print(f"HATA: {e} – satır atlandı: {row}")

with open(OUTPUT_SQL, "w") as f:
    f.write("\n".join(sql_lines))

print(f"✅ SQL dosyası oluşturuldu: {OUTPUT_SQL} ({len(sql_lines)} satır)")
