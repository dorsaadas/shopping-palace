"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(router) {
        this.router = router;
        this.isLoggedIn = sessionStorage.getItem('accessToken');
        this.linkHome = true;
        this.linkShopping = false;
        this.linkOrder = false;
        this.linkProfile = false;
        this.fullName = sessionStorage.getItem('fullName');
        this.imgSaleArr = [
            '2nd-image-gif.gif',
            'image-sale-gif.gif',
            'sale-discount.jpg',
        ];
        this.img = 'image-sale-gif.gif';
    }
    HomeComponent.prototype.logout = function () {
        sessionStorage.clear();
    };
    HomeComponent.prototype.displayImageAuto = function () {
        var randomNum = Math.floor(Math.random() * 3);
        var image = this.imgSaleArr[randomNum];
        return image;
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (sessionStorage.getItem('accessToken')) {
            if (!sessionStorage.getItem('mLoggedInGm')) {
                this.router.navigateByUrl('/home');
            }
        }
        if (sessionStorage.getItem('accessToken')) {
            if (sessionStorage.getItem('mLoggedInGm')) {
                this.router.navigateByUrl('/gmLoggedInAd');
            }
        }
        setInterval(function () {
            _this.img = _this.displayImageAuto();
        }, 5000);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
