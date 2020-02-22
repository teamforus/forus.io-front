let newSignUpComponent = function(
    $q,
    $state,
    $stateParams,
    $scope,
    $rootScope,
    $timeout,
    $filter,
    $interval,
    OrganizationService,
    OfficeService,
    IdentityService,
    CredentialsService,
    FormBuilderService,
    MediaService,
    OrganizationEmployeesService,
    SmsService,
    DemoTransactionService,
    ProviderFundService,
    AuthService,
    ModalService
) {
    let $ctrl = this;

    /*
     step 1 - General information
     step 2 - Scan QR Code
     step 3 - Manage organization details
     step 4 - Manage offices
     step 5 - Manage employees
     */
    $ctrl.step = 1;
    $ctrl.organizationStep = false;
    $ctrl.signedIn = AuthService.hasCredentials();
    $ctrl.showLoginBlock = false;
    $ctrl.organization = null;
    $ctrl.offices = [];
    $ctrl.employees = [];
    $ctrl.sentSms = false;
    $ctrl.fundsAvailable = [];

    let has_app = false;
    let orgMediaFile = false;
    let waitingSms = false;
    let timeout;
    let officeMediaFile = false;

    $ctrl.afterInit = () => {};

    let progressStorage = new(function() {
        this.init = () => {
            if ($ctrl.signedIn) {
                let step = this.getStep();

                if (step) {
                    this.setStep(step);
                } else {
                    this.setStep(3);
                }
            } else {
                this.setStep(1);
            }
        };

        this.setStep = (step) => {
            localStorage.setItem('sign_up_form.step', step);

            if (step == 8) {
                DemoTransactionService.store().then(res => {
                    $ctrl.demoToken = res.data.data.token;

                    let interval = $interval(() => {
                        DemoTransactionService.read($ctrl.demoToken).then(res => {

                            if (res.data.data.state != 'pending') {
                                $interval.cancel(interval);

                                $ctrl.setStep(9);
                            }
                        });
                    }, 1000);
                });
            }

            $ctrl.step = step;
        };

        this.getStep = () => {
            let step = parseInt(localStorage.getItem('sign_up_form.step'));

            if (step >= 3) {
                let organisation_data = {};

                if (localStorage.getItem('sign_up_form.organizationForm') != null) {
                    organisation_data = JSON.parse(
                        localStorage.getItem('sign_up_form.organizationForm')
                    );
                }

                if (step == 3) {
                    $ctrl.organizationForm.values = organisation_data;
                } else {
                    $ctrl.organization = organisation_data;

                    loadOrganizationOffices($ctrl.organization);
                    loadEmployees($ctrl.organization);
                    loadAvailableFunds($ctrl.organization);
                }
            }

            return isNaN(step) ? null : step;
        };

        this.clear = () => {
            localStorage.removeItem('sign_up_form.step');
            localStorage.removeItem('sign_up_form.signUpForm');
            localStorage.removeItem('sign_up_form.organizationForm');
        };
    })();

    $ctrl.chageBusinessType = (value) => {
        $ctrl.organizationForm.values.business_type_id = value.id;
    };

    $ctrl.buildOfficeForm = (values) => {
        return FormBuilderService.build(values, async (form) => {
            form.lock();

            let promise;

            if (officeMediaFile) {
                let res = await MediaService.store('office_photo', officeMediaFile);

                $ctrl.officeMedia = res.data.data;
                form.values.media_uid = $ctrl.officeMedia.uid;

                officeMediaFile = false;
            } else {
                delete form.values.media_uid;
            }

            if (form.values.id) {
                promise = OfficeService.update(
                    $ctrl.organization.id,
                    form.values.id,
                    form.values
                )
            } else {
                promise = OfficeService.store(
                    $ctrl.organization.id,
                    form.values
                )
            }

            promise.then((res) => {
                if (!form.values.id) {
                    $ctrl.offices.push(res.data.data);
                } else {
                    // let office = $ctrl.offices.filter(
                    //     (office, index) => office.id == form.values.id
                    // )[0];

                    // for(let value in form.values) {
                    //     office[value] = form.values[value];
                    // }

                    //let offices = angular.copy($ctrl.offices);

                    $ctrl.offices.forEach(
                        (office, index) => {
                            if (office.id == form.values.id) {
                                $ctrl.offices[index] = res.data.data;
                            }
                        }
                    );
                }

                $ctrl.enableSaveOfficeBtn = false;
                $ctrl.showAddOfficeBtn  = true;
                $ctrl.showCancelBtn  = false;
            }, (res) => {
                form.errors = res.data.errors;
                form.unlock();

                $ctrl.enableSaveOfficeBtn = true;
                $ctrl.showAddOfficeBtn  = false;
                $ctrl.showCancelBtn  = true;
            });
        });
    };

    $ctrl.buildEmployeeForm = (values) => {
        return FormBuilderService.build(values, async (form) => {
            form.lock();

            let promise;

            // Role operation_officer
            form.values.roles = [5];

            if (form.values.id) {
                promise = OrganizationEmployeesService.update(
                    $ctrl.organization.id,
                    form.values.id,
                    form.values
                )
            } else {
                promise = OrganizationEmployeesService.store(
                    $ctrl.organization.id,
                    form.values
                )
            }

            promise.then((res) => {
                if (!form.values.id) {
                    $ctrl.employees.push(res.data.data);
                } else {
                    let employee = $ctrl.employees.filter(
                        (employee) => employee.id == form.values.id
                    )[0];

                    for(let value in form.values) {
                        employee[value] = form.values[value];
                    }
                }

                $ctrl.enableSaveEmployeeBtn = false;
                $ctrl.enableAddEmployeeBtn  = true;
            }, (res) => {
                form.errors = res.data.errors;
                form.unlock();

                $ctrl.enableSaveEmployeeBtn = true;
                $ctrl.enableAddEmployeeBtn  = false;
            });
        });
    };

    $ctrl.$onInit = function() {
        $ctrl.requestAuthQrToken();

        $ctrl.signUpForm = FormBuilderService.build({
            pin_code: "1111",
        }, function(form) {
            let formValues = angular.copy(form.values);

            if (formValues.records) {
                delete formValues.records.primary_email_confirmation;
            }

            form.lock();

            return IdentityService.make(formValues);
        });

        $ctrl.organizationForm = FormBuilderService.build({
            "website": 'https://',
        }, (form) => {
            if (form.values) {
                if (form.values.iban != form.values.iban_confirmation) {
                    return $q((resolve, reject) => {
                        reject({
                            data: {
                                errors: {
                                    'iban_confirmation': [$filter('translate')('validation.iban_confirmation')]
                                }
                            }
                        });
                    });
                }
            }

            form.lock();

            let values = JSON.parse(JSON.stringify(form.values));

            if (typeof(values.iban) === 'string') {
                values.iban = values.iban.replace(/\s/g, '');
            }

            return OrganizationService.store(values);
        });

        $scope.phoneForm = FormBuilderService.build({
            phone: "06"
        }, function(form) {
            form.lock();

            let phone = "+31" + form.values.phone.substr(1);
            let values = {
                phone: phone,
                title: $filter('translate')('sign_up_new.sms.body')
            };

            waitingSms = true;

            return SmsService.send(
                values
            );
        });

        $ctrl.officeForm = $ctrl.buildOfficeForm({});

        if ($ctrl.office && $ctrl.office.photo) {
            MediaService.read($ctrl.office.photo.uid).then((res) => {
                $ctrl.officeMedia = res.data.data;
            });
        }

        $ctrl.businessType = $ctrl.businessTypes.filter(
            option => option.id == $ctrl.organizationForm.values.business_type_id
        )[0] || null;

        progressStorage.init();

        $scope.$on('$destroy', progressStorage.destroy);

        $ctrl.afterInit();
    };

    $ctrl.deleteOffice = (office) => {
        OfficeService.destroy(office.organization_id, office.id).then((res) => {
            $ctrl.offices = $ctrl.offices.filter((_office) => {
                return typeof _office.id == 'undefined' || _office.id != office.id;
            });
        });
    };

    $ctrl.editOffice = (office) => {
        if (office.schedule) {
            office.scheduleDetails = [];

            office.schedule.forEach((weekDay, index) => {
                office.scheduleDetails.push({
                    is_opened : true
                });
            });
        }

        $ctrl.officeForm.values = angular.copy(office);

        $ctrl.enableSaveOfficeBtn = true;
        $ctrl.showAddOfficeBtn  = false;
        $ctrl.showCancelBtn  = true;
    };

    $ctrl.addOffice = () => {
        if (!Array.isArray($ctrl.offices)) {
            $ctrl.offices = [];
        }

        $ctrl.officeForm = $ctrl.buildOfficeForm();

        $ctrl.enableSaveOfficeBtn = true;
        $ctrl.showAddOfficeBtn  = false;
        $ctrl.showCancelBtn  = true;
    };

    $ctrl.cancelOfficeEdit = () => {
        $ctrl.enableSaveOfficeBtn = false;
        $ctrl.showAddOfficeBtn  = true;
        $ctrl.showCancelBtn  = false;
    }

    $ctrl.saveOffice = () => {
        $ctrl.officeForm = $ctrl.buildOfficeForm($ctrl.officeForm.values);

        $ctrl.officeForm.submit();
    };

    $ctrl.syncTwoDatesHours = (date1, date2) => {
        date1.start_time = date2.start_time;
        date1.end_time   = date2.end_time;
        date1.break_start_time = date2.break_start_time;
        date1.break_end_time   = date2.break_end_time;
    }

    $ctrl.setSameWeekDayHours = (week_days) => {
        if ((week_days && $ctrl.officeForm.values.same_hours) ||
            (!week_days && $ctrl.officeForm.values.weekend_same_hours)
        ) {
            $ctrl.weekDays.forEach((weekDayKey, index) => {
                if ((week_days && index <= 4) || (!week_days && index >= 5)) {
                    if (typeof $ctrl.officeForm.values.scheduleDetails == 'undefined') {
                        $ctrl.officeForm.values.scheduleDetails = {};
                    }

                    if (typeof $ctrl.officeForm.values.scheduleDetails[index] == 'undefined') {
                        $ctrl.officeForm.values.scheduleDetails[index] = {};
                    }

                    $ctrl.officeForm.values.scheduleDetails[index].is_opened = true;
                }
            });
        }
    };

    $ctrl.syncWithFirstRecord = (week_days) => {
        if (((week_days && $ctrl.officeForm.values.same_hours) ||
            (!week_days && $ctrl.officeForm.values.weekend_same_hours)) &&
            typeof $ctrl.officeForm.values.schedule != 'undefined' &&
            typeof $ctrl.officeForm.values.schedule[week_days ? 0 : 5] != 'undefined'
        ) {
            let time = $ctrl.officeForm.values.schedule[week_days ? 0 : 5];

            $ctrl.weekDays.forEach((weekDayKey, index) => {
                if (typeof $ctrl.officeForm.values.scheduleDetails != 'undefined' &&
                    typeof $ctrl.officeForm.values.scheduleDetails[index] != 'undefined' &&
                    $ctrl.officeForm.values.scheduleDetails[index].is_opened &&
                    (week_days && index <= 4) || (!week_days && index >= 5)
                ) {
                    if (typeof $ctrl.officeForm.values.schedule[index] == 'undefined') {
                        $ctrl.officeForm.values.schedule[index] = {};
                    }

                    $ctrl.syncTwoDatesHours($ctrl.officeForm.values.schedule[index], time);
                }
            });
        }
    };

    $ctrl.syncTime = (modifiedFieldIndex) => {
        let time = $ctrl.officeForm.values.schedule[modifiedFieldIndex],
            week_days = modifiedFieldIndex <= 4;

        $ctrl.weekDays.forEach((weekDayKey, index) => {
            if (typeof $ctrl.officeForm.values.scheduleDetails != 'undefined' &&
                typeof $ctrl.officeForm.values.scheduleDetails[index] != 'undefined' &&
                $ctrl.officeForm.values.scheduleDetails[index].is_opened &&
                (week_days && index <= 4) || (!week_days && index >= 5)
            ) {
                if ((week_days && !$ctrl.officeForm.values.same_hours) ||
                    (!week_days && !$ctrl.officeForm.values.weekend_same_hours)
                ) {
                    return;
                }

                if (typeof $ctrl.officeForm.values.schedule[index] == 'undefined') {
                    $ctrl.officeForm.values.schedule[index] = {};
                }

                $ctrl.syncTwoDatesHours($ctrl.officeForm.values.schedule[index], time);
            }
        });
    };

    $ctrl.setSameHours = (week_days = true) => {
        $timeout(() => {
            $ctrl.setSameWeekDayHours(week_days);
            $ctrl.syncWithFirstRecord(week_days);
        }, 0);
    };

    let transformHours = (hours) => {
        if ((hours + '').length == 1 && hours > 2) {
            hours = 2;
        }

        if (hours < 0) {
            hours = 0;
        } else if (hours > 23) {
            hours = 23;
        }

        return hours;
    }

    let transformMinutes = (minutes) => {
        if ((minutes + '').length == 1 && minutes > 5) {
            minutes = 5;
        }

        if (minutes < 0) {
            minutes = 0;
        } else if (minutes > 59) {
            minutes = 59;
        }

        return minutes;
    }

    let transformTime = (time) => {
        let time_arr = time.split(':');

        if (time_arr.length > 1) {
            let hours = transformHours(time_arr[0]);
            let minutes = transformMinutes(time_arr[1]);

            return [hours, minutes].join(':');
        } else {
            if (time.length <= 2) {
                return transformHours(time);
            } else {
                return transformHours(time.substr(0, 2)) + ':' +
                    transformMinutes(time.substr(2, time.length - 2));
            }
        }
    }

    $ctrl.syncHours = (modifiedFieldIndex, key) => {
        $timeout(() => {
            let schedule = $ctrl.officeForm.values.schedule;
            let time = schedule[modifiedFieldIndex][key];

            schedule[modifiedFieldIndex][key] = transformTime(time);

            $ctrl.syncTime(modifiedFieldIndex);
        }, 0);
    };

    $ctrl.toggleOpened = (index) => {
        $timeout(() => {
            let schedule = $ctrl.officeForm.values.scheduleDetails;

            if (typeof schedule[index] == 'undefined') {
                schedule[index] = {};
            }

            $ctrl.officeForm.values.scheduleDetails[index].is_opened !=
                schedule[index].is_opened;

            if (!schedule[index].is_opened ||
                typeof $ctrl.officeForm.values.schedule == 'undefined' ||
                typeof $ctrl.officeForm.values.schedule[index] == 'undefined'
            ) {
                return;
            }

            delete $ctrl.officeForm.values.schedule[index];
        }, 0);
    };

    $ctrl.saveEmployee = () => {
        ModalService.open('employeeAddConfirmation', {
            email: $ctrl.employeeForm.values.email,

            success: (data) => {
                if (data.allow) {
                    $ctrl.employeeForm = $ctrl.buildEmployeeForm($ctrl.employeeForm.values);

                    $ctrl.employeeForm.submit();
                }
            }
        });
    };

    $ctrl.editEmployee = (employee) => {
        $timeout(function() {
            $ctrl.employeeForm.values = angular.copy(employee);

            $ctrl.enableSaveEmployeeBtn = true;
            $ctrl.enableAddEmployeeBtn  = false;
        }, 500);
    };

    $ctrl.deleteEmployee = function(employee) {
        OrganizationEmployeesService.destroy($ctrl.organization.id, employee.id).then((res) => {
            $ctrl.employees = $ctrl.employees.filter((_employee) => {
                return _employee.id == 'undefined' ||_employee.id != employee.id;
            });
        });
    };

    $ctrl.changeHasApp = function() {
        has_app = !has_app;
    };

    let loadOrganizationOffices = (organization) => {
        OfficeService.list(
            organization.id
        ).then((res) => {
            if (res.data.data.length) {
                $ctrl.offices = res.data.data;
            } else {
                $ctrl.addOffice();
            }
        });
    };

    let loadEmployees = (organization) => {
        OrganizationEmployeesService.list(
            organization.id
        ).then((res) => {
            if (res.data.data.length) {
                $ctrl.employees = res.data.data;
            } else {
                $ctrl.addEmployee();
            }
        });
    };

    $ctrl.getFundFilters = () => {
        $ctrl.fundOrganizations = [];
        $ctrl.fundLabels = [];

        let processedOrganizations = [];
        let processedLabels = [];
        
        $ctrl.fundsAvailable.forEach(fund => {
            if (processedOrganizations.indexOf(fund.organization.id) == -1) {
                $ctrl.fundOrganizations.push({
                    id: fund.organization.id,
                    name: fund.organization.name
                });

                processedOrganizations.push(fund.organization.id);
            }

            fund.tags.forEach(tag => {
                if (processedLabels.indexOf(tag.id) == -1) {
                    $ctrl.fundLabels.push({
                        id: tag.id,
                        key: tag.key,
                        name: tag.name
                    });

                    processedLabels.push(tag.id);
                }
            });
        });

        $ctrl.fundOrganizations = $ctrl.fundOrganizations.map(fundOrganization => {
            fundOrganization.id_str = fundOrganization.id += '';

            return fundOrganization;
        });

        $ctrl.fundOrganizations.unshift({ 
            id_str: 'null',
            name: $filter('translate')('sign_up_new.filters.options.all_organizations') 
        });
        $ctrl.fundOrganization = $ctrl.fundOrganization ? $ctrl.fundOrganization : 'null';

        $ctrl.fundLabels.unshift({ 
            key: 'null',
            name: $filter('translate')('sign_up_new.filters.options.all_labels') 
        });
        $ctrl.fundLabel = $ctrl.fundLabel ? $ctrl.fundLabel : 'null';
    }

    $ctrl.filterFunds = (organization = $ctrl.organization) => {
        let organization_id = $ctrl.fundOrganization && $ctrl.fundOrganization != 'null' ?
                $ctrl.fundOrganization : $stateParams.organization_id;
        let label = $ctrl.fundLabel && $ctrl.fundLabel != 'null' ?
                $ctrl.fundLabel : $stateParams.tag;
        let fund_id = $stateParams.fund_id,
            search_params = {};

        if (organization_id) {
            search_params.organization_id = organization_id;
        }    
        if (label) {
            search_params.tag = label;
        }    
        if (fund_id) {
            search_params.fund_id = fund_id;
        }

        return ProviderFundService.listAvailableFunds(
            organization.id, search_params
        ).then(res => {
            let fundsAvailable = res.data.data;

            if ($stateParams.fundId && fundsAvailable.length > 0) {
                let targetFund = fundsAvailable.filter(
                    fund => fund.id == $stateParams.fundId
                )[0] || null;

                if (targetFund) {
                    return ProviderFundService.applyForFund(
                        organization.id,
                        targetFund.id
                    ).then($ctrl.next);
                }
            }

            $ctrl.fundsAvailable = fundsAvailable;
        });
    }

    let loadAvailableFunds = (organization) => {
        $ctrl.filterFunds(organization).then(() => {
            if ($ctrl.showFilters = !$stateParams.organization_id && !$stateParams.tag) {
                $ctrl.getFundFilters();
            }
        });
    };

    $ctrl.setStep = (step) => {
        if (step <= $ctrl.totalSteps.length) {
            progressStorage.setStep(step);
        } else {
            progressStorage.clear();
        }
    };

    $ctrl.setOrganization = (organization) => {
        $ctrl.organization = organization;

        loadOrganizationOffices(organization);
        loadEmployees(organization);
    };

    $ctrl.enableSaveOfficeBtn = false;
    $ctrl.showAddOfficeBtn = true;

    $ctrl.next = async function() {
        if ($ctrl.organizationStep && !$ctrl.signedIn && $ctrl.step > 1) {
            $ctrl.signUpForm.submit().then((res) => {
                CredentialsService.set(res.data.access_token);
                $ctrl.setStep($ctrl.step + 1);

                $ctrl.signedIn = true;
            }, (res) => {
                $ctrl.signUpForm.unlock();
                $ctrl.signUpForm.errors = res.data.errors;
            });

            return;
        }

        if ($ctrl.step == 1) {
            $ctrl.setStep($ctrl.step + 1);
        } else if ($ctrl.step == 2) {

            if (!waitingSms) {
                $scope.phoneForm.submit().then((res) => {
                    $ctrl.sentSms = true;
                }, (res) => {
                    $scope.phoneForm.unlock();
                    $scope.phoneForm.errors = res.data.errors;

                    if (res.status == 429) {
                        $scope.phoneForm.errors = {
                            phone: [$filter('translate')('sign_up_new.sms.error.try_later')]
                        };
                    }
                });
            }
        } else if ($ctrl.step == 3) {
            let authRes;

            if (!$ctrl.signedIn) {
                authRes = await $ctrl.signUpForm.submit().catch((res) => {
                    $ctrl.signUpForm.unlock();
                    $ctrl.signUpForm.errors = res.data.errors;
                    $ctrl.organizationStep = true;

                    $ctrl.setStep(2);
                });

                if (typeof(authRes) !== 'undefined') {
                    CredentialsService.set(authRes.data.access_token);
                    $ctrl.signedIn = true;
                } else {
                    return;
                }
            }

            if (orgMediaFile) {
                $ctrl.organizationForm.values.media_uid = (
                    await MediaService.store('organization_logo', orgMediaFile)
                ).data.data.uid;

                orgMediaFile = false;
            }

            $ctrl.organizationForm.submit().then((res) => {
                $rootScope.$broadcast('auth:update');

                $ctrl.setOrganization(res.data.data);
                if ($ctrl.step == 3 && $ctrl.organizationForm.values) {
                    localStorage.setItem('sign_up_form.organizationForm', JSON.stringify(
                        res.data.data
                    ));
                }

                $ctrl.setStep(4);
            }, (res) => {
                $ctrl.organizationForm.errors = res.data.errors;
                $ctrl.organizationForm.unlock();
            });

        } else if ($ctrl.step >= 4) {
            $ctrl.setStep($ctrl.step + 1);

            if ($ctrl.step == 6) {
                loadAvailableFunds($ctrl.organization);
            }
        }
    };

    $ctrl.back = function() {
        if ($ctrl.signedIn && $ctrl.step <= 4) {
            return;
        }

        $ctrl.setStep($ctrl.step - 1);

        loginQrBlock.hide();
    };

    $ctrl.showLoginQrCode = function() {
        $ctrl.requestAuthQrToken();

        loginQrBlock.show();
    };

    let loginQrBlock = new(function() {
        this.show = () => {
            $ctrl.showLoginBlock = true;
        };

        this.hide = () => {
            $ctrl.showLoginBlock = false;
        };
    });

    $ctrl.applyAccessToken = function(access_token) {
        CredentialsService.set(access_token);
        $rootScope.$broadcast('auth:update');

        if ($ctrl.step == 2) {
            $ctrl.setStep(3);
        } else {
            $ctrl.next();
        }

        $ctrl.signedIn = true;
    };

    $ctrl.checkAccessTokenStatus = (type, access_token) => {
        IdentityService.checkAccessToken(access_token).then((res) => {
            if (res.data.message == 'active') {
                $ctrl.applyAccessToken(access_token);
            } else if (res.data.message == 'pending') {
                timeout = $timeout(function() {
                    $ctrl.checkAccessTokenStatus(type, access_token);
                }, 2500);
            } else {
                document.location.reload();
            }
        });
    };

    $ctrl.finish = () => {
        $state.go('organizations');
    }

    $ctrl.requestAuthQrToken = () => {
        IdentityService.makeAuthToken().then((res) => {
            $ctrl.authToken = res.data.auth_token;

            $ctrl.checkAccessTokenStatus('token', res.data.access_token);
        }, console.log);
    };

    $ctrl.selectPhoto = (file) => {
        orgMediaFile = file;
    };

    $ctrl.selectOfficePhoto = (file) => {
        officeMediaFile = file;
    };

    $scope.authorizePincodeForm = FormBuilderService.build({
        auth_code: "",
    }, function(form) {
        form.lock();

        return IdentityService.authorizeAuthCode(
            form.values.auth_code
        );
    });

    $ctrl.$onDestroy = function() {
        $timeout.cancel(timeout);
    };

    $ctrl.readMoreFields = [
        $filter('translate')('sign_up_new.labels.smartphone'),
        $filter('translate')('sign_up_new.labels.phone_number'),
        $filter('translate')('sign_up_new.labels.email'),
        $filter('translate')('sign_up_new.labels.organization_email'),
        $filter('translate')('sign_up_new.labels.organization_iban'),
        $filter('translate')('sign_up_new.labels.room'),
        $filter('translate')('sign_up_new.labels.vat'),
        $filter('translate')('sign_up_new.labels.employee_emails'),
    ];

    $ctrl.weekDays = Object.values(OfficeService.scheduleWeekDaysExplicit());

    $ctrl.totalSteps = Array.from({length: 9}, (v, k) => k + 1);
    $ctrl.shownSteps = $ctrl.totalSteps.filter(step => step > 1 && step <= 6);

    $ctrl.goToMain = () => {
        $state.go('home');
    }
};

module.exports = {
    bindings: {
        businessTypes: '<',
    },
    controller: [
        '$q',
        '$state',
        '$stateParams',
        '$scope',
        '$rootScope',
        '$timeout',
        '$filter',
        '$interval',
        'OrganizationService',
        'OfficeService',
        'IdentityService',
        'CredentialsService',
        'FormBuilderService',
        'MediaService',
        'OrganizationEmployeesService',
        'SmsService',
        'DemoTransactionService',
        'ProviderFundService',
        'AuthService',
        'ModalService',
        newSignUpComponent
    ],
    templateUrl: 'assets/tpl/pages/new-sign-up.html'
};