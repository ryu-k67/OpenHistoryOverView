# HistoryOverview
ユーザーの歴史をまとめるWebアプリケーション

## 使用予定技術
- フロントエンド：Next.js
- バックエンド&emsp;：Django
- データベース&emsp;：MySQL
- インフラ&emsp;&emsp;&emsp;：Docker

### 概要
- 自分年表
- 自己PR
- 取り組んだこと  
・  
・  
・  
などの機能を含む自己分析ツールを目指す


### コマンド
- (Dockerfileファイル更新の反映に必要)  
docker-compose build  
- コンテナ作成・起動 (docker-compose.ymlファイル更新の反映に必要)  
docker-compose up -d  
- コンテナ停止・削除  
docker-compose down  
- コンテナ起動のみ  
docker-compose start  
- コンテナ停止のみ  
docker-compose stop  
- コンテナの状態確認  
docker-compose ps  
<br>

- backend(Django)環境のコンテナへ入る  
docker-compose exec django /bin/bash  
- backend(Django)立ち上げ  
python manage.py runserver 0.0.0.0:8000  
<br>

- frontend(Next.js)環境のコンテナへ入る  
docker-compose exec next /bin/bash  
- frontend(Next.js)立ち上げ  
npm run dev
<br>

- database(MySQL)環境のコンテナへ入る  
docker exec -it mysql bash  
- MySQLへの接続  
mysql  
- データベースの確認  
show databases;  
- backend(Django)の中身確認  
use django;  
- MySQLとの接続を終了する  
quit
<br>

- コンテナから抜ける  
exit  
<br>  

- コンテナIDを調べる  
docker ps  
- コンテナに割り当てられたIPアドレスを確認する(Windows)  
docker inspect コンテナID | findstr  IPAddress  