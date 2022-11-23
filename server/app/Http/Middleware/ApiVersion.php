<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiVersion
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param string $guard
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $guard): JsonResponse
    {
        config(['app.api.version' => $guard]);
        return $next($request);
    }
}
