<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;
class AuthController extends Controller
{
    //
public function register(Request $request)
    {
        $validatedData =Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users|email:rfc',
            'password' => 'required|min:6|confirmed',
            'role_id' => 'required',
        ]);
        if($validatedData->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validatedData->messages()
            ]);
        }
        else{
          $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id'=> $request->role_id,
            
                ]);
                
                $token = $user->createToken('token')->plainTextToken;
                $cookie = cookie('jwt'  ,$token,minutes:60*24 ); //1 day
                return response()->json(['message' => 'User registered successfully',
                'user' => $user,
                'token'=>$token,
                
            ], 201)->withCookie($cookie);  
        }
    
        
  
    }
    public function login(Request $request){
        $validatedData =Validator::make($request->all(),[
            'email' => 'required|email|exists:users',
            'password' => 'required',
        ],[
            'email.required'=>' email is required',
            'email.exists'=>"This account does'nt exists"
        ]);
        if($validatedData->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validatedData->messages()
            ]);
        }else{
            if(  !Auth::attempt($request->only('email','password')))
            {
              return response([
                  'message'=>'Invalid credentials'
              ],Response::HTTP_UNAUTHORIZED) ;
            }
            $user=Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('jwt'  ,$token,minutes:60*24 ); //1 day
            return response([
              'message'=>$token,
            ])->withCookie($cookie);
        }

     
    }
    function user(){
        return Auth::user();
    }
    function roles() {
        if (Auth::check()) {
            $user = Auth::user();
            $roles = $user->roles;
            return $roles->pluck('intitulé');
        } else {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
    }
    function logout(){
        $cookie = Cookie::forget('jwt');
        return response([
            'message'=>'success logout'
        ])->withCookie($cookie);
    }
}
