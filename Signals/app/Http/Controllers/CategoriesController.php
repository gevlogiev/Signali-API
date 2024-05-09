<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function getAllCategories()
    {
        $categories = Categories::select(
            'id as categoryId',
            'category_name as categoryName',
            'category_status as categoryStatus',
            'category_parent_id as categoryParentId',
            'created_on as createdOn'
        )->get();

    
        return $categories;
    }

    public function createCategory(Request $request)
    {

        $category = new Categories();
        $category->category_name = $request->input('categoryName');
        $category->category_status = $request->input('activeStatus');
        $category->category_parent_id = $request->input('categoryParentId');
        $category->save();

        return response()->json($category->id, 201);
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Categories::findOrFail($id);
        $category->category_name = $request->input('catgoryName');
        $category->active_status = $request->input('activeStatus');
        $category->category_parent_id = $request->input('categoryParentId');
        $category->save();

        return response()->json(['message' => 200], 200);
    }
}
