<?php

namespace App\Http\Middleware;

use Closure;

class ResponseFormatter
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $json = json_decode($response->getContent(), true);
        $statusCode = $response->getStatusCode();
        $headers = $response->headers->all();

        $result = [
            'data' => $json,
            'error' => null
        ];

        if ($statusCode >= 400 && $statusCode <= 599) {
            $result = array_merge($result, [
                'data' => null,
                'error' => $json,
            ]);
        }

        return response()->json($result, $statusCode, $headers);
    }
}
