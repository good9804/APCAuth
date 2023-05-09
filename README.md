#시작

Kanban 주소 : https://trello.com/b/XkgyfCf6/apc-kanban

---

## mongodb 다운로드(윈도우 기준)

1. https://www.mongodb.com/try/download/community-kubernetes-operator에서 다운로드
2. https://www.mongodb.com/try/download/compass 다운로드(mongodb GUI 툴)
3. MongoDB의 bin폴더 경로 환경설정 등록

4. 이름이 apc 데이터베이스 생성
5. 왼쪽 하단 \_MONGOSH을 통해 명령어 입력

---

use apc
db.createCollection("users")
db.users.insert({"userid":"1","password":"$2b$10$OQlrdbdEeQHdIL0iQXNmqe6BfWBdbnYBmWRc/Vpy4iGbVTGQYtAa2","submitrole":"0","role":"0"})

---

nginx 설정

---

APCYaml 저장소에 있는 nginx.conf를 적용하여 nginx 실행

---

---

windows : start_prod.bat 실행
Linux(Ubuntu 22.04 LTS) : start.sh 실행

---

---

localhost 접속

---
---

초기 관리자 아아디 : 1
초기 관리자 비밀번호 : 1

---
