const apiUrl = "https://dev.api.forus.io/api/v1";
const outputRoot = "../dist";
const outputRootBackendPublic = outputRoot + '/forus-backend.general';

// Run gulp with custom qdt-env.js file:
// gulp --env-file=./qdt-env.js 
// gulp --env-file=../production.qdt-env.js

let minify = false;
let sourcemap = false;
let baseImplementationKey = 'general';
let autoLogOutTime = 15;
let chatId = false;
let sessions = false;
let google_maps_api_key = '';

const me_app_link = 'https://forus.io/DL';
const ios_ipad_link = 'https://testflight.apple.com/join/gWw1lXyB';
const ios_iphone_link = 'https://testflight.apple.com/join/gWw1lXyB';
const android_link = 'https://media.forus.io/static/me-0.0.5-staging-7-release.apk';

module.exports = (core) => {
    // Config markups
    core.editPlatform('dashboard_markup', (platform) => {
        platform.setEnvData({
            google_maps_api_key: google_maps_api_key,
        });

        return platform;
    });

    core.editPlatform('webshop_markup', (platform) => {
        platform.setEnvData({
            google_maps_api_key: google_maps_api_key,
        });

        return platform;
    });
    
    // Config dashboards
    core.editPlatform('dashboard_general_sponsor', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: baseImplementationKey,
            panel_type: 'sponsor',
            chat_id: chatId,
            support_id: "15870000001861118?orgId=20065804523",
            flags: {},
            sessions: sessions,
            hide_vouchers_csv: false,
            google_maps_api_key: google_maps_api_key,
            android_link: android_link,
            me_app_link: me_app_link,
            ios_ipad_link: ios_ipad_link,
            ios_iphone_link: ios_iphone_link,
            // html5ModeEnabled: true,
            // html5Mode: {
            //    basePath: '/'
            // }
        });

        // Change building path
        platform.setDestRootPath(outputRoot + '/forus-platform.sponsor.general');

        // Change js taks options (enable minification)
        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_general_provider', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: baseImplementationKey,
            panel_type: 'provider',
            support_id: "15870000001861118?orgId=20065804523",
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
            android_link: android_link,
            me_app_link: me_app_link,
            ios_ipad_link: ios_ipad_link,
            ios_iphone_link: ios_iphone_link,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_general_validator', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: baseImplementationKey,
            panel_type: 'validator',
            chat_id: chatId,
            support_id: "15870000001861118?orgId=20065804523",
            hide_voucher_generators: false,
            flags: {
                singleRecordValidation: true
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
            android_link: android_link,
            me_app_link: me_app_link,
            ios_ipad_link: ios_ipad_link,
            ios_iphone_link: ios_iphone_link,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });
    core.editPlatform('dashboard_westerkwartier_provider', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'westerkwartier',
            panel_type: 'provider',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {
                maxProductCount: 20,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_nijmegen_sponsor', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'nijmegen',
            panel_type: 'sponsor',
            chat_id: chatId,
            hide_voucher_generators: false,
            hide_vouchers_csv: false,
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_nijmegen_provider', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'nijmegen',
            panel_type: 'provider',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_nijmegen_validator', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: baseImplementationKey,
            panel_type: 'validator',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_westerkwartier_sponsor', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'westerkwartier',
            panel_type: 'sponsor',
            chat_id: chatId,
            hide_voucher_generators: false,
            hide_vouchers_csv: false,
            flags: {
                maxProductCount: 20,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_berkelland_provider', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'berkelland',
            panel_type: 'provider',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {
                maxProductCount: 20,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_berkelland_sponsor', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'berkelland',
            panel_type: 'sponsor',
            chat_id: chatId,
            hide_voucher_generators: false,
            hide_vouchers_csv: false,
            flags: {
                maxProductCount: 20,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_oostgelre_provider', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'oostgelre',
            panel_type: 'provider',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {
                maxProductCount: 20,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_oostgelre_sponsor', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'oostgelre',
            panel_type: 'sponsor',
            chat_id: chatId,
            hide_voucher_generators: false,
            hide_vouchers_csv: false,
            flags: {
                maxProductCount: 20,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_groningen_sponsor', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'groningen',
            panel_type: 'sponsor',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {
                maxProductCount: 20,
            },
            sessions: sessions,
         });
      
        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });
        return platform;
    });

    core.editPlatform('dashboard_winterswijk_provider', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'winterswijk',
            panel_type: 'provider',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {
                maxProductCount: 20,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_winterswijk_sponsor', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'winterswijk',
            panel_type: 'sponsor',
            chat_id: chatId,
            hide_voucher_generators: false,
            hide_vouchers_csv: false,
            flags: {
                maxProductCount: 20,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_groningen_provider', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'groningen',
            panel_type: 'provider',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {},
            sessions: sessions,
         });      
      
         platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });
      
        return platform;
    });
    core.editPlatform('dashboard_kerstpakket_provider', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'kerstpakket',
            panel_type: 'provider',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_kerstpakket_sponsor', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'kerstpakket',
            panel_type: 'sponsor',
            chat_id: chatId,
            hide_voucher_generators: false,
            hide_vouchers_csv: false,
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_noordoostpolder_provider', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'noordoostpolder',
            panel_type: 'provider',
            chat_id: chatId,
            hide_voucher_generators: false,
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('dashboard_noordoostpolder_sponsor', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'noordoostpolder',
            panel_type: 'sponsor',
            chat_id: chatId,
            hide_voucher_generators: false,
            hide_vouchers_csv: false,
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });


    // Config webshops
    core.editPlatform('webshop_general', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: baseImplementationKey,
            client_type: 'webshop',
            support_id: "15870000001861118?orgId=20065804523",
            log_out_time: autoLogOutTime,
            matomo_site_id: false,
            provider_sign_up_filters: {},
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
            android_link: android_link,
            me_app_link: me_app_link,
            ios_ipad_link: ios_ipad_link,
            ios_iphone_link: ios_iphone_link,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_potjeswijzer', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'potjeswijzer',
            client_type: 'webshop',
            log_out_time: autoLogOutTime,
            matomo_site_id: false,
            flags: {
                logoExtension: '.png',
                fundsMenu: true,    
                fundsMenuIfLoggedOut: true,   
                // menu settings
                meAppMenu: false,
                forusPlatformMenu: false,
                portfolioMenu: false,
                aboutSiteMenu: false,
                signUpMenu: false,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_nijmegen', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_type: 'webshop',
            client_key: 'nijmegen',
            log_out_time: autoLogOutTime,
            matomo_site_id: false,
            flags: {
                showAccountSidebar: false,
                accessibilityPage: true,

                // menu settings
                meAppMenu: false,
                forusPlatformMenu: false,
                portfolioMenu: false,
                aboutSiteMenu: false,

                // voucher settings
                shareProducts: false,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_kerstpakket', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'kerstpakket',
            client_type: 'webshop',
            log_out_time: autoLogOutTime,
            matomo_site_id: false,
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_westerkwartier', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'westerkwartier',
            client_type: 'webshop',
            flags: {
                logoExtension: '.svg',
                showAccountSidebar: false,
                accessibilityPage: true,

                // menu settings
                meAppMenu: false,
                forusPlatformMenu: false,
                portfolioMenu: false,
                aboutSiteMenu: false,

                // home
                providersMenu: true,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_berkelland', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'berkelland',
            client_type: 'webshop',
            log_out_time: autoLogOutTime,
            matomo_site_id: false,
            flags: {
                secondLogo: 'sdoa-logo.svg',
                accessibilityPage: true,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_oostgelre', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'oostgelre',
            client_type: 'webshop',
            log_out_time: autoLogOutTime,
            matomo_site_id: false,
            flags: {
                secondLogo: 'sdoa-logo.svg',
                accessibilityPage: true,
                showAccountSidebar: false,

                // menu settings
                meAppMenu: false,
                forusPlatformMenu: false,
                portfolioMenu: false,
                aboutSiteMenu: false,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_winterswijk', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'winterswijk',
            client_type: 'webshop',
            log_out_time: autoLogOutTime,
            matomo_site_id: false,
            flags: {
                secondLogo: 'sdoa-logo.svg',
                accessibilityPage: true,
                showAccountSidebar: false,

                // menu settings
                meAppMenu: false,
                forusPlatformMenu: false,
                portfolioMenu: false,
                aboutSiteMenu: false,  
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_noordoostpolder', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'noordoostpolder',
            client_type: 'webshop',
            log_out_time: false,
            flags: {
                accessibilityPage: false,
            },
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_groningen', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'groningen',
            client_type: 'webshop',
            log_out_time: false,
            flags: {
                fundsMenu: true,
                accessibilityPage: false,
            },
            sessions: sessions,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_geertruidenberg', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'geertruidenberg',
            client_type: 'webshop',
            log_out_time: false,
            flags: {
                accessibilityPage: false,
            },
            sessions: sessions,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    core.editPlatform('webshop_waalwijk', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'waalwijk',
            client_type: 'webshop',
            log_out_time: false,
            flags: {
                logoExtension: '.png',
                accessibilityPage: false,
            },
            sessions: sessions,
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    // Config meapp landings
    core.editPlatform('website', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: baseImplementationKey,
            panel_type: 'website',
            flags: {},
            sessions: sessions,
            google_maps_api_key: google_maps_api_key,
            ios_link: '/',
            android_link: '/',
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        return platform;
    });

    // Config backend platform
    core.editPlatform('backend_general', (platform) => {
        platform.setEnvData({
            api_url: apiUrl,
            client_key: 'general',
            client_type: 'pin_code-auth',
            disable_timestamps: true
        });

        platform.editTask('js', (task) => {
            task.minify = minify;
            task.sourcemap = sourcemap;
            return task;
        });

        // Change building path
        platform.setDestRootPath(outputRootBackendPublic);

        return platform;
    });

    //- Enable only given platforms
    core.enableOnly([
        'dashboard_general_sponsor',
        'dashboard_general_provider',
        'dashboard_general_validator',
        'webshop_general',
    ]);

    //- Enable all but given platforms (will ignore: 'core.enableOnly' when used)
    /*core.disableOnly([
        'dashboard_markup',
        'webshop_markup'
    ]);*/

    return core;
};
