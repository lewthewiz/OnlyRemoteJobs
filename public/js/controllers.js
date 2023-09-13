angular.module('lionGator').controller('MainCtrl', ['$scope', '$window', '$http', '$location', '$timeout', '$sce', '$interval', function($scope, $window, $http, $location, $timeout, $sce, $interval) {
    $scope.img_path = img_path;
    $scope.create_page = true;
    $scope.pay_page = false;
    $scope.review_page = false;
    $scope.job_successfull = false;
    $scope.price = JSON.parse($window.baseprice);
    $scope.baseprice = $scope.price[0].base_price;
    $scope.featured_job_price = parseInt($scope.price[0].featured_job_price);
    $scope.highlighted_job_price = parseInt($scope.price[0].highlighted_job_price);
    $scope.form = {};
    $scope.pattern = false;
    $scope.total = parseInt($scope.baseprice);
    $scope.loading = false;
    $scope.form.category = "Other";
    $scope.form.visa_psponcer = "No";
    $scope.tinymceModel;
    $scope.disable = true;
    $scope.tinymceOptions = {
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste"
        ],
        menubar: false,
        toolbar: 'bold italic underline | bullist numlist',
        advlist_bullet_styles: "square"
    };

    $scope.job_des;
    $scope.countries = [
        { name: 'Please Select' },
        { name: "America (United States) Dollars - USD", sy: "USD" },
        { name: "Afghanistan Afghanis - AFN", sy: "AFN" },
        { name: "Albania Leke - ALL", sy: "ALL" },
        { name: "Algeria Dinars - DZD", sy: "DZD" },
        { name: "Argentina Pesos - ARS", sy: "ARS" },
        { name: "Australia Dollars - AUD", sy: "AUD" },
        { name: "Austria Schillings - ATS", sy: "ATS" },
        { name: "Bahamas Dollars - BSD", sy: "BSD" },
        { name: "Bahrain Dinars - BHD", sy: "BHD" },
        { name: "Bangladesh Taka - BDT", sy: "BDT" },
        { name: "Barbados Dollars - BBD", sy: "BBD" },
        { name: "Belgium Francs - BEF", sy: "BEF" },
        { name: "Bermuda Dollars - BMD", sy: "BMD" },
        { name: "Brazil Reais - BRL", sy: "BRL" },
        { name: "Bulgaria Leva - BGN", sy: "BGN" },
        { name: "Canada Dollars - CAD", sy: "CAD" },
        { name: "CFA BCEAO Francs - XOF", sy: "XOF" },
        { name: "CFA BEAC Francs - XAF", sy: "XAF" },
        { name: "Chile Pesos - CLP", sy: "CLP" },
        { name: "China Yuan Renminbi - CNY", sy: "CNY" },
        { name: "RMB (China Yuan Renminbi) - CNY", sy: "CNY" },
        { name: "Colombia Pesos - COP", sy: "COP" },
        { name: "CFP Francs - XPF", sy: "XPF" },
        { name: "Costa Rica Colones - CRC", sy: "CRC" },
        { name: "Croatia Kuna - HRK", sy: "HRK" },
        { name: "Cyprus Pounds - CYP", sy: "CYP" },
        { name: "Czech Republic Koruny - CZK", sy: "CZK" },
        { name: "Denmark Kroner - DKK", sy: "DKK" },
        { name: "Deutsche (Germany) Marks - DEM", sy: "DEM" },
        { name: "Dominican Republic Pesos - DOP", sy: "DOP" },
        { name: "Dutch (Netherlands) Guilders - NLG", sy: "NLG" },
        { name: "Eastern Caribbean Dollars - XCD", sy: "XCD" },
        { name: "Egypt Pounds - EGP", sy: "EGP" },
        { name: "Estonia Krooni - EEK", sy: "EEK" },
        { name: "Euro - EUR", sy: "EUR" },
        { name: "Fiji Dollars - FJD", sy: "FJD" },
        { name: "Finland Markkaa - FIM", sy: "FIM" },
        { name: "France Francs - FRF", sy: "FRF" },
        { name: "Germany Deutsche Marks - DEM", sy: "DEM" },
        { name: "Gold Ounces - XAU", sy: "XAU" },
        { name: "Greece Drachmae - GRD", sy: "GRD" },
        { name: "Guatemalan Quetzal - GTQ", sy: "GTQ" },
        { name: "Holland (Netherlands) Guilders - NLG", sy: "NLG" },
        { name: "Hong Kong Dollars - HKD", sy: "HKD" },
        { name: "Hungary Forint - HUF", sy: "HUF" },
        { name: "Iceland Kronur - ISK", sy: "ISK" },
        { name: "IMF Special Drawing Right - XDR", sy: "XDR" },
        { name: "India Rupees - INR", sy: "INR" },
        { name: "Indonesia Rupiahs - IDR", sy: "IDR" },
        { name: "Iran Rials - IRR", sy: "IRR" },
        { name: "Iraq Dinars - IQD", sy: "IQD" },
        { name: "Ireland Pounds - IEP", sy: "IEP" },
        { name: "Israel New Shekels - ILS", sy: "ILS" },
        { name: "Italy Lire - ITL", sy: "ITL" },
        { name: "Jamaica Dollars - JMD", sy: "JMD" },
        { name: "Japan Yen - JPY", sy: "JPY" },
        { name: "Jordan Dinars - JOD", sy: "JOD" },
        { name: "Kenya Shillings - KES", sy: "KES" },
        { name: "Korea (South) Won - KRW", sy: "KRW" },
        { name: "Kuwait Dinars - KWD", sy: "KWD" },
        { name: "Lebanon Pounds - LBP", sy: "LBP" },
        { name: "Luxembourg Francs - LUF", sy: "LUF" },
        { name: "Malaysia Ringgits - MYR", sy: "MYR" },
        { name: "Malta Liri - MTL", sy: "MTL" },
        { name: "Mauritius Rupees - MUR", sy: "MUR" },
        { name: "Mexico Pesos - MXN", sy: "MXN" },
        { name: "Morocco Dirhams - MAD", sy: "MAD" },
        { name: "Netherlands Guilders - NLG", sy: "NLG" },
        { name: "New Zealand Dollars - NZD", sy: "NZD" },
        { name: "Norway Kroner - NOK", sy: "NOK" },
        { name: "Oman Rials - OMR", sy: "OMR" },
        { name: "Pakistan Rupees - PKR", sy: "PKR" },
        { name: "Palladium Ounces - XPD", sy: "XPD" },
        { name: "Peru Nuevos Soles - PEN", sy: "PEN" },
        { name: "Philippines Pesos - PHP", sy: "PHP" },
        { name: "Platinum Ounces - XPT", sy: "XPT" },
        { name: "Poland Zlotych - PLN", sy: "PLN" },
        { name: "Portugal Escudos - PTE", sy: "PTE" },
        { name: "Qatar Riyals - QAR", sy: "QAR" },
        { name: "Romania New Lei - RON", sy: "RON" },
        { name: "Romania Lei - ROL", sy: "ROL" },
        { name: "Russia Rubles - RUB", sy: "RUB" },
        { name: "Saudi Arabia Riyals - SAR", sy: "SAR" },
        { name: "Silver Ounces - XAG", sy: "XAG" },
        { name: "Singapore Dollars - SGD", sy: "SGD" },
        { name: "Slovakia Koruny - SKK", sy: "SKK" },
        { name: "Slovenia Tolars - SIT", sy: "SIT" },
        { name: "South Africa Rand - ZAR", sy: "ZAR" },
        { name: "South Korea Won - KRW", sy: "KRW" },
        { name: "Spain Pesetas - ESP", sy: "ESP" },
        { name: "Special Drawing Rights (IMF) - XDR", sy: "XDR" },
        { name: "Sri Lanka Rupees - LKR", sy: "LKR" },
        { name: "Sudan Dinars - SDD", sy: "SDD" },
        { name: "Sweden Kronor - SEK", sy: "SEK" },
        { name: "Switzerland Francs - CHF", sy: "CHF" },
        { name: "Taiwan New Dollars - TWD", sy: "TWD" },
        { name: "Thailand Baht - THB", sy: "THB" },
        { name: "Trinidad and Tobago Dollars - TTD", sy: "TTD" },
        { name: "Tunisia Dinars - TND", sy: "TND" },
        { name: "Turkey New Lira - TRY", sy: "TRY" },
        { name: "United Arab Emirates Dirhams - AED", sy: "AED" },
        { name: "United Kingdom Pounds - GBP", sy: "GBP" },
        { name: "Venezuela Bolivares - VEB", sy: "VEB" },
        { name: "Vietnam Dong - VND", sy: "VND" },
        { name: "Zambia Kwacha - ZMK", sy: "ZMK" }];
    $scope.form.currency = $scope.countries[0];

    $scope.timezone = [
        { utc: 'UTC-12:00' },
        { utc: 'UTC-11:00' },
        { utc: 'UTC-10:00' },
        { utc: 'UTC-09:30' },
        { utc: 'UTC-09:00' },
        { utc: 'UTC-08:00' },
        { utc: 'UTC-07:00' },
        { utc: 'UTC-06:00' },
        { utc: 'UTC-05:00' },
        { utc: 'UTC-04:00' },
        { utc: 'UTC-03:30' },
        { utc: 'UTC-03:00' },
        { utc: 'UTC-02:00' },
        { utc: 'UTC-01:00' },
        { utc: 'UTC±00:00' },
        { utc: 'UTC+01:00' },
        { utc: 'UTC+02:00' },
        { utc: 'UTC+03:00' },
        { utc: 'UTC+03:30' },
        { utc: 'UTC+04:00' },
        { utc: 'UTC+04:30' },
        { utc: 'UTC+05:00' },
        { utc: 'UTC+05:30' },
        { utc: 'UTC+05:45' },
        { utc: 'UTC+06:00' },
        { utc: 'UTC+06:30' },
        { utc: 'UTC+07:00' },
        { utc: 'UTC+08:00' },
        { utc: 'UTC+08:30' },
        { utc: 'UTC+08:45' },
        { utc: 'UTC+09:00' },
        { utc: 'UTC+09:30' },
        { utc: 'UTC+10:00' },
        { utc: 'UTC+10:30' },
        { utc: 'UTC+11:00' },
        { utc: 'UTC+12:00' },
        { utc: 'UTC+12:45' },
        { utc: 'UTC+13:00' },
        { utc: 'UTC+14:00' }];

    $scope.form.timezone = $scope.timezone[15];
    $scope.editor_err = false;
    $scope.editor = function () {

    }
    $scope.add_total1 = function () {
        if ($scope.form.feature_job == true) {
            $scope.total = $scope.total - 0;
            $scope.total = $scope.total + $scope.featured_job_price;
        }
        else {
            $scope.total = $scope.total - 0;
            $scope.total = $scope.total - $scope.featured_job_price;
        }
    }
    $scope.add_total = function () {
        if ($scope.form.highlight_job == true) {
            $scope.total = $scope.total - 0;
            $scope.total = $scope.total + $scope.highlighted_job_price;
        }
        else {
            $scope.total = $scope.total - 0;
            $scope.total = $scope.total - $scope.highlighted_job_price;
        }
    }

    $scope.anchorme = function (text) {
        text = anchorme(text);
        return $sce.trustAsHtml(text);
    }

    $scope.formUrl = function (text) {
        if (text) {
            text = anchorme(text, {
                attributes:
                [
                    {
                        name: 'class',
                        value: 'custom-links'
                    },
                    {
                        name: 'target',
                        value: 'blank'
                    }
                ]
            });
            return $sce.trustAsHtml(text);
        }
    }

    $scope.loadBrainTree = function () {
        braintree.client.create({
            authorization: authorization_token
        },
            function (clientErr, clientInstance) {

                if (clientErr) {
                    // Handle error in client creation
                    console.log(clientErr);
                    return;
                }
                braintree.hostedFields.create({
                    client: clientInstance,
                    styles: {
                        'input': {
                            'height': '45px',
                            'padding': '10px',
                            'line-height': '25px',
                            'border': '1px solid #ccc',
                            'border-radius': '3px'
                        },
                        'input.invalid': {
                            'color': 'red'
                        },
                        'input.valid': {
                            'color': 'green'
                        }
                    },
                    fields: {
                        number: {
                            selector: '#card-number',
                            placeholder: '4000111111111115'
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: '123'
                        },
                        expirationDate: {
                            selector: '#expiration-date',
                            placeholder: '10/2019'
                        }
                    }
                }, function (hostedFieldsErr, hostedFieldsInstance) {
                    $scope.hostedFieldsInstance = hostedFieldsInstance;

                    $interval(function () {
                        var fields = $scope.hostedFieldsInstance.getState().fields;

                        var isValid = Object.keys(fields).every(function (field) {
                            return fields[field].isValid;
                        });

                        $scope.disable = !isValid;
                    }, 500);
                });
            });
    }
    $scope.loadBrainTree();
    $scope.skill_des;
    $scope.benifit;

    $scope.submitPost = function () {
        if ($scope.form.skill_des != undefined)
            $scope.skill_des = $scope.form.skill_des.split("\n");
        if ($scope.form.benifit != undefined)
            $scope.benifit = $scope.form.benifit.split("\n");

        $scope.disable = false;

        $scope.job_des = $scope.form.job_des;
        $scope.trustAsHtml = function (text) {
            return $sce.trustAsHtml(text);
        };
    }
    $scope.img_name;
    var user_img;
    $scope.setImage = function (files) {
        $scope.form.user_image = files[0];
        user_img = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.user_image = e.target.result;
        }

        $scope.img_name = files[0].name;
        $scope.$apply();
        reader.readAsDataURL(files[0]);
    }

    $scope.addJob = function () {
        $scope.loading = true;
        $scope.hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {

            if (tokenizeErr) {
                //$scope.paymentErrorMessage = true;
                return;
            }

            //$scope.paymentErrorMessage = false;

            $scope.form.payment_method_nonce = payload.nonce;
            $scope.form.currency = $scope.form.currency.sy;
            $scope.form.timezone = $scope.form.timezone.utc;
            var user_image = user_img;

            delete $scope.form.user_image;

            $scope.form.total = $scope.total;
            if ($scope.form.key_skills != undefined) {
                $scope.form.key_skills = $scope.key_skills.toString();
                $scope.form.key_skills = $scope.form.key_skills.split(' ,');
                $scope.form.key_skills = $scope.form.key_skills.slice(0, -1).reverse().join(",");
            }
            $scope.id;

            $http.post('/api/addjob', $scope.form).
                then(function (id, status) {
                    $scope.id = JSON.stringify(id.data);
                    if (user_image) {
                        var formData = new FormData();
                        var companyPic = new Array();

                        formData.append("companyPic", user_image);
                        formData.append("id", $scope.id);
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", "/api/addFile");
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                                $http.post('/api/postjob', $scope.form).then(function (id, status) {
                                    $http.post('/api/nodemailer', { category: $scope.form.category, id: $scope.id }).then(function (id, status) {
                                        $scope.loading = false;
                                        $scope.pay_page = false;
                                        $scope.job_successfull = true;
                                    });
                                });
                            }
                        };
                        xhr.send(formData);
                    }
                    else {
                        $http.post('/api/postjob', $scope.form).then(function (id, status) {
                            $http.post('/api/nodemailer', { category: $scope.form.category, id: $scope.id }).then(function (id, status) {
                                $scope.loading = false;
                                $scope.pay_page = false;
                                $scope.job_successfull = true;
                            });
                        });
                    }
                });
        });
    };

    $scope.key_skills;
    $scope.skill = 0;
    /*call back method for chip*/
    $scope.render = function (val) {
        $scope.key_skills = val + " ," + $scope.key_skills;
        $scope.skill = $scope.skill + 1;
        return { name: val }
    };

    /*call back method for chip delete*/
    $scope.deleteChip = function (val) {
        $scope.i = $scope.key_skills.indexOf(val);
        $scope.key_skills = $scope.key_skills.toString();
        $scope.key_skills = $scope.key_skills.split(",");
        $scope.key_skills.splice($scope.i, 1);
        $scope.key_skills = $scope.key_skills.toString();
        $scope.key_skills = $scope.key_skills.split(",");
        return true;
    }
    $scope.redirectCreate = function () {
        $scope.create_page = true;
        $scope.review_page = false;
        $scope.pay_page = false;
    }
    $scope.redirectReview = function () {
        $scope.submitPost();

        $scope.create_page = false;
        $scope.review_page = true;
        $scope.pay_page = false;
    }
    $scope.redirectPayment = function () {
        $scope.pay_page = true;
        $scope.review_page = false;
        $scope.create_page = false;
    }
}]);

