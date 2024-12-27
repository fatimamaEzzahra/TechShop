<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Dompdf\Options;
 use Illuminate\Http\Response;

class OrderController extends Controller
{
    public function placeorder(Request $request){
        if(Auth::check()){
            $validator = Validator::make($request->all(),[
                'firstname'=>'required|max:100',
                'lastname'=>'required|max:100',
                'phone'=>'required|max:100',
                'fulladdress'=>'required|max:100',
                'city'=>'required|max:100',
                'zipcode'=>'required|max:100',
            ]);
            if($validator->fails()){
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages(),
                ]);
            }
            else{
                $user = Auth::user();
                $order = new Order;
                $order->user_id = $user->id;
                $order->firstname = $request->firstname;
                $order->lastname = $request->lastname;
                $order->email = $user->email;
                $order->phone = $request->phone;
                $order->fulladdress = $request->fulladdress;
                $order->city = $request->city;
                $order->zipcode = $request->zipcode;
                $order->payment_mode = $request->payment_mode;
                $order->payment_id = $request->payment_id;
                $order->save();

                
                $cart = CartItem::where('user_id',$user->id)->get();
                $orderitems=[];
                foreach( $cart as $item){
                    $orderitems[]=[
                        'order_id'=>$order->id,
                        'product_id'=>$item->product_id,
                        'qty'=>$item->product_qty,
                        'price'=>$item->product->prix_pr,
                    ];
                    /*  THERE IS A TRIGGER INSTEAD OF THESE LINES // 
                    $item->product->update([
                        'stock_pr'=>$item->product->stock_pr-$item->product_qty
                    ]); 
                    
                    */
                }
                $order->orderItems()->createMany($orderitems);
                CartItem::destroy($cart);
                $result = DB::select("CALL shipping_date(? , @shipping_date_result)",[$order->created_at]);
                $shipping_date_result = DB::select('SELECT @shipping_date_result as shipping_date')[0]->shipping_date;
    
                return response()->json([
                    'status'=>200,
                    'shipping_date'=>$shipping_date_result,
                    'message'=>$request->firstname,
                ]);
            }
        }
        else{
            return response()->json([
                'message'=>'Login to continue',
                'status'=>401
            ]);
        }
    }
    public function index(){
        
            $orders = Order::with('orderItems')->get();
            
            return response()->json([
                'orders' => $orders,
                'status' => 200
            ]);
        
    }
    public function show(Request $request){
        
        $order = Order::with(['orderItems.product'])->where('id', $request->id)->first();
        
        return response()->json([
            'order' => $order,
            'status' => 200
        ]);
    
}
    public function count(){
        $amountOrders = Order::count();
        return response()->json([
            'amountOrders'=>$amountOrders,
            'status'=>200
        ]);
    }
    public function validateOrder(Request $request ){
        if(Auth::check()){
            $validator = Validator::make($request->all(),[
                'firstname'=>'required|max:100',
                'lastname'=>'required|max:100',
                'phone'=>'required|max:100',
                'fulladdress'=>'required|max:100',
                'city'=>'required|max:100',
                'zipcode'=>'required|max:100',
            ]);
            if($validator->fails()){
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages(),
                ]);
            }
            
            else{
                return response()->json([
                    'message'=>$request->firstname,
                    'status'=>200
                ]);
            }
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to continue'
            ]);
        }
    }   
    public function updateStatus(Request $request){
        $order = Order::where('id', $request->id)->first();
        $order->status = $request->newstatus;
        $order->save();
        return response()->json([
            'status'=>200,
            'message'=>'Status updated successfully'
        ]);
    } 
   
public function showUserOrders(){
    $id = Auth::user()->id;
    
    $orders = Order::where('user_id',$id)->with(['orderItems.product'])->get();
    return response()->json([
        'orders'=>$orders
    ]);
}
public function generateOrderPDF(Request $request){
    $order = Order::with(['orderItems.product'])->where('id', $request->id)->first();
    $view = view('pdfOrder_view', ['order' => $order]);
    $dompdf = new Dompdf();
    $dompdf->setBasePath(public_path("/assets/images/logo.png"));
    $dompdf->loadHtml($view);
    $dompdf->setPaper('A4', 'portrait');
    $dompdf->render();

    
    $response = new Response($dompdf->output());
    $response->header('Content-Type', 'application/pdf');
    $response->header('Access-Control-Allow-Origin', '*'); //header  of CORS 

    return $response;
}

}
