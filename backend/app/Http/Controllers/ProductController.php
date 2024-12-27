<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function index()
    {
        return Product::select('id','nom_pr','marque_pr' ,'category_pr','description_pr','image2','image3','image4','image5','image_pr','prix_pr','stock_pr','bestSeller')->get();
    }

    
    
    
    public function store(Request $r)
    {
        $validator=Validator::make($r->all(),[
            'nom_pr' => ['required'],
            'marque_pr' => ['required'],
            'category_pr' => ['required'],
            'image_pr' => ['required'],
            'image2' => ['required'],
            'image3' => ['required'],
            'description_pr' => ['required'],
            'stock_pr' => ['required','integer','min:0'],
            'prix_pr' => ['required']
        ], [
            'nom_pr.required' => "le nom de l'appareil  est obligatoire !",
            'marque_pr.required' => 'le nom de la marque est obligatoire !',
            'category_pr.required' => 'la cathégorie est obligatoire !',
            'image_pr.required' => "veuillez saisir la première image !",
            'image_pr.image' => 'Vous devez saisir une première image valide !',
            'image2.required' => "veuillez saisir une deuxième image !",
            'image2.image' => 'Vous devez saisir une deuxième image valide !',
            'image3.required' => "veuillez saisir une troisième image !",
            'image3.image' => "veuillez saisir une troisième image valide !",
            'description_pr.required' => 'la description est obligatoire !',
            'stock_pr.required' => 'le champs du stock est obligatoire !',
            'stock_pr.min' => 'le champs du stock doit pas $etre inférieur à 0 !',
            'prix_pr.required' => 'le prix est obligatoire !',
        ]
    );
    if($validator->fails()){
           $errors= $validator->errors()->all();
        return response()->json([
            'message'=>$errors
        ],411);
    }
    else{
        $pathImage1 = Str::random() . '.' . $r->image_pr->getClientOriginalExtension();
        $pathImage2 = Str::random() . '.' . $r->image2->getClientOriginalExtension();
        $pathImage3 = Str::random() . '.' . $r->image3->getClientOriginalExtension();
        
        Storage::disk('public')->putFileAs('product/image', $r->image_pr, $pathImage1);
        Storage::disk('public')->putFileAs('product/image', $r->image2, $pathImage2);
        Storage::disk('public')->putFileAs('product/image', $r->image3, $pathImage3);
     
        if($r->hasFile('image4')){
            $pathImage4 = Str::random() . '.' . $r->file('image4')->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('product/image', $r->file('image4'), $pathImage4);
        } else {
            $pathImage4 = null;
        }
        
        if($r->hasFile('image5')){
            $pathImage5 = Str::random() . '.' . $r->file('image5')->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('product/image', $r->file('image5'), $pathImage5);
        } else {
            $pathImage5 = null;
        }
        
        Product::create([
            'nom_pr' => $r->nom_pr,
            'marque_pr' => $r->marque_pr,
            'category_pr' => $r->category_pr,
            'image_pr' => $pathImage1, 
            'image2' => $pathImage2,
            'image3' => $pathImage3,
            'image4' => $pathImage4,
            'image5' => $pathImage5,
            'description_pr' => $r->description_pr,
            'stock_pr' => $r->stock_pr,
            'prix_pr' => $r->prix_pr,
            'bestSeller'=>$r->bestSeller
        ]);
        
        return response()->json([
            'message' => 'le produit est ajouté avec succès'
        ]);}
    }

    
    public function show(Product $produit)
    {
        return response()->json(
            ['produit'=>$produit]
        );
    }
    public function search(Request $request) {
        try {
            $searchTerm = $request->input('search');
            $result = Product::where('nom_pr', 'like', '%' . $searchTerm . '%')
                ->orWhere('marque_pr', 'like', '%' . $searchTerm . '%')
                ->get();
    
            if ($result->isNotEmpty()) {
                return response()->json([
                    'data' => $result,
                    'message' => 'Search successful',
                ], 200);
            } else {
                return response()->json([
                    'message' => 'No results found',
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while processing your request',
            ], 500);
        }
    }
    
   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $r, Product $produit)
    {
        $validator = Validator::make($r->all(),
            [
                'nom_pr'=>['required'],
                'marque_pr'=>['required'],
                'category_pr'=>['required'],
                'image_pr'=>['nullable'],
                'image2'=>['nullable'],
                'image3'=>['nullable'],
                'image4'=>['nullable'],
                'image5'=>['nullable'],
                'description_pr'=>['required'],
                'stock_pr'=>['required',"integer",'min:0'],
                'prix_pr'=>['required']
            ],
            [
                'nom_pr.required'=>'le nom est obligatoire',
                'marque_pr.required'=>'le nom de la marque est obligatoire',
                'category_pr.required'=>'la cathégorie est obligatoire',
                'image_pr.image'=>'Vous devez siasir une première image',
                'image2.image'=>'Vous devez siasir une deuxième image',
                'image3.image'=>"veuillez saisir une troisème image",
                'image5.image'=>"les images doivent être de type image",
                'image4.image'=>"les images doivent être de type image",
                'description_pr.required'=>'le nom est obligatoire',
                'stock_pr.required'=>'le champs du stock est obligatoire',
                'prix_pr.required'=>'le prix est obligatoire',
                
            ]
        );
        
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages()
            ]);
        }

        foreach(['image_pr','image2','image3','image4','image5'] as $imageFile){
            if($r->hasFile($imageFile)){
                $exist=$produit->$imageFile;
                if ($exist && Storage::disk('public')->exists("product/image/{$exist}")) {
                    Storage::disk('public')->delete("product/image/{$exist}");
                }
                $pathImage=Str::random().'.'.$r->file($imageFile)->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('product/image',$r->file($imageFile),$pathImage);
                $produit->$imageFile = $pathImage;
            }
        }
        
        $produit->bestSeller = $r->bestSeller;
        $produit->fill($r->post())->update();
        $produit->save();
        return response()->json([
            'message'=>'le produit est modifié avec succé'
        ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $r,Product $produit  )
    {
        foreach(['image_pr', 'image2', 'image3', 'image4', 'image5'] as $imageField) {
            $filePath = $produit->$imageField;
            if ($filePath && Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
            }
        }
        OrderItem::where('product_id',$produit->id)->delete();
        CartItem::where('product_id',$produit->id)->delete();
        $produit->delete();
        
        return response()->json([
            'message' => 'Le produit a été supprimé avec succès'
        ]);
    }
    function count(){
        $products=Product::count();
        return $products;
    }
    function oneProduct(Request $request){
        $product=Product::where('id',$request->id)->first();
        return response()->json([
            'product'=>$product,
            
        ]);
    }
    public function bestSellers(){
        $products = Product::where('bestSeller', '=', 'true')->get();
        return response()->json([
            'products'=>$products
        ]);
    }
}
