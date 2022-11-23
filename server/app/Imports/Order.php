<?php

namespace App\Imports;

use App\Models\Employee;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class Order implements ToCollection
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $rows)
    {
        foreach($rows as $key => $value) {
            if ($key !== 0) {
                Employee::firstOrCreate([
                    'name' => $value[0],
                    'email' => $value[1],
                    'division' => $value[2],
                    'age' => $value[3],
                    'timezone' => $value[4],
                ],
                [
                    'name' => $value[0],
                    'email' => $value[1],
                    'division' => $value[2],
                    'age' => $value[3],
                    'timezone' => $value[4],
                ]);
            }
        }
    }
}
