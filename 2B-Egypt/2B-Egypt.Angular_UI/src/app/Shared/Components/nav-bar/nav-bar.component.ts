import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ICategory } from '../../../../models/icategory';
import { HttpClientModule } from '@angular/common/http';
import { CategorywithSubcategories } from '../../../../models/categorywith-subcategories';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  ParentCategories: ICategory[] = [] as ICategory[];
  Categories: ICategory[] = [] as ICategory[];
  filteredSubcategories: ICategory[] = [] as ICategory[];

  categorywithSubCategories: CategorywithSubcategories[] = [] ;
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.Categories = res; 
        this.categorywithSubCategories =this.transformCategories(this.Categories) ;
        // console.log(this.transformCategories(this.Categories)); 
        console.log(this.categorywithSubCategories);
        
      },
      error: (error) => {
        console.error('Error up fetching Categories:', error);
      },
    });
    this.categoryService.getParentCategories().subscribe({
      next: (res) => {
        this.ParentCategories = res;
      },
      error: (error) => {
        console.error('Error up fetching  Parent Categories:', error);
      },
    });
  }
  ShowSubCategories(id:string):void{  
    console.log(this.Categories.filter(sub=>sub.parentCategoryId ==id)); 
      this.filteredSubcategories=this.Categories.filter(sub=>sub.parentCategoryId ==id) ; 
      console.log(this.filteredSubcategories)
     
  }

  transformCategories(categories: ICategory[]): CategorywithSubcategories[] {
    const groupedMap: { [key: string]: ICategory[] } = {};

    for (const cat of categories) {
      if (cat.parentCategoryId == null) {
        if (!groupedMap[cat.id]) {
          groupedMap[cat.id] = [];
        }

        groupedMap[cat.id].push(cat);
      } else {
        if (!groupedMap[cat.parentCategoryId]) {
          groupedMap[cat.parentCategoryId] = [];
        }
        groupedMap[cat.parentCategoryId].push(cat);
      }
    }

    const groupedCategories: CategorywithSubcategories[] = Object.keys(
      groupedMap
    ).map((parentId) => {
      const subcategories = groupedMap[parentId];
      const representativeCategory = subcategories[0];

      if (!representativeCategory) {
        return {
          id: parentId,
          nameAr: '',
          nameEn: '',
          subcategories: subcategories,
        };
      }

      return {
        id: representativeCategory.id,
        nameAr: representativeCategory.nameAr,
        nameEn: representativeCategory.nameEn,
        subcategories: subcategories,
      };
    });

    return groupedCategories;
  }

  print(): void {
    console.log(this.filteredSubcategories);
  } 
  reset(){
    this.filteredSubcategories=[] as ICategory[] ;
  }
}
