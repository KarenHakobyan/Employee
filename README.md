### Running the server

```
1. cd docker
2. cp env-example .env
4. docker-compose up -d nginx postgres workspace
5. docker-compose exec --user=laradock workspace bash
6. cp .env.example .env
7. composer install
8. php artisan key:generate
9. php artisan jwt:secret -f
10. php artisan migrate:fresh --seed
11. php artisan cache:forget spatie.permission.cache

Open http://localhost
```
### Running the web

```
1. cd web
2. cp .env.dev .env
3. yarn install
5. yarn start

Open http://localhost:4000
```