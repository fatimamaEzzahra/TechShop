<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function countClient(){
        $clients=User::where('role_id','=',2)->count();
        return response()->json([
            'clientsAmount'=>$clients
        ]);
    }
    public function index(){

        $customers = User::where('role_id',2)->select('id','name','email','created_at')->get();
        $customersData=[];
        foreach($customers as $customer) {
            $ordersAmount = Order::where('user_id',$customer->id)->count();
            $customersData[] =['customer'=> $customer,'ordersAmount'=>$ordersAmount]; 
        }
        return response()->json([
            'customersData' => $customersData,
            'status'=>200
        ]);
    }
}
