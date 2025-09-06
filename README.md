## Shoppsy (Ivana Ivanovic 49/18)

1. (terminal 1) `cd Frontend `
   - `npm install npm install --legacy-peer-deps`
   - `ng serve`
   
2. (terminal 2) `cd Backend`
   -` cp .env.example .env`
   - Using docker: 
     - `./vendor/bin/sail up`
     - `./vendor/bin/sail artisan migrate` && `./vendor/bin/sail artisan db:seed`
     - `./vendor/bin/sail artisan storage:link`
   - Withoud docker: 
     - `composer install`
     - `php artisan migrate && php artisan db:seed`
     - `php artisan serve `

###   Admin credencials: ivana@gmail.com / ivana123