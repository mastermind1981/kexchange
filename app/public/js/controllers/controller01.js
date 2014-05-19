/* 
 * Samiyuru Senarathne
 */

kEX.controller("kexroot", function ($scope, kexPofiles) {
    var user = {
        username: "",
        password: ""
    };
    $scope.isLogged = false;//show loggin background
    $scope.showForm = false;//show loggin form
    $scope.user = user;
    $scope.login = login;

    kexPofiles.validateToken(function (isLoggedin) {
        if (isLoggedin) {
            $scope.isLogged = true;//hide loggin n show home
        } else {
            $scope.showForm = true;//show loggin form
        }
    });

    function login() {
        kexPofiles.authorize(user.username, user.password, function (status) {
            if (status.success) {
                $scope.isLogged = true;
            } else {
                $scope.isLogged = false;
                alert(status.err);
            }
        });
    }
});


kEX.controller("recntErnngsCtrlr", function ($scope) {
    $scope.ernngs = [
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "/img/earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "/img/earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "/img/earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "/img/earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic02.png"
            }
        }
    ];
});

kEX.controller("topErnrsCtrlr", function ($scope) {
    $scope.tpErners = [
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic01.png"
            },
            earning: 10000,
            place: 01
        },
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic01.png"
            },
            earning: 10000,
            place: 02
        },
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic01.png"
            },
            earning: 10000,
            place: 03
        }
    ];
});

kEX.controller("tpWlthyCtrler", function ($scope, kexPofiles) {
    $scope.wlthyPrsns = wlthyPrsns = [];

    kexPofiles.loadProfiles(function loadWlthyPplCB(status) {
        var profiles = status.data;
        var len = profiles.length;
        for (var i = 0; i < len; i++) {
            wlthyPrsns.push(profiles[i]);
        }
    });

});

kEX.controller("coverCtrlr", function ($scope, kexPofiles) {
    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        $scope.profile = profile;
    });
});