angular.module('ViewJob').controller('ViewJobCtrl', ['$scope', '$http', '$location', '$route', '$window', '$sce', function ($scope, $http, $location, $route, $window, $sce) {
    $scope.img_path = img_path;
    $scope.data = $window.job_data;
    $scope.data = JSON.parse($scope.data);
    $scope.price = $window.baseprice;
    $scope.price = JSON.parse($scope.price);
    $scope.baseprice = $scope.price[0].base_price;
    $scope.img_path = $scope.price[0].img_path;
    $scope.featured_job_price = $scope.price[0].featured_job_price;
    $scope.highlighted_job_price = $scope.price[0].highlighted_job_price;
    $scope.timezone = [
        { utc: 'UTC-12:00' },
        { utc: 'UTC-11:00' },
        { utc: 'UTC-10:00' },
        { utc: 'UTC-09:30' },
        { utc: 'UTC-09:00' },
        { utc: 'UTC-08:00' },
        { utc: 'UTC-07:00' },
        { utc: 'UTC-06:00' },
        { utc: 'UTC-05:00' },
        { utc: 'UTC-04:00' },
        { utc: 'UTC-03:30' },
        { utc: 'UTC-03:00' },
        { utc: 'UTC-02:00' },
        { utc: 'UTC-01:00' },
        { utc: 'UTC±00:00' },
        { utc: 'UTC+01:00' },
        { utc: 'UTC+02:00' },
        { utc: 'UTC+03:00' },
        { utc: 'UTC+03:30' },
        { utc: 'UTC+04:00' },
        { utc: 'UTC+04:30' },
        { utc: 'UTC+05:00' },
        { utc: 'UTC+05:30' },
        { utc: 'UTC+05:45' },
        { utc: 'UTC+06:00' },
        { utc: 'UTC+06:30' },
        { utc: 'UTC+07:00' },
        { utc: 'UTC+08:00' },
        { utc: 'UTC+08:30' },
        { utc: 'UTC+08:45' },
        { utc: 'UTC+09:00' },
        { utc: 'UTC+09:30' },
        { utc: 'UTC+10:00' },
        { utc: 'UTC+10:30' },
        { utc: 'UTC+11:00' },
        { utc: 'UTC+12:00' },
        { utc: 'UTC+12:45' },
        { utc: 'UTC+13:00' },
        { utc: 'UTC+14:00' }];

    $scope.country = [
        { sy: "USD" },
        { sy: "AFN" },
        { sy: "ALL" },
        { sy: "DZD" },
        { sy: "ARS" },
        { sy: "AUD" },
        { sy: "ATS" },
        { sy: "BSD" },
        { sy: "BHD" },
        { sy: "BDT" },
        { sy: "BBD" },
        { sy: "BEF" },
        { sy: "BMD" },
        { sy: "BRL" },
        { sy: "BGN" },
        { sy: "CAD" },
        { sy: "XOF" },
        { sy: "XAF" },
        { sy: "CLP" },
        { sy: "CNY" },
        { sy: "CNY" },
        { sy: "COP" },
        { sy: "XPF" },
        { sy: "CRC" },
        { sy: "HRK" },
        { sy: "CYP" },
        { sy: "CZK" },
        { sy: "DKK" },
        { sy: "DEM" },
        { sy: "DOP" },
        { sy: "NLG" },
        { sy: "XCD" },
        { sy: "EGP" },
        { sy: "EEK" },
        { sy: "EUR" },
        { sy: "FJD" },
        { sy: "FIM" },
        { sy: "FRF" },
        { sy: "DEM" },
        { sy: "XAU" },
        { sy: "GRD" },
        { sy: "GTQ" },
        { sy: "NLG" },
        { sy: "HKD" },
        { sy: "HUF" },
        { sy: "ISK" },
        { sy: "XDR" },
        { sy: "INR" },
        { sy: "IDR" },
        { sy: "IRR" },
        { sy: "IQD" },
        { sy: "IEP" },
        { sy: "ILS" },
        { sy: "ITL" },
        { sy: "JMD" },
        { sy: "JPY" },
        { sy: "JOD" },
        { sy: "KES" },
        { sy: "KRW" },
        { sy: "KWD" },
        { sy: "LBP" },
        { sy: "LUF" },
        { sy: "MYR" },
        { sy: "MTL" },
        { sy: "MUR" },
        { sy: "MXN" },
        { sy: "MAD" },
        { sy: "NLG" },
        { sy: "NZD" },
        { sy: "NOK" },
        { sy: "OMR" },
        { sy: "PKR" },
        { sy: "XPD" },
        { sy: "PEN" },
        { sy: "PHP" },
        { sy: "XPT" },
        { sy: "PLN" },
        { sy: "PTE" },
        { sy: "QAR" },
        { sy: "RON" },
        { sy: "ROL" },
        { sy: "RUB" },
        { sy: "SAR" },
        { sy: "XAG" },
        { sy: "SGD" },
        { sy: "SKK" },
        { sy: "SIT" },
        { sy: "ZAR" },
        { sy: "KRW" },
        { sy: "ESP" },
        { sy: "XDR" },
        { sy: "LKR" },
        { sy: "SDD" },
        { sy: "SEK" },
        { sy: "CHF" },
        { sy: "TWD" },
        { sy: "THB" },
        { sy: "TTD" },
        { sy: "TND" },
        { sy: "TRY" },
        { sy: "AED" },
        { sy: "GBP" },
        { sy: "VEB" },
        { sy: "VND" },
        { sy: "ZMK" }];

    $scope.index = -1;
    $scope.trustAsHtml = function (text) {
        return $sce.trustAsHtml(text);
    };

    $scope.authTwitter = function () {
        $http.post('/api/twitterauth/', {}).
            then(function (status) {
                alert("Twitter tokens are updated.");
            });
    }

    $scope.tinymceModel;
    $scope.tinymceOptions = {
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste"
        ],
        menubar: false,
        toolbar: 'bold italic underline | bullist numlist',
        advlist_bullet_styles: "square"
    };
    $scope.deletePost = function (obj, id) {
        for ($scope.i = 0; $scope.i < $scope.data.length; $scope.i++) {
            if ($scope.data[$scope.i].id == id) {
                $scope.index = $scope.i;
                $scope.data.splice($scope.i, 1);
                break;
            }
        }
        $http.get('/api/deletejob/' + id).
            then(function (id, status) {
                $location.path('/');
            });
    }
    $scope.index;
    $scope.div_valid;
    $scope.editPost = function (id) {
        $scope.id = id;
        for ($scope.i = 0; $scope.i < $scope.data.length; $scope.i++) {
            if ($scope.data[$scope.i].id == id) {
                $scope.index = $scope.i;
                $scope.job = $scope.data.slice($scope.i, $scope.i + 1);
                $scope.job = angular.copy($scope.job[0]);
                $scope.job.feature_job = $scope.job.feature_job == 1 ? true : false;
                $scope.job.highlight_job = $scope.job.highlight_job == 1 ? true : false;
            }
        }
        $scope.key_skill = $scope.job.key_skills;
        for ($scope.i = 0; $scope.i < $scope.country.length; $scope.i++) {
            if ($scope.country[$scope.i].sy == $scope.job.currency) {
                $scope.job.currency_val = $scope.country[$scope.i];
                break;
            }
        }
        for ($scope.i = 0; $scope.i < $scope.timezone.length; $scope.i++) {
            if ($scope.timezone[$scope.i].utc == $scope.job.timezone) {
                $scope.time_zone = $scope.timezone[$scope.i];
                break;
            }
        }

        // call back method for chip
        $scope.render = function (val) {
            if ($scope.key_skill == null || $scope.key_skill.length == 0)
                $scope.key_skill = val;
            else
                $scope.key_skill = $scope.key_skill + "," + val;
            if ($scope.key_skill != null && $scope.key_skill.length > 1)
                $scope.key_skill = $scope.key_skill.split(",");
            return val;
        };
        $scope.deleteChips = function (val) {
            $scope.i = $scope.key_skill.indexOf(val);
            if (val != "")
                $scope.key_skill.splice($scope.i, 1);
            $scope.key_skill = $scope.key_skill.toString();
            $scope.val = { 'name': val };

            if ($scope.key_skill != null && $scope.key_skill.length > 1)
                $scope.key_skill = $scope.key_skill.split(",");

            if ($scope.key_skill[0] == null) {
                $scope.key_skill.slice(0, 1);
            }
            return true;
        }
        if ($scope.job.how_apply != undefined) {
            if ($scope.job.how_apply != null && $scope.job.how_apply.length > 0)
                $scope.div_valid = true;
            else
                $scope.div_valid = false;
        }
        $location.path('/edit/' + $scope.id);
    }
    $scope.edit_price = function (val1, val2, val3) {
        $http.post('/api/editprice/', { base_price: val1, highlighted_job_price: val2, featured_job_price: val3 }).
            then(function (status) {
                $location.path('/');
                $window.location.reload();
            });
    }
    $scope.update = function (a) {
        $scope.job.timezone = a.utc;
    }
    $scope.edit_text = function () {
        if ($("#how_apply").text().length > 0)
            $scope.div_valid = true;
        else
            $scope.div_valid = false;
    }
    $scope.saveJob = function () {
        $scope.job.how_apply = document.getElementById("how_apply").innerHTML;

        if ($scope.job.email_to == undefined)
            $scope.job.email_to = null;
        if ($scope.job.currency_val != undefined)
            $scope.job.currency = $scope.job.currency_val.sy
        if ($scope.key_skill != undefined)
            $scope.job.key_skills = $scope.key_skill.toString();
        $http.post('/api/editjob/' + $scope.job.id, $scope.job).
            then(function (status) {
                if ($scope.job.key_skills != undefined)
                    $scope.job.key_skills = $scope.job.key_skills.toString();
                if ($scope.job.key_skills != null && $scope.job.key_skills.length > 1)
                    $scope.job.key_skills = $scope.job.key_skills.split(",");
                $scope.data[$scope.index] = $scope.job;
                $location.path('/');
            });
    }
    $scope.form = {};

}]);