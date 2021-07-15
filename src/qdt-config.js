const core = require('./qdt/Core');

// Register markups
core.addPlatform(require('./platforms/Webshops/WebshopMarkupPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardMarkupPlatform'));

// Register dashbaords
core.addPlatform(require('./platforms/Dashboards/DashboardGeneralSponsorPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardGeneralProviderPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardGeneralValidatorPlatform'));

core.addPlatform(require('./platforms/Dashboards/DashboardNijmegenSponsorPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardNijmegenProviderPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardNijmegenValidatorPlatform'));

core.addPlatform(require('./platforms/Dashboards/DashboardKerstpakketSponsorPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardKerstpakketProviderPlatform'));

core.addPlatform(require('./platforms/Dashboards/DashboardWesterkwartierSponsorPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardWesterkwartierProviderPlatform'));

core.addPlatform(require('./platforms/Dashboards/DashboardGroningenSponsorPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardGroningenProviderPlatform'));

core.addPlatform(require('./platforms/Dashboards/DashboardBerkellandSponsorPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardBerkellandProviderPlatform'));

core.addPlatform(require('./platforms/Dashboards/DashboardOostGelreSponsorPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardOostGelreProviderPlatform'));

core.addPlatform(require('./platforms/Dashboards/DashboardWinterswijkSponsorPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardWinterswijkProviderPlatform'));

core.addPlatform(require('./platforms/Dashboards/DashboardNoordoostpolderSponsorPlatform'));
core.addPlatform(require('./platforms/Dashboards/DashboardNoordoostpolderProviderPlatform'));


// Register webshops
core.addPlatform(require('./platforms/Webshops/WebshopGeneralPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopPotjeswijzerPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopNijmegenPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopKerstpakketPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopWesterkwartierPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopGroningenPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopBerkellandPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopOostGelrePlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopWinterswijkPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopNoordoostpolderPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopGeertruidenbergPlatform'));
core.addPlatform(require('./platforms/Webshops/WebshopWaalwijkPlatform'));

// Register meapp landings
core.addPlatform(require('./platforms/Website/Website'));

// Register backend platform
core.addPlatform(require('./platforms/Backend/BackendGeneralPlatform'));

module.exports = core;