## Shoppsy (Ivana Ivanovic 49/18)

1. [T1] cd Frontend 
   2. npm install npm install --legacy-peer-deps
   3. ng serve
   
2. [T2] cd Backend
   3. cp .env.example .env
   4. Using docker: 
      5. ./vendor/bin/sail up
      6. ./vendor/bin/sail artisan migrate && ./vendor/bin/sail artisan db:seed
      7. ./vendor/bin/sail artisan storage:link
   5. Withoud docker: 
      6. composer install
      7. php artisan migrate && php artisan db:seed
      8. php artisan serve 

###   Admin credencials: ivana@gmail.com / ivana123