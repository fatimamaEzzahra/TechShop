<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable=['nom_pr','marque_pr','category_pr','description_pr','prix_pr','stock_pr','image_pr','image2','image3','image4','image5','bestSeller'];
}
