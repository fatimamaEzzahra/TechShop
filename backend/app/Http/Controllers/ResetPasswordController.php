<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class ResetPasswordController extends Controller
{
   /**
     * Show the form to reset the password.
     *
     * @param  string  $token
     * @return \Illuminate\Http\Response
     */
    public function showResetForm($token)
    {
        
        $url = 'http://localhost:3000/reset-password/' . $token . '/' . urlencode(request()->email);
            return redirect($url);
    }

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function reset(Request $request)
    {
        $validate = $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users',
            'password' => 'required|confirmed|min:6', 
        ]);
        if(!$validate){
            return response().json([
                'errors'=>$validate->message()
            ]);
        }
        
        $user = User::where('email', $request->email)->first();

        
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );

        
        if ($status == Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password reset successfully']);
        } else {
            return response()->json(['error' => trans($status)], 500);
        }
    }

}
