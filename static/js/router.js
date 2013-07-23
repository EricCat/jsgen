'use strict';
/*global angular, _, jsGenVersion*/

angular.module('jsGen.router', []).
constant('app', {
    version: jsGenVersion // 注册内部全局变量app
}).provider('getFile', ['app',
    function (app) {
        var self = this;
        this.html = function (fileName) {
            return '/static/tpl/' + fileName + '?v=' + (app.version || '');
        };
        this.md = function (fileName) {
            return '/static/md/' + fileName + '?v=' + (app.version || '');
        };
        this.$get = function () {
            return {
                html: self.html,
                md: self.md
            };
        };
    }
]).config(['$routeProvider', '$locationProvider', 'getFileProvider',

    function ($routeProvider, $locationProvider, getFileProvider) {
        var index = {
            templateUrl: getFileProvider.html('index.html'),
            controller: 'indexCtrl'
        },
            login = {
                templateUrl: getFileProvider.html('login.html'),
                controller: 'userLoginCtrl'
            },
            register = {
                templateUrl: getFileProvider.html('register.html'),
                controller: 'userRegisterCtrl'
            },
            home = {
                templateUrl: getFileProvider.html('user.html'),
                controller: 'homeCtrl'
            },
            admin = {
                templateUrl: getFileProvider.html('admin.html'),
                controller: 'adminCtrl'
            },
            edit = {
                templateUrl: getFileProvider.html('article-editor.html'),
                controller: 'articleEditorCtrl'
            },
            tag = {
                templateUrl: getFileProvider.html('index.html'),
                controller: 'tagCtrl'
            },
            reset = {
                templateUrl: getFileProvider.html('reset.html'),
                controller: 'userResetCtrl'
            },
            user = {
                templateUrl: getFileProvider.html('user.html'),
                controller: 'userCtrl'
            },
            article = {
                templateUrl: getFileProvider.html('article.html'),
                controller: 'articleCtrl'
            },
            collection = {
                templateUrl: getFileProvider.html('collection.html'),
                controller: 'collectionCtrl'
            };
        $routeProvider.
        when('/', index).
        when('/hots', index).
        when('/update', index).
        when('/latest', index).
        when('/T:ID', index).
        when('/tag/:TAG', index).
        when('/login', login).
        when('/register', register).
        when('/reset', reset).
        when('/home', home).
        when('/admin', admin).
        when('/add', edit).
        when('/tag', tag).
        when('/user/:ID', user).
        when('/A:ID/edit', edit).
        when('/U:ID', user).
        when('/A:ID', article).
        when('/C:ID', collection).
        otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }
]);