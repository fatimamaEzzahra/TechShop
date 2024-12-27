<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Document</title>
</head>
<body>
  <h1>Reset Your PassWord</h1>
  <form action="reset-password">
  New Password <input type="password" name='password' placeholder='Password'/><br><br>
  Confirm  Password <input type="password" name='password_confirmation' placeholder='Confirm Password'/><br><br>
 email {{$email}} <input type="hidden" value={{$email}} /><br>
  token :{{$token}}<input type="hidden" value={{$token}} /><br>
  <input type="submit" value="Submit">
  </form>
</body>
</html>