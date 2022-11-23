<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use File;

class ApiServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $items = [
        ];

        foreach($items as $item) {
            $this->app->bind($item['interface'], $item['service']);
        }
    }
}
