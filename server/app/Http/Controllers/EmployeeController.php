<?php

namespace App\Http\Controllers;

use App\Imports\Order;
use App\Interfaces\Services\IEmployeeService;
use App\Models\Attachment;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeController extends Controller
{
    /**
     * @var IEmployeeService
     */
    private IEmployeeService $employeeService;

    public function __construct(IEmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    /**
     * @param CreateClientAttachmentRequest $request
     *
     * @return JsonResponse
     */
    public function createAttachment(Request $request)
    {
        try {
            $name = $request->name;
            $file = $request->file();

            $this->employeeService->createAttachment($name, $file);

            return response()->json(['success' => true]);
        } catch (Exception $e) {
            Log::error('Error trough create attachment', ['error' => $e->getMessage()]);
        }
    }

    public function getEmployeesStatistic()
    {
        return $this->employeeService->composeEmployees();
    }
}
