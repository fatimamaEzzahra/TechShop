<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture de Commande</title>
    <link href="{{ asset('assets/css/rapport.css') }}" rel="stylesheet">
    <style>
        body{
        padding-top:10px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
   h1 {
       height:50px;
       padding-left:40px;
       padding-top: 10px;
       background-color:rgb(21, 104, 152);
       color:white;
       display:flex;
       justify-content:center;
       align-items:center;
   }
   h2{
    font-family:'Ananias','arial'
   }
   h4{
       height:50px;
       padding-left:200px;
       padding-top: 40px;
       display:flex;
       justify-content:center;
       align-items:center;
   }
   .info-group{
       display: flex;
       flex-direction:row;
   }
   .infos{
       width:100%;
       display: flex;
       justify-content:center;
       align-items:center;
   }
   .total{
    padding-left:500px
   }
   #flex-content{
    color:'red';
    display: flex;
    justify-content:'space-between';
   }
    </style>
</head>
<body>
 @php 
        $report_date = \Carbon\Carbon::now()->toDateString();
        
  @endphp

<div id='flex-content'>
<p>Date : {{$report_date}} </p>
</div>

<h1>Facture de Commande Chez Tech Shop</h1>
<h4>Commande de {{ $order->firstname }} {{ $order->lastname }}</h4>
<div class='infos'>
<div class='info-group' >
<p>Ville : {{$order->city}} </p>
<p>Adresse : {{$order->fulladdress}}</p>    
</div>
<div class='info-group' >
  <p>Tel: {{$order->phone}} </p>
  <p>Email: {{$order->email}} </p>  
</div>
<div class='info-group' >
    <p>Payment : {{$order->payment_mode}} </p>
    <p>Id de la commande : {{ $order->id }}</p>
</div>
</div>
<p>Date de la commande : {{$order->created_at->toDateString()}}</p>
<p>Status de la commande : 
    @if($order->status == 0)
        <span>En traitement</span>
    @elseif ($order->status == -1 )
        <span>Annulée</span>
    @elseif($order->status == 1) 
        <span>Traitée avec succées</span>
    @endif
</p>
<h2>Les élements de la commande:</h2>
<ul>
@foreach($order->orderItems as $item)
   <li> {{ $item->product->nom_pr }} <br><br>
    - Quantité: {{ $item->qty }} <br><br>
    - Prix pour entier: {{ $item->price }} <br> <br> </li>
@endforeach
</ul>
@php 
$total = 0;
foreach($order->orderItems as $item) {
    $total += $item->qty * $item->price;
}
@endphp
<h2 class="total"><strong>Total: </strong>{{ $total }} Dhs</h2>
<div>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,96L80,122.7C160,149,320,203,480,192C640,181,800,107,960,64C1120,21,1280,11,1360,5.3L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
</div>
</body>
</html>
