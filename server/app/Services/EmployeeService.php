<?php

namespace App\Services;

use App\Combinations\Combinations;
use App\Imports\Order;
use App\Interfaces\Services\IEmployeeService;
use App\Models\Attachment;
use App\Models\Employee;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeService implements IEmployeeService
{
    public function createAttachment(string $name, array $path)
    {
        $address = Storage::disk('local')->put('excel', $path['file']);

        $this->deleteAllEmployees();

        Attachment::create([
            'name' => $name,
            'path' =>  $address
        ]);

        $this->createEmpoyees($address);
    }

    /**
     * @param string $address
     * @return void
     */
    private function createEmpoyees(string $address)
    {
        Excel::import(new Order(),  $address);
    }

    /**
     * @return array|null
     */
    public function composeEmployees()
    {
        $ids = [];

        Employee::get()->each(function($employee) use (&$ids) {
            array_push($ids, $employee->id);
        });

        $combinations = new Combinations($ids);

        $combinations = $combinations->getCombinations(2, false);

        return $this->combineEmployees($combinations);
    }

    /**
     * @return void
     */
    private function deleteAllEmployees(): void
    {
        Employee::truncate();
    }

    /**
     * @param array $combinations
     * @return array
     */
    private function combineEmployees(array $combinations): array
    {
        $combinedEmployees = array_reduce($combinations, function (&$result, $current) {
            $percent = 0;

            $employees = Employee::whereIn('id', $current)->get();
            $firstEmployee = $employees->first();

            $employees->each(function ($employee) use ($firstEmployee, &$percent) {
                if ($firstEmployee->id != $employee->id) {
                    if ($firstEmployee->division === $employee->division) {
                        $percent = 30;
                    }

                    if ($firstEmployee->timezone === $employee->timezone) {
                        $percent += 40;
                    }

                    if ((int)($firstEmployee->age - $employee->age) <= 5) {
                        $percent += 30;
                    }
                }
            });

            $result[] = array_merge([
                Employee::find($current[0]),
                Employee::find($current[1])
                ],
                [
                    'percent' => $percent
                ]
            );

            return $result;
        });

        if (!is_array($combinedEmployees)) {
            return [];
        }

        return $combinedEmployees;
    }
}
