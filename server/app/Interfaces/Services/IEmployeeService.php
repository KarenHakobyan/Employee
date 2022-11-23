<?php

namespace App\Interfaces\Services;

interface IEmployeeService
{
    /**
     * @param string $name
     * @param array $path
     *
     * @return void
     */
    public function createAttachment(string $name, array $path);

    /**
     * @return array
     */
    public function composeEmployees();
}
