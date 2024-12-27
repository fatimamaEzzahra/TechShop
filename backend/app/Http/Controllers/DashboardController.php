<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class DashboardController extends Controller
{
    public function getSalesStatistics(){
        $saleData = Order::where('status', 1)
            ->orderBy('created_at')
            ->get()
            ->groupBy(function($date){
                return Carbon::parse($date->created_at)->format('j F');
            })
            ->map(function($groupedOrders){
                return $groupedOrders->count();
            });
    
    
        $startDate = Carbon::createFromFormat('d-m-Y','01-04-2024');
        $endDate = Carbon::now();
        $dates=[];
        $salesCounts = [];
        for($date = $startDate ; $date->lte($endDate); $date->addDay()){
            $formattedDate = $date->format('j F');
            $dates[] = $formattedDate;
            $salesCounts[] = $saleData[$formattedDate] ?? 0;
        }
    
        return [
            'dates' =>$dates,
            'salesCounts' => $salesCounts,
        ];
    }
    
    public function salesStatistics(){
        $salesData = $this->getSalesStatistics();
        $user=Auth::user();
        $salesAmount = Order::where('status',1)->count();
        $ordersAmount = Order::where('status',0)->count();
        $total_income = OrderItem::all()->sum(function ($item) {
            return $item->price * $item->qty;
        });
        $productsAmount=Product::count();
        $clientsAmount=User::where('role_id','=',2)->count();
        $ordersByCategory = OrderItem::select('products.category_pr as category_name',DB::raw('SUM(order_items.qty) as total_qty'))
            ->join('products','order_items.product_id','=','products.id')
            ->groupBy('products.category_pr')
            ->get()
        ;
        return response()->json(
            [   
                'user'=>$user,
                'productsAmount'=>$productsAmount,
                'clientsAmount'=>$clientsAmount,
                'ordersAmount'=>$ordersAmount,
                'salesData'=>$salesData,
                'totalIncome'=>$total_income,
                'salesAmount'=>$salesAmount,
                'ordersByCategory'=>$ordersByCategory,
            ]
    );
    }
    
}
