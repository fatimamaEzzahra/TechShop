<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function store(Request $request){
        if(!Auth::check()){
            return response()->json([
                'status'=>401,
                'message'=>'You Should Log In ',
            ]);}
        else{
        $user_id = Auth::user()->id;
        $product_id = $request->product_id;
        $product_qty = $request->product_qty;
        $product=Product::where('id',$product_id)->first();
        
        if(CartItem::where('user_id',$user_id)->where('product_id',$product_id)->exists())
        {
            return response()->json([
                'status'=>409,
                'message'=>'The product '.$product->nom_pr.' Is Already Added To Cart',
            ]);
        }
        else{
            CartItem::create([
                "user_id"=>$user_id,
                "product_id"=>$product_id,
                "product_qty"=>$product_qty
            ]) ;

            return response()->json([
                'status'=>201,
                'message'=>'I am in Cart'
            ]);
        }
        
    }}
    public function verifAdded(Request $request){
        $user_id = Auth::user()->id;
        $product_id = $request->product_id;
        if(CartItem::where('user_id',$user_id)->where('product_id',$product_id)->exists())
        {
            return response()->json([
                'status'=>409,
                'message'=>'Already In Cart',
            ]);
        }
        else if (!CartItem::where('user_id',$user_id)->where('product_id',$product_id)->exists()) {
            return response()->json([
                'status' => 201,
                'message' => 'Add To Cart',
            ]);
        }
        
        
    }
    public function show(){
        if(Auth::check()){
            $user_id=Auth::user()->id;
            $cart = CartItem::where('user_id',$user_id)->get();
            
                return response()->json([
                    'cart'=>$cart,
                    'status'=>201
                ]);
            
            
        }
        
    }
    public function productAmount(){
        $user_id = Auth::user()->id;
        $amount = CartItem::where('user_id',$user_id)->count();
        return response()->json([
            'amount'=>$amount,
        ]);
    }
    public function updateQty(Request $request)
{
    if (!Auth::check()) {
        return response()->json([
            'status' => 401,
            'message' => 'You should log in.',
        ]);
    }

    $user_id = Auth::user()->id;
    $cartItem = CartItem::where('user_id', $user_id)->find($request->id);


    $cartItem->product_qty = $request->product_qty;
    $cartItem->save();

    return response()->json([
        'status' => 200,
        'message' => 'Product quantity updated successfully.',
    ]);
}
    public function deleteItem(Request $request){
        $user_id = Auth::user()->id;
        $product_id = $request->product_id;
        $ProductCart = CartItem::where('user_id',$user_id)->where('product_id',$product_id);
        $ProductCart->delete();
        return response()->json([
            'message'=>'Product deleted successfully'
        ]);
    }
}
