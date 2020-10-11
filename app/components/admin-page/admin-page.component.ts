import { Router } from '@angular/router';
import { NewProductModel } from './../../models/new-product-model';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CategoriesModel } from 'src/app/models/categories-model';
import { ItemModel } from 'src/app/models/item-model';
import { store } from 'src/app/redux/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  constructor(
    private myItemService: ItemService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  errorSnackMsg = '';

  // checking if there user LoggedIn
  public isLoggedIn = sessionStorage.getItem('accessToken');
  public isAdminIs = sessionStorage.getItem('mLoggedInGm');

  //nav bar options
  public editProducts = true;
  public addNewProduct = false;

  // nav bar Search Value and results
  searchInputValue = '';
  searchResult;

  // checking the selected category
  selectedCategoryId;

  // getting the full name and put inside the nav bar
  public fullName = sessionStorage.getItem('fullName');

  // product and categories object Arr that hold all information
  items: ItemModel[];
  categories: CategoriesModel[];
  itemsToView: ItemModel[];

  // creating a redux subscription
  unsubscribe: Unsubscribe;

  // clear storage information
  logout() {
    sessionStorage.clear();
  }

  // Search item
  onItemSearch() {
    if (this.searchInputValue === '') {
      this.itemsToView = this.items;
    } else {
      this.searchResult = this.items.filter((item) =>
        item.itemName.toLowerCase().match(this.searchInputValue.toLowerCase())
      );
      this.itemsToView = this.searchResult;
    }
    this.searchInputValue === ' ' ? (this.itemsToView = this.items) : null;
  }

  editProductInformation: ItemModel;

  // Edit product information{
  editProduct(product) {
    this.editProductInformation = new ItemModel();
    this.editProductInformation = product;
    document.getElementById('top').scrollIntoView();
  }

  imageFileToUpload;
  fileData: File = null;
  previewUrl: any = null;
  uploadedFilePath: string = null;

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.imageFileToUpload = this.fileData;
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  async saveEditedProduct(editedItem) {
    try {
      if (!editedItem.itemName) {
        this.errorSnackMsg = 'Missing Item Name';
        this.openSnackBar();
        return;
      }
      if (!editedItem.price) {
        this.errorSnackMsg = 'Missing Item Price';
        this.openSnackBar();
        return;
      }
      const formData = new FormData();
      formData.append('file', this.imageFileToUpload);
      await this.myItemService.updateProduct(editedItem);
      await this.myItemService.updateProductImage(formData);
    } catch (error) {
      console.log(error);
    }
  }

  async ngOnInit() {
    if (!this.isLoggedIn) {
      this._router.navigateByUrl('/login');
    }
    if (!this.isAdminIs) {
      this._router.navigateByUrl('/home');
    }
    this.itemsToView = [];

    // subscribe to redux store
    this.unsubscribe = store.subscribe(() => {
      this.items = store.getState().products;
      this.categories = store.getState().categories;
    });

    // check if there is any products in redux store
    if (store.getState().products.length > 0) {
      this.items = store.getState().products;
    } else {
      try {
        // get all products if store is empty
        await this.myItemService.getAllProducts();
      } catch (err) {
        console.log(err);
      }
    }
    this.itemsToView = this.items;
  }

  // Scroll The Page Up

  scrollUp() {
    document.getElementById('top').scrollIntoView();
  }

  openSnackBar() {
    this._snackBar.open(this.errorSnackMsg, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  openAddNewProductDialog() {
    const dialogRef = this.dialog.open(AdminAddNewProductDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'admin-add-new-product',
  templateUrl: 'admin-add-new-product.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminAddNewProductDialogComponent implements OnInit {
  constructor(
    private myItemService: ItemService,
    private _snackBar: MatSnackBar
  ) {}

  newProduct: NewProductModel;
  imageFileToUpload;

  // custom error message
  errorSnackMsg = '';

  // Custom Alert
  openSnackBar() {
    this._snackBar.open(this.errorSnackMsg, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  // creating a redux subscription
  unsubscribe: Unsubscribe;

  async saveEditedProduct(newProduct) {
    if (!newProduct.imageName) {
      this.errorSnackMsg = 'No Image Selected';
      this.openSnackBar();
      return;
    }
    if (!newProduct.itemName) {
      this.errorSnackMsg = 'Missing Product Name';
      this.openSnackBar();
      return;
    }
    if (!newProduct.categoryId) {
      this.errorSnackMsg = 'Missing Category';
      this.openSnackBar();
      return;
    }

    if (!newProduct.price) {
      this.errorSnackMsg = 'Missing Product Price';
      this.openSnackBar();
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', this.imageFileToUpload);
      await this.myItemService.addProductImage(formData);

      await this.myItemService.addProduct(newProduct).catch((err) => {
        this.errorSnackMsg = err.error.message;
        this.openSnackBar();
        return;
      });
    } catch (error) {
      console.log(error);
    }
  }

  fileData: File = null;
  previewUrl: any = null;
  uploadedFilePath: string = null;

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.imageFileToUpload = this.fileData;
    this.newProduct.imageName = fileInput.target.files[0].name;
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  categories: CategoriesModel[];

  async ngOnInit() {
    this.newProduct = new NewProductModel();
    // subscribe to redux store
    this.unsubscribe = store.subscribe(() => {
      this.categories = store.getState().categories;
    });

    // check if there is any categories in redux store
    if (store.getState().categories.length > 0) {
      this.categories = store.getState().categories;
    } else {
      try {
        // get all categories if store is empty
        await this.myItemService.getAllCategories();
      } catch (err) {
        console.log(err);
      }
    }
  }
}
