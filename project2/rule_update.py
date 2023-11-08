import mysql.connector
import os

# 데이터베이스 연결 설정
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "1234pkj",
    "database": "project"
}

# 데이터를 추출할 쿼리
select_query = "SELECT * FROM rule"

# 데이터베이스 연결
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor(dictionary=True)

# 쿼리 실행 및 결과 가져오기
cursor.execute(select_query)
data = cursor.fetchall()

# 파일 경로 설정
output_file_path = os.path.join("project", "rule", "local.rules")

# 텍스트 파일로 데이터 저장
with open(output_file_path, 'w') as file:
    for row in data:
        file.write(f"{row['action']} {row['protocol']} {row['src_ip']} {row['src_port']} {row['d']} {row['dst_ip']} {row['dst_port']} {row['option']}\n")

# 연결 종료
cursor.close()
conn.close()

print("데이터가 텍스트 파일로 저장되었습니다.")

