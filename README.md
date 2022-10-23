## MongoDB Atlas 마이그레이션 API 개발
- 로컬 MongoDB 데이터를 서버리스 API를 이용해 Batch 형태로 클라우드 Atlas로 마이그레이션하는 프로그램

<br />

## 사용법

1. 패키지 설치
```terminal
npm install
```

2. `atlasInfo.json` 파일 작성
- from: endpoint cluster and database to clone
- to: target cluster and database
  - `from.endpint` and `to.endpoint` may be identical


3. .env 파일 작성
```terminal
# API_KEY 활용

ATLAS_API_KEY_FROM=<API_KEY>
ATLAS_API_KEY_TO=<API_KEY>
```

4. 프로그램 실행
```terminal
npm run start
```
